<template>
  <div class="grid-cell" ref="layout" :style="setGridStyle">
    <div class="cell" :class="[itemIndex === index ? 'active' : '']" @click="selectCell(index)" :style="setItemStyle(item)" v-for="(item, index) in data.items" :key="index">
      <div class="cell-sub" :style="{ 'background-image': `url(${item.imgUrl})` }"></div>
      <span class="cell-tips">{{ scaleTips(item) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicPictureGroup, IMagicPictureGroupItem } from '@/store/magic/magic-picture-group'

@Component({
  name: 'gridCell'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) data!: IMagicPictureGroup
  @Prop({ type: Number, default: 0 }) itemIndex!: number
  private offsetWidth = 0
  // private itemIndex = 0

  get cellWidth() {
    const value = Math.floor(this.offsetWidth / this.data.col)
    return value
  }

  get cellHeight() {
    const value = this.cellWidth * this.data.scale
    return value
  }

  get setGridStyle() {
    const style = {
      height: this.data.row * this.cellHeight + 'px'
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
      padding: this.data.padding + 'px'
    }
    return style
  }

  selectCell(index: number) {
    this.$emit('update:itemIndex', index)
    // this.itemIndex = index
    // this.data.items[this.itemIndex].imgUrl = this.imgUrl
  }

  mounted() {
    this.offsetWidth = (this.$refs.layout as any).offsetWidth
  }
}
</script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell {
  position: absolute;
  border: 1px $--border-color-lighter solid;
  cursor: pointer;
  color: $--color-info;
  box-sizing: border-box;
  &.active {
    background-color: $--color-primary-light-5;
    color: $--color-danger;
    box-shadow: $--box-shadow-dark;
  }
  .cell-sub {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .cell-tips {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
}

.grid-cell {
  position: relative;
  margin-top: 20px;
  width: 100%;
  font-size: 12px;
}
</style>
