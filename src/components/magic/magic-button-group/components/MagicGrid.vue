<template>
  <div class="magic-grid">
    <grid :border="false" :column-num="componentData.data.rowButtonCount">
      <grid-item v-for="(item, index) in items" :key="index">
        <el-skeleton :loading="!item.imgUrl">
          <template slot="template">
            <el-skeleton-item variant="image" :style="imgStyle" />
            <div style="margin-top: 10px;display: flex; justify-content: center;">
              <el-skeleton-item variant="h3" style="width: 70%;" />
            </div>
          </template>
          <template>
            <div class="button-group__image" :style="imgStyle">
              <img :src="item.imgUrl" alt="" srcset="" />
            </div>
            <div class="button-group__text" :style="textStyle">
              {{ item.imgLabel }}
            </div>
          </template>
        </el-skeleton>
      </grid-item>
    </grid>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Grid from 'vant/lib/grid'
import GridItem from 'vant/lib/grid-item'
import 'vant/lib/grid/style'
import 'vant/lib/grid-item/style'
import { IComponentData, IMagicButtonGroupItem } from '@/store/magic'
@Component({
  name: 'magicGrid',
  components: {
    Grid,
    GridItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  @Prop({ type: Array, required: true }) items!: IMagicButtonGroupItem[]

  get imgStyle() {
    const style = {
      width: this.componentData.data?.buttonSize + 'px',
      height: this.componentData.data?.buttonSize + 'px',
      borderRadius: this.componentData.data?.buttonRound + 'px'
    }
    return style
  }

  get textStyle() {
    const style = {
      color: this.componentData.data?.textColor,
      fontSize: this.componentData.data?.textSize + 'px'
    }
    return style
  }

  mounted() {
    console.log('mounted grid', this.componentData)
  }
}
</script>

<style scoped lang="scss">
.magic-grid ::v-deep .van-grid-item {
  overflow: hidden;
}
.magic-grid ::v-deep .van-grid-item__content {
  background-color: transparent;
  height: auto;
  padding: 10px;
}
.magic-grid ::v-deep .el-skeleton__image svg {
  width: 60%;
  height: 60%;
}
.button-group__image {
  overflow: hidden;
}
.button-group__image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.button-group__text {
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: auto;
  text-align: center;
  color: #000;
  font-size: 12px;
}
</style>
