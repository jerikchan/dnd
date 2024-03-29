import {
  animationClass,
  containerClass,
  containerInstance,
  dropPlaceholderFlexContainerClass,
  dropPlaceholderInnerClass,
  dropPlaceholderWrapperClass,
  stretcherElementClass,
  stretcherElementInstance,
  translationValue,
  wrapperClass,
  dropPlaceholderDefaultClass,
  guidelineClass
} from "./constants";
import { defaultOptions } from "./defaults";
import { domDropHandler } from "./dropHandlers";
import {
  ContainerOptions,
  FaiDnD,
  FaiDnDCreator,
  DropPlaceholderOptions,
  DropResult
} from "./exportTypes";
import {
  ContainerProps,
  DraggableInfo,
  DragInfo,
  DragResult,
  ElementX,
  IContainer,
  LayoutManager
} from "./interfaces";
import layoutManager from "./layoutManager";
import Mediator from "./mediator";
import {
  addClass,
  getParent,
  getParentRelevantContainerElement,
  hasClass,
  listenScrollParent,
  removeClass,
  getFirstElementChild
} from "./utils";

function setAnimation(
  element: HTMLElement,
  add: boolean,
  animationDuration = defaultOptions.animationDuration
) {
  if (add) {
    addClass(element, animationClass);
    element.style.transitionDuration = animationDuration + "ms";
  } else {
    removeClass(element, animationClass);
    element.style.removeProperty("transition-duration");
  }
}

function isDragRelevant({ element, getOptions }: ContainerProps) {
  return function(sourceContainer: IContainer, payload: any) {
    const options = getOptions();

    if (options.shouldAcceptDrop) {
      return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
    }
    const sourceOptions = sourceContainer.getOptions();
    if (options.behaviour === "copy") return false;

    const parentWrapper = getParent(element, "." + wrapperClass);
    if (parentWrapper === sourceContainer.element) {
      return false;
    }

    if (sourceContainer.element === element) return true;
    if (
      sourceOptions.groupName &&
      sourceOptions.groupName === options.groupName
    )
      return true;

    return false;
  };
}

function wrapChild(child: HTMLElement) {
  if (faiDnD.wrapChild) {
    const div = window.document.createElement("div");
    div.className = `${wrapperClass}`;
    child.parentElement!.insertBefore(div, child);
    div.appendChild(child);
    return div;
  }

  return child;
}

function wrapChildren(element: HTMLElement) {
  const draggables: ElementX[] = [];
  Array.prototype.forEach.call(element.children, (child: ElementX) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      let wrapper = child;
      if (!hasClass(child, wrapperClass)) {
        wrapper = wrapChild(child);
      }
      // only wrap child that has wrapperClass
      if (hasClass(child, wrapperClass)) {
        wrapper[translationValue] = 0;
        draggables.push(wrapper);
      }
    } else {
      element.removeChild(child);
    }
  });
  return draggables;
}

function unwrapChildren(element: HTMLElement) {
  if (faiDnD.wrapChild) {
    Array.prototype.forEach.call(element.children, (child: HTMLElement) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (hasClass(child, wrapperClass)) {
          element.insertBefore(
            getFirstElementChild(child) as HTMLElement,
            child
          );
          element.removeChild(child);
        }
      }
    });
  }
}

