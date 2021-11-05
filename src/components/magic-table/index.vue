<template lang="pug">
  div.magic-able
    .el-table-container
      el-table(:data="data" border)
        slot
    .el-pagination-container
      el-pagination(background, :layout=layout, :total='total' @size-change="sizeChange" @current-change="currentChange" :page-sizes="pageSizes" :page-size="pageSize" :current-page="currentPage")
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'magicTable'
})
export default class extends Vue {
  @Prop(Array) readonly data!: any[]
  @Prop({ type: String, default: 'prev, pager, next, jumper' }) layout!: string
  @Prop({ type: Number, default: 0 }) total!: number
  @Prop({ type: Number, default: 1 }) currentPage!: number
  @Prop({ type: Array, default: () => [10, 15, 20, 30] })
  @Prop({ type: Number, default: 10 })
  pageSize!: number

  @Emit()
  currentChange(page: number) {
    return page
  }

  @Emit()
  sizeChange(size: number) {
    return size
  }
}
</script>
<style scoped>
.el-pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
