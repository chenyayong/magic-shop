<template>
  <div class="layou-left">
    <el-scrollbar class="scrollbar-wrapper">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="基础组件" name="base-components">
          <base-components></base-components>
        </el-collapse-item>
        <el-collapse-item title="店铺组件" name="shop-components">
          <shop-components></shop-components>
        </el-collapse-item>
        <el-collapse-item title="营销组件" name="sale-components">
          <sale-components></sale-components>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BaseComponents from './BaseComponents.vue'
import ShopComponents from './ShopComponents.vue'
import SaleComponents from './SaleComponents.vue'
@Component({
  name: 'layoutLeft',
  components: {
    BaseComponents,
    ShopComponents,
    SaleComponents
  }
})
export default class extends Vue {
  private activeNames = 'base-components'

  handleChange() {}
}
</script>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-scrollbar {
  height: 100%;
}
.layou-left >>> .el-collapse-item__header {
  padding-left: 20px;
}
.layou-left {
  position: fixed;
  left: 0px;
  top: 50px;
  bottom: 0px;
  width: 280px;
  background: #ffffff;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
