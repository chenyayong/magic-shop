<template>
  <el-tooltip effect="dark" :content="component.label" placement="left-start">
    <el-tooltip placement="right-start">
      <template v-slot:content>
        <i class="el-icon-delete component-delete-icon" @click="deleComponent(component.id)"></i>
      </template>
      <div
        class="drag-component"
        v-if="component.name !== 'magic_tabbar'"
        :class="[index === componentsFormDataIndex ? 'active' : '']"
        @click="changeActive(index)"
        :style="searchComponentStyle"
      >
        <component :is="component.name" :component-data="component"></component>
      </div>
    </el-tooltip>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

interface iComponents {
  [key: string]: any
}

const magic = namespace('magic')
const magicAsidebar = namespace('magicAsidebar')
const files = require.context('@/components/magic/', true, /index\.vue$/)
const components = files.keys().reduce((ret: iComponents, file: string) => {
  const component = files(file).default
  const name = component.extendOptions.name
  ret[name] = component
  return ret
}, {})

@Component({
  name: 'DragComponent',
  components: {
    ...components
  }
})
export default class extends Vue {
  @Prop({ type: Object }) component!: iComponents
  @Prop({ type: Number }) index!: number
  @magic.State('componentsFormDataIndex') componentsFormDataIndex!: number
  @magic.Mutation('SET_COMPONENTS_FORM_DATA_INDEX') SET_COMPONENTS_FORM_DATA_INDEX!: (
    index?: number
  ) => void

  @magicAsidebar.Mutation('SET_ASIDEBAR_DATA_INDEX') SET_ASIDEBAR_DATA_INDEX!: (
    index: number
  ) => void

  @magic.Mutation('DELE_COMPONENTS_FORM_DATA') DELE_COMPONENTS_FORM_DATA!: (id: string) => void

  get searchComponentStyle() {
    let style = {
      // height: 34 + paddingTop + paddingBottom + 'px'
    }
    if (this.component.name === 'magic_search') {
      const paddingTop = this.component.data.padding_top
      const paddingBottom = this.component.data.padding_bottom
      style = {
        height: 34 + paddingTop + paddingBottom + 'px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
      }
    }
    return style
  }

  changeActive(index: number) {
    this.SET_COMPONENTS_FORM_DATA_INDEX(index)
    this.SET_ASIDEBAR_DATA_INDEX(1)
    // const href = this.$router.resolve({ path: '/magic', query: { id: 2 } })
    // console.log(href)
    // window.open(href.href, '_blank')
  }

  deleComponent(id: string) {
    this.DELE_COMPONENTS_FORM_DATA(id)
  }
}
</script>
<style lang="scss" scoped>
.component-delete-icon {
  font-size: 18px;
  cursor: pointer;
}
.drag-component {
  position: relative;
  [class*='magic-'] {
    pointer-events: none;
  }
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
    border: 2px solid $--color-primary;
    box-shadow: none;
    pointer-events: none;
    z-index: 1000;
  }
}
</style>
