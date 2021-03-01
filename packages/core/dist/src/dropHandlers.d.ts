import { ContainerProps } from "./interfaces";
import { DropResult, OnDropCallback } from "./exportTypes";
export declare function domDropHandler({ element, draggables }: ContainerProps): (dropResult: DropResult, onDrop: OnDropCallback) => void;
export declare function reactDropHandler(): {
    handler: () => (dropResult: DropResult, onDrop: OnDropCallback) => void;
};
