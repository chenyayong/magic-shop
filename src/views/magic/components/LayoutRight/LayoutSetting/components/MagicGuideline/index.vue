<template>
  <div class="magic-swiper-setting component-setting">
    <h4>辅助线组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row type="flex" class="block">
            <el-col :span="12">背景颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.background"></el-color-picker></el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="12">辅助线颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.border_color"></el-color-picker></el-col>
          </el-row>
          <el-row class="block">
            <el-col>辅助线样式</el-col>
            <el-col>
              <el-radio-group v-model="componentData.data.border_style">
                <el-radio label="solid">实线</el-radio>
                <el-radio label="dashed">虚线</el-radio>
                <el-radio label="dotted">圆点</el-radio>
                <el-radio label="double">双线</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>左右边距</el-col>
            <el-col><el-slider :min="0" :max="100" v-model="componentData.data.paddingLeftAndRight" show-input=""></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <el-col>上下边距</el-col>
            <el-col><el-slider :min="0" :max="50" v-model="componentData.data.paddingTopAndBottom" show-input=""></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <el-col>辅助线粗</el-col>
            <el-col><el-slider :min="0" :max="30" v-model="componentData.data.border_width" show-input=""></el-slider></el-col>
          </el-row>
        </el-collapse-item>
        <!-- <el-collapse-item title="数据配置" name="2">
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
        </el-collapse-item> -->
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicGuidelineComponent } from '@/store/magic/magic-guideline'
@Component({
  name: 'magic_guideline'
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicGuidelineComponent
  private activeNames = ['1', '2']
}
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 10px;
}
</style>
