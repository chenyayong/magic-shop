<template>
  <div class="layout-2">
    <div class="layout-left">{{ labelTips }}</div>
    <div class="layout-right">{{ labelTips }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'layout2'
})
export default class extends Vue {
  private labelTips = '375 x 375 像素或同等比例'
}
</script>

<style scoped lang="scss">
.layout-2 {
  width: 0;
  padding: 0;
  position: relative;
  margin-top: 20px;
  padding-top: 50%;
  padding-left: 100%;
  font-size: 12px;
  .layout-left {
    position: absolute;
    border: 1px $--border-color-lighter solid;
    height: 100%;
    width: 50%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .layout-right {
    position: absolute;
    border: 1px $--border-color-lighter solid;
    height: 100%;
    width: 50%;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
