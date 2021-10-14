import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class extends VuexModule {
  public name = 'magicAsidebar'
  public asidebarData = [
    { name: '页面', icon: 'el-icon-tickets' },
    { name: '楼层', icon: 'el-icon-menu' }
  ]

  public asidebarDataIndex = 0

  @Mutation
  SET_ASIDEBAR_DATA_INDEX(index: number): void {
    this.asidebarDataIndex = index
  }
}
