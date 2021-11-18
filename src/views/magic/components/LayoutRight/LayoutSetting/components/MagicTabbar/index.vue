<template>
  <div class="magic-tabbar-setting component-setting">
    <h4>搜索栏</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="样式配置" name="1">
          <el-row type="flex" class="block">
            <el-col :span="12">未选中标签的颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.color"></el-color-picker></el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="12">选中标签的颜色</el-col>
            <el-col><el-color-picker v-model="componentData.data.selected_color"></el-color-picker></el-col>
          </el-row>
          <el-row type="flex" class="block">
            <el-col :span="12">背景色</el-col>
            <el-col><el-color-picker v-model="componentData.data.background_color"></el-color-picker></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="数据配置" name="2">
          <el-row>
            <magicSettingGrid
              v-for="(item, index) in componentData.data.items"
              :img-link.sync="item.page_path"
              :img-url.sync="item.icon_path"
              @dele="componentData.data.items.splice(index, 1)"
              :key="index"
            >
              <template v-slot:input>
                <el-row>
                  <el-input placeholder="请输入文本" v-model="item.text"></el-input>
                </el-row>
              </template>
            </magicSettingGrid>
          </el-row>
          <el-row>
            <el-button type="primary" style="width: 100%;" @click="addItem">添加更多</el-button>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <!-- <MagicLinksFactory :img-link.sync="componentData.data.link" :visible.sync="linksVisible"></MagicLinksFactory> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import magicSettingGrid from '@/components/magic-setting-grid/index.vue'
import { IMagicTabbarComponent } from '@/store/magic/magic-tabbar'
@Component({
  name: 'magic_tabbar',
  components: {
    magicSettingGrid
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IMagicTabbarComponent
  private activeNames = ['1', '2']

  addItem() {
    this.componentData.data.items.push({ page_path: '', text: '', icon_path: '', selected_icon_path: '' })
  }
}
</script>
<style scoped>
.block {
  margin-bottom: 10px;
}
</style>
