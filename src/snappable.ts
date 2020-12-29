import { guidelineClass } from "./constants";
import { SnapInfos, SnapInfo, SnapPosInfo, Guideline } from "./exportTypes";
import { DraggableInfo, GhostInfo, SnappableInfo, SnappableRenderType, ElementGuidelines } from "./interfaces";
import { addClass, groupBy, find } from "./utils";

function getElementGuidelines(
  elementGuidelines: ElementGuidelines,
  {
    snapCenter = true,
  }: {
    snapCenter?: boolean,
  } = {},
) {
  const guidelines: Guideline[] = [];

  if (!elementGuidelines.length) {
    return guidelines;
  }

  elementGuidelines.map((el => {
    if ("parentElement" in el) {
      return {
        element: el,
      };
    }
    return el;
  })).forEach((value) => {
    const {
      element,
      left: leftValue, 
      top: topValue,
      right: rightValue,
      bottom: bottomValue,
    } = value;
    const rect = element.getBoundingClientRect();
    const { 
      left: elementLeft, 
      top: elementTop,
      right: elementRight,
      bottom: elementBottom,
      width, 
      height 
    } = rect;
    const sizes = [width, height];

    //top
    if (topValue !== false) {
      guidelines.push({
        type: "vertical", element, pos: [
          elementLeft,
          elementTop,
        ], size: height,
        sizes,
      });
    }

    // bottom
    if (bottomValue !== false) {
      guidelines.push({
        type: "vertical", element, pos: [
          elementRight,
          elementTop,
        ], size: height,
        sizes,
      });
    }

    // left
    if (leftValue !== false) {
      guidelines.push({
        type: "horizontal", element, pos: [
          elementLeft,
          elementTop,
        ], size: width,
        sizes,
      });
    }

    // right
    if (rightValue !== false) {
      guidelines.push({
        type: "horizontal", element, pos: [
          elementLeft,
          elementBottom,
        ], size: width,
        sizes,
      });
    }

    if (snapCenter) {
      guidelines.push({
        type: "vertical",
        element,
        pos: [
            (elementLeft + elementRight) / 2,
            elementTop,
        ],
        size: height,
        sizes,
        center: true,
      });
      guidelines.push({
        type: "horizontal",
        element,
        pos: [
            elementLeft,
            (elementTop + elementBottom) / 2,
        ],
        size: width,
        sizes,
        center: true,
      });
    }
  });

  return guidelines;
}

function checkSnaps(
  rect: {
    left?: number,
    top?: number,
    bottom?: number,
    right?: number,
    center?: number,
    middle?: number,
  }, 
  guidelines: Guideline[],
  options: {
    snapThreshold?: number,
  } = {},
) {
  let verticalNames: Array<"left" | "center" | "right"> = ["left", "right"];
  let horizontalNames: Array<"top" | "middle" | "bottom"> = ["top", "bottom"];

  verticalNames.push("center");
  horizontalNames.push("middle");

  verticalNames = verticalNames.filter(name => name in rect);
  horizontalNames = horizontalNames.filter(name => name in rect);

  const posesX: number[] = verticalNames.map(name => rect[name]!);
  const posesY: number[] = horizontalNames.map(name => rect[name]!);

  return {
    vertical: checkSnap(guidelines, "vertical", posesX, options),
    horizontal: checkSnap(guidelines, "horizontal", posesY, options),
  };
}

function checkSnap(
  guidelines: Guideline[],
  targetType: "horizontal" | "vertical",
  targetPoses: number[],
  {
    snapThreshold = 5,
}: {
    snapThreshold?: number,
} = {}
): SnapInfo {
  if (!guidelines || !guidelines.length) {
    return {
        isSnap: false,
        index: -1,
        posInfos: [],
    };
  }

  const isVertical = targetType === "vertical";
  const posType = isVertical ? 0 : 1;

  const snapPosInfos = targetPoses.map((targetPos, index) => {
    const guidelineInfos = guidelines.map((guideline) => {
      const { pos } = guideline;
      const offset = targetPos - pos[posType];

      return {
        offset,
        dist: Math.abs(offset),
        guideline,
      };
    }).filter(({ guideline, dist }) => {
      const { type } = guideline;
      if (
          type !== targetType
          || dist > snapThreshold
      ) {
          return false;
      }
      return true;
    }).sort(
      (a, b) => a.dist - b.dist,
    );

    return {
      pos: targetPos,
      index,
      guidelineInfos,
    };
  }).filter(snapPosInfo => {
    return snapPosInfo.guidelineInfos.length > 0;
  }).sort((a, b) => {
    return a.guidelineInfos[0].dist - b.guidelineInfos[0].dist;
  });

  const isSnap = snapPosInfos.length > 0;
  return {
    isSnap,
    index: isSnap ? snapPosInfos[0].index : -1,
    posInfos: snapPosInfos,
  };
}

