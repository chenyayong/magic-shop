<template>
  <div class="sale-components">
    <!-- <magic-grid :data="compontents"></magic-grid> -->
    <draggable class="grid-list" :group="group">
      <div class="grid-item" v-for="item in compontents" :key="item.name">
        <div><i :class="[item.icon]"></i></div>
        <div>{{ item.name }}</div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Vue, Component } from 'vue-property-decorator'
import magicGrid from '@/components/magic-grid/index.vue'
@Component({
  name: 'sale-components',
  components: {
    draggable,
    magicGrid
  }
})
export default class extends Vue {
  private group = {
    name: 'site',
    pull: 'clone',
    put: false,
    sort: false
  }

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
<style scoped lang="scss">
.grid-list {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #eee;
  color: #5e6d82;
  overflow: hidden;
  padding: 0 !important;
}
.grid-item {
  flex-basis: calc(100% / 3);
  text-align: center;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  box-sizing: content-box;
  cursor: move;
  transition: all ease 0.3s;
  &:hover {
    background-color: $--color-primary;
    color: #fff;
  }
  i {
    font-size: 26px;
  }
}
</style>
