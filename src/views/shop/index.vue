<template>
  <!-- eslint-disable vue/camelcase -->
  <div class="shops">
    <magic-search>
      <el-input placeholder="请输入页面标题" v-model="page_title" @change="handleSearch" />
      <template v-slot:button-group>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleNav">添加页面</el-button>
      </template>
    </magic-search>
    <magic-table @current-change="currentChange" :data="tableData" :total="total" :current-page="currentPage" v-loading="loading">
      <el-table-column prop="shop_id" label="ID" width="60" />
      <el-table-column prop="updated_at" label="上次修改时间" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.update_at | update_at }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="page_title" label="页面标题" width="380" />
      <el-table-column label="操作" width="380">
        <template slot-scope="scope">
          <el-button icon="el-icon-view" @click="handlePrevView(scope)">预览</el-button>
          <el-button icon="el-icon-view" @click="handleEdit(scope)">编辑</el-button>
          <el-button icon="el-icon-view" @click="handleCopyLink(scope, $event)">复制链接</el-button>
          <el-button icon="el-icon-view" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </magic-table>
    <el-dialog title="预览" width="375px" :visible.sync="dialogVisible">
      <div class="content-main">
        <el-scrollbar>
          <component :key="item.id" v-for="item in componentsFormData" :is="item.name" :componentData="item"></component>
        </el-scrollbar>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicTable from '@/components/magic-table/index.vue'
import magicSearch from '@/components/magic-search/index.vue'
import { getShops, deleteShop } from '@/api/shops'
import { handleClipboard } from '@/utils/clipboard'
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
  components: { ...components, magicTable, magicSearch },
  filters: {
    update_at: (value: number) => new Date(value * 1000).toLocaleString()
  }
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

  async deleteShop(id: number) {
    this.loading = true
    const res = (await deleteShop(id)) as any
    if (res && res.code && res.code === 20000) {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.getShops()
    } else {
      this.$message({
        type: 'success',
        message: '删除失败!'
      })
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
    const shop_data = JSON.parse(scope.row.shop_data)
    this.componentsFormData = shop_data
    console.log('prevView', scope)
  }

  handleEdit(scope: any) {
    this.$router.push({ path: '/magic', query: { id: scope.row.shop_id } })
    console.log('prevView', scope)
  }

  handleCopyLink(scope: any, event: MouseEvent) {
    const link = `/magic?id=${scope.row.shop_id}`
    handleClipboard(link, event)
    // console.log('prevView', scope)
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
      this.deleteShop(scope.row.id)
    })
  }
}
</script>

<style scoped lang="scss">
.content-main {
  height: 667px;
}
.el-scrollbar {
  height: 100%;
}
.content-main ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
  .el-scrollbar__view {
    height: 100%;
  }
}
.shops ::v-deep .el-dialog__body {
  padding: 0;
}
</style>
