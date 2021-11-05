<template>
  <div class="magic-upload-imgs">
    <el-dialog :before-close="beforeClose" width="600px" title="上传图片" :append-to-body="true" :visible="visible">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="上传图片" name="first">
          <el-row type="flex" justify="center">
            <ImagesUpload :img-src.sync="imgSrc" />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="提取网络图片" name="second">
          <ImagesInput :img-src.sync="imgSrc" />
        </el-tab-pane>
        <el-tab-pane label="浏览图片" name="third">
          <ImagesList :img-src.sync="imgSrc" />
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
import { Vue, Component, Prop } from 'vue-property-decorator'
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
  @Prop({ type: Boolean, required: true, default: false }) visible!: boolean
  private activeName = 'first'
  private imgSrc = ''

  cancel() {
    this.$emit('update:visible', false)
  }

  confirm() {
    if (this.imgSrc) {
      this.$emit('update:visible', false)
      this.$emit('confirm', this.imgSrc)
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
}
</script>

<style scoped>
::v-deep .el-dialog__body {
  padding-top: 10px;
}
</style>