function findDraggebleAtPos({ layout }: { layout: LayoutManager }) {
  const find = (
    draggables: HTMLElement[],
    pos: number,
    startIndex: number,
    endIndex: number,
    withRespectToMiddlePoints = false
  ): number | null => {
    if (endIndex < startIndex) {
      return startIndex;
    }
    // binary serach draggable
    if (startIndex === endIndex) {
      const { begin, end } = layout.getBeginEnd(draggables[startIndex]);
      // mouse pos is inside draggable
      // now decide which index to return
      // if (pos > begin && pos <= end) {
      if (withRespectToMiddlePoints) {
        return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
      } else {
        return startIndex;
      }
      // } else {
      //   return null;
      // }
    } else {
      const middleIndex = Math.floor((endIndex + startIndex) / 2);
      const { begin, end } = layout.getBeginEnd(draggables[middleIndex]);
      if (pos < begin) {
        return find(
          draggables,
          pos,
          startIndex,
          middleIndex - 1,
          withRespectToMiddlePoints
        );
      } else if (pos > end) {
        return find(
          draggables,
          pos,
          middleIndex + 1,
          endIndex,
          withRespectToMiddlePoints
        );
      } else {
        if (withRespectToMiddlePoints) {
          return pos < (end + begin) / 2 ? middleIndex : middleIndex + 1;
        } else {
          return middleIndex;
        }
      }
    }
  };

  return (
    draggables: HTMLElement[],
    pos: number,
    withRespectToMiddlePoints = false
  ) => {
    return find(
      draggables,
      pos,
      0,
      draggables.length - 1,
      withRespectToMiddlePoints
    );
  };
}

function resetDraggables({ element, draggables, layout }: ContainerProps) {
  return function(dragResult: DragResult) {
    draggables.forEach((p: ElementX) => {
      setAnimation(p, false);
      layout.setTranslation(p, 0);
      layout.setVisibility(p, true);
    });

    if (dragResult.removedIndex !== null) {
      if (dragResult.removedStyleSize !== null) {
        layout.setSize(
          draggables[dragResult.removedIndex].style,
          dragResult.removedStyleSize
        );
      }
    }

    if (element[stretcherElementInstance]) {
      element[stretcherElementInstance].parentNode.removeChild(
        element[stretcherElementInstance]
      );
      element[stretcherElementInstance] = null;
    }
  };
}

function setTargetContainer(
  draggableInfo: DraggableInfo,
  element: HTMLElement,
  set = true
) {
  if (element && set) {
    draggableInfo.targetElement = element;
  } else {
    if (draggableInfo.targetElement === element) {
      draggableInfo.targetElement = null;
    }
  }
}

function handleDrop({
  element,
  draggables,
  layout,
  getOptions
}: ContainerProps) {
  const draggablesReset = resetDraggables({
    element,
    draggables,
    layout,
    getOptions
  });
  const dropHandler = (faiDnD.dropHandler || domDropHandler)({
    element,
    draggables,
    layout,
    getOptions
  });
  return function(
    draggableInfo: DraggableInfo,
    dragResult: DragResult,
    forDispose = false
  ) {
    const { addedIndex, removedIndex } = dragResult;
    draggablesReset(dragResult);
    // if drop zone is valid => complete drag else do nothing everything will be reverted by draggablesReset()
    if (!draggableInfo.cancelDrop) {
      if (
        draggableInfo.targetElement ||
        getOptions().removeOnDropOut ||
        forDispose
      ) {
        const actualAddIndex =
          addedIndex !== null
            ? removedIndex !== null && removedIndex < addedIndex
              ? addedIndex - 1
              : addedIndex
            : null;

        // position
        const rectangles = layout.getContainerRectangles();
        const position =
          getOptions().behaviour === "drop-zone"
            ? actualAddIndex !== null
              ? {
                  x: draggableInfo.ghostPosition.x - rectangles.rect.left,
                  y: draggableInfo.ghostPosition.y - rectangles.rect.top
                }
              : null
            : null;

        const dropHandlerParams: DropResult = {
          removedIndex,
          addedIndex: actualAddIndex,
          payload: draggableInfo.payload,
          position
        };
        dropHandler(dropHandlerParams, getOptions().onDrop);
      }
    }
  };
}

function getContainerProps(
  element: HTMLElement,
  getOptions: () => ContainerOptions
): ContainerProps {
  const draggables = wrapChildren(element);
  const options = getOptions();
  // set flex classes before layout is inited for scroll listener
  addClass(element, `${containerClass} ${options.orientation}`);
  const layout = layoutManager(
    element,
    options.orientation!,
    options.animationDuration!
  );
  return {
    element,
    draggables,
    getOptions,
    layout
  };
}

