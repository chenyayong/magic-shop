<template>
  <!-- eslint-disable vue/camelcase -->
  <div>
    <magic-search>
      <el-input placeholder="请输入页面标题" v-model="page_title" @change="handleSearch" />
      <template v-slot:button-group>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleNav">添加页面</el-button>
      </template>
    </magic-search>
    <magic-table @current-change="currentChange" :data="tableData" :total="total" :current-page="currentPage" v-loading="loading">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="updated_at" label="上次修改时间" width="150" />
      <el-table-column prop="page_title" label="页面标题" width="380" />
      <el-table-column label="操作" width="380">
        <template slot-scope="scope">
          <el-button icon="el-icon-view" @click="handlePrevView(scope)">预览</el-button>
          <el-button icon="el-icon-view" @click="handleEdit(scope)">编辑</el-button>
          <el-button icon="el-icon-view" @click="handleCopyLink(scope)">复制链接</el-button>
          <el-button icon="el-icon-view" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </magic-table>
    <el-dialog title="提示" width="375px" :visible.sync="dialogVisible">
      <div class="layout-content">
        <div class="content-main">
          <el-scrollbar>
            <component :key="item.id" v-for="item in componentsFormData" :is="item.name" :componentData="item"></component>
          </el-scrollbar>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicTable from '@/components/magic-table/index.vue'
import magicSearch from '@/components/magic-search/index.vue'
import { getShops } from '@/api/shops'
interface iComponents {
  [key: string]: Vue
}
const files = require.context('@/components/magic/', true, /index\.vue$/)
const components = files.keys().reduce((ret: iComponents, file: string): iComponents => {
  const component = files(file).default
  const name = component.extendOptions.name
  ret[name] = component
  return ret
}, {})
@Component({
  name: 'shop',
  components: { ...components, magicTable, magicSearch }
})
export default class extends Vue {
  private tableData = []
  private total = 0
  private currentPage = 1
  private page_title = ''
  private loading = false
  private dialogVisible = false
  private componentsFormData = []

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
    this.dialogVisible = true
    this.componentsFormData = scope.row.shop_data
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

<style scoped lang="scss">
// .content-main {
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   width: 375px;
//   height: 667px;
//   background: #fff;
//   box-shadow: -10px 20px 30px 0px rgb(192 197 205 / 80%);
// }
.el-scrollbar {
  height: 100%;
}
.layout-content ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
