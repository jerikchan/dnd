import { IContainer } from "./interfaces";
declare function cancelDrag(): void;
declare const _default: {
    register: (container: IContainer) => void;
    unregister: (container: IContainer) => void;
    isDragging: () => boolean;
    cancelDrag: typeof cancelDrag;
};
export default _default;
