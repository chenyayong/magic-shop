<template>
  <div class="magic-tabbar filter-item" :style="style">
    <van-tabbar :inactive-color="componentData.data.color" :active-color="componentData.data.selected_color" @change="tabbarChange" v-model="active">
      <van-tabbar-item v-for="(item, index) in componentData.data.items" :key="index">
        <template v-slot:icon>
          <i class="van-icon" v-if="active === index">
            <img :src="item.selected_icon_path" alt="" srcset="" />
          </i>
          <i class="van-icon" v-else>
            <img :src="item.icon_path" alt="" srcset="" />
          </i>
        </template>
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicTabbarComponent } from '@/store/magic/magic-tabbar'
import { Tabbar, TabbarItem } from 'vant'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
Vue.use(Tabbar)
Vue.use(TabbarItem)
@Component({
  name: 'magic_tabbar'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicTabbarComponent
  private active = 0

  tabbarChange(value: any) {
    console.log('tabbarChange', value)
  }

  get style() {
    const style = {
      background: this.componentData.data.background_color
    }
    return style
  }
}
</script>
<style scoped lang="scss">
.magic-tabbar {
  position: fixed !important;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 99;
  box-shadow: 0 0 6px #ddd;
}
.van-tabbar {
  background-color: transparent;
}
.magic-tabbar ::v-deep .van-tabbar-item--active {
  background-color: transparent;
}
</style>
