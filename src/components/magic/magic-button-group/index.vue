<template>
  <div class="magic-button-group" :style="style">
    <grid :border="false" :column-num="componentData.data.rowButtonCount" :square="true" :icon-size="componentData.data.buttonSize + 'px'">
      <grid-item icon="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" text="文字" />
      <grid-item icon="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" text="文字" />
      <grid-item icon="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" text="文字" />
      <grid-item icon="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" text="文字" />
    </grid>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Grid from 'vant/lib/grid'
import GridItem from 'vant/lib/grid-item'
import 'vant/lib/grid/style'
import 'vant/lib/grid-item/style'
import { IComponentData } from '@/store/magic/index'

@Component({
  name: 'magicButtonGroup',
  components: {
    Grid,
    GridItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData

  get style() {
    const style = {
      paddingTop: this.componentData.data?.paddingTop + 'px',
      paddingBottom: this.componentData.data?.paddingBottom + 'px',
      background: this.componentData.data?.background,
      size: this.componentData.data?.textSize + 'px',
      color: this.componentData.data?.textColor
    }
    return style
  }

  mounted() {
    console.log('mounted', this.componentData)
  }
}
</script>
<style scoped lang="scss"></style>
