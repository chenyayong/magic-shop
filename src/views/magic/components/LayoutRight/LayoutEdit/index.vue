<template>
  <div class="layout-edit">
    <el-empty v-if="!currentComponent"></el-empty>
    <transition mode="out-in" name="slide-fade">
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import magicSwipe from '@/components/magic-swipe/index.vue'
// import magicGoods from '@/components/magic-goods/index.vue'
// import magicPicture from '@/components/magic-picture/index.vue'
// import magicPictureGroup from '@/components/magic-picture-group/index.vue'
// import magicButtonGroup from '@/components/magic-button-group/index.vue'
@Component({
  name: 'LayoutEdit',
  components: {
    // magicSwipe,
    // magicGoods,
    // magicPicture,
    // magicPictureGroup,
    // magicButtonGroup
  }
})
export default class extends Vue {
  private components = ['magicSwipe', 'magicGoods', 'magicPicture', 'magicPictureGroup', 'magicButtonGroup']
  private currentComponent = ''
  change() {
    const index = Math.floor(Math.random() * 5)
    this.currentComponent = this.components[index]
  }
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
