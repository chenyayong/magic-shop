<template>
  <div class="magic-upload-imgs">
    <el-dialog
      :before-close="beforeClose"
      width="600px"
      title="上传图片"
      :append-to-body="true"
      :visible="visible"
    >
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="上传图片" name="first">
          <el-row type="flex" justify="center">
            <ImagesUpload :img-url.sync="currentUrl" />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="提取网络图片" name="second">
          <ImagesInput :img-url.sync="currentUrl" />
        </el-tab-pane>
        <el-tab-pane label="浏览图片" name="third">
          <ImagesList :img-url.sync="currentUrl" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ImagesUpload from './components/ImagesUpload/index.vue'
import ImagesInput from './components/ImagesInput/index.vue'
import ImagesList from './components/ImagesList/index.vue'

@Component({
  name: 'magicUploadImgs',
  components: {
    ImagesUpload,
    ImagesInput,
    ImagesList
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, required: true }) visible!: boolean
  @Prop({ type: String, required: true }) imgUrl!: string
  private activeName = 'first'
  private currentUrl = this.imgUrl

  @Watch('visible')
  changeVisible(visible: boolean) {
    if (visible) {
      this.currentUrl = this.imgUrl
    }
  }

  confirm() {
    if (this.currentUrl) {
      this.$emit('update:visible', false)
      this.$emit('confirm', this.currentUrl)
      this.$emit('update:imgUrl', this.currentUrl)
    } else {
      this.$message({
        message: '请选择图片',
        type: 'warning'
      })
    }
  }

  cancel() {
    // this.$emit('update:imgSrc', '')
    this.$emit('update:visible', false)
  }

  beforeClose() {
    // this.$emit('update:imgSrc', '')
    this.$emit('update:visible', false)
  }
}
</script>

<style scoped>
::v-deep .el-dialog__body {
  padding-top: 10px;
}
</style>
