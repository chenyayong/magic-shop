<template>
  <div class="magic-goods" :style="style">
    <component :is="layout" :componentData="componentData" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import OneCol from './components/OneCol.vue'
import TwoCol from './components/TwoCol.vue'
import ThreeCol from './components/ThreeCol.vue'
import SingleRow from './components/SingleRow.vue'
import { IMagicGoodsComponent } from '@/store/magic/magic-goods'

@Component({
  name: 'magic_goods',
  components: {
    OneCol,
    TwoCol,
    ThreeCol,
    SingleRow
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGoodsComponent
  private layoutMap = {
    0: 'OneCol',
    1: 'TwoCol',
    2: 'ThreeCol',
    3: 'SingleRow'
  }

  get layout() {
    return this.layoutMap[this.componentData.data.layout]
  }

  get style() {
    const data = this.componentData.data
    const style = {
      background: data.background,
      padding: data.padding + 'px'
    }
    return style
  }
}
</script>
<style scoped lang="scss"></style>
