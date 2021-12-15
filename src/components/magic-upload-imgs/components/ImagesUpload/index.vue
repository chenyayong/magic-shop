<template>
  <div class="images-upload" style="height: 160px;">
    <el-upload
      list-type="picture-card"
      accept="image/*"
      action="/index.php/Admin/DiyApi/uploadImg"
      name="image"
      :file-list="fileList"
      :data="uploadData"
      :limit="1"
      :auto-upload="true"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <i slot="trigger" ref="plus" class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

interface IFileList {
  name?: string
  url: string
}

@Component({
  name: 'imagesUpload'
})
export default class extends Vue {
  @Prop({ type: String, required: true }) imgUrl!: string
  @Prop({ type: Function }) onSuccess!: (value?: string) => void
  private fileList: IFileList[] = []
  private dialogVisible = false
  private uploadData = {
    // deadline: Date.now(),
    // aid: 17075,
    // Token: 'i3ao8ll9vjflthjqw3hi2jw1v6rrokbw:zaudXD2gV9RF0t0qMMPtksq_fPE=:eyJkZWFkbGluZSI6MTYzNDg4ODU4NywiYWN0aW9uIjoiZ2V0IiwidWlkIjoxMjgwMCwiYWlkIjoiMTcwNzUiLCJmcm9tIjoiZmlsZSJ9'
  }

  @Watch('fileList')
  changeFileList(value: IFileList[]) {
    if (value.length) {
      ;(this.$refs.plus as any).parentNode.style = 'display: none'
    } else {
      ;(this.$refs.plus as any).parentNode.style = 'display: block'
    }
  }

  @Watch('imgUrl')
  changeimgUrl(value: string) {
    value ? (this.fileList = [{ url: value }]) : (this.fileList = [])
  }

  handlePreview() {
    this.dialogVisible = true
  }

  handleRemove() {
    this.$emit('update:imgUrl', '')
    this.fileList = []
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
    return !!(format && limit)
  }

  onExceed() {
    this.$message({
      message: '只能上传单个图片喔',
      type: 'warning'
    })
  }

  uploadSuccess(response: { code: number; data: string; msg: string }) {
    if (response.code !== 20000) {
      this.$emit('update:imgUrl', '')
      this.fileList = []
      this.$message({
        message: response.msg,
        type: 'warning'
      })
    } else {
      const linkurl = response.data
      this.onSuccess && this.onSuccess(linkurl)
      this.$emit('update:imgUrl', linkurl)
      this.fileList = [{ url: linkurl }]
    }
  }

  uploadError(err: Error) {
    this.$message({
      message: err.message,
      type: 'warning'
    })
  }
}
</script>

<style scoped>
.images-upload ::v-deep .el-upload-list__item {
  transition: none !important;
}
.images-upload ::v-deep .el-upload--picture-card {
  transition: none !important;
}
</style>
