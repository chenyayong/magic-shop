<template>
  <div class="images-list" v-loading="loading">
    <el-row type="flex" class="block">
      <el-input
        placeholder="请输入图片名称"
        v-model="params.title"
        @change="titleChange"
      ></el-input>
      <el-button type="primary" style="margin-left: 10px">搜 索</el-button>
    </el-row>
    <template v-if="list && list.length">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          @click="handleSelect(item)"
          class="el-upload-list__item is-success"
          v-for="item in list"
          :key="item.id"
        >
          <img :src="item.src" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions" :class="[item.src === imgUrl ? 'active' : '']">
            <i class="el-icon-circle-check"></i>
          </span>
        </li>
      </ul>
      <el-row type="flex" justify="end">
        <el-pagination
          background
          layout="prev, pager, next, sizes"
          :page-sizes="limits"
          @size-change="limitChange"
          :page-size="params.limit"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </el-row>
    </template>
    <template v-else>
      <el-empty></el-empty>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { debounce } from 'lodash'
import { getImages } from '@/api/images'
import { IImages } from '@/api/types'
@Component({
  name: 'imagesList'
})
export default class extends Vue {
  @Prop({ type: String, required: true }) imgUrl!: string
  private list: IImages[] = []
  private loading = false
  private limits = [10, 15, 20]
  private total = 0
  private params = {
    page: 1,
    limit: 10,
    title: ''
  }

  mounted() {
    this.getList = debounce(this.getList, 100) as any
    this.getList()
  }

  currentChange(page: number) {
    this.params.page = page
    this.getList()
  }

  titleChange(value: string) {
    this.params.title = value
    this.getList()
  }

  limitChange(value: number) {
    this.params.limit = value
    this.getList()
  }

  async getList() {
    this.loading = true
    const res = await getImages(this.params)
    this.list = res.data.items
    this.total = res.data.total
    this.loading = false
  }

  handleSelect(item: IImages) {
    this.$emit('update:imgUrl', item.src)
  }
}
</script>

<style scoped>
.block {
  margin-bottom: 20px;
}
.images-list .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.images-list .el-upload-list--picture-card .el-upload-list__item-actions.active {
  opacity: 1;
}
</style>
