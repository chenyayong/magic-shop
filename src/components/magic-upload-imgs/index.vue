<template>
  <div class="magic-upload-imgs">
    <el-dialog :before-close="beforeClose" width="600px" title="上传图片" :append-to-body="true" :visible="visible">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="上传图片" name="first">
          <el-row type="flex" justify="center">
            <ImagesUpload ref="imagesUpload" :on-success="uploadSuccess" />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="提取网络图片" name="second">
          <el-input placeholder="请输入网络图片地址" v-model="networkImageUrl"></el-input>
        </el-tab-pane>
        <el-tab-pane label="浏览图片" name="third">
          <ImagesList ref="imagesList" @select="imagesSelect" />
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
import ImagesList from './components/ImagesList/index.vue'

@Component({
  name: 'magicUploadImgs',
  components: {
    ImagesUpload,
    ImagesList
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, required: true, default: false }) visible!: boolean
  private activeName = 'first'
  private uploadImageUrl = ''
  private networkImageUrl = ''
  private browseImageUrl = ''

  @Watch('visible')
  changeVisible() {
    this.activeName = 'first'
    this.uploadImageUrl = ''
    this.networkImageUrl = ''
    this.browseImageUrl = ''
    this.$nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(this.$refs.imagesUpload as any).fileList = []
      ;(this.$refs.imagesList as any).resetList()
    })
  }

  get imageUrl() {
    const map: { [key: string]: any } = {
      first: this.uploadImageUrl,
      second: this.networkImageUrl,
      third: this.browseImageUrl
    }
    return map[this.activeName]
  }

  cancel() {
    this.$emit('update:visible', false)
  }

  confirm() {
    if (this.imageUrl) {
      this.$emit('update:visible', false)
      this.$emit('confirm', this.imageUrl)
    } else {
      this.$message({
        message: '请选择图片',
        type: 'warning'
      })
    }
  }

  beforeClose() {
    this.$emit('update:visible', false)
  }

  uploadSuccess(url: string) {
    this.uploadImageUrl = url
  }

  imagesSelect(url: string) {
    this.browseImageUrl = url
  }
}
</script>

<style scoped>
::v-deep .el-dialog__body {
  padding-top: 10px;
}
</style>
