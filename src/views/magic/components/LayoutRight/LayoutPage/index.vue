<template>
  <div class="layout-setting">
    <h4>页面设置</h4>
    <el-form ref="form" :model="formData">
      <el-form-item label="页面标题">
        <el-input v-model="formData.pageTitle"></el-input>
      </el-form-item>
      <el-form-item label="页面描述">
        <el-input v-model="formData.pageDescription"></el-input>
      </el-form-item>
      <el-form-item label="分享图标">
        <el-upload list-type="picture-card" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="全屏广告">
        <el-radio-group>
          <el-radio label="不显示"></el-radio>
          <el-radio label="自定义设置"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="弹窗广告">
        <el-radio-group>
          <el-radio label="不显示"></el-radio>
          <el-radio label="自定义设置"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="顶部菜单">
        <el-radio-group>
          <el-radio label="不显示"></el-radio>
          <el-radio label="自定义设置"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="底部导航">
        <el-radio-group>
          <el-radio label="不显示"></el-radio>
          <el-radio label="系统默认"></el-radio>
          <el-radio label="自定义设置"></el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'LayoutPage'
})
export default class extends Vue {
  private formData = {
    pageTitle: '',
    pageDescription: '',
    pageIcon: ''
  }
}
</script>
<style scoped lang="scss">
.layout-setting ::v-deep .el-form-item__label {
  float: none;
}
.layout-setting ::v-deep .el-radio {
  margin-bottom: 4px;
}
.avatar-uploader {
  display: flex;
  justify-content: center;
}
</style>
