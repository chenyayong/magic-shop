<template>
  <div class="magic-button-group-setting component-setting">
    <h4>按钮组组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row class="block">
            <el-col>单行按钮数量</el-col>
            <el-col>
              <el-radio v-model="componentData.data.row_button_count" :label="4">四个按钮</el-radio>
              <el-radio v-model="componentData.data.row_button_count" :label="5">五个按钮</el-radio>
            </el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">是否滑动</el-col>
            <el-col><el-switch v-model="componentData.data.swiper" :active-value="1" :inactive-value="0"></el-switch></el-col>
          </el-row>
          <el-row class="block" v-show="componentData.data.swiper === 1">
            <el-col>滑动行数</el-col>
            <el-col>
              <el-radio v-model="componentData.data.row_swiper" :label="1">一行</el-radio>
              <el-radio v-model="componentData.data.row_swiper" :label="2">两行</el-radio>
              <el-radio v-model="componentData.data.row_swiper" :label="3">三行</el-radio>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>上边距</el-col>
            <el-col><el-slider v-model="componentData.data.padding_top" show-input></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <div>下边距</div>
            <el-col><el-slider v-model="componentData.data.padding_bottom" show-input></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <div>按钮大小</div>
            <el-slider :min="30" :max="70" v-model="componentData.data.button_size" show-input></el-slider>
          </el-row>
          <el-row class="block">
            <div>圆角大小</div>
            <el-slider :max="35" v-model="componentData.data.button_round" show-input></el-slider>
          </el-row>
          <el-row class="block">
            <div>字体大小</div>
            <el-slider :min="12" :max="30" v-model="componentData.data.text_size" show-input></el-slider>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">文字颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.text_color"></el-color-picker></el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">背景</el-col>
            <el-col><el-color-picker v-model="componentData.data.background"></el-color-picker></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="按钮组配置" name="2">
          <magicSettingGrid
            v-for="(item, index) in componentData.data.items"
            :img-link.sync="item.img_link"
            :img-url.sync="item.img_url"
            @dele="componentData.data.items.splice(index, 1)"
            :key="index"
          >
            <template v-slot:input>
              <el-row>
                <el-input placeholder="请输入文本" v-model="item.img_label"></el-input>
              </el-row>
            </template>
          </magicSettingGrid>
          <el-row><el-button type="primary" style="width: 100%" @click="addButtonGroupItem">添加更多</el-button></el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicButtonGroupComponent } from '@/store/magic/magic-button-group'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'
@Component({
  name: 'magic_button_group',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicButtonGroupComponent

  private activeNames = ['1', '2']

  addButtonGroupItem() {
    this.componentData.data.items.push({ img_url: '', img_link: '', img_label: '文本' })
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-bottom: 15px;
}
</style>
