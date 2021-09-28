<template>
  <div class="base-components">
    <magic-grid :data="compontents"></magic-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import magicGrid from '@/components/magic-grid/index.vue'
@Component({
  name: 'base-components',
  components: {
    magicGrid
  }
})
export default class extends Vue {
  private compontents = [
    {
      name: '标题栏',
      icon: 'el-icon-eleme'
    },
    {
      name: '辅助空白',
      icon: 'el-icon-zoom-out'
    },
    {
      name: '辅助线',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '富文本',
      icon: 'el-icon-remove-outline'
    },
    {
      name: '图片组合',
      icon: 'el-icon-picture-outline-round'
    },
    {
      name: '单图',
      icon: 'el-icon-picture-outline'
    },
    {
      name: '视频',
      icon: 'el-icon-video-play'
    }
  ]
}
</script>
