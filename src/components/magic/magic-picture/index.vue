<template>
  <div class="magic-picture" :style="style">
    <el-skeleton :loading="!item.imgUrl" v-for="(item, index) in componentData.data.items" :key="index">
      <template slot="template">
        <el-skeleton-item variant="image" style="height: 160px;" />
      </template>
      <div class="picture">
        <img :src="item.imgUrl" alt="" srcset="" />
      </div>
    </el-skeleton>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicPictureComponent } from '@/store/magic/magic-picture'
@Component({
  name: 'magic_picture'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicPictureComponent
  get style() {
    const style = {
      padding: this.componentData.data.padding + 'px'
    }
    return style
  }
}
</script>
<style scoped lang="scss">
.picture {
  width: 100%;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
</style>
