<template>
  <!--  eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="signle-row">
    <el-skeleton style="width: 100%;" :loading="loading">
      <template slot="template">
        <div style="display: flex; align-items: stretch;">
          <div><el-skeleton-item variant="image" style="width: 120px; height: 120px;" /></div>
          <div style="width: 100%;display: flex;flex-direction: column;justify-content: space-around;margin-left:20px;">
            <el-skeleton-item variant="p" style="width: 70%;" />
            <el-skeleton-item variant="p" style="width: 50%;" />
            <el-skeleton-item variant="p" style="width: 30%;" />
            <el-skeleton-item variant="p" style="width: 30%;" />
          </div>
        </div>
      </template>
      <el-row class="row" type="flex" :style="colStyle" v-for="(item, index) in componentData.data.items" :key="index">
        <el-col class="block-img">
          <img :src="item.src" alt="" srcset="" />
          <svg-icon v-if="attribute" :name="attribute" width="30" height="30" color="#F56C6C"></svg-icon>
        </el-col>
        <el-col>
          <el-row class="label" :class="[key]" v-for="(value, key) in contentMap" v-if="contentFilter(key)" :key="key">{{ value }} {{ item[key] }}</el-row>
        </el-col>
      </el-row>
    </el-skeleton>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicGoodsComponent } from '@/store/magic/magic-goods'
@Component({
  name: 'signleRow'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGoodsComponent

  private attributeMap: { [key: string]: any } = {
    0: '',
    1: 'tuijian',
    2: 'rexiao',
    3: 'xinpin',
    4: 'baoyou',
    5: 'xsqg'
  }

  private contentMap = {
    title: '',
    sales: '销量',
    new_price: '￥',
    old_price: '￥'
  }

  contentFilter(key: string) {
    return this.componentData.data.content.indexOf(key) > -1
  }

  get loading() {
    const length = this.componentData.data.items.length
    return !length
  }

  get attribute() {
    return this.attributeMap[this.componentData.data.attribute]
  }

  get colStyle() {
    const style = {
      borderRadius: this.componentData.data.border_radius + 'px'
    }
    return style
  }
}
</script>

<style lang="scss" scoped>
.signle-row ::v-deep .svg-icon {
  position: absolute;
  left: 6px;
  top: 6px;
}
.signle-row {
  .row {
    position: relative;
    background-color: #fff;
    margin-bottom: 8px;
    padding: 8px;
    overflow: hidden;
    box-shadow: $--box-shadow-dark;
    .block-img {
      width: 125px;
      height: 125px;
      margin-right: 20px;
      position: relative;
      img {
        width: 125px;
        height: 125px;
        display: block;
      }
    }
    .label {
      font-size: 12px;
      color: $--color-text-secondary;
    }
    .title {
      position: absolute;
      top: 8px;
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
    .sales {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .price {
      position: absolute;
      bottom: 8px;
    }
    .new_price {
      color: $--color-danger;
      position: absolute;
      bottom: 24px;
    }
    .old_price {
      position: absolute;
      bottom: 8px;
      text-decoration: line-through;
    }
  }
}
</style>
