<template>
  <div class="button-group-data">
    <i class="el-icon-delete" @click="dele"></i>
    <el-row type="flex" align="middle">
      <el-col :span="14">
        <el-upload list-type="picture-card" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
      <el-col>
        <el-input placeholder="请输入文本" v-model="item.imgLabel"></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top: 15px;">
      <el-col :span="18"><el-input placeholder="请输入链接" v-model="item.imgLink"></el-input></el-col>
      <el-col :span="6"><el-button type="primary">选择</el-button></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'buttonGroupItem'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) item!: { imgUrl: string; imgLink: string; imgLabel: string }
  @Prop({ type: Number }) index!: number
  dele() {
    this.$emit('dele', this.index)
  }
}
</script>

<style lang="scss" scoped>
.button-group-data {
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
.button-group-data ::v-deep .el-upload--picture-card {
  width: 70px;
  height: 70px;
  line-height: 70px;
}
</style>
