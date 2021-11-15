<template>
  <!--  eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="col-sub">
    <div class="block-img">
      <img :src="item.original_img" alt="" srcset="" />
      <svg-icon v-if="attribute" :name="attribute" width="30" height="30" color="#F56C6C"></svg-icon>
    </div>
    <div class="label" :class="[key]" v-for="(value, key) in contentMap" v-if="contentFilter(key)" :key="key">{{ value }} {{ item[key] }}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicGoodsItem } from '@/store/magic/magic-goods'
@Component({
  name: 'TwoColSub'
})
export default class extends Vue {
  // @Prop({ type: Object, required: true }) componentData!: IMagicGoodsComponent
  @Prop({ type: Object, required: true }) item!: IMagicGoodsItem
  @Prop({ type: String, required: true }) attribute!: string
  @Prop({ type: Array, required: true }) content!: string[]
  private contentMap = {
    goods_name: '',
    sales_sum: '销量',
    shop_price: '￥',
    cost_price: '￥'
  }

  contentFilter(key: string) {
    return this.content.indexOf(key) > -1
  }
}
</script>

<style lang="scss" scoped>
.col-sub ::v-deep .svg-icon {
  position: absolute;
  left: 6px;
  top: 6px;
}
.col-sub {
  position: relative;
  background-color: #fff;
  margin-bottom: 8px;
  padding-bottom: 8px;
  overflow: hidden;
  box-shadow: $--box-shadow-dark;
  .block-img {
    // margin-top: 8px;
    img {
      width: 100%;
      display: block;
      // height: calc(100% / 2 - 4px);
      // object-fit: contain;
    }
  }
  .label {
    // margin-top: 8px;
    font-size: 12px;
    padding-left: 6px;
    color: $--color-text-secondary;
  }
  .goods_name {
    color: $--color-text-primary;
    font-weight: bold;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 6px;
  }
  .sales_sum {
    margin-top: 12px;
  }
  .shop_price {
    color: $--color-danger;
    margin-top: 12px;
    font-size: 16px;
  }
  .cost_price {
    text-decoration: line-through;
    margin-top: 2px;
  }
}
</style>
