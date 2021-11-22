<template>
  <div class="magic-grid">
    <grid :border="false" :column-num="componentData.data.rowButtonCount">
      <grid-item v-for="(item, index) in items" :key="index">
        <el-skeleton :loading="!item.img_url">
          <template slot="template">
            <el-row type="flex" justify="center">
              <el-skeleton-item variant="image" :style="imgStyle" />
            </el-row>
            <el-row type="flex" justify="center" style="margin-top: 10px;">
              <el-skeleton-item variant="h3" style="width: 70%;" />
            </el-row>
          </template>
          <template>
            <el-row @click.native="handleButton(item.img_link)">
              <div class="button-group__image">
                <img :src="item.img_url" alt="" srcset="" :style="imgStyle" />
              </div>
              <div class="button-group__text" :style="textStyle">
                {{ item.img_label }}
              </div>
            </el-row>
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
import { IComponentData } from '@/store/magic'
import { IMagicButtonGroupItem } from '@/store/magic/magic-button-group'
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
      width: this.componentData.data.button_size + 'px',
      height: this.componentData.data.button_size + 'px',
      borderRadius: this.componentData.data.button_round + 'px'
    }
    return style
  }

  get textStyle() {
    const style = {
      color: this.componentData.data.text_color,
      fontSize: this.componentData.data.text_size + 'px'
    }
    return style
  }

  handleButton(link: string) {
    this.$router.push(link)
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
.magic-grid ::v-deep .van-grid-item__content > div {
  width: 100%;
}
.magic-grid ::v-deep .el-skeleton__image svg {
  width: 60%;
  height: 60%;
}
.magic-grid ::v-deep .button-group__image {
  overflow: hidden;
  text-align: center;
}
.magic-grid ::v-deep .button-group__image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.magic-grid ::v-deep .button-group__text {
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
