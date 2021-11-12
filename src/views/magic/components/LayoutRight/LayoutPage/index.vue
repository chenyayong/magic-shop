<template>
  <div class="layout-setting">
    <h4>页面设置</h4>
    <el-form ref="form" :model="pageData">
      <el-form-item label="页面标题">
        <el-input v-model="pageData.page_title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="页面描述">
        <el-input v-model="formData.pageDescription"></el-input>
      </el-form-item> -->
      <el-form-item label="分享图标">
        <el-row type="flex" justify="center">
          <div class="el-upload el-upload--picture-card" @click="uploadVisible = true" v-if="!pageData.page_icon">
            <i class="el-icon-plus"></i>
          </div>
          <ul class="el-upload-list el-upload-list--picture-card" v-else>
            <li class="el-upload-list__item is-success">
              <img :src="pageData.page_icon" alt="" class="el-upload-list__item-thumbnail" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="dialogVisible = true"><i class="el-icon-zoom-in"></i></span>
                <span class="el-upload-list__item-delete" @click="deleImg"><i class="el-icon-delete"></i></span>
              </span>
            </li>
          </ul>
        </el-row>
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
    <MagicUploadImgs :img-url.sync="pageData.page_icon" :visible.sync="uploadVisible"></MagicUploadImgs>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="pageData.page_icon" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MagicUploadImgs from '@/components/magic-upload-imgs/index.vue'
import { IPageData } from '@/store/magic/index'
import { namespace } from 'vuex-class'
const magic = namespace('magic')
@Component({
  name: 'LayoutPage',
  components: {
    MagicUploadImgs
  }
})
export default class extends Vue {
  @magic.State('pageData') pageData!: IPageData
  private dialogVisible = false
  private uploadVisible = false

  deleImg() {
    this.pageData.page_icon = ''
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
