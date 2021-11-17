<template>
  <div class="goods-link">
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
        <el-table-column label="" width="40">
          <template slot-scope="scope">
            <el-radio :label="prePath + scope.row.goods_id" v-model="currentRow"></el-radio>
          </template>
        </el-table-column>
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
    <!-- <el-row class="block">
      <el-table :data="tabelData" border ref="multipleTable" v-loading="loading" row-key="id">
        <el-table-column label="" width="40">
          <template slot-scope="scope">
            <el-radio :label="prePath + scope.row.id" v-model="currentRow"></el-radio>
          </template>
        </el-table-column>
        <el-table-column property="id" align="center" label="商品ID" width="70"></el-table-column>
        <el-table-column property="src" align="center" label="商品图片" width="100">
          <div slot-scope="{ row }">
            <img :src="row.src" alt="" srcset="" style="width: 50px;height: 50px;" />
          </div>
        </el-table-column>
        <el-table-column property="title" align="center" label="商品名称" width="160" show-overflow-tooltip></el-table-column>
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
    </el-row> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MagicTable from '@/components/magic-table/index.vue'
import { getGoods } from '@/api/goods'
import { IGoods } from '@/api/types'
@Component({
  name: 'goodsLink',
  components: {
    MagicTable
  }
})
export default class extends Vue {
  @Prop({ type: String, required: true }) currentLink!: string
  private prePath = '/goods?id='
  private limits = [5, 10, 15, 20]
  private total = 0
  private tabelData: IGoods[] = []
  private loading = false
  private params = {
    page: 1,
    limit: 5,
    goods_name: ''
  }

  get currentRow() {
    return this.currentLink
  }

  set currentRow(link: string) {
    this.$emit('update:currentLink', link)
  }

  paginationChange() {
    this.getGoods()
  }
  // currentChange(page: number) {
  //   this.params.page = page
  //   this.getGoods()
  // }

  titleChange() {
    this.getGoods()
  }

  // limitChange(value: number) {
  //   this.params.limit = value
  //   this.getGoods()
  // }

  beforeClose() {
    this.$emit('update:visible', false)
  }

  async getGoods() {
    this.loading = true
    const res = await getGoods(this.params)
    if (res.code && res.code === 20000) {
      this.tabelData = res.data.items
      this.total = res.data.total
    } else {
      this.tabelData = []
      this.total = 0
    }

    this.loading = false
  }

  mounted() {
    this.getGoods()
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-bottom: 10px;
}
.block ::v-deep .el-radio__label {
  display: none;
}
</style>
