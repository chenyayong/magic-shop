<template>
  <div class="magic-tabbar filter-item" :style="style">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSwiperComponent } from '@/store/magic/magic-swiper'
import { Tabbar, TabbarItem } from 'vant'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
Vue.use(Tabbar)
Vue.use(TabbarItem)
@Component({
  name: 'magic_tabbar'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSwiperComponent
  private active = 2

  get style() {
    const style = {
      padding: this.componentData.data.padding + 'px'
    }
    return style
  }
}
</script>
<style scoped lang="scss">
.magic-tabbar {
  position: fixed !important;
  bottom: 0;
  // top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 99;
}
</style>
