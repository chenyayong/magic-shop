<template>
  <!-- eslint-disable vue/camelcase -->
  <div class="magic-setting-item setting-item">
    <i class="item el-icon-delete" v-if="closable" @click="deleItem"></i>
    <el-row type="flex" :gutter="20" align="middle">
      <el-col :span="8">
        <PicturePlus :img-url.sync="img_url" :visible.sync="uploadVisible" />
      </el-col>
      <el-col :span="8" v-if="img_url2 !== undefined">
        <PicturePlus :img-url.sync="img_url2" :visible.sync="uploadVisible2" />
      </el-col>
      <el-col>
        <slot name="input"></slot>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 15px;">
      <el-col :span="18"><el-input placeholder="请输入链接" v-model="img_link"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" @click="linksVisible = true">选择</el-button></el-col>
    </el-row>

    <MagicUploadImgs :img-url.sync="img_url" :visible.sync="uploadVisible"></MagicUploadImgs>
    <MagicUploadImgs v-if="img_url2 !== undefined" :img-url.sync="img_url2" :visible.sync="uploadVisible2"></MagicUploadImgs>
    <MagicLinksFactory :img-link.sync="img_link" :visible.sync="linksVisible"></MagicLinksFactory>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MagicUploadImgs from '@/components/magic-upload-imgs/index.vue'
import MagicLinksFactory from '@/components/magic-links-factory/index.vue'
import PicturePlus from './components/PicturePlus.vue'
@Component({
  name: 'MagicSettingItem',
  components: {
    MagicUploadImgs,
    MagicLinksFactory,
    PicturePlus
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, default: true }) closable!: boolean
  @Prop({ type: String }) imgUrl!: string
  @Prop({ type: String }) imgUrl2!: string | undefined
  @Prop({ type: String }) imgLink!: string
  private linksVisible = false
  private uploadVisible = false
  private uploadVisible2 = false

  get img_url() {
    return this.imgUrl
  }

  set img_url(url: string) {
    this.$emit('update:imgUrl', url)
  }

  get img_url2() {
    return this.imgUrl2 as string
  }

  set img_url2(url: string) {
    this.$emit('update:imgUrl2', url)
  }

  get img_link() {
    return this.imgLink
  }

  set img_link(link: string) {
    this.$emit('update:imgLink', link)
  }

  deleItem() {
    this.$emit('dele')
  }

  deleImg() {
    this.$emit('update:imgUrl', '')
  }
}
</script>
