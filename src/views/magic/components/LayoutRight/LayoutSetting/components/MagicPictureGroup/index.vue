<template>
  <div class="magic-picture-group-setting component-setting">
    <h4>图片组合组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row type="flex" class="block">
            <el-col :span="8">背景颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.background"></el-color-picker></el-col>
          </el-row>
          <el-row class="block">
            <el-col>图片间距</el-col>
            <el-col><el-slider show-input v-model="componentData.data.padding"></el-slider></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="组合配置" name="2">
          <el-row>
            <el-row>魔方布局</el-row>
            <el-row>
              <el-col :span="6" v-for="(item, index) in gridNames" :key="index">
                <svg-icon @click.native="changeGridIndex(index)" :class="[gridIndex === index ? 'active' : '']" :name="item" width="50" height="50"></svg-icon>
              </el-col>
            </el-row>
            <el-row>
              <el-alert title="选定布局区域，在下方添加图片，建议添加比例一致的图片" type="info" show-icon :closable="false"></el-alert>
            </el-row>
            <el-row>
              <GridCell :itemIndex.sync="gridCellIndex" :data="gridData" />
              <div style="margin-top: 20px;">
                <magicSettingGrid :closable="false" v-for="(item, index) in magicSettingGrid" :item="item" :index="index" :key="index" :items="magicSettingGrid" />
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
// import layoutTable from './components/layout-table.vue'
@Component({
  name: 'magicPictureGroup',
  components: {
    GridCell,
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  private activeNames = ['1', '2']
  private gridCellIndex = 0
  private gridNames = ['layout-2', 'layout-3', 'layout-4', 'layout-table']
  private gridIndex = 0
  private gridsData = [
    {
      padding: 0,
      scale: 1,
      row: 1,
      col: 2,
      items: [
        {
          size: '1:1',
          position: '0:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:0',
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    {
      padding: 0,
      scale: 1,
      row: 2,
      col: 2,
      items: [
        {
          size: '1:2',
          position: '0:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:1',
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    {
      padding: 0,
      scale: 1,
      col: 2,
      row: 2,
      items: [
        {
          size: '1:1',
          position: '0:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '0:1',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:1',
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    {
      padding: 0,
      scale: 1,
      col: 2,
      row: 2,
      items: [
        {
          size: '1:1',
          position: '0:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:0',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '0:1',
          imgUrl: '',
          imgLink: ''
        },
        {
          size: '1:1',
          position: '1:1',
          imgUrl: '',
          imgLink: ''
        }
      ]
    }
  ]

  get gridData() {
    const data = this.gridsData[this.gridIndex]
    this.$set(this.componentData, 'data', data)
    // this.componentData.data = data as any
    return this.componentData.data
  }

  get magicSettingGrid() {
    const item = this.gridData.items[this.gridCellIndex]
    return [item]
  }

  changeGridIndex(index: number) {
    this.gridIndex = index
  }
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
