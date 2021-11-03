<template>
  <div class="magic-goods" :style="style">
    <el-row class="row">
      <el-col class="col" :span="12">
        <div class="col-sub" :style="colStyle" v-for="(item, index) in leftItems" :key="index">
          <div class="block-img">
            <img :src="item.src" alt="" srcset="" />
          </div>
          <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
          <div class="label" :class="[key]" v-for="(value, key) in contentMap" v-if="contentFilter(key)" :key="key">{{ value }} {{ item[key] }}</div>
        </div>
      </el-col>
      <el-col class="col" :span="12">
        <div class="col-sub" :style="colStyle" v-for="(item, index) in leftItems" :key="index">
          <div class="block-img">
            <img :src="item.src" alt="" srcset="" />
          </div>
          <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
          <div class="label" :class="[key]" v-for="(value, key) in contentMap" v-if="contentFilter(key)" :key="key">{{ value }} {{ item[key] }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicGoodsComponent } from '@/store/magic/magic-goods'
@Component({
  name: 'magicGoods'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGoodsComponent
  private contentMap = {
    title: '',
    sales: '销量',
    new_price: '￥',
    old_price: '￥'
  }

  get style() {
    const data = this.componentData.data
    const style = {
      background: data.background,
      padding: data.padding + 'px'
    }
    return style
  }

  get colStyle() {
    const style = {
      borderRadius: this.componentData.data.borderRadius + 'px'
    }
    return style
  }

  get content() {
    const content = this.componentData.data.content
    return content
  }

  get leftItems() {
    const items = this.componentData.data.items.filter((e, index) => index % 2 === 0)
    return items
  }

  get rightItems() {
    const items = this.componentData.data.items.filter((e, index) => index % 2 !== 0)
    return items
  }

  contentFilter(key: string) {
    return this.content.indexOf(key) > -1
  }
}
</script>
<style scoped lang="scss">
.col {
  &:nth-child(even) {
    padding-left: 4px;
  }
  &:nth-child(odd) {
    padding-right: 4px;
  }
  .col-sub {
    background-color: #fff;
    margin-bottom: 8px;
    padding-bottom: 8px;
    overflow: hidden;
  }
  .label {
    margin-top: 12px;
    font-size: 12px;
    padding-left: 6px;
    color: $--color-text-secondary;
  }
  .title {
    color: $--color-text-primary;
    font-weight: bold;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  // .sales {
  //   margin-bottom: 12px;
  // }
  .new_price {
    color: $--color-danger;
    // margin-top: 12px;
  }
  .old_price {
    text-decoration: line-through;
    margin-top: 4px;
  }
}
.block-img {
  // margin-top: 8px;
  img {
    width: 100%;
    // height: calc(100% / 2 - 4px);
    // object-fit: contain;
  }
}
</style>
