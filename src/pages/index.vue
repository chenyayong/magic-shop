<template>
  <div class="app">
    <el-scrollbar :style="scrollbarStyle">
      <keep-alive>
        <transition mode="out-in" name="slide-fade">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IComponentData } from '@/store/pages/home'
const home = namespace('home')

@Component({
  name: 'Pages'
})
export default class extends Vue {
  @home.State('componentsData') componentsData!: IComponentData[]
  get scrollbarStyle() {
    const search = this.componentsData.find((e) => e.name === 'magic_search')
    const tabbar = this.componentsData.find((e) => e.name === 'magic_tabbar')
    const paddingTop = search ? 34 + search.data.padding_top + search.data.padding_bottom : 0
    const paddingBottom = tabbar ? 50 : 0
    const home = this.$route.path.includes('home')
    let style
    if (home) {
      style = {
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px'
      }
    } else {
      style = {}
    }
    return style
  }
}
</script>
<style scoped lang="scss">
.app {
  box-sizing: border-box;
  height: 640px;
  width: 360px;
  background: #fafafa;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: #ebedf0 0 4px 12px;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: -50%;
  .el-scrollbar {
    height: 100%;
  }
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
