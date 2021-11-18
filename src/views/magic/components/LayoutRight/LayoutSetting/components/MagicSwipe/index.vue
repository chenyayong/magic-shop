<template>
  <div class="magic-swiper-setting component-setting">
    <h4>轮播图组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="边距" name="1">
          <el-row>
            <el-col>内边边距</el-col>
            <el-col><el-slider v-model="componentData.data.padding" show-input=""></el-slider></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="数据配置" name="2">
          <el-row>
            <magicSettingGrid
              v-for="(item, index) in componentData.data.items"
              :img-link.sync="item.img_link"
              :img-url.sync="item.img_url"
              @dele="componentData.data.items.splice(index, 1)"
              :key="index"
            ></magicSettingGrid>
          </el-row>
          <el-row>
            <el-button type="primary" style="width: 100%;" @click="addSwiperItem">添加更多</el-button>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSwiperComponent } from '@/store/magic/magic-swiper'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'

@Component({
  name: 'magic_swiper',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSwiperComponent
  private activeNames = ['1', '2']
  private dialogVisible = false

  addSwiperItem() {
    this.componentData.data.items.push({ img_url: '', img_link: '' })
  }
}
</script>

<style lang="scss" scoped></style>
