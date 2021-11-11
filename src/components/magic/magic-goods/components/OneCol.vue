<template>
  <!--  eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="one-col">
    <el-skeleton style="width: 100%;" :loading="loading">
      <template slot="template">
        <el-skeleton-item variant="image" style="width: 100%; height: 150px;" />
        <div style="padding: 14px;">
          <el-skeleton-item variant="p" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between;">
            <el-skeleton-item variant="text" style="margin-right: 16px;" />
            <el-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
      <el-row class="row" :style="colStyle" v-for="(item, index) in componentData.data.items" :key="index">
        <div class="block-img">
          <img :src="item.src" alt="" srcset="" />
          <svg-icon v-if="attribute" :name="attribute" width="30" height="30" color="#F56C6C"></svg-icon>
          <div class="block-img-descript">
            <el-row class="label" :class="[key]" v-for="(value, key) in contentMap" v-if="contentFilter(key)" :key="key">{{ value }}{{ item[key] }}</el-row>
          </div>
        </div>
      </el-row>
    </el-skeleton>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicGoodsComponent } from '@/store/magic/magic-goods'
@Component({
  name: 'oneCol'
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
.one-col ::v-deep .svg-icon {
  position: absolute;
  left: 6px;
  top: 6px;
}
.one-col {
  .row {
    position: relative;
    background-color: #fff;
    margin-bottom: 8px;
    // padding: 8px;
    overflow: hidden;
    box-shadow: $--box-shadow-dark;
    .block-img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .block-img-descript {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
    .label {
      font-size: 12px;
      padding-left: 10px;
      color: $--color-white;
    }
    .title {
      font-weight: bold;
      font-size: 14px;
      padding-top: 10px;
      padding-bottom: 10px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .sales {
      margin-top: 10px;
    }
    .new_price {
      margin-top: 10px;
      color: $--color-danger;
      font-size: 18px;
    }
    .old_price {
      margin-bottom: 10px;
      text-decoration: line-through;
    }
  }
}
</style>
