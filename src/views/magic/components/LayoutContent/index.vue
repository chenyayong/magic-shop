<template>
  <div class="layout-content">
    <div class="content-main">
      <!-- <el-empty>
        <div class="empty-description">
          <p>哎哟，您还没有放置组件哦~~</p>
          <p>赶紧拖动组件到这里设置吧</p>
        </div>
      </el-empty> -->
      <el-scrollbar>
        <draggable class="draggable" :group="group" :sort="true"></draggable>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import draggable from 'vuedraggable'
@Component({
  name: 'LayoutContent',
  components: {
    draggable
  }
})
export default class extends Vue {
  private group = {
    name: 'site',
    pull: false,
    put: true
  }
}
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: 100%;
}
.layout-content ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
  .el-scrollbar__view {
    height: 100%;
  }
}
.draggable {
  height: 100%;
  width: 100%;
}
.layout-content {
  position: fixed;
  left: 280px;
  right: 280px;
  top: 50px;
  bottom: 0px;
  box-sizing: border-box;
  overflow: hidden;
}
.content-main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 375px;
  height: 667px;
  background: #fff;
  box-shadow: -10px 20px 30px 0px rgb(192 197 205 / 80%);
}
.empty-description {
  font-size: 14px;
  color: $--color-primary;
  p {
    text-align: left;
  }
}
</style>
