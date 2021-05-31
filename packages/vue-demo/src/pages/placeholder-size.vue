<template>
  <div class="simple-page">
    <Container
      @drop="onDrop"
      drag-class="opacity-ghost"
      drop-class="opacity-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
      :get-placeholder-size="getPlaceholderSize"
    >
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
  name: "DragClass",

  components: { Container, Draggable },

  data() {
    return {
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
    };
  },

  methods: {
    getPlaceholderSize() {
      return 100;
    },
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  }
};
</script>