function getRemovedItem({ element, getOptions }: ContainerProps) {
  let prevRemovedIndex: number | null = null;
  return ({ draggableInfo }: DragInfo) => {
    let removedIndex = prevRemovedIndex;
    if (
      prevRemovedIndex == null &&
      draggableInfo.container.element === element &&
      getOptions().behaviour !== "copy"
    ) {
      removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
    }

    return { removedIndex };
  };
}

function setRemovedItemVisibilty({ draggables, layout }: ContainerProps) {
  return ({ dragResult }: DragInfo) => {
    if (dragResult.removedIndex !== null) {
      layout.setVisibility(draggables[dragResult.removedIndex], false);
    }
  };
}

function shouldHitContainer(
  options: ContainerOptions,
  layout: LayoutManager,
  draggableInfo: DraggableInfo
) {
  return options.shouldHitContainer
    ? options.shouldHitContainer(
        layout.getContainerRectangles().visibleRect,
        draggableInfo.ghostPosition,
        draggableInfo.size
      )
    : true;
}

function getPosition({ element, layout, getOptions }: ContainerProps) {
  return ({ draggableInfo }: DragInfo) => {
    let hitElement = document.elementFromPoint(
      draggableInfo.position.x,
      draggableInfo.position.y
    );

    const elements = [];
    while (hitElement && hasClass(hitElement as HTMLElement, guidelineClass)) {
      elements.push({
        hitElement,
        display: (hitElement as HTMLElement).style.display
      });

      (hitElement as HTMLElement).style.display = "none";
      hitElement = document.elementFromPoint(
        draggableInfo.position.x,
        draggableInfo.position.y
      );
    }

    elements.forEach(({ hitElement, display }) => {
      (hitElement as HTMLElement).style.display = display;
    });

    // TODO: if center is out of bounds use mouse position for hittest
    // if (!hitElement) {
    //   hitElement = document.elementFromPoint(draggableInfo.mousePosition.x, draggableInfo.mousePosition.y);
    // }

    if (hitElement) {
      const container: IContainer = getParentRelevantContainerElement(
        hitElement,
        draggableInfo.relevantContainers
      );
      if (
        container &&
        container.element === element &&
        shouldHitContainer(getOptions(), layout, draggableInfo)
      ) {
        return {
          pos: layout.getPosition(draggableInfo.position)
        };
      }
    }

    return {
      pos: null
    };
  };
}

function getElementSize({ layout, getOptions }: ContainerProps) {
  let elementSize: number | null = null;
  const { getPlaceholderSize } = getOptions();
  return ({ draggableInfo, dragResult }: DragInfo) => {
    // 自定义 element size
    if (getPlaceholderSize) {
      elementSize =
        elementSize || getPlaceholderSize(getOptions(), draggableInfo.payload);
    } else if (dragResult.pos === null) {
      return (elementSize = null);
    } else {
      elementSize = elementSize || layout.getSize(draggableInfo.size);
    }
    return { elementSize };
  };
}

function setRemovedItemElementSize({
  layout,
  getOptions,
  draggables
}: ContainerProps) {
  let removedStyleSize: string | null = null;
  let elementSize: number | null = null;
  const { getPlaceholderSize } = getOptions();
  return ({ draggableInfo, dragResult }: DragInfo) => {
    if (dragResult.removedIndex !== null) {
      if (getPlaceholderSize) {
        elementSize =
          elementSize ||
          getPlaceholderSize(getOptions(), draggableInfo.payload);

        removedStyleSize =
          removedStyleSize !== null
            ? removedStyleSize
            : layout.getStyleSize(draggables[dragResult.removedIndex].style);
        layout.setSize(
          draggables[dragResult.removedIndex].style,
          elementSize + "px"
        );
      }
    }

    return { removedStyleSize };
  };
}

