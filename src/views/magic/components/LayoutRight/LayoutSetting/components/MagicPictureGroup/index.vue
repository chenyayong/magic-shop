<template>
  <div class="magic-picture-group-setting">
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
            <el-col><el-slider></el-slider></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="组合配置" name="2">
          <el-row>
            <el-col>魔方布局</el-col>
            <el-col></el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
@Component({
  name: 'magicPictureGroup'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  public activeNames = ['1', '2']
}
</script>
<style scoped lang="scss">
.magic-picture-group-setting ::v-deep .el-collapse-item__wrap {
  overflow: visible;
}
.el-slider {
  padding-left: 10px;
}
</style>
