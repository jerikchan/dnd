<template>
  <div class="simple-page">
    <Container
      @drop="onDrop"
      snappable
      behaviour="drop-zone"
      :get-ghost-parent="getGhostParent"
      class="container"
      :should-animate-drop="shouldAnimateDrop"
      drag-on-point="lt"
    >
      <Draggable
        v-for="item in items"
        :key="item.id"
        class="draggable"
        :style="{ left: item.x + 'px', top: item.y + 'px' }"
      >
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
  name: "Simple",

  components: { Container, Draggable },

  data() {
    return {
      items: generateItems(6, i => ({
        id: i,
        data: "Draggable " + i,
        x: i * 50,
        y: i * 50
      })),
      verticalGuidelines: [],
      horizontalGuidelines: []
    };
  },

  methods: {
    shouldAnimateDrop() {
      return false;
    },
    onDrop(dropResult) {
      console.log(dropResult);
      this.items = applyDrag(this.items, dropResult);
    },
    getGhostParent() {
      return document.body;
    }
  }
};
</script>

<style lang="css" scoped>
.simple-page {
  border: 1px solid #000;
}
.container {
  height: 500px;
}
.draggable {
  position: absolute;
  margin: 0;
}
</style>
