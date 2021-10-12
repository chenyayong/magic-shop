<template>
  <div class="layout-right-aside">
    <div :class="[active(index)]" class="aside-item" v-for="(item, index) in items" :key="item.name" @click="change(item, index)">
      <i :class="[item.icon]"></i>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const magic = namespace('magic')

interface IItems {
  name: string
  icon: string
}
@Component({
  name: 'LayoutAside'
})
export default class extends Vue {
  // private currentItem = 0
  // private items: IItems[] = [
  //   { name: '页面', icon: 'el-icon-tickets' },
  //   { name: '楼层', icon: 'el-icon-menu' }
  // ]
  @magic.State('componentsSetting') items!: IItems
  @magic.State('componentsSettingCurrentItem') currentItem!: number
  @magic.Mutation('SET_COMPONENTS_SETTING_CURRENT_ITEM') setCurrentItem!: (index: number) => void

  active(index: number) {
    return this.currentItem === index ? 'active' : ''
  }

  change(item: IItems, index: number) {
    // this.currentItem = index
    this.setCurrentItem(index)
    this.$emit('change', item, index)
  }
}
</script>

<style scoped lang="scss">
.layout-right-aside {
  position: absolute;
  top: 200px;
  margin-left: -20px;
  transform: translateX(-100%);
  .aside-item {
    width: 60px;
    height: 60px;
    background-color: $--color-white;
    color: $--color-info;
    border-radius: $--border-radius-base;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      background-color: $--color-primary;
      color: $--color-white;
      opacity: 0.7;
    }
    &.active {
      background-color: $--color-primary;
      color: $--color-white;
      opacity: 1;
    }
    i {
      font-size: 34px;
      margin-bottom: 2px;
    }
    span {
      font-size: $--font-size-base;
    }
  }
}
</style>
