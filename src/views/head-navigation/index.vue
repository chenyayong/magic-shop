<template lang="pug">
  div
    magic-search
      el-input(placeholder="请输入页面名称")
      template(v-slot:button-group)
        el-button(type="primary" icon="el-icon-search") 搜索
        el-button(type="primary" icon="el-icon-plus") 添加顶部菜单
    magicTable(:data="tableData")
      el-table-column(prop="id" label="ID" width="80")
      el-table-column(prop="created_at" label="创建时间" width="150")
      el-table-column(prop="page_name" label="页面名称" width="380")
      //- el-table-column(prop="page_scene_depict" label="页面场景" width="120")
      //- el-table-column(prop="page_sort_depict" label="显示终端" width="120")
      //- el-table-column(prop="id" label="页面类型" width="120")
      el-table-column(label="操作" width="480")
        template(slot-scope="scope")
          el-button(icon="el-icon-view") 预览
          el-button(icon="el-icon-edit") 编辑
          el-button(icon="el-icon-link") 复制链接
          el-button(icon="el-icon-copy-document") 复制页面
          el-button(icon="el-icon-delete") 删除
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicTable from '@/components/magic-table/index.vue'
import magicSearch from '@/components/magic-search/index.vue'
@Component({
  name: 'head-navigation',
  components: { magicTable, magicSearch }
})
export default class extends Vue {
  private tableData = [
    {
      id: 1,
      created_at: '2016-05-02 12:12:12',
      page_name: '上海市普陀区金沙江路 1518 弄',
      page_scene_depict: '王小虎',
      page_sort_depict: '小程序'
    },
    {
      id: 2,
      created_at: '2016-05-02 12:12:12',
      page_name: '上海市普陀区金沙江路 1518 弄',
      page_scene_depict: '王小虎',
      page_sort_depict: 'h5'
    },
    {
      id: 3,
      created_at: '2016-05-02 12:12:12',
      page_name: '上海市普陀区金沙江路 1518 弄',
      page_scene_depict: '王小虎',
      page_sort_depict: '小程序'
    },
    {
      id: 4,
      created_at: '2016-05-02 12:12:12',
      page_name: '上海市普陀区金沙江路 1518 弄',
      page_scene_depict: '王小虎',
      page_sort_depict: 'h5'
    }
  ]
}
</script>
