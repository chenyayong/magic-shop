<template>
  <div class="app">
    <el-scrollbar :style="scrollbarStyle">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
// import { IHome } from '@/store/pages/index'
const home = namespace('home')

@Component({
  name: 'Pages'
})
export default class extends Vue {
  @home.State('componentsData') componentsData!: any
  get scrollbarStyle() {
    const search = this.componentsData.find((e: any) => e.name === 'magic_search')
    const tabbar = this.componentsData.find((e: any) => e.name === 'magic_tabbar')
    const paddingTop = search ? 34 + search.data.padding_top + search.data.padding_bottom : 0
    const paddingBottom = tabbar ? 50 : 0
    const style = {
      paddingTop: paddingTop + 'px',
      paddingBottom: paddingBottom + 'px'
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
  top: 50%;
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
</style>
