<template>
  <div class="grid-table component-setting">
    <el-row class="block">
      <el-col>列数</el-col>
      <el-col><el-slider v-model="col" :min="1" :max="10" show-input></el-slider></el-col>
    </el-row>
    <el-row class="block">
      <el-col>行数</el-col>
      <el-col><el-slider v-model="row" :min="1" :max="10" show-input></el-slider></el-col>
    </el-row>
    <el-row class="block">
      <el-col>高度比例</el-col>
      <el-col
        ><el-slider v-model="scale" :min="0.5" :step="0.5" :max="2" show-input></el-slider
      ></el-col>
    </el-row>
    <div class="grid" ref="grid" :style="setGridStyle">
      <div
        :style="setCellStyle(item)"
        class="cell"
        :data-id="item.id"
        :class="[item.filter ? 'cell-filter' : 'cell-cancel']"
        v-for="(item, index) in data"
        :key="item.id"
      >
        <div class="cell-sub">{{ index + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { IMagicPictureGroupItem } from '@/store/magic/magic-picture-group'
import { uuid } from '@/utils/index'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.min.css'

@Component({
  name: 'layoutTable'
})
export default class extends Vue {
  private offsetWidth = 0
  private row = 3
  private col = 3
  private scale = 1
  private data: IMagicPictureGroupItem[] = []

  get cellWidth() {
    const value = Math.floor(this.offsetWidth / this.col)
    return value
  }

  get cellHeight() {
    const value = this.cellWidth * this.scale
    return value
  }

  get setGridStyle() {
    const style = {
      height: this.row * this.cellHeight + 'px'
    }
    return style
  }

  get cellsData() {
    const data = []
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        const temp = {
          id: uuid(),
          size: '1:1',
          position: `${j}:${i}`,
          imgUrl: '',
          imgLink: '',
          filter: true
        }
        data.push(temp)
      }
    }
    return data
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
      top: top + 'px'
      // padding: this.data.padding + 'px'
    }
    return style
  }

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    let data = {
      id: '',
      size: '1:1',
      position: '0,0',
      imgUrl: '',
      imgLink: '',
      filter: false
    }
    this.offsetWidth = (this.$refs.grid as any).offsetWidth
    this.data = this.cellsData
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
          imgUrl: '',
          imgLink: '',
          filter: false
        }
        console.log('selecting', data.position)
      },
      start: function() {
        // const top = Math.floor(event.toElement.offsetParent.offsetTop / that.cellHeight)
        // const left = Math.floor(event.toElement.offsetParent.offsetLeft / that.cellWidth)
        // const selectedElements = $('.ui-selecting', this).toArray()
        // const element = selectedElements[0]
        // console.log('start', selectedElements)
        // const left = Math.floor(element.offsetLeft / that.cellWidth)
        // const top = Math.floor(element.offsetTop / that.cellHeight)
        // data = {
        //   position: `${left}:${top}`,
        //   id: uuid(),
        //   size: '1:1',
        //   imgUrl: '',
        //   imgLink: '',
        //   filter: false
        // }
      },
      stop: function() {
        const selectedElements = $('.ui-selected', this).toArray()
        const element = selectedElements[selectedElements.length - 1]
        const width = Math.floor(element.offsetLeft / that.cellWidth) + 1
        const height = Math.floor(element.offsetTop / that.cellHeight) + 1
        const selectedIds = selectedElements.map((e) => $(e).data('id'))
        const addIndex = that.data.findIndex((e) => e.id === selectedIds[0])
        data.size = `${width}:${height}`
        // that.data.splice(addIndex, 0, data)
        // that.data = that.data.filter((e) => {
        //   return !selectedIds.includes(e.id)
        // })
        console.log('stop', data.size, element, element.offsetLeft, element.offsetTop)
      }
    })
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
    background-color: $--background-color-base;
    height: 100px;
    width: 100px;
    box-shadow: $--box-shadow-base;
    position: absolute;
    &.ui-selected {
      background-color: $--color-primary-light-5;
    }
    .cell-sub {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
