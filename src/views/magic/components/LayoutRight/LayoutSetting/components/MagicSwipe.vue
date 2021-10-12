<template>
  <div>
    <h4>轮播图组件</h4>
    <el-form>
      <el-collapse>
        <el-collapse-item title="内边距" name="1">
          <el-form-item label="四边边距">
            <el-input v-model="componentData.data.padding" placeholder="请输入" type="number" min="0" max="100"></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="轮播图数据配置" name="2"></el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMagicSwiper } from '@/store/magic/magic-setting'

@Component({
  name: 'magicSwiper'
})
export default class extends Vue {
  @Prop({ type: Object }) componentData!: IMagicSwiper
  private value = ''
  mounted() {
    console.log(this.componentData)
  }
}
</script>
