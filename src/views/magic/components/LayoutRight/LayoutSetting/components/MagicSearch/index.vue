<template>
  <div class="magic-search-setting component-setting">
    <h4>搜索栏</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row class="block">
            <el-col>占位提示文字</el-col>
            <el-col><el-input v-model="componentData.data.placeholder" placeholder="请输入占位提示文字"></el-input></el-col>
          </el-row>
          <el-row class="block">
            <el-col>上边边距</el-col>
            <el-col><el-slider v-model="componentData.data.padding_top" :min="0" :max="30" show-input=""></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <el-col>下边边距</el-col>
            <el-col><el-slider v-model="componentData.data.padding_bottom" :min="0" :max="30" show-input=""></el-slider></el-col>
          </el-row>
          <el-row class="block">
            <el-col>形状</el-col>
            <el-col>
              <el-radio-group v-model="componentData.data.shape">
                <el-radio label="">直角</el-radio>
                <el-radio label="round">圆角</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="8">背景色</el-col>
            <el-col><el-color-picker v-model="componentData.data.background"></el-color-picker></el-col>
          </el-row>
          <el-row class="block">
            <el-col>搜索触发的链接</el-col>
            <el-col>
              <el-row :gutter="10">
                <el-col :span="18"><el-input v-model="componentData.data.link" placeholder="请输入链接"></el-input></el-col>
                <el-col :span="6"><el-button type="primary" @click="linksVisible = true">选择</el-button></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
        <!-- <el-collapse-item title="数据配置" name="2">
          <magicSettingGrid v-for="(item, index) in componentData.data.items" :items="componentData.data.items" :index="index" :item="item" :key="index"></magicSettingGrid>
          <el-button type="primary" style="width: 100%;" @click="addPictureItem">添加更多</el-button>
        </el-collapse-item> -->
      </el-collapse>
    </el-form>
    <MagicLinksFactory :img-link.sync="componentData.data.link" :visible.sync="linksVisible"></MagicLinksFactory>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MagicLinksFactory from '@/components/magic-links-factory/index.vue'
import { IMagicSearchComponent } from '@/store/magic/magic-search'
@Component({
  name: 'magic_search',
  components: {
    MagicLinksFactory
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicSearchComponent
  private activeNames = ['1', '2']
  private linksVisible = false
}
</script>
<style scoped>
.block {
  margin-bottom: 10px;
}
</style>
