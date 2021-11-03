<template>
  <div class="magic-goods-dialog">
    <el-dialog title="选择添加商品" :visible.sync="visible" width="800px" :append-to-body="true">
      <el-row type="flex" class="block">
        <el-input placeholder="请输入关键字搜索"></el-input>
        <el-button type="primary" style="margin-left: 10px">搜 索</el-button>
      </el-row>
      <el-row class="block">
        <el-table :data="gridData" border ref="multipleTable">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
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
          <el-table-column property="status" align="center" label="商品状态">
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
        <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getGoods } from '@/api/goods'

export interface IGoodsItem {
  id: number
  src: string
  title: string
  status: number
  new_price: string
  old_price: string
  stock: number
}

@Component({
  name: 'magicGoodsDialog'
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean
  @Prop({ type: Array, default: () => [] }) tabelData!: IGoodsItem[]
  @Watch('visible')
  changeVisible(value: boolean) {
    if (value) {
      console.log('changeVisible', this.tabelData)
      this.tabelData.forEach((row) => {
        ;(this.$refs.multipleTable as any).toggleRowSelection(row)
      })
    } else {
      ;(this.$refs.multipleTable as any).clearSelection()
    }
  }

  private total = 0
  private gridData: IGoodsItem[] = [
    {
      id: 1,
      src:
        'https://app.global3plus.com/public/upload/goods/2021/09-19/b3aeba7fe9991bf41bca4d56afbda869.png',
      title: '升级套餐 (只限旧会员)',
      status: 0,
      new_price: '150.69',
      old_price: '145.69',
      stock: 1234
    },
    {
      id: 2,
      src:
        'https://app.global3plus.com/public/upload/goods/2021/09-19/b3aeba7fe9991bf41bca4d56afbda869.png',
      title: '升级套餐 (只限旧会员)',
      status: 1,
      new_price: '999.36',
      old_price: '1000.24',
      stock: 1235
    },
    {
      id: 3,
      src:
        'https://app.global3plus.com/public/upload/goods/2021/09-19/b3aeba7fe9991bf41bca4d56afbda869.png',
      title: '升级套餐 (只限旧会员)',
      status: 0,
      new_price: '123.34',
      old_price: '150.56',
      stock: 1236
    },
    {
      id: 4,
      src:
        'https://app.global3plus.com/public/upload/goods/2021/09-19/b3aeba7fe9991bf41bca4d56afbda869.png',
      title: '升级套餐 (只限旧会员)',
      status: 1,
      new_price: '100.59',
      old_price: '111.58',
      stock: 1237
    }
  ]

  confirm() {
    const selection = (this.$refs.multipleTable as any).selection
    if (selection && selection.length) {
      this.$emit('update:visible', false)
      this.$emit('confirm', selection)
    } else {
      this.$message({
        type: 'warning',
        message: '请选择商品'
      })
    }
  }

  async mounted() {
    const res = await getGoods({ page: 1 })
    this.gridData = res.data.items
    this.total = res.data.total
  }
}
</script>

<style scoped>
.block {
  margin-bottom: 10px;
}
</style>
