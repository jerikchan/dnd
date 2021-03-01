import { constants } from "@fk/fai-dnd";
import { getTagProps, validateTagProp, renderlessComponent } from "./utils";

const wrapChild = (createElement, ctx) => {
  const tagProps = getTagProps(ctx, constants.wrapperClass);
  if (ctx.renderless) {
    return renderlessComponent(ctx, tagProps.props);
  }
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default
  );
};

export default {
  name: "Draggable",
  props: {
    tag: {
      validator: validateTagProp,
      default: "div"
    },
    renderless: {
      type: Boolean,
      default: false
    }
  },
  render: function(createElement) {
    return wrapChild(createElement, this);
  }
};
