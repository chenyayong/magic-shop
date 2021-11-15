<template>
  <div class="magic-goods component-setting">
    <h4>单图组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row type="flex" class="block">
            <el-col :span="8">背景颜色</el-col>
            <el-col
              ><el-color-picker v-model="componentData.data.background"></el-color-picker
            ></el-col>
          </el-row>
          <el-row class="block">
            <el-col>内边距</el-col>
            <el-col
              ><el-slider
                :min="0"
                :max="30"
                v-model="componentData.data.padding"
                show-input=""
              ></el-slider
            ></el-col>
          </el-row>
          <el-row class="block">
            <el-col>商品圆角</el-col>
            <el-col
              ><el-slider
                :min="0"
                :max="50"
                v-model="componentData.data.border_radius"
                show-input
              ></el-slider
            ></el-col>
          </el-row>
          <el-row class="block">
            <el-col>商品排列样式</el-col>
            <el-col>
              <el-radio-group v-model="componentData.data.layout">
                <el-radio-button :label="item.label" v-for="item in layouts" :key="item.label">{{
                  item.name
                }}</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>商品属性</el-col>
            <el-col>
              <el-radio-group v-model="componentData.data.attribute">
                <el-radio-button :label="item.label" v-for="item in attributes" :key="item.label">{{
                  item.name
                }}</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>内容显示</el-col>
            <el-col>
              <el-checkbox-group v-model="componentData.data.content">
                <el-checkbox :label="item.label" v-for="item in contents" :key="item.label">{{
                  item.name
                }}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="数据配置" name="2">
          <magicGoodsDialog @confirm="goodsConfirm" :visible.sync="goodsVisible" />
          <GoodsItem
            v-for="item in componentData.data.items"
            :key="item.goods_id"
            :data="item"
            :list="componentData.data.items"
          />
          <el-button type="primary" style="width: 100%;" @click="goodsVisible = true"
            >添加更多</el-button
          >
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import GoodsItem from './components/GoodsItem/index.vue'
import magicGoodsDialog from '@/components/magic-goods-dialog/index.vue'
import { IMagicGoodsComponent, IMagicGoodsItem } from '@/store/magic/magic-goods'
@Component({
  name: 'magic_goods',
  components: {
    magicGoodsDialog,
    GoodsItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGoodsComponent
  private activeNames = ['1', '2']
  private goodsList: IMagicGoodsItem[] = []
  private goodsVisible = false
  private layouts = [
    { label: 0, name: '一列' },
    { label: 1, name: '两列' },
    { label: 2, name: '三列' },
    { label: 3, name: '单行' }
  ]

  private attributes = [
    { label: 0, name: '无' },
    { label: 1, name: '推荐' },
    { label: 2, name: '热销' },
    { label: 3, name: '新上' },
    { label: 4, name: '包邮' },
    { label: 5, name: '限时' }
  ]

  private contents = [
    { label: 'goods_name', name: '标题' },
    { label: 'cost_price', name: '原价' },
    { label: 'shop_price', name: '现价' },
    { label: 'sales_sum', name: '销量' }
  ]

  goodsConfirm(list: IMagicGoodsItem[]) {
    this.componentData.data.items = list
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-bottom: 8px;
}
// .magic-goods ::v-deep .el-radio-button__inner {
//   font-size: 18px;
// }
</style>
