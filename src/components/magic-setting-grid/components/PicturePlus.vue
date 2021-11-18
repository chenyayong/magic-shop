<template>
  <div>
    <ul class="el-upload-list el-upload-list--picture-card" v-if="imgUrl">
      <li class="el-upload-list__item is-success">
        <img :src="imgUrl" alt="" class="el-upload-list__item-thumbnail" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="dialogVisible = true"><i class="el-icon-zoom-in"></i></span>
          <span class="el-upload-list__item-delete" @click="deleImg"><i class="el-icon-delete"></i></span>
        </span>
      </li>
    </ul>
    <div class="el-upload el-upload--picture-card" @click="uploadVisible = true" v-else>
      <i class="el-icon-plus"></i>
    </div>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'PicturePlus'
})
export default class extends Vue {
  @Prop({ type: String }) imgUrl!: string
  @Prop({ type: Boolean }) visible!: boolean
  private dialogVisible = false

  get uploadVisible() {
    return this.visible
  }

  set uploadVisible(value: boolean) {
    this.$emit('update:visible', value)
  }

  deleImg() {
    this.$emit('update:imgUrl', '')
  }
}
</script>
