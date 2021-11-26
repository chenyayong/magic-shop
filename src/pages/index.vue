<template>
  <div class="app">
    <el-scrollbar>
      <transition mode="out-in" name="slide-fade">
        <keep-alive>
          <router-view class="page-background"></router-view>
        </keep-alive>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Pages'
})
export default class extends Vue {}
</script>
<style scoped lang="scss">
.page-background {
  background-color: #fff;
}
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

  ::v-deep .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}
</style>
