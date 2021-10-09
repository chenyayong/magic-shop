<template lang="pug">
  div
    .el-table-container
      el-table(:data="data" border)
        slot
    .el-pagination-container
      el-pagination(background, :layout=layout, :total='total' @current-change="currentChange" :page-size="pageSize" :current-page="currentPage")
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'magicTable'
})
export default class extends Vue {
  @Prop(Array) readonly data!: any[]
  @Prop({
    type: String,
    default: 'prev, pager, next, jumper'
  })
  readonly layout!: string

  @Prop({
    type: Number,
    default: 0
  })
  readonly total!: number

  @Prop({
    type: Number,
    default: 1
  })
  readonly currentPage!: number

  @Prop({ type: Number, default: 10 })
  readonly pageSize!: number

  @Emit()
  currentChange(page: number) {
    return page
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
