<template>
  <div class="layout-right">
    <LayoutAsidebar />
    <el-scrollbar class="scrollbar-wrapper">
      <transition name="slide-fade" mode="out-in">
        <component :is="currentComponent" class="component"></component>
      </transition>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import LayoutAsidebar from './LayoutAsidebar/index.vue'
import LayoutSetting from './LayoutSetting/index.vue'
import LayoutPage from './LayoutPage/index.vue'
const magicAsidebar = namespace('magicAsidebar')

@Component({
  name: 'LayoutRight',
  components: { LayoutAsidebar, LayoutSetting, LayoutPage }
})
export default class extends Vue {
  @magicAsidebar.State('asidebarDataIndex') index!: number
  private components = ['LayoutPage', 'LayoutSetting']
  get currentComponent() {
    return this.components[this.index]
  }
}
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: 100%;
}
.layout-right ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
.component {
  padding: 0 10px;
}
.layout-right {
  position: fixed;
  width: 280px;
  right: 0;
  top: 50px;
  bottom: 0px;
  background: $--color-white;
  box-sizing: border-box;
  // padding: 0 10px;
  // overflow: hidden;
  box-shadow: 0 0 0 0px rgb(192 197 205 / 80%);
  z-index: 0;
}
</style>
