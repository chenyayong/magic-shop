<template>
  <div class="search">
    <van-search show-action placeholder="请输入搜索关键词" shape="round" @cancel="cancel"></van-search>
    <div class="search-history">
      <div class="label">搜索历史</div>
      <div class="icon"><i class="van-icon van-icon-delete-o"></i></div>
    </div>
    <div class="search-tags">
      <van-tag type="primary" v-for="i in 3" :key="i" closeable round size="medium">标签</van-tag>
    </div>
    <div class="search-filter">
      <van-dropdown-menu ref="dropdownMenu">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Search, Tag, DropdownMenu, DropdownItem } from 'vant'
import 'vant/lib/search/style'
import 'vant/lib/tag/style'
import 'vant/lib/dropdown-menu/style'
import 'vant/lib/dropdown-item/style'
Vue.use(Search)
Vue.use(Tag)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
@Component({
  name: 'Search'
})
export default class extends Vue {
  private value1 = 0
  private value2 = 'a'
  private option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 }
  ]

  private option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' }
  ]

  cancel() {
    this.$router.back()
  }

  marginTop() {
    const clientHeight = document.body.clientHeight
    const height = 640
    const value = height / 2 - clientHeight / 2
    return value
  }

  mounted() {
    const el = (this.$refs.dropdownMenu as any).$el as HTMLElement
    // eslint-disable-next-line no-undef
    const items = el.querySelectorAll('.van-dropdown-item') as NodeListOf<HTMLElement>
    items.forEach((item) => {
      item.style.marginTop = this.marginTop() + 'px'
    })
  }
}
</script>
<style scoped lang="scss">
.van-icon-arrow-left {
  padding-right: 4px;
  font-size: 22px;
  color: #c0c4cc;
  cursor: pointer;
}
.search-history {
  display: flex;
  justify-content: space-between;
  padding: 20px 12px;
  .label {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .icon {
    font-size: 16px;
  }
}
.search-tags {
  padding: 0 12px;
  .van-tag {
    margin-bottom: 8px;
    margin-right: 8px;
  }
}
.search-filter {
}
</style>
