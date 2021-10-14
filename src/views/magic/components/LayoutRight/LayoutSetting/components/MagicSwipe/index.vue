<template>
  <div>
    <h4>轮播图组件</h4>
    <el-form>
      <el-collapse v-model="activeNames">
        <!-- <el-collapse-item title="内边距" name="1">
          <el-form-item label="四边边距">
            <el-input v-model="componentData.data.padding" placeholder="请输入" type="number" min="0" max="100"></el-input>
          </el-form-item>
        </el-collapse-item> -->
        <el-collapse-item title="轮播图数据配置" name="2">
          <SwiperItem @dele="dele" :index="index" v-for="(item, index) in componentData.data.items" :key="item.name"></SwiperItem>
          <el-button type="primary" style="width: 100%;" @click="add">添加更多</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComponentData } from '@/store/magic/index'
import SwiperItem from './components/SwiperItem.vue'

@Component({
  name: 'magicSwiper',
  components: {
    SwiperItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) componentData!: IComponentData
  public activeNames = ['1', '2']

  dele(index: number) {
    this.componentData.data?.items.splice(index, 1)
  }

  add() {
    this.componentData.data?.items.push({ imgUrl: '', imgLink: '' })
  }
}
</script>
