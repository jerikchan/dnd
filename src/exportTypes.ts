export interface FaiDnD {
	dispose: () => void;
	setOptions: (options: ContainerOptions, merge?: boolean) => void;	
}

export type FaiDnDCreator = ((element: HTMLElement, options?: ContainerOptions) => FaiDnD) & {
	dropHandler?: any;
	wrapChild?: boolean;
	maxScrollSpeed?: number;
	useTransformForGhost?: boolean;
	cancelDrag: () => void;
	isDragging: () => boolean;
};

type Callback<T> = (params: T) => void;

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

export interface DragStartParams { isSource: boolean; payload: any; willAcceptDrop: boolean }
export interface DragEndParams { isSource: boolean; payload: any; willAcceptDrop: boolean }

export type DragStartCallback = Callback<DragStartParams>;
export type DragEndCallback = Callback<DragEndParams>;
export type OnDropCallback = Callback<DropResult>;
export type OnDropReadyCallback = Callback<DropResult>;
export type onSnapCallback = Callback<SnapInfos>;

export type SnapInfos = Array<{
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
export type GuidelineLineType = 'vertical' | 'horizontal';

export interface ContainerOptions {
	behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain';
	groupName?: string; // if not defined => container will not interfere with other containers
	orientation?: 'vertical' | 'horizontal';
	dragHandleSelector?: string;
	nonDragAreaSelector?: string;
	dragBeginDelay?: number;
	animationDuration?: number;
	autoScrollEnabled?: boolean;
	lockAxis?: 'x' | 'y';
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
}
