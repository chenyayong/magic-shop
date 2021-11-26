<template>
  <div class="magic-search filter-item" :style="height">
    <van-search
      @focus="focus"
      :style="style"
      :clearable="false"
      :placeholder="componentData.data.placeholder"
      :shape="componentData.data.shape"
      :background="componentData.data.background"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSearchComponent } from '@/store/magic/magic-search'
@Component({
  name: 'magic_search'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSearchComponent

  get height() {
    const paddingTop = this.componentData.data.padding_top
    const paddingBottom = this.componentData.data.padding_bottom
    const style = {
      height: 34 + paddingTop + paddingBottom + 'px'
    }
    return style
  }

  get style() {
    const style = {
      paddingTop: this.componentData.data.padding_top + 'px',
      paddingBottom: this.componentData.data.padding_bottom + 'px'
    }
    return style
  }

  focus() {
    this.$router.push('/pages/search/index')
  }
}
</script>
<style scoped lang="scss">
.magic-search {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 6px #ddd;
  z-index: 999;
}
</style>
