<template>
  <div class="three-col">
    <el-row class="row">
      <el-col class="col" :span="8">
        <ColSub
          :style="colStyle"
          v-for="(item, index) in leftItems"
          :item="item"
          :attribute="attribute"
          :content="componentData.data.content"
          :key="index"
        />
      </el-col>
      <el-col class="col" :span="8">
        <ColSub
          :style="colStyle"
          v-for="(item, index) in centerItems"
          :item="item"
          :attribute="attribute"
          :content="componentData.data.content"
          :key="index"
        />
      </el-col>
      <el-col class="col" :span="8">
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
  name: 'threeCol',
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
    const length = this.componentData.data.items.length
    const items = []
    for (let i = 0; i < length; i += 3) {
      const temp = this.componentData.data.items[i]
      items.push(temp)
    }
    return items
  }

  get centerItems() {
    const length = this.componentData.data.items.length
    const items = []
    for (let i = 1; i < length; i += 3) {
      const temp = this.componentData.data.items[i]
      items.push(temp)
    }
    return items
  }

  get rightItems() {
    const length = this.componentData.data.items.length
    const items = []
    for (let i = 2; i < length; i += 3) {
      const temp = this.componentData.data.items[i]
      items.push(temp)
    }
    return items
  }
}
</script>

<style lang="scss" scoped>
.col {
  &:nth-child(2n - 1) {
    padding-right: 5.3px;
  }
  &:nth-child(2n) {
    padding-left: 2.7px;
    padding-right: 2.7px;
  }

  &:nth-child(3n) {
    padding-left: 5.3px;
    padding-right: 0;
  }
}
</style>
