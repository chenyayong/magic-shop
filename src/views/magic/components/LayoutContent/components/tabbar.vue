<template>
  <div
    class="tabbar-component drag-component"
    :class="[index === componentsFormDataIndex ? 'active' : '']"
    @click="changeActive(index)"
  >
    <el-tooltip effect="dark" :content="component.label" placement="left-start">
      <el-tooltip placement="right-start">
        <template v-slot:content>
          <i class="el-icon-delete component-delete-icon" @click="deleComponent(component.id)"></i>
        </template>
        <magic_tabbar :component-data="component"></magic_tabbar>
      </el-tooltip>
    </el-tooltip>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import magic_tabbar from '@/components/magic/magic-tabbar/index.vue'
import { IMagicTabbarComponent } from '@/store/magic/magic-tabbar'
import { namespace } from 'vuex-class'
const magic = namespace('magic')
const magicAsidebar = namespace('magicAsidebar')
@Component({
  name: 'tabbar',
  components: {
    magic_tabbar
  }
})
export default class extends Vue {
  @Prop({ type: Object }) component!: IMagicTabbarComponent
  @Prop({ type: Number }) index!: number
  @magic.Mutation('DELE_COMPONENTS_FORM_DATA') DELE_COMPONENTS_FORM_DATA!: (id: string) => void
  @magic.State('componentsFormDataIndex') componentsFormDataIndex!: number
  @magic.Mutation('SET_COMPONENTS_FORM_DATA_INDEX') SET_COMPONENTS_FORM_DATA_INDEX!: (
    index?: number
  ) => void

  @magicAsidebar.Mutation('SET_ASIDEBAR_DATA_INDEX') SET_ASIDEBAR_DATA_INDEX!: (
    index: number
  ) => void

  changeActive(index: number) {
    this.SET_COMPONENTS_FORM_DATA_INDEX(index)
    this.SET_ASIDEBAR_DATA_INDEX(1)
  }

  deleComponent(id: string) {
    this.DELE_COMPONENTS_FORM_DATA(id)
    // console.log('deleComponent', id)
  }
}
</script>
<style lang="scss" scoped>
.tabbar-component {
  position: fixed !important;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 99;
  box-shadow: 0 0 6px #ddd;
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
