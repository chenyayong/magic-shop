<template>
  <div class="magic-goods component-setting">
    <h4>单图组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row type="flex" class="block">
            <el-col :span="8">背景颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.background"></el-color-picker></el-col>
          </el-row>
          <el-row class="block">
            <el-col>内边距</el-col>
            <el-col><el-slider :min="0" :max="30" v-model="componentData.data.padding" show-input=""></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <el-col>商品排列样式</el-col>
            <el-col>
              <el-radio-group v-model="radio">
                <el-radio-button label="0">一列</el-radio-button>
                <el-radio-button label="1">两列</el-radio-button>
                <el-radio-button label="2">三列</el-radio-button>
                <el-radio-button label="3">一行</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>商品圆角</el-col>
            <el-col><el-slider show-input=""></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <el-col>商品属性</el-col>
            <el-col>
              <el-radio-group v-model="radio1">
                <el-radio-button label="0">无</el-radio-button>
                <el-radio-button label="1">推荐</el-radio-button>
                <el-radio-button label="2">热销</el-radio-button>
                <el-radio-button label="3">新上</el-radio-button>
                <el-radio-button label="4">包邮</el-radio-button>
                <el-radio-button label="5">限时</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>内容显示</el-col>
            <el-col>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="0">标题</el-checkbox>
                <el-checkbox label="1">原价</el-checkbox>
                <el-checkbox label="2">现价</el-checkbox>
                <el-checkbox label="3">销量</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="数据配置" name="2">
          <magicGoodsDialog :tabelData="tabelData" @confirm="goodsConfirm" :visible.sync="goodsVisible" />
          <!-- <magicSettingGrid v-for="(item, index) in componentData.data.items" :items="componentData.data.items" :index="index" :item="item" :key="index"></magicSettingGrid> -->
          <el-button type="primary" style="width: 100%;" @click="goodsVisible = true">添加更多</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
// import magicSettingGrid from '@/components/magic-setting-grid/index.vue'
import magicGoodsDialog, { IGoodsItem } from '@/components/magic-goods-dialog/index.vue'
@Component({
  name: 'magicGoods',
  components: {
    magicGoodsDialog
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  private activeNames = ['1', '2']
  private radio = ''
  private radio1 = ''
  private checkList = ['0', '1']
  private goodsVisible = false
  private tabelData: IGoodsItem[] = []

  goodsConfirm(list: IGoodsItem[]) {
    this.tabelData = list
    console.log('goodsConfirm', list)
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
