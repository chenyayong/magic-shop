<template>
  <div class="magic-picture">
    <el-skeleton>
      <template slot="template">
        <el-skeleton-item variant="image" style="height: 160px;" />
      </template>
      <!-- <swiper :options="swiperOptions" :auto-update="true" :auto-destroy="true">
        <swiper-slide v-for="(item, index) in componentData.data.items" :key="index">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" srcset="" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper> -->
    </el-skeleton>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'magicPicture'
})
export default class extends Vue {}
</script>
<style scoped lang="scss"></style>
