<template>
  <div class="magic-links-factory">
    <el-dialog title="链接库" width="800px" :append-to-body="true" :visible.sync="visible" :before-close="beforeClose">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="系统页面" name="first">
          <SystemLink :currentLink.sync="currentLink" ref="systemLink" />
        </el-tab-pane>
        <el-tab-pane label="商品链接" name="second">
          <GoodsLink :currentLink.sync="currentLink" ref="goodsLink" />
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
import SystemLink from './components/SystemLink/index.vue'
import GoodsLink from './components/GoodsLink/index.vue'
export interface ILink {
  src: string
  name: string
  active?: boolean
}

@Component({
  name: 'MagicLinksFactory',
  components: {
    SystemLink,
    GoodsLink
  }
})
export default class extends Vue {
  @Prop({ type: String }) imgLink!: string
  @Prop({ type: Boolean, default: true }) visible!: boolean
  private activeName = 'first'
  private currentLink = this.imgLink

  @Watch('visible')
  changeVisible(value: boolean) {
    if (value) {
      this.currentLink = this.imgLink
    }
  }

  confirm() {
    if (this.currentLink) {
      this.$emit('update:visible', false)
      this.$emit('confirm', this.currentLink)
      this.$emit('update:imgLink', this.currentLink)
    } else {
      this.$message({
        message: '请选择链接',
        type: 'warning'
      })
    }
  }

  cancel() {
    this.$emit('update:visible', false)
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
