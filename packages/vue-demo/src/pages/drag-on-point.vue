<template>
  <div class="simple-page">
    <div class="controls">
      <label v-for="name in dragOnPoints" :key="name">
        <input
          type="checkbox"
          :checked="genCheckboxValue(name)"
          @input="onCheckboxInput($event, name)"
        />
        {{ name }}
      </label>
    </div>
    <Container @drop="onDrop" :drag-on-point="dragOnPoint">
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item">
          {{ item.data }}
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "@fk/fai-dnd-vue";
import { applyDrag, generateItems } from "../utils/helpers";

export default {
  name: "DragOnPoint",

  components: { Container, Draggable },

  data() {
    return {
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i })),
      dragOnPoints: [
        "lt",
        "lc",
        "lb",
        "ct",
        "cc",
        "cb",
        "rt",
        "rc",
        "rb",
        false,
        true
      ],
      dragOnPoint: false
    };
  },

  methods: {
    genCheckboxValue(name) {
      if (
        (this.dragOnPoint === "cc" || this.dragOnPoint === true) &&
        (name === "cc" || name === true)
      ) {
        return true;
      }
      return name === this.dragOnPoint;
    },
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    },
    onCheckboxInput(evt, name) {
      console.log(evt.target.checked, name);
      this.dragOnPoint = evt.target.checked ? name : false;
    }
  }
};
</script>
