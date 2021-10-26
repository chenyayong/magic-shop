<template>
  <div class="layout-4" ref="layout" :style="setGridStyle">
    <div class="layout-absolute flex-center" :style="setItemStyle(item)" v-for="(item, index) in layoutData.items" :key="index">{{ scaleTips(item) }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'layout2'
})
export default class extends Vue {
  private offsetWidth = 0
  private layoutData = {
    padding: 0,
    scale: 1,
    col: 2,
    row: 2,
    items: [
      {
        size: '1:1',
        position: '0:0'
      },
      {
        size: '1:1',
        position: '1:0'
      },
      {
        size: '1:1',
        position: '0:1'
      },
      {
        size: '1:1',
        position: '1:1'
      }
    ]
  }

  get cellWidth() {
    const value = Math.floor(this.offsetWidth / this.layoutData.col)
    return value
  }

  get cellHeight() {
    const value = this.cellWidth * this.layoutData.scale
    return value
  }

  get setGridStyle() {
    const style = {
      height: this.layoutData.row * this.cellHeight + 'px'
    }
    return style
  }

  scaleTips(item: any) {
    const size = item.size.split(':').map((e: string) => parseInt(e))
    const value = 375
    return `${size[0] * value}x${size[1] * value}像素或${item.size}比例 `
  }

  setItemStyle(item: any) {
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
      top: top + 'px'
    }
    return style
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
.layout-absolute {
  position: absolute;
  border: 1px $--border-color-lighter solid;
}

.layout-4 {
  position: relative;
  margin-top: 20px;
  width: 100%;
  font-size: 12px;
}
</style>
