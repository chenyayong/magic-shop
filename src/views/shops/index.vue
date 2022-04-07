<template>
    <!-- eslint-disable vue/camelcase -->
    <div class="shops">
        <magic-search>
            <el-input placeholder="请输入页面标题" v-model="params.page_title" @change="handleSearch" />
            <template v-slot:button-group>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleNav">添加页面</el-button>
            </template>
        </magic-search>
        <magic-table
            :data="tableData"
            :total="total"
            @change="paginationChange"
            :current-page.sync="params.page"
            :page-size.sync="params.limit"
            v-loading="loading"
        >
            <el-table-column prop="shop_id" label="ID" width="60" align="center" />
            <el-table-column prop="updated_at" label="上次修改时间" width="170" align="center">
                <template slot-scope="scope">
                    <div>{{ scope.row.update_at | update_at }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="page_title" label="页面标题" width="380" align="center" />
            <el-table-column prop="is_index" label="是否首页" width="100" align="center">
                <template slot-scope="scope">
                    <div>{{ scope.row.is_index === 1 ? '是' : '否' }}</div>
                    <!-- <el-switch v-model="scope.row.is_index" :active-value="1" :inactive-value="0" @change="indexChange(scope.row)"> </el-switch> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" width="430">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.is_index !== 1" @click="handleIndex(scope)">设为首页</el-button>
                    <el-button @click="handlePrevView(scope)">预览</el-button>
                    <el-button @click="handleEdit(scope)">编辑</el-button>
                    <el-button @click="handleCopyLink(scope, $event)">复制链接</el-button>
                    <el-button @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </magic-table>
        <el-dialog width="0px" height="0px" :visible.sync="dialogVisible">
            <div class="app">
                <el-scrollbar :style="scrollbarStyle">
                    <component
                        :key="item.id"
                        v-for="item in componentsFormData"
                        :is="item.name"
                        :componentData="item"
                    ></component>
                </el-scrollbar>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicTable from '@/components/magic-table/index.vue'
import magicSearch from '@/components/magic-search/index.vue'
import { getShops, deleteShop, setIndex } from '@/api/shops'
import { handleClipboard } from '@/utils/clipboard'
import { iShopData } from '@/api/types'
import { IComponentData } from '@/store/magic/index'
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
        update_at: (value: number) => {
            return new Date(value * 1000).toLocaleString()
        }
    }
})
export default class extends Vue {
    private tableData: iShopData[] = []
    private total = 0
    private loading = false
    private dialogVisible = false
    private componentsFormData: IComponentData[] = []
    private params = {
        page: 1,
        limit: 10,
        page_title: ''
    }

    get scrollbarStyle() {
        const search = this.componentsFormData.find((e) => e.name === 'magic_search')
        const tabbar = this.componentsFormData.find((e) => e.name === 'magic_tabbar')
        const paddingTop = search ? 34 + search.data.padding_top + search.data.padding_bottom : 0
        const paddingBottom = tabbar ? 50 : 0
        const style = {
            paddingTop: paddingTop + 'px',
            paddingBottom: paddingBottom + 'px'
        }
        return style
    }

    paginationChange() {
        this.getShops()
    }

    async getShops() {
        this.loading = true
        const res = await getShops(this.params)
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

    async handleIndex(scope: { row: iShopData }) {
        const id = scope.row.shop_id
        const res = await setIndex({ id: id })
        if (res.code !== 20000) {
            this.$message({
                type: 'error',
                message: res.msg
            })
        } else {
            this.tableData.forEach((e) => {
                e.is_index = 0
                if (e.shop_id === id) {
                    e.is_index = 1
                }
            })
            this.$message({
                type: 'success',
                message: res.msg
            })
        }
    }

    handleSearch() {
        this.params.page = 1
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
            this.deleteShop(scope.row.shop_id)
            const index = this.tableData.findIndex((e) => e.shop_id === scope.row.shop_id)
            if (index > -1) {
                this.tableData.splice(index, 1)
            }
        })
    }
}
</script>

<style scoped lang="scss">
.shops {
    padding: 20px;
}
.app {
    box-sizing: border-box;
    height: 640px;
    width: 360px;
    background: #fafafa;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: #ebedf0 0 4px 12px;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    .el-scrollbar {
        height: 100%;
    }
    ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden !important;
        .el-scrollbar__view {
            height: 100%;
        }
    }
}
</style>
