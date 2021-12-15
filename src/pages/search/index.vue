<template>
  <div class="search">
    <van-search @search="handleSearch" show-action v-model="searchValue" placeholder="请输入搜索关键词" shape="round" @cancel="cancel"></van-search>
    <div class="search-history">
      <div class="label">搜索历史</div>
      <div class="icon"><i class="van-icon van-icon-delete-o"></i></div>
    </div>
    <div class="search-tags">
      <van-tag type="primary" v-for="item in getSearchHistory" :key="item" closeable round size="medium">{{ item }}</van-tag>
    </div>
    <div class="search-filter">
      <!-- <van-dropdown-menu>
        <van-dropdown-item>
          <div slot="title">hello</div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item">
          <van-cell center title="包邮">
            <template #right-icon>
              <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
            </template>
          </van-cell>
          <van-cell center title="团购">
            <template #right-icon>
              <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
            </template>
          </van-cell>
          <div style="padding: 5px 16px;">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { setStorage, getStorage } from '@/utils/storage'
@Component({
  name: 'Search'
})
export default class extends Vue {
  private searchValue = ''
  private searchHistory = getStorage({ key: 'pages-search' })

  get getSearchHistory() {
    const search = this.searchHistory ? this.searchHistory.split(',') : []
    return search
  }

  handleSearch(value: string) {
    const search = this.searchHistory
    if (!value.trim()) {
      return false
    }
    if (search && !search.includes(value)) {
      const searchArr = search.split(',')
      searchArr.unshift(value)
      setStorage({ key: 'pages-search', data: searchArr.join(',') })
      this.searchHistory = searchArr.join(',')
    } else if (search && search.includes(value)) {
      const searchArr = search.split(',')
      const index = searchArr.indexOf(value)
      searchArr.splice(index, 1)
      searchArr.unshift(value)
      setStorage({ key: 'pages-search', data: searchArr.join(',') })
      this.searchHistory = searchArr.join(',')
    } else {
      setStorage({ key: 'pages-search', data: value })
      this.searchHistory = value
    }
  }

  cancel() {
    this.$router.back()
  }

  marginTop() {
    const clientHeight = document.body.clientHeight
    const height = 640
    const value = height / 2 - clientHeight / 2
    return value
  }

  // mounted() {
  //   const el = (this.$refs.dropdownMenu as any).$el as HTMLElement
  //   // eslint-disable-next-line no-undef
  //   const items = el.querySelectorAll('.van-dropdown-item') as NodeListOf<HTMLElement>
  //   items.forEach((item) => {
  //     item.style.marginTop = this.marginTop() + 'px'
  //   })
  // }
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
</style>
