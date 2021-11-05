<template>
  <div class="magic-setting-item setting-item">
    <i class="item el-icon-delete" v-if="closable" @click="deleItem"></i>
    <el-row type="flex" :gutter="20" align="middle">
      <el-col :span="8">
        <div
          class="el-upload el-upload--picture-card"
          @click="uploadVisible = true"
          v-if="!item.imgUrl"
        >
          <i class="el-icon-plus"></i>
        </div>
        <ul class="el-upload-list el-upload-list--picture-card" v-else>
          <li class="el-upload-list__item is-success">
            <img :src="item.imgUrl" alt="" class="el-upload-list__item-thumbnail" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="dialogVisible = true"
                ><i class="el-icon-zoom-in"></i
              ></span>
              <span class="el-upload-list__item-delete" @click="deleImg"
                ><i class="el-icon-delete"></i
              ></span>
            </span>
          </li>
        </ul>
      </el-col>
      <el-col>
        <slot name="input" :item="item"></slot>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 15px;">
      <el-col :span="18"
        ><el-input placeholder="请输入链接" v-model="item.imgLink"></el-input
      ></el-col>
      <el-col :span="6"
        ><el-button type="primary" @click="linksVisible = true">选择</el-button></el-col
      >
    </el-row>

    <MagicUploadImgs :img-url.sync="item.imgUrl" :visible.sync="uploadVisible"></MagicUploadImgs>
    <MagicLinksFactory
      :img-link.sync="item.imgLink"
      :visible.sync="linksVisible"
    ></MagicLinksFactory>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="item.imgUrl" alt="" />
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
  @Prop({ type: Array }) items!: any[]
  @Prop({ type: Object, required: true }) item!: any
  @Prop({ type: Number, required: true }) index!: number
  private linksVisible = false
  private uploadVisible = false
  private dialogVisible = false
  deleItem() {
    this.items.splice(this.index, 1)
    this.$emit('dele', this.index)
  }

  deleImg() {
    this.item.imgUrl = ''
  }

  // uploadImgsConfirm(url: string) {
  //   this.item.imgUrl = url
  //   this.$emit('uploadImgsConfirm', url)
  // }

  // linkConfirm(link: string) {
  //   this.item.imgLink = link
  //   this.$emit('linkConfirm', link)
  // }
}
</script>
