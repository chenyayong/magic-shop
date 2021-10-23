<template>
  <div class="images-list" v-loading="loading">
    <el-row style="margin-bottom: 20px;" :gutter="30">
      <el-col :span="20"><el-input @change="titleInput" placeholder="请输入图片名称" v-model="title"></el-input></el-col>
      <el-col :span="4"><el-button type="primary">搜 索</el-button></el-col>
    </el-row>
    <template v-if="list && list.length">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li @click="handleSelect(item)" class="el-upload-list__item is-success" v-for="item in list" :key="item.id">
          <img src="http://bat367.bvimg.com/12800/61be522532c1ba7e.png" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions" :class="[item.active ? 'active' : '']">
            <span class="el-upload-list__item-preview" @click="dialogVisible = true"><i class="el-icon-zoom-in"></i></span>
          </span>
        </li>
      </ul>
      <el-pagination @current-change="currentChange" background layout="prev, pager, next" :total="total"></el-pagination>
    </template>
    <template v-else>
      <el-empty></el-empty>
    </template>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImg" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { debounce } from 'lodash'
import request from '@/utils/request'

@Component({
  name: 'imagesList'
})
export default class extends Vue {
  private list: any[] = []
  private total = 0
  private page = 1
  private title = ''
  private loading = false
  private dialogVisible = false

  get dialogImg() {
    const item = this.list.find((item) => item.active) || {}
    item.url = 'http://bat367.bvimg.com/12800/61be522532c1ba7e.png'
    return item && item.url
  }

  mounted() {
    this.getList = debounce(this.getList, 100) as any
    this.getList()
  }

  currentChange(page: number) {
    this.page = page
    this.getList()
  }

  titleInput(value: string) {
    this.page = 1
    this.title = value
    this.getList()
  }

  async getList() {
    this.loading = true
    const data: any = await request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: {
        page: this.page
        // title: this.title
      }
    })
    this.list = data.slice(0, 20).map((item: any) => {
      item.active = false
      return item
    })
    this.total = data.length
    this.loading = false
  }

  handleSelect(item: any) {
    const url = 'http://bat367.bvimg.com/12800/61be522532c1ba7e.png'
    this.list.forEach((item) => (item.active = false))
    item.active = true
    this.$emit('select', url)
  }
}
</script>

<style scoped>
.images-list .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.images-list .el-upload-list--picture-card .el-upload-list__item-actions.active {
  opacity: 1;
}
</style>
