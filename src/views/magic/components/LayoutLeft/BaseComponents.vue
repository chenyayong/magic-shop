<template>
  <div class="base-components">
    <draggable class="grid-list" :list="compontents" :clone="clone" :group="group" :sort="false">
      <div class="grid-item" v-for="item in compontents" :key="item.name">
        <div><i :class="[item.icon]"></i></div>
        <div>{{ item.label }}</div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Vue, Component } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { uuid } from '@/utils/index'
import { namespace } from 'vuex-class'
import { IComponentData, IComponentsFormDataMap } from '@/store/magic/index'
import magicGrid from '@/components/magic-grid/index.vue'

const magic = namespace('magic')

@Component({
  name: 'base-components',
  components: {
    draggable,
    magicGrid
  }
})
export default class extends Vue {
  @magic.State('baseComponents') compontents!: IComponentData[]
  @magic.State('componentsFormDataMap') componentsFormDataMap!: IComponentsFormDataMap

  private group = {
    name: 'site',
    pull: 'clone',
    put: false
  }

  clone(value: IComponentData) {
    const name = value.name
    const element = this.componentsFormDataMap[name]
    value = cloneDeep(value)
    value.id = uuid()
    value.data = cloneDeep(element) as any
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
