<template>
  <div class="magic-tabbar" :style="style">
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSwiperComponent } from '@/store/magic/magic-swiper'
import { Tab, Tabs } from 'vant'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
Vue.use(Tab)
Vue.use(Tabs)
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
.magic-swiper ::v-deep .swiper-slide img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