function getSnapGuidelines(posInfos: SnapPosInfo[]) {
  const guidelines: Guideline[] = [];

  posInfos.forEach((posInfo) => {
      posInfo.guidelineInfos.forEach(({ guideline }) => {
          if (guidelines.indexOf(guideline) > -1) {
              return;
          }
          guidelines.push(guideline);
      });
  });

  return guidelines;
}

function getElementGuidelineDist(
  elementPos: number,
  elementSize: number,
  targetPos: number,
  targetSize: number
) {
  // relativePos < 0  => element(l)  ---  (r)target
  // relativePos > 0  => target(l)   ---  (r)element
  const relativePos = elementPos - targetPos;
  const startPos = relativePos < 0 ? relativePos + elementSize : targetSize;
  const endPos = relativePos < 0 ? 0 : relativePos;
  const size = endPos - startPos;

  return {
      size,
      pos: startPos,
  };
}

function groupByElementGuidelines(
  guidelines: Guideline[],
  clientPos: number,
  size: number,
  index: number
) {
  const groupInfos: Array<[Element, number, any]> = [];

  const group = groupBy(
      guidelines,
      ({ element, pos }) => {
          const elementPos = pos[index];
          const sign = Math.min(0, elementPos - clientPos) < 0 ? -1 : 1;
          const groupKey = `${sign}_${pos[index ? 0 : 1]}`;
          const groupInfo = find(groupInfos, ([groupElement, groupPos]) => {
              return element === groupElement && elementPos === groupPos;
          });
          if (groupInfo) {
              return groupInfo[2];
          }
          groupInfos.push([element!, elementPos, groupKey]);
          return groupKey;
      }
  );
  group.forEach((elementGuidelines) => {
      elementGuidelines.sort((a, b) => {
          const result =
              getElementGuidelineDist(a.pos[index], a.size, clientPos, size)
                  .size -
              getElementGuidelineDist(b.pos[index], a.size, clientPos, size)
                  .size;

          return result || a.pos[index ? 0 : 1] - b.pos[index ? 0 : 1];
      });
  });
  return group;
}

function getNearestSnapGuidelineInfo(
  snapInfo: SnapInfo,
) {
  const isSnap = snapInfo.isSnap;

  if (!isSnap) {
      return {
          isSnap: false,
          offset: 0,
          dist: -1,
          pos: 0,
          guideline: null,
      };
  }
  const posInfo = snapInfo.posInfos[0];
  const guidelineInfo = posInfo!.guidelineInfos[0];
  const offset = guidelineInfo!.offset;
  const dist = guidelineInfo!.dist;
  const guideline = guidelineInfo!.guideline;

  return {
      isSnap,
      offset,
      dist,
      pos: posInfo!.pos,
      guideline,
  };
}

function getRect(ghostInfo: GhostInfo, distX?: number, distY?: number) {
  const rect = ghostInfo.ghost.getBoundingClientRect();
  const left = typeof distX !== 'undefined' ? distX : ghostInfo.topLeft.x;
  const top = typeof distY !== 'undefined' ? distY : ghostInfo.topLeft.y;

  return {
    left,
    top,
    right: left + rect.width,
    bottom: top + rect.height,
    width: rect.width,
    height: rect.height,
  };
}

const HORIZONTAL_NAMES = ["horizontal", "left", "top", "width"] as const;
const VERTICAL_NAMES = ["vertical", "top", "left", "height"] as const;
type DirectionNames = typeof HORIZONTAL_NAMES | typeof VERTICAL_NAMES;

