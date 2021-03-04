<template>
  <div
    style="display: flex; justify-content: stretch; margin-top: 50px; margin-right: 50px"
  >
    <div style="margin-left: 50px; flex: 1">
      <Container
        behaviour="copy"
        group-name="1"
        :get-child-payload="getChildPayload1"
        style="width: 300px; height: 300px;"
      >
        <Draggable v-for="item in items1" :key="item.id">
          <div class="draggable-item">
            {{ item.data }}
          </div>
        </Draggable>
      </Container>
    </div>
    <div style="margin-left: 50px; flex: 1">
      <Container
        group-name="1"
        :get-child-payload="getChildPayload2"
        :should-animate-drop="() => false"
        @drop="onDrop('items2', $event)"
        behaviour="drop-zone"
        style="width: 500px; height: 500px; background: #fff;"
      >
        <Draggable v-for="item in items2" :key="item.id" style="position: absolute;" :style="{ left: item.x + 'px', top: item.y + 'px'}">
          <div class="draggable-item">
            {{ item.data }}
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "@fk/fai-dnd-vue";
import { applyDrag, generateItems } from "../utils/helpers";

function getRandomByRange(start, end) {
  return start + Math.floor((end - start) * Math.random());
}

export default {
  name: "Position",

  components: { Container, Draggable },

  data() {
    return {
      items1: generateItems(5, i => ({
        id: "1" + i,
        data: `Source Draggable - ${i}`,
        action: 'add'
      })),
      items2: generateItems(3, i => ({
        id: "2" + i,
        data: `Draggable 2 - ${i}`,
        x: getRandomByRange(0, 300),
        y: getRandomByRange(0, 300)
      }))
    };
  },

  methods: {
    onDrop(collection, dropResult) {
      console.log(dropResult);
      this[collection] = applyDrag(this[collection], dropResult);
    },

    getChildPayload1(index) {
      const payload = this.items1[index];
      return this.items1[index];
    },

    getChildPayload2(index) {
      return this.items2[index];
    },

    getChildPayload3(index) {
      return this.items3[index];
    }
  }
};
</script>
