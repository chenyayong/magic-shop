<template>
  <div class="swiper-item">
    <i class="item el-icon-delete" @click="dele"></i>
    <el-row>
      <div class="el-upload el-upload--picture-card" @click="uploadHandle" v-if="!item.imgUrl">
        <i class="el-icon-plus"></i>
      </div>
      <ul class="el-upload-list el-upload-list--picture-card" v-else>
        <li class="el-upload-list__item is-success">
          <img :src="item.imgUrl" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePreview"><i class="el-icon-zoom-in"></i></span>
            <span class="el-upload-list__item-delete" @click="handleRemove"><i class="el-icon-delete"></i></span>
          </span>
        </li>
      </ul>
    </el-row>
    <el-row :gutter="10" style="margin-top: 15px;">
      <el-col :span="18"><el-input placeholder="请输入链接" v-model="item.imgLink"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" @click="linksVisible = true">选择</el-button></el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="item.imgUrl" alt="" />
    </el-dialog>
    <MagicLinksFactory @confirm="linkConfirm" :visible.sync="linksVisible"></MagicLinksFactory>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MagicLinksFactory from '@/components/magic-links-factory/index.vue'
@Component({
  name: 'swiperItem',
  components: {
    MagicLinksFactory
  }
})
export default class extends Vue {
  @Prop({ type: Array }) items!: { imgUrl: string; imgLink: string }[]
  @Prop({ type: Object, required: true }) item!: { imgUrl: string; imgLink: string }
  @Prop({ type: Number, required: true }) index!: number
  private dialogVisible = false
  private linksVisible = false

  get fileList() {
    return [{ url: this.item.imgUrl }]
  }

  handlePreview() {
    this.dialogVisible = true
  }

  handleRemove() {
    this.item.imgUrl = ''
  }

  dele() {
    this.items.splice(this.index, 1)
    this.$emit('dele', this.index)
  }

  uploadHandle() {
    this.$emit('upload', this.item, this.index)
  }

  linkConfirm(value: any) {
    this.item.imgLink = 'hello' // value.link
    console.log('linkConfirm', value)
  }
}
</script>

<style lang="scss" scoped>
.swiper-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  .item.el-icon-delete {
    position: absolute;
    right: 6px;
    top: 6px;
    cursor: pointer;
    font-size: 18px;
    color: $--color-primary;
  }
}
.swiper-item ::v-deep .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.swiper-item ::v-deep .el-upload-list__item {
  width: 100px;
  height: 100px;
}
</style>
