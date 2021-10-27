<template>
  <div class="magic-button-group-setting component-setting">
    <h4>按钮组组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="按钮组配置" name="1">
          <magicSettingGrid v-for="(item, index) in componentData.data.items" :items="componentData.data.items" :item="item" :index="index" :key="index">
            <template v-slot:input="slotProps">
              <el-row>
                <el-input placeholder="请输入文本" v-model="slotProps.item.imgLabel"></el-input>
              </el-row>
            </template>
          </magicSettingGrid>
          <el-row><el-button type="primary" style="width: 100%" @click="addButtonGroupItem">添加更多</el-button></el-row>
        </el-collapse-item>
        <el-collapse-item title="样式配置" name="2">
          <el-row class="block">
            <el-col>单行按钮数量</el-col>
            <el-col>
              <el-radio v-model="componentData.data.rowButtonCount" :label="4">四个按钮</el-radio>
              <el-radio v-model="componentData.data.rowButtonCount" :label="5">五个按钮</el-radio>
            </el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">是否滑动</el-col>
            <el-col><el-switch v-model="componentData.data.swiper" :active-value="1" :inactive-value="0"></el-switch></el-col>
          </el-row>
          <el-row class="block" v-show="componentData.data.swiper === 1">
            <el-col>滑动行数</el-col>
            <el-col>
              <el-radio v-model="componentData.data.rowSwiper" :label="1">一行</el-radio>
              <el-radio v-model="componentData.data.rowSwiper" :label="2">两行</el-radio>
              <el-radio v-model="componentData.data.rowSwiper" :label="3">三行</el-radio>
            </el-col>
          </el-row>
          <el-row class="block">
            <el-col>上边距</el-col>
            <el-col><el-slider v-model="componentData.data.paddingTop" show-input></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <div>下边距</div>
            <el-col><el-slider v-model="componentData.data.paddingBottom" show-input></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <div>按钮大小</div>
            <el-slider :min="30" :max="70" v-model="componentData.data.buttonSize" show-input></el-slider>
          </el-row>
          <el-row class="block">
            <div>圆角大小</div>
            <el-slider :max="35" v-model="componentData.data.buttonRound" show-input></el-slider>
          </el-row>
          <el-row class="block">
            <div>字体大小</div>
            <el-slider :min="12" :max="30" v-model="componentData.data.textSize" show-input></el-slider>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">文字颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.textColor"></el-color-picker></el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">背景</el-col>
            <el-col><el-color-picker v-model="componentData.data.background"></el-color-picker></el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'
@Component({
  name: 'magicButtonGroup',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData

  private activeNames = ['1', '2']

  addButtonGroupItem() {
    this.componentData.data?.items.push({ imgUrl: '', imgLink: '', imgLabel: '文本' })
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-bottom: 15px;
}
</style>
