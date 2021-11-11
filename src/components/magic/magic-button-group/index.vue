<template>
  <div class="magic-button-group" :style="style">
    <swiper :auto-update="true" :auto-destroy="true" v-if="componentData.data.swiper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
        <MagicGrid :component-data="componentData" :items="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <MagicGrid v-else :component-data="componentData" :items="componentData.data.items" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import MagicGrid from './components/MagicGrid.vue'
import { IMagicButtonGroupComponent } from '@/store/magic/magic-button-group'

@Component({
  name: 'magic_button_group',
  components: {
    MagicGrid,
    Swiper,
    SwiperSlide
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicButtonGroupComponent

  private swiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

  get swiperSlides() {
    let result = []
    const items = this.componentData.data.items
    const length = items.length
    const rowSwiper = this.componentData.data.row_swiper as number
    const rowButtonCount = this.componentData.data.row_button_count as number
    const swiperCount = rowSwiper * rowButtonCount
    let page = 1
    if (this.componentData.data.swiper) {
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
      paddingTop: this.componentData.data.padding_top + 'px',
      paddingBottom: this.componentData.data.padding_bottom + 'px',
      background: this.componentData.data.background
    }
    return style
  }

  get swiper() {
    return (this.$refs.mySwiper as any).$swiper
  }
}
</script>
<style scoped lang="scss"></style>
