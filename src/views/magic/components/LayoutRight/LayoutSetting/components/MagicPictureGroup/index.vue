<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="magic-picture-group-setting component-setting">
    <h4>图片组合组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row type="flex" class="block">
            <el-col :span="8">背景颜色</el-col>
            <el-col
              ><el-color-picker v-model="componentData.data.background"></el-color-picker
            ></el-col>
          </el-row>
          <el-row class="block">
            <el-col>图片间距</el-col>
            <el-col
              ><el-slider
                show-input
                :min="0"
                :max="30"
                v-model="componentData.data.padding"
              ></el-slider
            ></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="组合配置" name="2">
          <el-row>
            <el-row>魔方布局</el-row>
            <el-row>
              <el-col :span="6" v-for="(item, index) in gridsName" :key="index">
                <svg-icon
                  @click.native="changegridsIndex(index)"
                  :class="[componentData.data.gridsIndex === index ? 'active' : '']"
                  :name="item"
                  width="50"
                  height="50"
                ></svg-icon>
              </el-col>
            </el-row>
            <el-row>
              <el-alert
                title="选定布局区域，在下方添加图片，建议添加比例一致的图片"
                type="info"
                show-icon
                :closable="false"
              ></el-alert>
            </el-row>
            <el-row>
              <GridCell
                v-if="componentData.data.gridsIndex !== 3"
                :itemIndex.sync="gridCellIndex"
                :data="gridData"
              />
              <GridTable v-else :data="gridData" :itemIndex.sync="gridCellIndex" />
              <div style="margin-top: 20px;">
                <magicSettingGrid
                  :closable="false"
                  v-for="(item, index) in magicSettingGrid"
                  v-if="item"
                  :item="item"
                  :index="index"
                  :key="index"
                  :items="magicSettingGrid"
                />
              </div>
            </el-row>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
import GridCell from './components/GridCell.vue'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'
import GridTable from './components/GridTable.vue'
import { uuid } from '@/utils/index'
import { IMagicPictureGroup } from '@/store/magic/magic-picture-group'
@Component({
  name: 'magicPictureGroup',
  components: {
    GridCell,
    GridTable,
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  private activeNames = ['1', '2']
  private gridsCellIndex = [0, 0, 0, 0]
  private gridsName = ['layout-2', 'layout-3', 'layout-4', 'layout-table']
  // // private gridsIndex = this.componentData.data.gridsIndex as number
  private gridsData: IMagicPictureGroup[] = [
    {
      background: '',
      padding: 0,
      scale: 1,
      row: 1,
      col: 2,
      items: []
    },
    {
      background: '',
      padding: 0,
      scale: 1,
      row: 2,
      col: 2,
      items: []
    },
    {
      background: '',
      padding: 0,
      scale: 1,
      col: 2,
      row: 2,
      items: []
    },
    {
      background: '',
      padding: 0,
      scale: 1,
      col: 3,
      row: 3,
      items: []
    }
  ]

  get gridData() {
    const data = this.gridsData[this.componentData.data.gridsIndex as number]
    this.$set(this.componentData, 'data', data)
    // const data = this.componentData.data
    return data
  }

  get gridCellIndex() {
    return this.gridsCellIndex[this.componentData.data.gridsIndex as number]
  }

  set gridCellIndex(index: number) {
    this.$set(this.gridsCellIndex, this.componentData.data.gridsIndex as number, index)
  }

  get magicSettingGrid() {
    const item = this.gridData.items[this.gridCellIndex]
    return [item]
  }

  cellsData(col: number, row: number) {
    const data = []
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
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

  changegridsIndex(index: number) {
    // this.gridsIndex = index
    console.log(index)
    this.componentData.data.gridsIndex = index
  }
  // mounted() {
  //   // this.gridsData.forEach((e) => {
  //   //   e.items = this.cellsData(e.col, e.row)
  //   // })
  //   // this.gridsData[1].items = [
  //   //   {
  //   //     id: uuid(),
  //   //     size: '1:2',
  //   //     position: '0:0',
  //   //     imgUrl: '',
  //   //     imgLink: '',
  //   //     filter: true
  //   //   },
  //   //   {
  //   //     id: uuid(),
  //   //     size: '1:1',
  //   //     position: '1:0',
  //   //     imgUrl: '',
  //   //     imgLink: '',
  //   //     filter: true
  //   //   },
  //   //   {
  //   //     id: uuid(),
  //   //     size: '1:1',
  //   //     position: '1:1',
  //   //     imgUrl: '',
  //   //     imgLink: '',
  //   //     filter: true
  //   //   }
  //   // ]
  // }
}
</script>
<style scoped lang="scss">
.svg-icon {
  color: $--color-text-secondary;
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
  &.active {
    color: $--color-primary;
  }
}
</style>
