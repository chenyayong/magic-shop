<template>
  <div class="swiper-item setting-item">
    <!-- <i class="item el-icon-delete" @click="dele"></i> -->
    <el-row>
      <div class="el-upload el-upload--picture-card" @click="uploadVisible = true" v-if="!item.imgUrl">
        <i class="el-icon-plus"></i>
      </div>
      <ul class="el-upload-list el-upload-list--picture-card" v-else>
        <li class="el-upload-list__item is-success">
          <img :src="item.imgUrl" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="dialogVisible = true"><i class="el-icon-zoom-in"></i></span>
            <span class="el-upload-list__item-delete" @click="item.imgUrl = ''"><i class="el-icon-delete"></i></span>
          </span>
        </li>
      </ul>
    </el-row>
    <el-row :gutter="10" style="margin-top: 15px;">
      <el-col :span="18"><el-input placeholder="请输入链接" v-model="item.imgLink"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" @click="linksVisible = true">选择</el-button></el-col>
    </el-row>

    <MagicUploadImgs @confirm="uploadImgsConfirm" :visible.sync="uploadVisible"></MagicUploadImgs>
    <MagicLinksFactory @confirm="linkConfirm" :visible.sync="linksVisible"></MagicLinksFactory>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="item.imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MagicUploadImgs from '@/components/magic-upload-imgs/index.vue'
import MagicLinksFactory from '@/components/magic-links-factory/index.vue'
import { IMagicSwiperItem } from '@/store/magic'
@Component({
  name: 'swiperItem',
  components: {
    MagicUploadImgs,
    MagicLinksFactory
  }
})
export default class extends Vue {
  @Prop({ type: Array }) items!: IMagicSwiperItem[]
  @Prop({ type: Object, required: true }) item!: IMagicSwiperItem
  @Prop({ type: Number, required: true }) index!: number
  private linksVisible = false
  private uploadVisible = false
  private dialogVisible = false
  dele() {
    this.items.splice(this.index, 1)
    this.$emit('dele', this.index)
  }

  uploadImgsConfirm(url: string) {
    this.item.imgUrl = url
  }

  linkConfirm(value: any) {
    this.item.imgLink = value.name
  }
}
</script>
