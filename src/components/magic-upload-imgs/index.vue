<template>
  <div class="magic-upload-imgs">
    <el-dialog :before-close="beforeClose" title="上传图片" :append-to-body="true" :visible="visible">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="上传图片" name="first">
          <el-row type="flex" justify="center">
            <el-upload
              :file-list="fileList"
              list-type="picture-card"
              accept="image/*"
              action="http://up.tietuku.cn/"
              :data="uploadData"
              :limit="1"
              :auto-upload="true"
              :before-upload="beforeUpload"
              :on-exceed="onExceed"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="onSuccess"
              :on-error="onError"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="提取网络图片" name="second">
          <el-input placeholder="请输入网络图片地址" v-model="networkImageUrl"></el-input>
        </el-tab-pane>
        <el-tab-pane label="浏览图片" name="third">浏览图片</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'magicUploadImgs'
})
export default class extends Vue {
  @Prop({ type: Boolean, required: true, default: false }) visible!: boolean
  private activeName = 'first'
  private fileList: { name?: string; url?: string }[] = []
  private dialogImageUrl = ''
  private networkImageUrl = ''
  private browseImageUrl = ''
  private dialogVisible = false
  private uploadData = {
    deadline: Date.now(),
    aid: 17075,
    Token: 'i3ao8ll9vjflthjqw3hi2jw1v6rrokbw:zaudXD2gV9RF0t0qMMPtksq_fPE=:eyJkZWFkbGluZSI6MTYzNDg4ODU4NywiYWN0aW9uIjoiZ2V0IiwidWlkIjoxMjgwMCwiYWlkIjoiMTcwNzUiLCJmcm9tIjoiZmlsZSJ9'
  }

  @Watch('visible')
  changeVisible() {
    this.fileList = []
    this.dialogImageUrl = ''
    this.networkImageUrl = ''
    this.browseImageUrl = ''
    this.activeName = 'first'
  }

  get imageUrl() {
    const map: { [key: string]: any } = {
      first: this.dialogImageUrl,
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

  handlePreview(file: any) {
    this.dialogImageUrl = file.url
    this.dialogVisible = true
  }

  handleRemove(file: any) {
    this.fileList = this.fileList.filter((item) => file !== item)
  }

  beforeUpload(file: any) {
    const type = file.type
    const size = file.size
    const allowType = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
    const allowSize = 2 * 1024 * 1024
    const format = allowType.find((item) => type === item)
    const limit = size <= allowSize
    if (!format) {
      this.$message({
        message: '只能上传图片喔',
        type: 'warning'
      })
    }
    if (!limit) {
      this.$message({
        message: '上传图片的大小不得超过2M喔',
        type: 'warning'
      })
    }
    return format && limit
  }

  onExceed() {
    this.$message({
      message: '只能上传单个图片喔',
      type: 'warning'
    })
  }

  onSuccess(response: { code?: string; info?: string; linkurl?: string; name?: string }) {
    if (response.code && response.info) {
      this.fileList = []
      this.dialogImageUrl = ''
      this.$message({
        message: response.info,
        type: 'warning'
      })
    } else {
      this.dialogImageUrl = response.linkurl as string
      this.fileList = [{ name: response.name, url: response.linkurl }]
    }
  }

  onError(err: Error) {
    this.$message({
      message: err.message,
      type: 'warning'
    })
  }
}
</script>

<style scoped>
::v-deep .el-dialog__body {
  padding-top: 10px;
}
</style>