function handleTargetContainer({ element }: ContainerProps) {
  return ({ draggableInfo, dragResult }: DragInfo) => {
    setTargetContainer(draggableInfo, element, !!dragResult.pos);
  };
}

function getDragInsertionIndex({ draggables, layout }: ContainerProps) {
  const findDraggable = findDraggebleAtPos({ layout });
  return ({
    dragResult: { shadowBeginEnd, pos }
  }: {
    dragResult: DragResult;
  }) => {
    if (!shadowBeginEnd) {
      const index = findDraggable(draggables, pos, true);
      return index !== null ? index : draggables.length;
    } else {
      if (
        shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos &&
        shadowBeginEnd.end >= pos
      ) {
        // position inside ghost
        return null;
      }
    }

    if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
      return findDraggable(draggables, pos);
    } else if (pos > shadowBeginEnd.end) {
      return findDraggable(draggables, pos)! + 1;
    } else {
      return draggables.length;
    }
  };
}

function getDragInsertionIndexForDropZone() {
  return ({ dragResult: { pos } }: DragInfo) => {
    return pos !== null ? { addedIndex: 0 } : { addedIndex: null };
  };
}

function getShadowBeginEndForDropZone({ layout }: ContainerProps) {
  let prevAddedIndex: number | null = null;
  return ({ dragResult: { addedIndex } }: DragInfo) => {
    if (addedIndex !== prevAddedIndex) {
      prevAddedIndex = addedIndex;
      const { begin, end } = layout.getBeginEndOfContainer();
      return {
        shadowBeginEnd: {
          rect: layout.getTopLeftOfElementBegin(begin)
        }
      };
    }

    return null;
  };
}

function renderDefaultDropPlaceholderContainer(dropPlaceholder: DropPlaceholderOptions) {
  const { className } = dropPlaceholder;
  const innerElement = document.createElement("div");
  const flex = document.createElement("div");
  flex.className = dropPlaceholderFlexContainerClass;
  innerElement.className = `${dropPlaceholderInnerClass} ${className ||
    dropPlaceholderDefaultClass}`;
  const dropPlaceholderContainer = document.createElement(
    "div"
  ) as HTMLDivElement;
  dropPlaceholderContainer.className = `${dropPlaceholderWrapperClass}`;
  dropPlaceholderContainer.style.position = "absolute";

  dropPlaceholderContainer.appendChild(flex);
  flex.appendChild(innerElement);

  return dropPlaceholderContainer;
}

function drawDropPlaceholder({ layout, element, getOptions }: ContainerProps) {
  let prevAddedIndex: number | null = null;
  return ({
    dragResult: {
      elementSize,
      shadowBeginEnd,
      addedIndex,
      dropPlaceholderContainer
    }
  }: DragInfo) => {
    const options = getOptions();
    if (options.dropPlaceholder) {
      const dropPlaceholder = typeof options.dropPlaceholder === "boolean"
        ? (({} as any) as DropPlaceholderOptions)
        : (options.dropPlaceholder as DropPlaceholderOptions);
      const { animationDuration, showOnTop, render } = dropPlaceholder;
      if (addedIndex !== null) {
        if (!dropPlaceholderContainer) {
          if (typeof render === "function") {
            dropPlaceholderContainer = render(dropPlaceholder);
          } else {
            dropPlaceholderContainer = renderDefaultDropPlaceholderContainer(dropPlaceholder);
          }
          if (animationDuration !== undefined) {
            dropPlaceholderContainer.style.transition = `all ${animationDuration}ms ease`;
          }
          layout.setSize(dropPlaceholderContainer.style, elementSize + "px");
          dropPlaceholderContainer.style.pointerEvents = "none";
          if (showOnTop) {
            element.appendChild(dropPlaceholderContainer);
          } else {
            element.insertBefore(
              dropPlaceholderContainer,
              getFirstElementChild(element)
            );
          }
        }

        if (prevAddedIndex !== addedIndex && shadowBeginEnd.dropArea) {
          layout.setBegin(
            dropPlaceholderContainer.style,
            shadowBeginEnd.dropArea.begin -
              layout.getBeginEndOfContainer().begin +
              "px"
          );
        }
        prevAddedIndex = addedIndex;

        return {
          dropPlaceholderContainer
        };
      } else {
        if (dropPlaceholderContainer && prevAddedIndex !== null) {
          element.removeChild(dropPlaceholderContainer!);
        }
        prevAddedIndex = null;

        return {
          dropPlaceholderContainer: undefined
        };
      }
    }

    return null;
  };
}

