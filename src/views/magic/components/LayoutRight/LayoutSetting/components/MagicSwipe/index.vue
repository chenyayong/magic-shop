<template>
  <div class="magic-swiper-setting">
    <h4>轮播图组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="边距" name="1">
          <el-row>
            <el-col>内边边距</el-col>
            <el-col><el-slider v-model="componentData.data.padding" show-input=""></el-slider></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="轮播图数据配置" name="2">
          <el-row>
            <SwiperItem
              v-for="(item, index) in componentData.data.items"
              @upload="uploadHandle"
              :items="componentData.data.items"
              :item="item"
              :index="index"
              :key="index"
            ></SwiperItem>
          </el-row>
          <el-row>
            <el-button type="primary" style="width: 100%;" @click="addSwiperItem">添加更多</el-button>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <MagicUploadImgs @confirm="uploadImgsConfirm" :visible.sync="dialogVisible"></MagicUploadImgs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
import SwiperItem from './components/SwiperItem.vue'
import MagicUploadImgs from '@/components/magic-upload-imgs/index.vue'

@Component({
  name: 'magicSwiper',
  components: {
    SwiperItem,
    MagicUploadImgs
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  private activeNames = ['1', '2']
  private dialogVisible = false
  private uploadIndex = 0

  deleSwiperItem(index: number) {
    this.componentData.data?.items.splice(index, 1)
  }

  addSwiperItem() {
    this.componentData.data?.items.push({ imgUrl: '', imgLink: '' })
  }

  uploadHandle(item: { imgUrl: string; imgLink: string }, index: number) {
    this.dialogVisible = true
    this.uploadIndex = index
    console.log('uploadHandle', item, index)
  }

  uploadImgsConfirm(value: string) {
    const item = this.componentData.data?.items[this.uploadIndex] as any
    item.imgUrl = value
    console.log('uploadImgsConfirm', value)
  }
}
</script>

<style lang="scss" scoped>
.magic-swiper-setting ::v-deep .el-collapse-item__wrap {
  overflow: visible;
}
.magic-swiper-setting ::v-deep .el-slider__input {
  width: 110px;
}
.magic-swiper-setting ::v-deep .el-slider__runway.show-input {
  margin-right: 120px;
}
.el-slider {
  padding-left: 10px;
}
</style>
