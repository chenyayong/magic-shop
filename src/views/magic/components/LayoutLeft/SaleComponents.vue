<template>
  <div class="sale-components">
    <magic-grid :data="compontents"></magic-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicGrid from '@/components/magic-grid/index.vue'
@Component({
  name: 'sale-components',
  components: {
    magicGrid
  }
})
export default class extends Vue {
  private compontents = [
    {
      name: '头条',
      icon: 'el-icon-eleme'
    },
    {
      name: '文章',
      icon: 'el-icon-zoom-out'
    },
    {
      name: '签到',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '门店',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '优惠券',
      icon: 'el-icon-picture-outline-round'
    },
    {
      name: '带货直播',
      icon: 'el-icon-picture-outline'
    },
    {
      name: '微社区',
      icon: 'el-icon-video-play'
    },
    {
      name: '幸运大转盘',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '短视频',
      icon: 'el-icon-picture-outline-round'
    },
    {
      name: '表单',
      icon: 'el-icon-picture-outline'
    },
    {
      name: '限时抢购',
      icon: 'el-icon-video-play'
    },
    {
      name: '拼团',
      icon: 'el-icon-video-play'
    },
    {
      name: '附近商品',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '定金阶梯团',
      icon: 'el-icon-picture-outline-round'
    },
    {
      name: '数据显示',
      icon: 'el-icon-picture-outline'
    },
    {
      name: '门店商家排名',
      icon: 'el-icon-video-play'
    }
  ]
}
</script>
