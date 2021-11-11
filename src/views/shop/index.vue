<template lang="pug">
div
  magic-search
    el-input(placeholder="请输入页面标题" v-model="page_title" @change="handleSearch")
    template(v-slot:button-group)
      el-button(type='primary', icon='el-icon-search' @click="handleSearch") 搜索
      el-button(type='primary', icon='el-icon-plus' @click="handleNav") 添加页面
  magic-table(@current-change="currentChange" :data='tableData' :total='total' :current-page="currentPage" v-loading="loading")
    el-table-column(prop='id', label='ID', width='60')
    el-table-column(prop='updated_at', label='上次修改时间', width='150')
    el-table-column(prop='page_title', label='页面标题', width='380')
    //- el-table-column(prop='page_scene_depict', label='页面场景', width='120')
    //- el-table-column(prop='page_sort_depict', label='显示终端', width='120')
    //- el-table-column(prop="id" label="页面类型" width="120")
    el-table-column(label='操作', width='380')
      template(slot-scope='scope')
        el-button(icon='el-icon-view' @click="handlePrevView(scope)") 预览
        el-button(icon='el-icon-edit'  @click="handleEdit(scope)") 编辑
        el-button(icon='el-icon-link' @click="handleCopyLink(scope)") 复制链接
        //- el-button(icon='el-icon-copy-document' @click="handleCopyPage(scope)") 复制页面
        el-button(icon='el-icon-delete' @click="handleDelete(scope)") 删除
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicTable from '@/components/magic-table/index.vue'
import magicSearch from '@/components/magic-search/index.vue'
import { getShops } from '@/api/shops'
@Component({
  name: 'shop',
  components: { magicTable, magicSearch }
})
export default class extends Vue {
  private tableData = []
  private total = 0
  private currentPage = 1
  private page_title = ''
  private loading = false

  currentChange(page: number) {
    this.currentPage = page
    this.getShops()
  }

  async getShops() {
    this.loading = true
    const params = {
      page: this.currentPage,
      page_title: this.page_title
    }
    const res = await getShops(params)
    if (res && res.data && res.data.items && res.data.items.length) {
      this.tableData = res.data.items
      this.total = res.data.total
    } else {
      this.tableData = []
      this.total = 0
    }
    this.loading = false
  }

  created() {
    this.getShops()
  }

  handleSearch() {
    this.currentPage = 1
    this.getShops()
  }

  handleNav() {
    this.$router.push('/magic')
  }

  handlePrevView(scope: any) {
    console.log('prevView', scope)
  }

  handleEdit(scope: any) {
    console.log('prevView', scope)
  }

  handleCopyLink(scope: any) {
    console.log('prevView', scope)
  }

  handleCopyPage(scope: any) {
    console.log('prevView', scope)
  }

  handleDelete(scope: any) {
    console.log('prevView', scope)
    this.$confirm('确认删除该装修页面？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    })
  }
}
</script>
