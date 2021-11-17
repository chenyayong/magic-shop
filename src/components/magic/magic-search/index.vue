<template>
  <div class="magic-search">
    <van-search :style="style" :clearable="false" :placeholder="componentData.data.placeholder" :shape="componentData.data.shape" :background="componentData.data.background" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSearchComponent } from '@/store/magic/magic-search'
import { Search } from 'vant'
import 'vant/lib/search/style'
Vue.use(Search)
@Component({
  name: 'magic_search'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSearchComponent
  get style() {
    const style = {
      paddingTop: this.componentData.data.padding_top + 'px',
      paddingBottom: this.componentData.data.padding_bottom + 'px'
    }
    return style
  }
}
</script>
