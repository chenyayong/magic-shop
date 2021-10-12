<template>
  <div class="layout-right">
    <LayoutAside />
    <transition name="slide-fade" mode="out-in">
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import LayoutAside from './LayoutAside/index.vue'
import LayoutSetting from './LayoutSetting/index.vue'
import LayoutPage from './LayoutPage/index.vue'
const magic = namespace('magic')

@Component({
  name: 'LayoutRight',
  components: { LayoutAside, LayoutSetting, LayoutPage }
})
export default class extends Vue {
  @magic.State('componentsSettingCurrentItem') index!: number
  private components = ['LayoutPage', 'LayoutSetting']
  get currentComponent() {
    return this.components[this.index]
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
