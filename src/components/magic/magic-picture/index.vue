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
import { IComponentData } from '@/store/magic/index'
@Component({
  name: 'magicPicture'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  get style() {
    const style = {
      padding: this.componentData.data?.padding + 'px'
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
  }
}
</style>
