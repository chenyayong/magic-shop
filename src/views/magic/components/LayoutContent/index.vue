<template>
  <div class="layout-content" v-loading="loading">
    <div class="content-main">
      <el-scrollbar :style="scrollbarStyle">
        <draggable
          class="draggable"
          :delay="0"
          :animation="200"
          :swapThreshold="1"
          :emptyInsertThreshold="5"
          :group="group"
          filter=".filter-item"
          :sort="true"
          :list="componentsFormData"
          @change="draggableChange"
        >
          <template v-if="componentsFormData.length">
            <DragComponent
              :key="item.id"
              v-for="(item, index) in componentsFormData"
              :component="item"
              :index="index"
            />
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
        <tabbar :component="getTabbar" :index="getTabbarIndex" />
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
import DragComponent from './components/DragComponent.vue'
import tabbar from './components/tabbar.vue'

const magic = namespace('magic')
const magicAsidebar = namespace('magicAsidebar')

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

@Component({
  name: 'LayoutContent',
  components: {
    draggable,
    DragComponent,
    tabbar
  }
})
export default class extends Vue {
  @magic.State('componentsFormData') componentsFormData!: IComponentData[]
  @magic.Mutation('SET_COMPONENTS_FORM_DATA_INDEX') SET_COMPONENTS_FORM_DATA_INDEX!: (
    index?: number
  ) => void

  @magicAsidebar.Mutation('SET_ASIDEBAR_DATA_INDEX') SET_ASIDEBAR_DATA_INDEX!: (
    index: number
  ) => void

  @magic.Mutation('SET_COMPONENTS_FORM_DATA') SET_COMPONENTS_FORM_DATA!: (
    data?: IComponentData[]
  ) => void

  @magic.Mutation('SET_PAGE_DATA') SET_PAGE_DATA!: (data: IPageData) => void

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

  get getTabbar() {
    const item = this.componentsFormData.find((e) => e.name === 'magic_tabbar')
    return item
  }

  get getTabbarIndex() {
    const index = this.componentsFormData.findIndex((e) => e.name === 'magic_tabbar')
    return index
  }

  get getSearch() {
    const item = this.componentsFormData.find((e) => e.name === 'magic_search')
    return item
  }

  get scrollbarStyle() {
    const paddingTop = this.getSearch
      ? 34 + this.getSearch.data.padding_top + this.getSearch.data.padding_bottom
      : 0
    const paddingBottom = this.getTabbar ? 50 : 0

    const style = {
      paddingTop: paddingTop + 'px',
      paddingBottom: paddingBottom + 'px'
    }
    return style
  }

  draggableChange(value: draggableElement) {
    if (value.added) {
      const index =
        this.componentsFormData.length === value.added.newIndex ? 0 : value.added.newIndex
      this.SET_COMPONENTS_FORM_DATA_INDEX(index)
      this.SET_ASIDEBAR_DATA_INDEX(1)
    } else if (value.moved) {
      const index =
        this.componentsFormData.length === value.moved.newIndex ? 0 : value.moved.newIndex
      this.SET_COMPONENTS_FORM_DATA_INDEX(index)
      this.SET_ASIDEBAR_DATA_INDEX(1)
    }
  }

  async getShop(id: number) {
    const res = await getShop(id)
    if (res && res.code && res.code === 20000) {
      const data = res.data as IPageData
      const pageData = {
        page_title: data.page_title || '',
        page_icon: data.page_icon || ''
      }
      const shop_data = JSON.parse((data.shop_data as unknown) as string)
      this.SET_COMPONENTS_FORM_DATA(shop_data)
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

.content-main ::v-deep [class*='magic-'] {
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
    border: 2px solid $--color-primary;
    box-shadow: none;
    pointer-events: none;
    z-index: 1000;
  }
}
</style>
