<template>
  <div class="shop-components">
    <!-- <magic-grid :data="compontents"></magic-grid> -->
    <draggable class="grid-list" :group="group">
      <div class="grid-item" v-for="item in compontents" :key="item.name">
        <div><i :class="[item.icon]"></i></div>
        <div>{{ item.name }}</div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Vue, Component } from 'vue-property-decorator'
import magicGrid from '@/components/magic-grid/index.vue'
@Component({
  name: 'shop-components',
  components: {
    draggable,
    magicGrid
  }
})
export default class extends Vue {
  private group = {
    name: 'site',
    pull: 'clone',
    put: false,
    sort: false
  }

  private compontents = []
}
</script>

<style scoped lang="scss">
.grid-list {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #eee;
  color: #5e6d82;
  overflow: hidden;
  padding: 0 !important;
}
.grid-item {
  flex-basis: calc(100% / 3);
  text-align: center;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  box-sizing: content-box;
  cursor: move;
  transition: all ease 0.3s;
  &:hover {
    background-color: $--color-primary;
    color: #fff;
  }
  i {
    font-size: 26px;
  }
}
</style>
