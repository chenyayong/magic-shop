<template>
  <div class="magic-links-factory">
    <el-dialog title="链接库" width="800px" :append-to-body="true" :visible.sync="visible" :before-close="beforeClose">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="系统页面" name="first">
          <SystemLink ref="systemLink" />
        </el-tab-pane>
        <el-tab-pane label="商品链接" name="second">
          <GoodsLink ref="goodsLink"></GoodsLink>
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
import SystemLink from './components/SystemLink/index.vue'
import GoodsLink from './components/GoodsLink/index.vue'
export interface ILink {
  name: string
  active?: boolean
}

@Component({
  name: 'magicLinksFactory',
  components: {
    SystemLink,
    GoodsLink
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, default: true }) visible!: boolean
  private activeName = 'first'

  cancel() {
    this.$emit('update:visible', false)
  }

  confirm() {
    const getSelectLink = (this.$refs.systemLink as any).getSelectLink
    console.log(this.$refs.goodsLink.currentRowId)
    if (getSelectLink) {
      this.$emit('update:visible', false)
      this.$emit('confirm', getSelectLink)
    } else {
      this.$message({
        message: '请选择链接',
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
