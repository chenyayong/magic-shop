<template>
  <div class="magic-picture-group" ref="magic" :style="setGridStyle">
    <div class="cell" :style="setItemStyle(item)" v-for="(item, index) in gridData.items" :key="index">
      <el-skeleton class="cell-sub" :loading="!item.imgUrl">
        <template slot="template">
          <el-skeleton-item variant="image" class="cell-img" />
        </template>
        <template>
          <div class="cell-img" :style="{ 'background-image': `url(${item.imgUrl})` }"></div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicPictureGroupItem, IMagicPictureGroupComponent } from '@/store/magic/magic-picture-group'

@Component({
  name: 'magicPictureGroup'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicPictureGroupComponent
  // private data = this.componentData.data
  private offsetWidth = 0

  get gridData() {
    return this.componentData.data.gridsData[this.componentData.data.gridsIndex]
  }

  get cellWidth() {
    const value = Math.floor(this.offsetWidth / this.gridData.col)
    return value
  }

  get cellHeight() {
    const value = this.cellWidth * this.gridData.scale
    return value
  }

  get setGridStyle() {
    const style = {
      height: this.gridData.row * this.cellHeight + 'px',
      backgroundColor: this.componentData.data.background
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
      padding: this.componentData.data.padding + 'px'
    }
    return style
  }

  mounted() {
    this.offsetWidth = (this.$refs.magic as any).offsetWidth
  }
}
</script>
<style scoped lang="scss">
.magic-picture-group ::v-deep .el-skeleton {
  height: 100%;
}
.magic-picture-group ::v-deep .cell-img {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.cell {
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .cell-sub {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
