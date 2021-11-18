<template>
  <!-- eslint-disable vue/camelcase -->
  <div class="magic-setting-item setting-item">
    <i class="item el-icon-delete" v-if="closable" @click="deleItem"></i>
    <el-row type="flex" :gutter="20" align="middle">
      <el-col :span="8">
        <div class="el-upload el-upload--picture-card" @click="uploadVisible = true" v-if="!img_url">
          <i class="el-icon-plus"></i>
        </div>
        <ul class="el-upload-list el-upload-list--picture-card" v-else>
          <li class="el-upload-list__item is-success">
            <img :src="img_url" alt="" class="el-upload-list__item-thumbnail" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="dialogVisible = true"><i class="el-icon-zoom-in"></i></span>
              <span class="el-upload-list__item-delete" @click="deleImg"><i class="el-icon-delete"></i></span>
            </span>
          </li>
        </ul>
      </el-col>
      <el-col :span="8">
        <div class="el-upload el-upload--picture-card" @click="uploadVisible = true" v-if="!img_url">
          <i class="el-icon-plus"></i>
        </div>
        <ul class="el-upload-list el-upload-list--picture-card" v-else>
          <li class="el-upload-list__item is-success">
            <img :src="img_url" alt="" class="el-upload-list__item-thumbnail" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="dialogVisible = true"><i class="el-icon-zoom-in"></i></span>
              <span class="el-upload-list__item-delete" @click="deleImg"><i class="el-icon-delete"></i></span>
            </span>
          </li>
        </ul>
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
    <MagicLinksFactory :img-link.sync="img_link" :visible.sync="linksVisible"></MagicLinksFactory>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="img_url" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MagicUploadImgs from '@/components/magic-upload-imgs/index.vue'
import MagicLinksFactory from '@/components/magic-links-factory/index.vue'

@Component({
  name: 'magicSettingItem',
  components: {
    MagicUploadImgs,
    MagicLinksFactory
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, default: true }) closable!: boolean
  @Prop({ type: String }) imgUrl!: string
  @Prop({ type: String }) imgLink!: string
  private linksVisible = false
  private uploadVisible = false
  private dialogVisible = false

  get img_url() {
    return this.imgUrl
  }

  set img_url(url: string) {
    this.$emit('update:imgUrl', url)
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
