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
    <swiper :slides-per-view="3" :space-between="50">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
  </el-skeleton>
</template>
<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
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
  private loading = true
  mounted() {
    this.loading = false
  }
}
</script>
<style scoped lang="scss">
.magic-swiper ::v-deep .el-carousel__item img {
  width: 100%;
  height: auto;
}
.magic-swiper ::v-deep .el-carousel__indicators {
  position: absolute;
}
</style>
