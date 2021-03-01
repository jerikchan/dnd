import { ElementGuidelines } from "./interfaces";
export interface FaiDnD {
    dispose: () => void;
    setOptions: (options: ContainerOptions, merge?: boolean) => void;
}
export declare type FaiDnDCreator = ((element: HTMLElement, options?: ContainerOptions) => FaiDnD) & {
    dropHandler?: any;
    wrapChild?: boolean;
    maxScrollSpeed?: number;
    useTransformForGhost?: boolean;
    cancelDrag: () => void;
    isDragging: () => boolean;
};
declare type Callback<T> = (params: T) => void;
export interface DropPosition {
    x: number;
    y: number;
}
export interface DropResult {
    removedIndex: number | null;
    addedIndex: number | null;
    payload?: any;
    element?: HTMLElement;
    position?: DropPosition | null;
}
export interface DropPlaceholderOptions {
    className?: string;
    animationDuration?: number;
    showOnTop?: boolean;
}
export interface DragStartParams {
    isSource: boolean;
    payload: any;
    willAcceptDrop: boolean;
}
export interface DragEndParams {
    isSource: boolean;
    payload: any;
    willAcceptDrop: boolean;
}
export declare type DragStartCallback = Callback<DragStartParams>;
export declare type DragEndCallback = Callback<DragEndParams>;
export declare type OnDropCallback = Callback<DropResult>;
export declare type OnDropReadyCallback = Callback<DropResult>;
export declare type onSnapCallback = Callback<SnapInfos>;
export declare type SnapInfos = Array<{
    vertical: SnapInfo;
    horizontal: SnapInfo;
}>;
export interface SnapInfo {
    isSnap: boolean;
    index: number;
    posInfos: SnapPosInfo[];
}
export interface SnapPosInfo {
    pos: number;
    index: number;
    guidelineInfos: SnapGuidelineInfo[];
}
export interface SnapGuidelineInfo {
    dist: number;
    offset: number;
    guideline: Guideline;
}
export interface Guideline {
    type: GuidelineLineType;
    element: HTMLElement;
    pos: number[];
    size: number;
    sizes?: number[];
    center?: boolean;
}
export declare type GuidelineLineType = "vertical" | "horizontal";
export declare type AlignPointType = "lt" | "lc" | "lb" | "ct" | "cc" | "cb" | "rt" | "rc" | "rb";
export interface ContainerOptions {
    dragOnPoint?: boolean | AlignPointType;
    behaviour?: "move" | "copy" | "drop-zone" | "contain";
    groupName?: string;
    orientation?: "vertical" | "horizontal";
    dragHandleSelector?: string;
    nonDragAreaSelector?: string;
    dragBeginDelay?: number;
    animationDuration?: number;
    autoScrollEnabled?: boolean;
    lockAxis?: "x" | "y";
    dragClass?: string;
    dropClass?: string;
    onDragStart?: DragStartCallback;
    onDrop?: OnDropCallback;
    getChildPayload?: (index: number) => any;
    shouldAnimateDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
    shouldAcceptDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
    onDragEnter?: () => void;
    onDragLeave?: () => void;
    onDropReady?: OnDropReadyCallback;
    onSnap?: onSnapCallback;
    removeOnDropOut?: boolean;
    getGhostParent?: () => HTMLElement;
    onDragEnd?: DragEndCallback;
    dropPlaceholder?: DropPlaceholderOptions | boolean;
    disabled?: boolean;
    snappable?: boolean;
    elementGuidelines?: ElementGuidelines;
}
export {};
