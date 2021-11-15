<template>
  <div class="goods-item">
    <el-row type="flex" class="block">
      <el-col>ID: {{ data.goods_id }}</el-col>
      <el-col style="text-align: right;"><i @click="dele" class="el-icon-delete"></i></el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" class="block">
      <el-col class="block-img"><img :src="data.original_img" alt="" srcset="" /></el-col>
      <el-col>{{ data.goods_name }}</el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IGoods } from '@/api/types'
@Component({
  name: 'goodsItem'
})
export default class extends Vue {
  @Prop({ type: Array }) list!: IGoods[]
  @Prop({ type: Object }) data!: IGoods

  dele() {
    const index = this.list.findIndex((e) => e.goods_id === this.data.goods_id)
    if (index > -1) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.goods-item {
  border: 1px #ddd solid;
  padding: 10px;
  margin-bottom: 10px;
}
.block {
  margin-bottom: 10px;
  .el-icon-delete {
    font-size: 18px;
    cursor: pointer;
    color: $--color-primary;
  }
  .block-img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
