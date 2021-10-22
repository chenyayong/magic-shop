<template>
  <div class="magic-links-factory">
    <el-dialog title="链接库" :append-to-body="true" :visible.sync="visible" :before-close="beforeClose">
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'magicLinksFactory'
})
export default class extends Vue {
  @Prop({ type: Boolean, default: true }) visible!: boolean

  cancel() {
    this.$emit('update:visible', false)
  }

  confirm() {
    this.$emit('update:visible', false)
    // if (this.imageUrl) {
    //   this.$emit('update:visible', false)
    //   this.$emit('confirm', this.imageUrl)
    // } else {
    //   this.$message({
    //     message: '请选择图片',
    //     type: 'warning'
    //   })
    // }
  }

  beforeClose() {
    this.$emit('update:visible', false)
  }
}
</script>

<style scoped></style>