function invalidateShadowBeginEndIfNeeded(params: ContainerProps) {
  const shadowBoundsGetter = getShadowBeginEnd(params);
  return ({ draggableInfo, dragResult }: DragInfo) => {
    if (draggableInfo.invalidateShadow) {
      return shadowBoundsGetter({ draggableInfo, dragResult });
    }
    return null;
  };
}

function getNextAddedIndex(params: ContainerProps) {
  const getIndexForPos = getDragInsertionIndex(params);
  return ({ dragResult }: DragInfo) => {
    let index = null;
    if (dragResult.pos !== null) {
      index = getIndexForPos({ dragResult });
      if (index === null) {
        index = dragResult.addedIndex;
      }
    }
    return {
      addedIndex: index
    };
  };
}

function resetShadowAdjustment() {
  let lastAddedIndex: number | null = null;
  return ({ dragResult: { addedIndex, shadowBeginEnd } }: DragInfo) => {
    if (
      addedIndex !== lastAddedIndex &&
      lastAddedIndex !== null &&
      shadowBeginEnd
    ) {
      shadowBeginEnd.beginAdjustment = 0;
    }
    lastAddedIndex = addedIndex;
  };
}

function handleInsertionSizeChange({
  element,
  draggables,
  layout,
  getOptions
}: ContainerProps) {
  let strectherElement: HTMLElement | null = null;
  return function({
    dragResult: { addedIndex, removedIndex, elementSize }
  }: DragInfo) {
    if (removedIndex === null) {
      if (addedIndex !== null) {
        if (!strectherElement) {
          const containerBeginEnd = layout.getBeginEndOfContainer();
          containerBeginEnd.end =
            containerBeginEnd.begin + layout.getSize(element);
          const hasScrollBar =
            layout.getScrollSize(element) > layout.getSize(element);
          const containerEnd = hasScrollBar
            ? containerBeginEnd.begin +
              layout.getScrollSize(element) -
              layout.getScrollValue(element)
            : containerBeginEnd.end;
          const lastDraggableEnd =
            draggables.length > 0
              ? layout.getBeginEnd(draggables[draggables.length - 1]).end -
                draggables[draggables.length - 1][translationValue]
              : containerBeginEnd.begin;
          if (lastDraggableEnd + elementSize > containerEnd) {
            strectherElement = window.document.createElement(
              "div"
            ) as HTMLElement;
            strectherElement.className =
              stretcherElementClass + " " + getOptions().orientation;
            const stretcherSize =
              draggables.length > 0
                ? elementSize + lastDraggableEnd - containerEnd
                : elementSize;
            layout.setSize(strectherElement.style, `${stretcherSize}px`);
            element.appendChild(strectherElement);
            element[stretcherElementInstance] = strectherElement;
            return {
              containerBoxChanged: true
            };
          }
        }
      } else {
        if (strectherElement) {
          layout.setTranslation(strectherElement, 0);
          const toRemove = strectherElement;
          strectherElement = null;
          element.removeChild(toRemove);
          element[stretcherElementInstance] = null;
          return {
            containerBoxChanged: true
          };
        }
      }
    }

    return undefined;
  };
}

