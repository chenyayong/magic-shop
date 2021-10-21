<template>
  <div class="layout-content">
    <div class="content-main">
      <el-scrollbar>
        <draggable class="draggable" :group="group" :sort="true" :list="componentsFormData" @change="draggableChange">
          <template v-if="componentsFormData.length">
            <component
              @click.native="changeActive(index)"
              v-for="(item, index) in componentsFormData"
              :class="[item.active ? 'active' : '']"
              :is="item.name"
              :key="item.id"
              :componentData="item"
            ></component>
          </template>
          <template v-else>
            <el-empty>
              <div class="empty-description">
                <p>哎哟，您还没有放置组件哦~~</p>
                <p>赶紧拖动组件到这里设置吧</p>
              </div>
            </el-empty>
          </template>
        </draggable>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import draggable from 'vuedraggable'
import { IComponentData } from '@/store/magic'

const magic = namespace('magic')
const magicAsidebar = namespace('magicAsidebar')

interface iComponents {
  [key: string]: Vue
}
interface draggableElement {
  added: {
    element: IComponentData
    newIndex: number
  }
}

const files = require.context('@/components/magic/', true, /index\.vue$/)
const components = files.keys().reduce((ret: iComponents, file: string): iComponents => {
  const component = files(file).default
  const name = component.extendOptions.name
  ret[name] = component
  return ret
}, {})

@Component({
  name: 'LayoutContent',
  components: {
    ...components,
    draggable
  }
})
export default class extends Vue {
  @magic.State('componentsFormData') componentsFormData!: IComponentData[]
  @magic.Mutation('RESET_ACTION_COMPONENTS_FORM_DATA') RESET_ACTION_COMPONENTS_FORM_DATA!: (index?: number) => void
  @magicAsidebar.Mutation('SET_ASIDEBAR_DATA_INDEX') SET_ASIDEBAR_DATA_INDEX!: (index: number) => void
  private group = {
    name: 'site',
    pull: false,
    put: true
  }

  @Watch('componentsFormData', { immediate: true, deep: true })
  changeCompontents(val: IComponentData[]) {
    console.log('componentsFormData', val)
  }

  draggableChange(value: draggableElement) {
    const index = value.added.newIndex
    this.RESET_ACTION_COMPONENTS_FORM_DATA(index)
    this.SET_ASIDEBAR_DATA_INDEX(1)
  }

  changeActive(index: number) {
    this.RESET_ACTION_COMPONENTS_FORM_DATA(index)
  }
}
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: 100%;
}
.layout-content ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
  .el-scrollbar__view {
    height: 100%;
  }
}
.draggable {
  height: 100%;
  width: 100%;
}
.layout-content {
  position: fixed;
  left: 280px;
  right: 280px;
  top: 50px;
  bottom: 0px;
  box-sizing: border-box;
  overflow: hidden;
}
.content-main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 375px;
  height: 667px;
  background: #fff;
  box-shadow: -10px 20px 30px 0px rgb(192 197 205 / 80%);
}
.empty-description {
  font-size: 14px;
  color: $--color-primary;
  p {
    text-align: left;
  }
}

.draggable > ::v-deep [class*='magic-'] {
  position: relative;
  &:hover::after {
    position: absolute;
    content: ' ';
    left: 2px;
    bottom: 2px;
    top: 2px;
    right: 2px;
    box-shadow: 0 0 10px $--color-primary;
    pointer-events: none;
    z-index: 1000;
  }
  &.active::after {
    position: absolute;
    content: ' ';
    left: 0px;
    bottom: 0px;
    top: 0px;
    right: 0px;
    border: 2px dashed $--color-primary;
    box-shadow: none;
    pointer-events: none;
    z-index: 1000;
  }
}
</style>
