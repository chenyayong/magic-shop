<template>
  <div class="swiper-data">
    <i class="el-icon-delete" @click="dele"></i>
    <el-upload list-type="picture-card" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-row :gutter="10" style="margin-top: 15px;">
      <el-col :span="18"><el-input placeholder="请输入链接"></el-input></el-col>
      <el-col :span="6"><el-button type="primary">选择</el-button></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'pictureItem'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) item!: { imgUrl: string; imgLink: string }
  @Prop({ type: Number }) index!: number
  dele() {
    this.$emit('dele', this.index)
  }
}
</script>

<style lang="scss" scoped>
.swiper-data {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  .el-icon-delete {
    position: absolute;
    right: 6px;
    top: 6px;
    cursor: pointer;
    font-size: 18px;
    color: $--color-primary;
  }
}
.swiper-data ::v-deep .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>
