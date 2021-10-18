<template>
  <div class="magic-button-broup-setting">
    <h4>按钮组组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="按钮组配置" name="1">
          <ButtonGroupItem></ButtonGroupItem>
        </el-collapse-item>
        <el-collapse-item title="样式配置" name="2">
          <div class="block">
            <div>单行按钮数量</div>
            <el-radio v-model="radio" label="1">四个按钮</el-radio>
            <el-radio v-model="radio" label="2">五个按钮</el-radio>
          </div>
          <el-row type="flex" class="block">
            <el-col :span="8">是否滑动</el-col>
            <el-col><el-switch v-model="swiper"></el-switch></el-col>
          </el-row>
          <el-row class="block">
            <div>上边距</div>
            <el-input></el-input>
          </el-row>
          <el-row class="block">
            <div>下边距</div>
            <el-input></el-input>
          </el-row>
          <el-row class="block">
            <!-- <div>按钮大小</div> -->
            <el-slider v-model="value"></el-slider>
          </el-row>
          <el-row class="block">
            <div>圆角大小</div>
            <el-slider v-model="value" show-input></el-slider>
          </el-row>
          <el-row class="block">
            <div>字体大小</div>
            <el-slider show-input></el-slider>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">文字颜色</el-col>
            <el-col><el-color-picker v-model="color"></el-color-picker></el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">背景</el-col>
            <el-col><el-color-picker v-model="color"></el-color-picker></el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ButtonGroupItem from './components/ButtonGroupItem.vue'
@Component({
  name: 'magicButtonGroup',
  components: {
    ButtonGroupItem
  }
})
export default class extends Vue {
  private activeNames = ['1', '2']
  private value = 0
  private radio = '1'
  private swiper = true
  private color = ''
}
</script>

<style scoped lang="scss">
.block {
  margin-bottom: 15px;
}
.magic-button-broup-setting ::v-deep .el-slider__input {
  width: 100px;
}
.magic-button-broup-setting ::v-deep .el-slider__runway.show-input {
  margin-right: 120px;
}
.magic-button-broup-setting ::v-deep .el-collapse-item__wrap {
  overflow: visible;
}
</style>
