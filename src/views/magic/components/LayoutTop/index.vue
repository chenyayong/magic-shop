<template>
  <div class="layout-top">
    <el-row class="layout-bar" type="flex" justify="end" align="middle">
      <!-- <span class="page-title">页面名称：</span>
      <el-input clearable placeholder="请输入页面名称" style="width: 250px;"></el-input> -->
      <span class="return-list" @click="handleBack">返回列表</span>
      <span class="page-save" @click="handleSave">保存</span>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { updateShop, createShop } from '@/api/shops'
const magic = namespace('magic')
@Component({
  name: 'LayoutTop'
})
export default class extends Vue {
  @magic.State('componentsFormData') componentsFormData: any
  @magic.State('pageData') pageData: any
  async updateShop(id: number, data: any) {
    const res = (await updateShop(id, data)) as any
    if (res && res.code === 20000) {
      this.$message({
        type: 'success',
        message: res.msg
      })
    } else {
      this.$message({
        type: 'error',
        message: res.msg
      })
    }
  }

  async createShop(data: any) {
    const res = (await createShop(data)) as any
    if (res && res.code === 20000) {
      this.$message({
        type: 'success',
        message: res.msg
      })
    } else {
      this.$message({
        type: 'error',
        message: res.msg
      })
    }
  }

  handleSave() {
    const id = this.$route.query.id as string
    if (id) {
      this.pageData.id = id
      this.pageData.shop_data = this.componentsFormData
      this.updateShop(parseInt(id), this.pageData)
    } else {
      this.pageData.shop_data = this.componentsFormData
      this.createShop(this.pageData)
    }
  }

  handleBack() {
    this.$router.push('/shop')
  }
}
</script>

<style scoped lang="scss">
.layout-top {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 50px;
  background: #ffffff;
  box-shadow: 2px 0px 8px 0px #bcc3ce;
  z-index: 3;
  .layout-bar {
    height: 100%;
    flex-flow: row nowrap;
    font-size: 15px;
    font-weight: bold;
    .page-title {
      color: $--color-primary;
    }
    .return-list {
      height: 100%;
      border-left: 1px solid #e8eaec;
      text-align: center;
      color: #3f4245;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 30px;
      padding: 0 30px;
    }
    .page-save {
      height: 100%;
      background-color: $--color-primary;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 30px;
    }
  }
}
</style>
