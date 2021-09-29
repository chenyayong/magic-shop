<template>
  <div class="shop-components">
    <!-- <magic-grid :data="compontents"></magic-grid> -->
    <draggable class="grid-list" group="site">
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
  name: 'shop-components',
  components: {
    draggable,
    magicGrid
  }
})
export default class extends Vue {
  private compontents = [
    {
      name: '商品列表',
      icon: 'el-icon-goods'
    }
    // {
    //   name: '定位',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '搜索框',
    //   icon: 'el-icon-picture-outline-round'
    // },
    // {
    //   name: '公告',
    //   icon: 'el-icon-picture-outline'
    // },
    // {
    //   name: '店招',
    //   icon: 'el-icon-video-play'
    // },
    // {
    //   name: '悬浮按钮',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '地图',
    //   icon: 'el-icon-picture-outline-round'
    // },
    // {
    //   name: '回到顶部',
    //   icon: 'el-icon-picture-outline'
    // },
    // {
    //   name: '选项卡',
    //   icon: 'el-icon-video-play'
    // }
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
