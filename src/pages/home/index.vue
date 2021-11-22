<template>
  <div class="home" :style="scrollbarStyle">
    <component :key="item.id" v-for="item in componentsData" :is="item.name" :componentData="item"></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getShop } from '@/api/shops'
import { IComponentData } from '@/store/pages/home'
import { namespace } from 'vuex-class'
const home = namespace('home')
interface iComponents {
  [key: string]: any
}
const files = require.context('@/components/magic/', true, /index\.vue$/)
const components = files.keys().reduce((ret: iComponents, file: string) => {
  const component = files(file).default
  const name = component.extendOptions.name
  ret[name] = component
  return ret
}, {})
@Component({
  name: 'Home',
  components: { ...components }
})
export default class extends Vue {
  @home.State('componentsData') componentsData!: IComponentData[]
  @home.Action('setComponentsData') setComponentsData!: (data: IComponentData[]) => void
  @home.Mutation('SET_COMPONENTS_DATA') SET_COMPONENTS_DATA!: (data: IComponentData[]) => void
  private loading = false

  get scrollbarStyle() {
    const search = this.componentsData.find((e) => e.name === 'magic_search')
    const tabbar = this.componentsData.find((e) => e.name === 'magic_tabbar')
    const paddingTop = search ? 34 + search.data.padding_top + search.data.padding_bottom : 0
    const paddingBottom = tabbar ? 50 : 0
    const home = this.$route.path.includes('home')
    let style
    if (home) {
      style = {
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px'
      }
    } else {
      style = {}
    }
    return style
  }

  async getShop(id: number) {
    const res = await getShop(id)
    if (res && res.code && res.code === 20000) {
      const data = res.data
      const shop_data = JSON.parse(data.shop_data as string)
      this.setComponentsData(shop_data)
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
}
</script>
<style scoped lang="scss"></style>
