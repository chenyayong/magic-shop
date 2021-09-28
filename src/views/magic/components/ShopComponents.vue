<template>
  <div class="shop-components">
    <magic-grid :data="compontents"></magic-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicGrid from '@/components/magic-grid/index.vue'
@Component({
  name: 'shop-components',
  components: {
    magicGrid
  }
})
export default class extends Vue {
  private compontents = [
    {
      name: '轮播图',
      icon: 'el-icon-eleme'
    },
    {
      name: '商品列表',
      icon: 'el-icon-zoom-out'
    },
    {
      name: '按钮组',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '定位',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '搜索框',
      icon: 'el-icon-picture-outline-round'
    },
    {
      name: '公告',
      icon: 'el-icon-picture-outline'
    },
    {
      name: '店招',
      icon: 'el-icon-video-play'
    },
    {
      name: '悬浮按钮',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '地图',
      icon: 'el-icon-picture-outline-round'
    },
    {
      name: '回到顶部',
      icon: 'el-icon-picture-outline'
    },
    {
      name: '选项卡',
      icon: 'el-icon-video-play'
    }
  ]
}
</script>
