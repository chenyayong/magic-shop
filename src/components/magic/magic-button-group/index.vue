<template>
  <div class="magic-button-group" :style="style">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in gridItems" :key="index">
        <grid :border="false" :column-num="componentData.data.rowButtonCount">
          <grid-item
            v-for="(item, index) in componentData.data.items"
            :key="index"
            :text="item.imgLabel"
          >
            <div class="button-group__image" slot="icon" :style="imgStyle">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt=""
                srcset=""
              />
            </div>
            <div class="button-group__text" slot="text" :style="textStyle">
              {{ item.imgLabel }}
            </div>
          </grid-item>
        </grid>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Grid from 'vant/lib/grid'
import GridItem from 'vant/lib/grid-item'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
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

  get gridItems() {
    const items = this.componentData.data?.items
    const rowSwiper = this.componentData.data?.rowSwiper as number
    const buttonRound = this.componentData.data?.buttonRound as number
    const count = rowSwiper * buttonRound

    if (this.componentData.data?.swiper) {
      // items = items?.map(() => {})
    }
    return items
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

  @Watch('componentData.data.swiper', { immediate: true })
  changeSwiper(value: number) {
    this.$nextTick(() => {
      if (value === 0) {
        this.swiper.disable()
      } else if (value === 1) {
        this.swiper.enable()
      }
    })
  }

  destroyed() {
    this.swiper.destroy()
  }

  mounted() {
    console.log('mounted', this.componentData)
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
