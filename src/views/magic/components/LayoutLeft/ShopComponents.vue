<template>
  <div class="shop-components">
    <draggable class="grid-list" :list="compontents" filter=".filter-item" :clone="clone" :group="group" :sort="false">
      <div class="grid-item" :class="filterClass(item)" v-for="item in compontents" :key="item.name">
        <div><i :class="[item.icon]"></i></div>
        <div>{{ item.label }}</div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Vue, Component } from 'vue-property-decorator'
import magicGrid from '@/components/magic-grid/index.vue'
import { uuid } from '@/utils/index'
import { cloneDeep } from 'lodash'
import { namespace } from 'vuex-class'
import { IComponent, IComponentsFormDataMap } from '@/store/magic/index'
const magic = namespace('magic')

@Component({
  name: 'shop-components',
  components: {
    draggable,
    magicGrid
  }
})
export default class extends Vue {
  @magic.State('shopComponents') compontents!: IComponent[]
  @magic.State('componentsFormDataMap') componentsFormDataMap!: IComponentsFormDataMap
  private filterComponents = ['magic_notice', 'magic_position', 'magic_backTop']
  private group = {
    name: 'site',
    pull: 'clone',
    put: false
  }

  filterClass(item: any) {
    const index = this.filterComponents.indexOf(item.name)
    return [index > -1 ? 'filter-item' : '']
  }

  clone(value: IComponent) {
    const name = value.name
    const element = this.componentsFormDataMap[name]
    value = cloneDeep(value)
    value.id = uuid()
    value.data = cloneDeep(element)
    return value
  }
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
  // margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  box-sizing: border-box;
  cursor: move;
  transition: all ease 0.3s;
  &:nth-child(3n) {
    border-right: none;
  }
  &:hover {
    background-color: $--color-primary;
    color: #fff;
  }
  i {
    font-size: 26px;
  }
}
.filter-item {
  background-color: #f4f4f5;
  cursor: auto;
  color: #bcbec2;
  &:hover {
    background-color: #f4f4f5;
    color: #bcbec2;
  }
  &::after {
    content: '开发中';
  }
}
</style>
