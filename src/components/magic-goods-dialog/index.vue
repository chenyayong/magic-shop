<template>
  <div class="magic-goods-dialog">
    <el-dialog title="选择添加商品" :visible.sync="visible" width="830px" :append-to-body="true" :before-close="beforeClose">
      <el-row type="flex" class="block">
        <el-input placeholder="请输入商品名称" v-model="params.goods_name" @change="titleChange"></el-input>
        <el-button type="primary" style="margin-left: 10px">搜 索</el-button>
      </el-row>
      <el-row class="block">
        <MagicTable
          :data="tabelData"
          v-loading="loading"
          row-key="goods_id"
          :page-sizes="limits"
          :page-size.sync="params.limit"
          :current-page.sync="params.page"
          :total="total"
          @change="paginationChange"
          ref="multipleTable"
        >
          <el-table-column type="selection" align="center" width="50" :reserve-selection="true"></el-table-column>
          <el-table-column property="goods_id" align="center" label="商品ID" width="70"></el-table-column>
          <el-table-column property="original_img" align="center" label="商品图片" width="100">
            <div slot-scope="{ row }">
              <img :src="row.original_img" alt="" srcset="" style="width: 50px;height: 50px;" />
            </div>
          </el-table-column>
          <el-table-column property="goods_name" align="center" label="商品名称" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column property="status" align="center" label="商品状态" width="80">
            <div slot-scope="{ row }">
              <span>{{ row.is_on_sale === 1 ? '上架' : '下架' }}</span>
            </div>
          </el-table-column>
          <el-table-column property="cost_price" align="center" label="商品原价"></el-table-column>
          <el-table-column property="shop_price" align="center" label="商品现价"></el-table-column>
          <el-table-column property="store_count" align="center" label="库存"></el-table-column>
          <el-table-column property="sales_sum" align="center" label="销量"></el-table-column>
        </MagicTable>
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
import MagicTable from '@/components/magic-table/index.vue'
import { getGoods } from '@/api/goods'
import { IGoods } from '@/api/types'
@Component({
  name: 'MagicGoodsDialog',
  components: {
    MagicTable
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean
  @Watch('visible')
  changeVisible(value: boolean) {
    if (value) {
      this.getGoods()
      this.selectionData.forEach((row) => {
        ;(this.$refs.multipleTable as any).$children[0].toggleRowSelection(row, true)
      })
    } else {
      ;(this.$refs.multipleTable as any).$children[0].clearSelection()
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
    goods_name: ''
  }

  paginationChange() {
    this.getGoods()
  }

  titleChange(value: string) {
    this.params.page = 1
    this.params.goods_name = value
    this.getGoods()
  }

  beforeClose() {
    this.$emit('update:visible', false)
  }

  cancel() {
    this.$emit('update:visible', false)
  }

  confirm() {
    console.log(this.$refs.multipleTable as any)
    this.selectionData = (this.$refs.multipleTable as any).$children[0].selection
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

  async getGoods() {
    this.loading = true
    const res = await getGoods(this.params)
    if (res.code === 20000) {
      this.tabelData = res.data.items
      this.total = res.data.total
    } else {
      this.tabelData = []
      this.total = 0
    }

    this.loading = false
  }
}
</script>

<style scoped>
.block {
  margin-bottom: 10px;
}
</style>
