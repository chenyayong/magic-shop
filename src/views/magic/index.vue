<template>
  <div class="design-layout">
    <LayoutTop />
    <LayoutLeft />
    <LayoutContent />
    <LayoutRight />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LayoutTop from './components/LayoutTop/index.vue'
import LayoutLeft from './components/LayoutLeft/index.vue'
import LayoutContent from './components/LayoutContent/index.vue'
import LayoutRight from './components/LayoutRight/index.vue'
@Component({
  name: 'design-layou',
  components: { LayoutTop, LayoutLeft, LayoutContent, LayoutRight }
})
export default class extends Vue {}
</script>

<style scoped lang="scss">
.design-layout {
  display: block;
  position: relative;
  min-width: 100%;
  min-height: 100%;
  height: 100%;
  background: #edeff2;
}
</style>
