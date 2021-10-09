<template>
  <el-tooltip class="magic-swipe" content="轮播图" placement="left-start" :value="true" :manual="true" :popper-options="{ boundariesElement: 'body', gpuAcceleration: false }">
    <el-skeleton :loading="loading">
      <template slot="template">
        <el-skeleton-item variant="image" style="height: 160px;" />
      </template>
      <el-carousel height="160px" arrow="never" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-skeleton>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'magicSwipe'
})
export default class extends Vue {
  private loading = true
}
</script>
<style scoped lang="scss"></style>
