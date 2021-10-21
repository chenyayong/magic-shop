<template>
  <div class="magic-button-group" :style="style">
    <swiper v-if="componentData.data.swiper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
        <grid :border="false" :column-num="componentData.data.rowButtonCount">
          <grid-item v-for="(e, i) in item" :key="i" :text="e.imgLabel">
            <el-skeleton>
              <template slot="template">
                <el-skeleton-item variant="image" :style="imgStyle" />
                <div style="margin-top: 10px;display: flex; justify-content: center;">
                  <el-skeleton-item variant="h3" style="width: 70%;" />
                </div>
              </template>
              <template>
                <div class="button-group__image" slot="icon" :style="imgStyle">
                  <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" srcset="" />
                </div>
                <div class="button-group__text" slot="text" :style="textStyle">
                  {{ e.imgLabel }}
                </div>
              </template>
            </el-skeleton>
          </grid-item>
        </grid>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <grid v-else :border="false" :column-num="componentData.data.rowButtonCount">
      <grid-item v-for="(e, i) in componentData.data.items" :key="i" :text="e.imgLabel">
        <el-skeleton>
          <template slot="template">
            <el-skeleton-item variant="image" :style="imgStyle" />
            <div style="margin-top: 10px;display: flex; justify-content: center;">
              <el-skeleton-item variant="h3" style="width: 70%;" />
            </div>
          </template>
          <template>
            <div class="button-group__image" slot="icon" :style="imgStyle">
              <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" srcset="" />
            </div>
            <div class="button-group__text" slot="text" :style="textStyle">
              {{ e.imgLabel }}
            </div>
          </template>
        </el-skeleton>
      </grid-item>
    </grid>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Grid from 'vant/lib/grid'
import GridItem from 'vant/lib/grid-item'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import 'vant/lib/grid/style'
import 'vant/lib/grid-item/style'
import { IComponentData } from '@/store/magic/index'

@Component({
  name: 'magicButtonGroup',
  components: {
    Grid,
    GridItem,
    Swiper,
    SwiperSlide
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData

  private swiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

  get swiperSlides() {
    let result = []
    const items = this.componentData.data?.items as []
    const length = items.length
    const rowSwiper = this.componentData.data?.rowSwiper as number
    const rowButtonCount = this.componentData.data?.rowButtonCount as number
    const swiperCount = rowSwiper * rowButtonCount
    let page = 1
    if (this.componentData.data?.swiper) {
      page = Math.ceil(length / swiperCount)
      for (let i = 0; i < page; i++) {
        const start = i * rowButtonCount
        const end = (i + 1) * rowButtonCount
        const temp = items.slice(start, end)
        result.push(temp)
      }
    } else {
      result = [items]
    }
    return result
  }

  get style() {
    const style = {
      paddingTop: this.componentData.data?.paddingTop + 'px',
      paddingBottom: this.componentData.data?.paddingBottom + 'px',
      background: this.componentData.data?.background
    }
    return style
  }

  get imgStyle() {
    const style = {
      width: this.componentData.data?.buttonSize + 'px',
      height: this.componentData.data?.buttonSize + 'px',
      borderRadius: this.componentData.data?.buttonRound + 'px'
    }
    return style
  }

  get textStyle() {
    const style = {
      color: this.componentData.data?.textColor,
      fontSize: this.componentData.data?.textSize + 'px'
    }
    return style
  }

  get swiper() {
    return (this.$refs.mySwiper as any).$swiper
  }

  // @Watch('componentData.data.swiper', { immediate: true })
  // changeSwiper(value: number) {
  //   this.$nextTick(() => {
  //     if (value === 0) {
  //       this.swiper.disable()
  //     } else if (value === 1) {
  //       this.swiper.enable()
  //     }
  //   })
  // }

  destroyed() {
    this.swiper && this.swiper.destroy()
  }
}
</script>
<style scoped lang="scss">
.magic-button-group ::v-deep .van-grid-item {
  overflow: hidden;
}
.magic-button-group ::v-deep .van-grid-item__content {
  background-color: transparent;
  height: auto;
  padding: 10px;
}
.magic-button-group ::v-deep .el-skeleton__image svg {
  width: 60%;
  height: 60%;
}
.button-group__image {
  overflow: hidden;
}
.button-group__image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.button-group__text {
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: auto;
  text-align: center;
  color: #000;
  font-size: 12px;
}
</style>
