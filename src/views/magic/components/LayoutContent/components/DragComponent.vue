<template>
  <el-tooltip effect="dark" :content="component.label" placement="left-start">
    <el-tooltip placement="right-start">
      <template v-slot:content>
        <i class="el-icon-delete component-delete-icon" @click="deleComponent(component.id)"></i>
      </template>
      <component
        v-if="component.name !== 'magic_tabbar'"
        @click.native="changeActive(index)"
        :class="[index === componentsFormDataIndex ? 'active' : '']"
        :is="component.name"
        :component-data="component"
      ></component>
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

  changeActive(index: number) {
    this.SET_COMPONENTS_FORM_DATA_INDEX(index)
    this.SET_ASIDEBAR_DATA_INDEX(1)
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
</style>
