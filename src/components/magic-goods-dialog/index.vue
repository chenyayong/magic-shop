<template>
  <div class="magic-goods-dialog">
    <el-dialog
      title="选择添加商品"
      :visible.sync="visible"
      width="800px"
      :append-to-body="true"
      :before-close="beforeClose"
    >
      <el-row type="flex" class="block">
        <el-input
          placeholder="请输入关键字搜索"
          v-model="params.title"
          @change="titleChange"
        ></el-input>
        <el-button type="primary" style="margin-left: 10px">搜 索</el-button>
      </el-row>
      <el-row class="block">
        <el-table :data="tabelData" border ref="multipleTable" v-loading="loading" row-key="id">
          <el-table-column
            type="selection"
            align="center"
            width="50"
            :reserve-selection="true"
          ></el-table-column>
          <el-table-column property="id" align="center" label="商品ID" width="70"></el-table-column>
          <el-table-column property="src" align="center" label="商品图片" width="100">
            <div slot-scope="{ row }">
              <img :src="row.src" alt="" srcset="" style="width: 50px;height: 50px;" />
            </div>
          </el-table-column>
          <el-table-column
            property="title"
            align="center"
            label="商品名称"
            width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column property="status" align="center" label="商品状态" width="80">
            <div slot-scope="{ row }">
              <span>{{ row.status === 1 ? '上架' : '下架' }}</span>
            </div>
          </el-table-column>
          <el-table-column property="new_price" align="center" label="商品原价"></el-table-column>
          <el-table-column property="old_price" align="center" label="商品现价"></el-table-column>
          <el-table-column property="stock" align="center" label="库存"></el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="end">
        <el-pagination
          background
          layout="prev, pager, next, sizes"
          :page-sizes="limits"
          @size-change="limitChange"
          :page-size="params.limit"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getGoods } from '@/api/goods'
import { IGoods } from '@/api/types'
@Component({
  name: 'magicGoodsDialog'
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean
  @Watch('visible')
  changeVisible(value: boolean) {
    if (value) {
      this.getGoods()
      this.selectionData.forEach((row) => {
        ;(this.$refs.multipleTable as any).toggleRowSelection(row, true)
      })
    } else {
      ;(this.$refs.multipleTable as any).clearSelection()
    }
  }

  private limits = [5, 10, 15, 20]
  private total = 0
  private tabelData: IGoods[] = []
  private selectionData: IGoods[] = []
  private loading = false
  private params = {
    page: 1,
    limit: 5,
    title: ''
  }

  currentChange(page: number) {
    this.params.page = page
    this.getGoods()
  }

  titleChange(value: string) {
    this.params.title = value
    this.getGoods()
  }

  limitChange(value: number) {
    this.params.limit = value
    this.getGoods()
  }

  beforeClose() {
    this.$emit('update:visible', false)
  }

  confirm() {
    this.selectionData = (this.$refs.multipleTable as any).selection
    // ;(this.$refs.multipleTable as any).toggleRowSelection(this.tabelData[1], true)
    if (this.selectionData && this.selectionData.length) {
      this.$emit('update:visible', false)
      this.$emit('confirm', this.selectionData)
    } else {
      this.$message({
        type: 'warning',
        message: '请选择商品'
      })
    }
  }

  cancel() {
    // ;(this.$refs.multipleTable as any).toggleRowSelection(this.tabelData[0], true)
    this.$emit('update:visible', false)
  }

  async getGoods() {
    this.loading = true
    const res = await getGoods(this.params)
    this.tabelData = res.data.items
    this.total = res.data.total
    this.loading = false
  }

  mounted() {
    this.getGoods()
  }
}
</script>

<style scoped>
.block {
  margin-bottom: 10px;
}
</style>
