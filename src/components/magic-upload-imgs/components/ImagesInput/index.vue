<template>
  <div class="images-input">
    <el-row style="margin-bottom: 10px">
      <el-input placeholder="请输入网络图片地址" v-model="network"></el-input>
    </el-row>
    <el-row type="flex" justify="center">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li class="el-upload-list__item is-success">
          <img :src="imgSrc" v-if="imgSrc" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions" v-if="imgSrc">
            <span class="el-upload-list__item-preview" @click="handlePreview"><i class="el-icon-zoom-in"></i></span>
            <span class="el-upload-list__item-delete" @click="handleRemove"><i class="el-icon-delete"></i></span>
          </span>
        </li>
      </ul>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="imgSrc" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'imagesInput'
})
export default class extends Vue {
  @Prop({ type: String, required: true }) imgSrc!: string
  private dialogVisible = false

  get network() {
    return this.imgSrc
  }

  set network(value: string) {
    // eslint-disable-next-line no-useless-escape
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (reg.test(value)) {
      this.$emit('update:imgSrc', value)
    }
  }

  changeImgSrc(value: string) {
    this.$emit('update:imgSrc', value)
  }

  handlePreview() {
    this.dialogVisible = true
  }

  handleRemove() {
    this.$emit('update:imgSrc', '')
  }
}
</script>