export default function snappable(draggableInfo: DraggableInfo, elementGuidelines: ElementGuidelines): SnappableInfo {
  let controlBox: HTMLElement | null = null;
  let guidelines: Guideline[] = [];

  function dragStart() {
    controlBox = document.createElement('div');
    document.body.appendChild(controlBox);
  }

  function dragEnd() {
    if (controlBox) {
      if (controlBox.parentNode) {
        controlBox.parentNode.removeChild(controlBox);
      }
      controlBox = null;
    }
    guidelines = [];
  }

  function renderGuidelines(
    guidelines: Guideline[],
    [directionName, posName1, posName2, sizeName]: DirectionNames,
    index: number,
  ) {
    return guidelines.map((guideline, i) => {
      const { pos, size } = guideline;
      const div = document.createElement('div');
      addClass(div, `${guidelineClass} guideline bold ${directionName}`);
      div.style[posName1] = `${pos[index]}px`;
      div.style[posName2] = `${pos[index ? 0 : 1]}px`;
      div.style[sizeName] = `${size}px`;

      if (controlBox) {
        controlBox.appendChild(div);
      }
    });
  }

  function renderSnapPoses(
    snapPoses: SnappableRenderType[],
    [directionName, posName1, posName2, sizeName]: DirectionNames,
    targetPos: number,
    size: number,
  ) {
    return snapPoses.map(({ pos }) => {
      const div = document.createElement('div');
      addClass(div, `${guidelineClass} bold snap-pose ${directionName}`);
      div.style[posName1] = `${targetPos}px`;
      div.style[posName2] = `${pos}px`;
      div.style[sizeName] = `${size}px`;

      if (controlBox) {
        controlBox.appendChild(div);
      }
    });
  }

  function renderSizeValue(
    group: Guideline[][],
    [directionName, posName1, posName2, sizeName]: DirectionNames,
    clientPos: number,
    clientSize: number,
    index: number,
  ) {
    group.forEach((elementGuidelines, i) => {
      elementGuidelines.forEach(({ pos, size }) => {
          const {
              pos: linePos,
              size: lineSize,
          } = getElementGuidelineDist(
              pos[index],
              size,
              clientPos,
              clientSize
          );
          const div = document.createElement('div');
          addClass(div, `${guidelineClass} dashed size-value ${directionName}`);
          div.style[posName1] = `${clientPos + linePos}px`;
          div.style[posName2] = `${pos[index ? 0 : 1]}px`;
          div.style[sizeName] = `${lineSize}px`;

          if (controlBox) {
            controlBox.appendChild(div);
          }
      });
    });
  }

  function drag(ghostInfo: GhostInfo) {
    guidelines = getElementGuidelines(elementGuidelines);

    const snapInfos: SnapInfos = [];
    const rect = getRect(ghostInfo);
    (rect as any).middle = (rect.top + rect.bottom) / 2;
    (rect as any).center = (rect.left + rect.right) / 2;

    snapInfos.push(checkSnaps(rect, guidelines, { snapThreshold: 0 }));

    const verticalSnapPoses: SnappableRenderType[] = [];
    const horizontalSnapPoses: SnappableRenderType[] = [];
    const verticalGuidelines: Guideline[] = [];
    const horizontalGuidelines: Guideline[] = [];

    snapInfos.forEach((snapInfo) => {
      const {
          vertical: { posInfos: verticalPosInfos },
          horizontal: { posInfos: horizontalPosInfos },
      } = snapInfo;
      
      verticalSnapPoses.push(
          ...verticalPosInfos.map(
              (posInfo) =>
                  ({
                      type: "snap",
                      pos: posInfo.pos,
                  } as const)
          )
      );
      horizontalSnapPoses.push(
          ...horizontalPosInfos.map(
              (posInfo) =>
                  ({
                      type: "snap",
                      pos: posInfo.pos,
                  } as const)
          )
      );
      verticalGuidelines.push(...getSnapGuidelines(verticalPosInfos));
      horizontalGuidelines.push(
          ...getSnapGuidelines(horizontalPosInfos)
      );
    });

    const elementHorizontalGroup = groupByElementGuidelines(
      horizontalGuidelines,
      rect.left,
      rect.width,
      0,
    );
    const elementVerticalGroup = groupByElementGuidelines(
      verticalGuidelines,
      rect.top,
      rect.height,
      1,
    );

    // TODO: reuse elements
    if (controlBox) {
      controlBox.innerHTML = "";
    }

    renderGuidelines(
      horizontalGuidelines,
      HORIZONTAL_NAMES,
      0,
    );
    renderGuidelines(
      verticalGuidelines,
      VERTICAL_NAMES,
      1,
    );
    renderSnapPoses(
      horizontalSnapPoses,
      HORIZONTAL_NAMES,
      rect.left,
      rect.width,
    );
    renderSnapPoses(
      verticalSnapPoses,
      VERTICAL_NAMES,
      rect.top,
      rect.height,
    );
    renderSizeValue(
      elementHorizontalGroup,
      HORIZONTAL_NAMES,
      rect.left,
      rect.width,
      0,
    );
    renderSizeValue(
      elementVerticalGroup,
      VERTICAL_NAMES,
      rect.top,
      rect.height,
      1,
    );
  }

  function checkSnapDrag(ghostInfo: GhostInfo, distX: number, distY: number) {
    const rect = getRect(ghostInfo, distX, distY);
    const {
      horizontal: horizontalSnapInfo,
      vertical: verticalSnapInfo,
    } = checkSnaps(rect, guidelines);
    const { 
      isSnap: isVerticalSnap, 
      offset: offsetX 
    } = getNearestSnapGuidelineInfo(verticalSnapInfo);
    const { 
      isSnap: isHorizontalSnap, 
      offset: offsetY 
    } = getNearestSnapGuidelineInfo(horizontalSnapInfo);

    return [
      {
          isSnap: isVerticalSnap,
          offset: offsetX,
      },
      {
          isSnap: isHorizontalSnap,
          offset: offsetY,
      },
    ];
  }

  return {
    dragStart,
    drag,
    dragEnd,
    checkSnapDrag,
  };
}