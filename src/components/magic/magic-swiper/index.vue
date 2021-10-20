<template>
  <!-- <el-tooltip class="magic-swiper" content="轮播图" placement="left-start" :value="true" :manual="true" :popper-options="{ boundariesElement: 'body', gpuAcceleration: false }">
    <el-skeleton :loading="loading">
      <template slot="template">
        <el-skeleton-item variant="image" style="height: 160px;" />
      </template>
      <el-carousel height="160px" arrow="never" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-skeleton>
  </el-tooltip> -->
  <el-skeleton class="magic-swiper" :loading="loading">
    <template slot="template">
      <el-skeleton-item variant="image" style="height: 160px;" />
    </template>
    <swiper :options="swiperOptions" :auto-update="true" :auto-destroy="true">
      <swiper-slide v-for="(item, index) in componentData.data.items" :key="index">
        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" srcset="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
  </el-skeleton>
</template>
<script lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
@Component({
  name: 'magicSwiper',
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  private swiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

  private loading = true
  mounted() {
    this.loading = false
    // console.log(Swiper)
  }
}
</script>
<style scoped lang="scss">
.magic-swiper ::v-deep .swiper-slide img {
  width: 100%;
  height: auto;
}
</style>
