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
        <el-collapse-item title="轮播图数据配置" name="2">
          <el-row>
            <magicSettingGrid v-for="(item, index) in componentData.data.items" :items="componentData.data.items" :item="item" :index="index" :key="index" />
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
  name: 'magicSwiper',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSwiperComponent
  private activeNames = ['1', '2']
  private dialogVisible = false

  addSwiperItem() {
    this.componentData.data.items.push({ imgUrl: '', imgLink: '' })
  }
}
</script>

<style lang="scss" scoped></style>
