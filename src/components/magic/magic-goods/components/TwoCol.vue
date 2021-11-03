<template>
  <div class="two-col">
    <el-row class="row">
      <el-col class="col" :span="12">
        <ColSub
          :style="colStyle"
          v-for="(item, index) in leftItems"
          :item="item"
          :attribute="attribute"
          :content="componentData.data.content"
          :key="index"
        />
      </el-col>
      <el-col class="col" :span="12">
        <ColSub
          :style="colStyle"
          v-for="(item, index) in rightItems"
          :item="item"
          :attribute="attribute"
          :content="componentData.data.content"
          :key="index"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ColSub from './ColSub.vue'
import { IMagicGoodsComponent } from '@/store/magic/magic-goods'
@Component({
  name: 'twoCol',
  components: {
    ColSub
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGoodsComponent

  get colStyle() {
    const style = {
      borderRadius: this.componentData.data.borderRadius + 'px'
    }
    return style
  }

  private attributeMap: { [key: string]: any } = {
    0: '',
    1: 'tuijian',
    2: 'rexiao',
    3: 'xinpin',
    4: 'baoyou',
    5: 'xsqg'
  }

  get attribute() {
    return this.attributeMap[this.componentData.data.attribute]
  }

  get leftItems() {
    const items = this.componentData.data.items.filter((item, index) => {
      return index % 2 === 0
    })
    return items
  }

  get rightItems() {
    const items = this.componentData.data.items.filter((item, index) => {
      return index % 2 !== 0
    })
    return items
  }
}
</script>

<style lang="scss" scoped>
.col {
  &:nth-child(even) {
    padding-left: 4px;
  }
  &:nth-child(odd) {
    padding-right: 4px;
  }
}
</style>
