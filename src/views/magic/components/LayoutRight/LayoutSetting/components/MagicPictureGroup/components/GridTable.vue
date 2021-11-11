<template>
  <div class="grid-table component-setting">
    <el-row class="block">
      <el-col>列数</el-col>
      <el-col><el-slider v-model="data.col" :min="1" :max="10" show-input></el-slider></el-col>
    </el-row>
    <el-row class="block">
      <el-col>行数</el-col>
      <el-col><el-slider v-model="data.row" :min="1" :max="10" show-input></el-slider></el-col>
    </el-row>
    <el-row class="block">
      <el-col>高度比例</el-col>
      <el-col><el-slider v-model="data.scale" :min="0.5" :step="0.5" :max="2" show-input></el-slider></el-col>
    </el-row>
    <div class="grid" ref="grid" :style="setGridStyle">
      <div
        :style="setCellStyle(item)"
        class="cell"
        :data-id="item.id"
        :class="[item.filter ? 'cell-filter' : 'cell-cancel', itemIndex === index ? 'active' : '']"
        v-for="(item, index) in data.items"
        :key="item.id"
      >
        <div class="cell-sub" v-if="item.filter">
          <div class="cell-tips"><i class="el-icon-plus"></i></div>
        </div>
        <div class="cell-sub" :style="{ 'background-image': `url(${item.img_url})` }" @click="changeItemIndex(index)" v-else>
          <div class="cell-tips">{{ scaleTips(item) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { IMagicPictureGroupSub, IMagicPictureGroupItem, cellsData } from '@/store/magic/magic-picture-group'
import { uuid } from '@/utils/index'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.min.css'

@Component({
  name: 'gridTable'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) data!: IMagicPictureGroupSub
  @Prop({ type: Number }) padding!: number
  @Prop({ type: Number }) itemIndex!: number
  private offsetWidth = 0

  @Watch('data.col')
  changeCol(col: number) {
    this.data.items = cellsData(col, this.data.row)
  }

  @Watch('data.row')
  changeRow(row: number) {
    this.data.items = cellsData(this.data.col, row)
  }

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

  setCellStyle(item: IMagicPictureGroupItem) {
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
      padding: this.padding + 'px'
    }
    return style
  }

  scaleTips(item: IMagicPictureGroupItem) {
    const size = item.size.split(':').map((e: string) => parseInt(e))
    return `${size[0]}:${size[1] * this.data.scale}`
  }

  changeItemIndex(index: number) {
    this.$emit('update:itemIndex', index)
  }

  selectable() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    let data = {
      id: '',
      size: '1:1',
      position: '0,0',
      img_url: '',
      img_link: '',
      filter: false
    }
    ;($(this.$refs.grid) as any).selectable({
      cancel: '.cell-cancel',
      filter: '.cell-filter',
      selecting: function() {
        const selectedElements = $('.ui-selecting', this).toArray()
        const element = selectedElements[0]

        const left = Math.floor(element.offsetLeft / that.cellWidth)
        const top = Math.floor(element.offsetTop / that.cellHeight)
        data = {
          position: `${left}:${top}`,
          id: uuid(),
          size: '1:1',
          img_url: '',
          img_link: '',
          filter: false
        }
      },
      stop: function() {
        const selectedElements = $('.ui-selected', this).toArray()
        const element = selectedElements[selectedElements.length - 1]
        const position = data.position.split(':').map((e) => parseInt(e))
        const left = position[0]
        const right = position[1]
        const width = Math.floor(element.offsetLeft / that.cellWidth) + 1 - left
        const height = Math.floor(element.offsetTop / that.cellHeight) + 1 - right
        const selectedIds = selectedElements.map((e) => $(e).data('id'))
        const addIndex = that.data.items.findIndex((e) => e.id === selectedIds[0])
        data.size = `${width}:${height}`
        that.data.items.splice(addIndex, 0, data)
        that.data.items = that.data.items.filter((e) => {
          return !selectedIds.includes(e.id)
        })
      }
    })
  }

  mounted() {
    this.offsetWidth = (this.$refs.grid as any).offsetWidth
    this.selectable()
  }

  destroyed() {
    ;($(this.$refs.grid) as any).selectable('destroy')
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-top: 10px;
}
.grid-table {
  .grid {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    position: relative;
  }
  .cell {
    position: absolute;
    border: 1px $--border-color-lighter solid;
    cursor: pointer;
    color: $--color-info;
    box-sizing: border-box;
    &.cell-cancel.active {
      background-color: $--color-primary-light-5;
      color: $--color-danger;
      box-shadow: $--box-shadow-dark;
    }
    .cell-sub {
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .cell-tips {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      font-size: 12px;
    }
  }
}
</style>
