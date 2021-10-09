<template>
  <div class="layout-content">
    <div class="content-main">
      <el-scrollbar>
        <draggable class="draggable" :group="group" :sort="true" :list="compontents" @change="change">
          <template v-if="compontents.length">
            <component v-for="item in compontents" :is="item.name" :key="item.id"></component>
          </template>
          <template v-else>
            <el-empty>
              <div class="empty-description">
                <p>哎哟，您还没有放置组件哦~~</p>
                <p>赶紧拖动组件到这里设置吧</p>
              </div>
            </el-empty>
          </template>
        </draggable>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
interface iComponents {
  [key: string]: Vue
}
const files = require.context('@/components/magic/', true, /\.vue$/)
const components = files.keys().reduce((ret: iComponents, file: string): iComponents => {
  const component = files(file).default
  const name = component.extendOptions.name
  ret[name] = component
  return ret
}, {})

@Component({
  name: 'LayoutContent',
  components: {
    ...components,
    draggable
  }
})
export default class extends Vue {
  private group = {
    name: 'site',
    pull: false,
    put: true
  }

  private compontents = []

  @Watch('compontents', { immediate: true, deep: true })
  changeCompontents(val: any) {
    console.log('changeCompontents', val)
  }

  change(value: any) {
    console.log(value)
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

.draggable > ::v-deep [class*='magic-'] {
  position: relative;
  &:hover::after {
    position: absolute;
    content: ' ';
    left: 2px;
    bottom: 2px;
    top: 2px;
    right: 2px;
    box-shadow: 0 0 10px $--color-primary;
    pointer-events: none;
  }
  &.active::after {
    position: absolute;
    content: ' ';
    left: 0px;
    bottom: 0px;
    top: 0px;
    right: 0px;
    border: 2px dashed $--color-primary;
    box-shadow: none;
    pointer-events: none;
  }
}
</style>
