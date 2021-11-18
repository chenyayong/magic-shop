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
          <magicSettingGrid
            v-for="(item, index) in componentData.data.items"
            :img-link.sync="item.img_link"
            :img-url.sync="item.img_url"
            @dele="componentData.data.items.splice(index, 1)"
            :key="index"
          />
          <el-button type="primary" style="width: 100%;" @click="addPictureItem">添加更多</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicPictureComponent } from '@/store/magic/magic-picture'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'

@Component({
  name: 'magic_picture',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicPictureComponent
  public activeNames = ['1', '2']

  addPictureItem() {
    this.componentData.data.items.push({ img_url: '', img_link: '' })
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
