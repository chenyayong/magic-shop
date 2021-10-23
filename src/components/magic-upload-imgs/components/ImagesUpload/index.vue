<template>
  <div class="images-upload">
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
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'imagesUpload'
})
export default class extends Vue {
  @Prop({ type: Function }) onSuccess!: (value?: string) => void
  private fileList: { name?: string; url?: string }[] = []
  private dialogImageUrl = ''
  private dialogVisible = false
  private uploadData = {
    deadline: Date.now(),
    aid: 17075,
    Token: 'i3ao8ll9vjflthjqw3hi2jw1v6rrokbw:zaudXD2gV9RF0t0qMMPtksq_fPE=:eyJkZWFkbGluZSI6MTYzNDg4ODU4NywiYWN0aW9uIjoiZ2V0IiwidWlkIjoxMjgwMCwiYWlkIjoiMTcwNzUiLCJmcm9tIjoiZmlsZSJ9'
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

  uploadSuccess(response: { code?: string; info?: string; linkurl?: string; name?: string }) {
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
      this.onSuccess && this.onSuccess(this.dialogImageUrl)
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

<style scoped></style>
