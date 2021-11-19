<template>
  <div class="magic-guideline" :style="style">
    <div class="border" :style="borderStyle"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicGuidelineComponent } from '@/store/magic/magic-guideline'
@Component({
  name: 'magic_guideline'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGuidelineComponent

  get style() {
    const padding = `${this.componentData.data.paddingTopAndBottom}px ${this.componentData.data.paddingLeftAndRight}px`
    const style = {
      background: this.componentData.data.background,
      padding
    }
    return style
  }

  get borderStyle() {
    const style = {
      borderTopWidth: this.componentData.data.border_width + 'px',
      borderTopStyle: this.componentData.data.border_style,
      borderTopColor: this.componentData.data.border_color
    }
    return style
  }
}
</script>
<style scoped lang="scss"></style>