function calculateTranslations({ draggables, layout }: ContainerProps) {
  let prevAddedIndex: number | null = null;
  let prevRemovedIndex: number | null = null;
  return function({
    dragResult: { addedIndex, removedIndex, elementSize }
  }: {
    dragResult: DragResult;
  }) {
    if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
      for (let index = 0; index < draggables.length; index++) {
        if (index !== removedIndex) {
          const draggable = draggables[index];
          let translate = 0;
          if (removedIndex !== null && removedIndex < index) {
            translate -= elementSize;
          }
          if (addedIndex !== null && addedIndex <= index) {
            translate += elementSize;
          }
          layout.setTranslation(draggable, translate);
        }
      }

      prevAddedIndex = addedIndex;
      prevRemovedIndex = removedIndex;

      return { addedIndex, removedIndex };
    }

    return undefined;
  };
}

function getShadowBeginEnd({ draggables, layout }: ContainerProps) {
  let prevAddedIndex: number | null = null;
  return ({ draggableInfo, dragResult }: DragInfo) => {
    const {
      addedIndex,
      removedIndex,
      elementSize,
      pos,
      shadowBeginEnd
    } = dragResult;
    if (pos !== null) {
      if (
        addedIndex !== null &&
        (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)
      ) {
        // if (prevAddedIndex) prevAddedIndex = addedIndex;
        let beforeIndex = addedIndex - 1;
        let begin = Number.MIN_SAFE_INTEGER;
        let dropAreaBegin = 0;
        let dropAreaEnd = 0;
        let afterBounds = null;
        let beforeBounds = null;
        if (beforeIndex === removedIndex) {
          beforeIndex--;
        }
        if (beforeIndex > -1) {
          const beforeSize = layout.getSize(draggables[beforeIndex]);
          beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);
          if (elementSize < beforeSize) {
            const threshold = (beforeSize - elementSize) / 2;
            begin = beforeBounds.end - threshold;
          } else {
            begin = beforeBounds.end;
          }
          dropAreaBegin = beforeBounds.end;
        } else {
          beforeBounds = { end: layout.getBeginEndOfContainer().begin };
          dropAreaBegin = layout.getBeginEndOfContainer().begin;
        }

        let end = Number.MAX_SAFE_INTEGER;
        let afterIndex = addedIndex;
        if (afterIndex === removedIndex) {
          afterIndex++;
        }
        if (afterIndex < draggables.length) {
          const afterSize = layout.getSize(draggables[afterIndex]);
          afterBounds = layout.getBeginEnd(draggables[afterIndex]);

          if (elementSize < afterSize) {
            const threshold = (afterSize - elementSize) / 2;
            end = afterBounds.begin + threshold;
          } else {
            end = afterBounds.begin;
          }
          dropAreaEnd = afterBounds.begin;
        } else {
          afterBounds = { begin: layout.getContainerRectangles().rect.end };
          dropAreaEnd =
            layout.getContainerRectangles().rect.end -
            layout.getContainerRectangles().rect.begin;
        }

        const shadowRectTopLeft =
          beforeBounds && afterBounds
            ? layout.getTopLeftOfElementBegin(beforeBounds.end)
            : null;

        prevAddedIndex = addedIndex;
        return {
          shadowBeginEnd: {
            dropArea: {
              begin: dropAreaBegin,
              end: dropAreaEnd
            },
            begin,
            end,
            rect: shadowRectTopLeft,
            beginAdjustment: shadowBeginEnd ? shadowBeginEnd.beginAdjustment : 0
          }
        };
      } else {
        return null;
      }
    } else {
      prevAddedIndex = null;
      return {
        shadowBeginEnd: null
      };
    }
  };
}

function handleFirstInsertShadowAdjustment() {
  let lastAddedIndex: number | null = null;
  return ({ dragResult: { pos, addedIndex, shadowBeginEnd } }: DragInfo) => {
    if (pos !== null) {
      if (addedIndex != null && lastAddedIndex === null) {
        if (pos < shadowBeginEnd.begin) {
          const beginAdjustment = pos - shadowBeginEnd.begin - 5;
          shadowBeginEnd.beginAdjustment = beginAdjustment;
        }
        lastAddedIndex = addedIndex;
      }
    } else {
      lastAddedIndex = null;
    }
  };
}

