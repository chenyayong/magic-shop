<template>
  <div class="magic-picture-setting component-setting">
    <h4>单图组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row>
            <el-col>内边距</el-col>
            <el-col><el-slider v-model="componentData.data.padding" show-input=""></el-slider></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="数据配置" name="2">
          <magicSettingGrid v-for="(item, index) in componentData.data.items" :items="componentData.data.items" :index="index" :item="item" :key="index"></magicSettingGrid>
          <el-button type="primary" style="width: 100%;" @click="addPictureItem">添加更多</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'

@Component({
  name: 'magicPicture',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  public activeNames = ['1', '2']

  addPictureItem() {
    this.componentData.data?.items.push({ imgUrl: '', imgLink: '' })
  }
}
</script>

<style scoped>
/* .magic-picture-setting ::v-deep .el-slider__input {
  width: 110px;
}
.magic-picture-setting ::v-deep .el-slider__runway.show-input {
  margin-right: 120px;
}
.magic-picture-setting ::v-deep .el-collapse-item__wrap {
  overflow: visible;
}
.el-slider {
  padding-left: 10px;
} */
</style>
