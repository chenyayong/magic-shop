<template>
  <div class="layout-right">
    <LayoutAside @change="switchChange" />
    <transition name="slide-fade" mode="out-in">
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LayoutAside from './LayoutAside/index.vue'
import LayoutSetting from './LayoutSetting/index.vue'
import LayoutEdit from './LayoutEdit/index.vue'
@Component({
  name: 'LayoutRight',
  components: { LayoutAside, LayoutSetting, LayoutEdit }
})
export default class extends Vue {
  private components = ['LayoutSetting', 'LayoutEdit']
  private currentComponent = 'LayoutSetting'
  switchChange(item: any, index: number) {
    this.currentComponent = this.components[index]
  }
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
.layout-right {
  position: fixed;
  width: 280px;
  right: 0;
  top: 50px;
  bottom: 0px;
  background: $--color-white;
  box-sizing: border-box;
  padding: 10px;
}
</style>