function fireDragEnterLeaveEvents({ getOptions }: ContainerProps) {
  let wasDragIn = false;
  const options = getOptions();
  return ({ dragResult: { pos } }: DragInfo) => {
    const isDragIn = !!pos;
    if (isDragIn !== wasDragIn) {
      wasDragIn = isDragIn;
      if (isDragIn) {
        options.onDragEnter && options.onDragEnter();
      } else {
        options.onDragLeave && options.onDragLeave();
      }
    }

    return undefined;
  };
}

function fireOnDropReady({ getOptions }: ContainerProps) {
  let lastAddedIndex: number | null = null;
  const options = getOptions();
  return ({
    dragResult: { addedIndex, removedIndex },
    draggableInfo: { payload, element }
  }: DragInfo) => {
    if (
      options.onDropReady &&
      addedIndex !== null &&
      lastAddedIndex !== addedIndex
    ) {
      lastAddedIndex = addedIndex;
      let adjustedAddedIndex = addedIndex;

      if (removedIndex !== null && addedIndex > removedIndex) {
        adjustedAddedIndex--;
      }

      options.onDropReady({
        addedIndex: adjustedAddedIndex,
        removedIndex,
        payload,
        element: element
          ? (getFirstElementChild(element) as HTMLElement)
          : undefined
      });
    }
  };
}

function getDragHandler(params: ContainerProps) {
  if (params.getOptions().behaviour === "drop-zone") {
    // sorting is disabled in container, addedIndex will always be 0 if dropped in
    return compose(params)(
      getRemovedItem,
      setRemovedItemVisibilty,
      getPosition,
      getElementSize,
      handleTargetContainer,
      getDragInsertionIndexForDropZone,
      getShadowBeginEndForDropZone,
      fireDragEnterLeaveEvents,
      fireOnDropReady
    );
  } else {
    return compose(params)(
      getRemovedItem,
      setRemovedItemVisibilty,
      getPosition,
      getElementSize,
      setRemovedItemElementSize,
      handleTargetContainer,
      invalidateShadowBeginEndIfNeeded,
      getNextAddedIndex,
      resetShadowAdjustment,
      handleInsertionSizeChange,
      calculateTranslations,
      getShadowBeginEnd,
      drawDropPlaceholder,
      handleFirstInsertShadowAdjustment,
      fireDragEnterLeaveEvents,
      fireOnDropReady
    );
  }
}

function getDefaultDragResult() {
  return {
    addedIndex: null,
    removedIndex: null,
    elementSize: null,
    pos: null,
    shadowBeginEnd: null,
    removedStyleSize: null
  };
}

function compose(params: any) {
  return (...functions: any[]) => {
    const hydratedFunctions = functions.map(p => p(params));
    let result: DragResult | null = null;
    return (draggableInfo: DraggableInfo) => {
      result = hydratedFunctions.reduce((dragResult, fn) => {
        return Object.assign(dragResult, fn({ draggableInfo, dragResult }));
      }, result || getDefaultDragResult());
      return result;
    };
  };
}

