<template>
  <div class="base-components">
    <draggable class="grid-list" :list="compontents" :clone="clone" :group="group" :sort="false">
      <!-- <magic-grid :data="compontents"></magic-grid> -->
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
  name: 'base-components',
  components: {
    draggable,
    magicGrid
  }
})
export default class extends Vue {
  private group = {
    name: 'site',
    pull: 'clone',
    put: false
  }

  private compontents = [
    {
      name: '轮播图',
      icon: 'el-icon-picture',
      keyworld: 'magicSwipe'
    },
    {
      name: '按钮组',
      icon: 'el-icon-switch-button',
      keyworld: 'magicButtonGroup'
    },
    {
      name: '单图',
      icon: 'el-icon-picture-outline',
      keyworld: 'magicPicture'
    },
    {
      name: '图片组合',
      icon: 'el-icon-camera',
      keyworld: 'magicPictureGroup'
    }
    // {
    //   name: '标题栏',
    //   icon: 'el-icon-eleme'
    // },
    // {
    //   name: '辅助空白',
    //   icon: 'el-icon-zoom-out'
    // },
    // {
    //   name: '辅助线',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '富文本',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '视频',
    //   icon: 'el-icon-video-play'
    // }
  ]

  clone(value: any) {
    console.log('cloneDog', value)
    return value
  }
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
