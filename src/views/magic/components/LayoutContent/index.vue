<template>
  <div class="layout-content" v-loading="loading">
    <div class="content-main">
      <el-scrollbar>
        <draggable class="draggable" :group="group" :sort="true" :list="componentsFormData" @change="draggableChange">
          <template v-if="componentsFormData.length">
            <el-tooltip :key="item.id" v-for="(item, index) in componentsFormData" class="item" effect="dark" :content="item.label" placement="left-start">
              <el-tooltip placement="right-start">
                <template v-slot:content>
                  <i class="el-icon-delete component-delete-icon" @click="deleComponent(item.id)"></i>
                </template>
                <component @click.native="changeActive(index)" :class="[index === componentsFormDataIndex ? 'active' : '']" :is="item.name" :componentData="item"></component>
              </el-tooltip>
            </el-tooltip>
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
import { namespace } from 'vuex-class'
import draggable from 'vuedraggable'
import { IComponentData, IPageData } from '@/store/magic'
import { getShop } from '@/api/shops'
const magic = namespace('magic')
const magicAsidebar = namespace('magicAsidebar')

interface iComponents {
  [key: string]: Vue
}
interface draggableElement {
  added?: {
    element: IComponentData
    newIndex: number
  }
  moved?: {
    element: IComponentData
    newIndex: number
    oldIndex: number
  }
}

const files = require.context('@/components/magic/', true, /index\.vue$/)
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
  @magic.State('componentsFormDataIndex') componentsFormDataIndex!: number
  @magic.State('componentsFormData') componentsFormData!: IComponentData[]
  @magic.Mutation('SET_COMPONENTS_FORM_DATA_INDEX') SET_COMPONENTS_FORM_DATA_INDEX!: (index?: number) => void
  @magic.Mutation('SET_COMPONENTS_FORM_DATA') SET_COMPONENTS_FORM_DATA!: (data?: IComponentData[]) => void
  @magic.Mutation('SET_PAGE_DATA') SET_PAGE_DATA!: (data: IPageData) => void
  @magic.Mutation('DELE_COMPONENTS_FORM_DATA') DELE_COMPONENTS_FORM_DATA!: (id: string) => void
  @magicAsidebar.Mutation('SET_ASIDEBAR_DATA_INDEX') SET_ASIDEBAR_DATA_INDEX!: (index: number) => void
  private loading = true
  private group = {
    name: 'site',
    pull: false,
    put: true
  }

  @Watch('componentsFormData', { immediate: true, deep: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeCompontents(val: IComponentData[]) {
    console.log('componentsFormData', val)
  }

  deleComponent(id: string) {
    this.DELE_COMPONENTS_FORM_DATA(id)
    // console.log('deleComponent', id)
  }

  draggableChange(value: draggableElement) {
    if (value.added) {
      const index = this.componentsFormData.length === value.added.newIndex ? 0 : value.added.newIndex
      this.SET_COMPONENTS_FORM_DATA_INDEX(index)
      this.SET_ASIDEBAR_DATA_INDEX(1)
    } else if (value.moved) {
      const index = this.componentsFormData.length === value.moved.newIndex ? 0 : value.moved.newIndex
      this.SET_COMPONENTS_FORM_DATA_INDEX(index)
      this.SET_ASIDEBAR_DATA_INDEX(1)
    }
  }

  changeActive(index: number) {
    this.SET_COMPONENTS_FORM_DATA_INDEX(index)
    this.SET_ASIDEBAR_DATA_INDEX(1)
  }

  async getShop(id: number) {
    const res = (await getShop(id)) as any
    if (res && res.code && res.code === 20000) {
      const data = res.data as IPageData
      const pageData = {
        page_title: data.page_title || '',
        page_icon: data.page_icon || ''
      }
      this.SET_COMPONENTS_FORM_DATA(data.shop_data)
      this.SET_PAGE_DATA(pageData)
    } else {
      this.$message({
        type: 'error',
        message: res.msg
      })
    }
  }

  create() {
    this.loading = true
  }

  async mounted() {
    const id = parseInt(this.$route.query.id as string)
    if (id === 0 || id) {
      await this.getShop(id)
      this.loading = false
    } else {
      this.loading = false
    }
  }

  beforeDestroy() {
    this.SET_COMPONENTS_FORM_DATA([])
    this.SET_COMPONENTS_FORM_DATA_INDEX(0)
    this.SET_ASIDEBAR_DATA_INDEX(0)
    this.SET_PAGE_DATA({
      page_title: '',
      page_icon: ''
    })
  }
}
</script>

<style scoped lang="scss">
.component-delete-icon {
  font-size: 18px;
  cursor: pointer;
}
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
    z-index: 1000;
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
    z-index: 1000;
  }
}
</style>