// Container definition begin
function Container(
  element: HTMLElement
): (options?: ContainerOptions) => IContainer {
  return function(options?: ContainerOptions): IContainer {
    let containerOptions = Object.assign({}, defaultOptions, options);
    let dragResult: DragResult | null = null;
    let lastDraggableInfo: DraggableInfo | null = null;
    const props = getContainerProps(element, getOptions);
    let dragHandler = getDragHandler(props);
    const dropHandler = handleDrop(props);
    const scrollListener = listenScrollParent(element, onScroll);

    function processLastDraggableInfo() {
      if (lastDraggableInfo !== null) {
        lastDraggableInfo.invalidateShadow = true;
        dragResult = dragHandler(lastDraggableInfo!);
        lastDraggableInfo.invalidateShadow = false;
      }
    }

    function setDraggables(draggables: HTMLElement[], element: HTMLElement) {
      const newDraggables = wrapChildren(element);
      for (let i = 0; i < newDraggables.length; i++) {
        draggables[i] = newDraggables[i];
      }

      for (let i = 0; i < draggables.length - newDraggables.length; i++) {
        draggables.pop();
      }
    }

    function prepareDrag(
      container: IContainer,
      relevantContainers: IContainer[]
    ) {
      const element = container.element;
      const draggables = props.draggables;
      setDraggables(draggables, element);
      container.layout.invalidateRects();
      draggables.forEach(p =>
        setAnimation(p, true, getOptions().animationDuration)
      );
      scrollListener.start();
    }

    function onScroll() {
      props.layout.invalidateRects();
      processLastDraggableInfo();
    }

    function dispose(container: IContainer) {
      scrollListener.dispose();
      unwrapChildren(container.element);
    }

    function setOptions(options: ContainerOptions, merge = true) {
      if (merge === false) {
        containerOptions = Object.assign({}, defaultOptions, options);
      } else {
        containerOptions = Object.assign(
          {},
          defaultOptions,
          containerOptions,
          options
        );
      }
    }

    function getOptions(): ContainerOptions {
      return containerOptions;
    }

    const container: IContainer = {
      element,
      draggables: props.draggables,
      isDragRelevant: isDragRelevant(props),
      layout: props.layout,
      dispose,
      prepareDrag,
      handleDrag(draggableInfo: DraggableInfo) {
        lastDraggableInfo = draggableInfo;
        dragResult = dragHandler(draggableInfo);
        return dragResult;
      },
      handleDrop(draggableInfo: DraggableInfo) {
        scrollListener.stop();
        if (dragResult && dragResult.dropPlaceholderContainer) {
          element.removeChild(dragResult.dropPlaceholderContainer);
        }
        lastDraggableInfo = null;

        // TODO: sometimes dragResult was null, but i don't know why
        if (!dragResult) {
          dragResult = dragHandler(draggableInfo);
        }

        dragHandler = getDragHandler(props);
        dropHandler(draggableInfo, dragResult!);
        dragResult = null;
      },
      fireRemoveElement() {
        // will be called when container is disposed while dragging so ignore addedIndex
        dropHandler(
          lastDraggableInfo!,
          Object.assign({}, dragResult!, { addedIndex: null }),
          true
        );
        dragResult = null;
      },
      getDragResult() {
        return dragResult;
      },
      getTranslateCalculator(dragresult: { dragResult: DragResult }) {
        return calculateTranslations(props)(dragresult);
      },
      onTranslated: () => {
        processLastDraggableInfo();
      },
      setDraggables: () => {
        setDraggables(props.draggables, element);
      },
      getScrollMaxSpeed() {
        return faiDnD.maxScrollSpeed;
      },
      shouldUseTransformForGhost() {
        return faiDnD.useTransformForGhost === true;
      },
      getOptions,
      setOptions
    };

    return container;
  };
}

// exported part of container
const faiDnD: FaiDnDCreator = function(
  element: HTMLElement,
  options?: ContainerOptions
): FaiDnD {
  const containerIniter = Container(element);
  const container = containerIniter(options);
  (element as ElementX)[containerInstance] = container;
  Mediator.register(container);
  return {
    dispose() {
      Mediator.unregister(container);
      container.dispose(container);
    },
    setOptions(options: ContainerOptions, merge?: boolean) {
      container.setOptions(options, merge);
    },
    setDraggables() {
      container.setDraggables();
    },
  };
};

// wrap all draggables by default
// in react,vue,angular this value will be set to false
faiDnD.wrapChild = true;
faiDnD.cancelDrag = function() {
  Mediator.cancelDrag();
};

faiDnD.isDragging = function() {
  return Mediator.isDragging();
};

export default faiDnD;
