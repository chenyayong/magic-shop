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
              <el-col :span="6">
                <svg-icon name="layout-2" width="50" height="50"></svg-icon>
              </el-col>
              <el-col :span="6">
                <svg-icon name="layout-3" width="50" height="50"></svg-icon>
              </el-col>
              <el-col :span="6">
                <svg-icon name="layout-4" width="50" height="50"></svg-icon>
              </el-col>
              <el-col :span="6">
                <svg-icon name="layout-table" width="50" height="50"></svg-icon>
              </el-col>
            </el-row>
            <el-row>
              <el-alert title="选定布局区域，在下方添加图片，建议添加比例一致的图片" type="info" show-icon :closable="false"></el-alert>
            </el-row>
            <el-row>
              <layou4 />
              <div style="margin-top: 20px;">
                <PictureItem :index="0" :item="{ imgUrl: '', imgLink: '' }" :items="[{ imgUrl: '', imgLink: '' }]" />
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
import layou2 from './components/layout-2.vue'
import layou3 from './components/layout-3.vue'
import layou4 from './components/layout-4.vue'
import layouTable from './components/layout-table.vue'
import PictureItem from './components/picture-item.vue'
@Component({
  name: 'magicPictureGroup',
  components: {
    layou2,
    layou3,
    layou4,
    layouTable,
    PictureItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  private activeNames = ['1', '2']
}
</script>
<style scoped lang="scss">
.svg-icon {
  color: $--color-text-secondary;
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
}
</style>
