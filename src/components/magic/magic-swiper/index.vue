<template>
  <div class="magic-swiper" :style="style">
    <swiper :options="swiperOptions" :auto-update="true" :auto-destroy="true">
      <swiper-slide
        class="swiper-no-swiping"
        v-for="(item, index) in componentData.data.items"
        :key="index"
      >
        <el-skeleton style="width: 100%;" :loading="!item.img_url">
          <template slot="template">
            <div><el-skeleton-item variant="image" style="height: 160px;" /></div>
          </template>
          <img :src="item.img_url" alt="" srcset="" />
        </el-skeleton>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSwiperComponent } from '@/store/magic/magic-swiper'
@Component({
  name: 'magic_swiper',
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSwiperComponent
  private swiperOptions = {
    autoplay: true,
    noSwiping: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

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
