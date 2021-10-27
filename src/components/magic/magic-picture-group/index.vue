<template>
  <div class="magic-picture-group" ref="magic" :style="setGridStyle">
    <div class="absolute" :style="setItemStyle(item)" v-for="(item, index) in componentData.data.items" :key="index"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
import { IMagicPictureGroupItem } from '@/store/magic/magic-picture-group'

@Component({
  name: 'magicPictureGroup'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  // private data = this.componentData.data
  private offsetWidth = 0

  get cellWidth() {
    const value = Math.floor(this.offsetWidth / this.componentData.data.col)
    return value
  }

  get cellHeight() {
    const value = this.cellWidth * this.componentData.data.scale
    return value
  }

  get setGridStyle() {
    const style = {
      height: this.componentData.data.row * this.cellHeight + 'px'
    }
    return style
  }

  scaleTips(item: IMagicPictureGroupItem) {
    const size = item.size.split(':').map((e: string) => parseInt(e))
    const value = 375
    return `${size[0] * value}x${size[1] * value}像素或${item.size}比例 `
  }

  setItemStyle(item: IMagicPictureGroupItem) {
    const position = item.position.split(':').map((e: string) => parseInt(e))
    const size = item.size.split(':').map((e: string) => parseInt(e))
    const width = size[0] * this.cellWidth
    const height = size[1] * this.cellHeight
    const left = position[0] * this.cellWidth
    const top = position[1] * this.cellHeight
    const style = {
      width: width + 'px',
      height: height + 'px',
      left: left + 'px',
      top: top + 'px',
      backgroundImage: `url(${item.imgUrl})`
    }
    return style
  }

  mounted() {
    this.offsetWidth = (this.$refs.magic as any).offsetWidth
  }
}
</script>
<style scoped lang="scss">
.absolute {
  position: absolute;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
