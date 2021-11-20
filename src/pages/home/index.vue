<template>
  <div class="home">
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
