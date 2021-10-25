<template>
  <div class="layout-4">
    <div class="layout-left">
      <div class="left-top flex-center">{{ labelTips }}</div>
      <div class="left-bottom flex-center">{{ labelTips }}</div>
    </div>
    <div class="layout-right">
      <div class="right-top flex-center">{{ labelTips }}</div>
      <div class="right-bottom flex-center">{{ labelTips }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'layout3'
})
export default class extends Vue {
  private labelTips = '375 x 375 像素或同等比例'
}
</script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-4 {
  width: 0;
  padding: 0;
  position: relative;
  margin-top: 20px;
  padding-top: 100%;
  padding-left: 100%;
  font-size: 12px;
  .layout-left {
    position: absolute;
    border: 1px $--border-color-lighter solid;
    height: 100%;
    width: 50%;
    left: 0;
    top: 0;
    .left-top {
      border: 1px $--border-color-lighter solid;
      position: absolute;
      height: 50%;
      width: 100%;
      left: 0;
      top: 0;
    }
    .left-bottom {
      border: 1px $--border-color-lighter solid;
      position: absolute;
      height: 50%;
      width: 100%;
      left: 0;
      bottom: 0;
    }
  }
  .layout-right {
    position: absolute;
    border: 1px $--border-color-lighter solid;
    height: 100%;
    width: 50%;
    right: 0;
    top: 0;
    .right-top {
      border: 1px $--border-color-lighter solid;
      position: absolute;
      height: 50%;
      width: 100%;
      left: 0;
      top: 0;
    }
    .right-bottom {
      border: 1px $--border-color-lighter solid;
      position: absolute;
      height: 50%;
      width: 100%;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
