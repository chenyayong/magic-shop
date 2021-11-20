import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export enum IComponentName {
  magicGuideline = 'magic_guideline',
  magicSwiper = 'magic_swiper',
  magicButtonGroup = 'magic_button_group',
  magicPicture = 'magic_picture',
  magicPictureGroup = 'magic_picture_group',
  magicSearch = 'magic_search',
  magicTabbar = 'magic_tabbar',
  magicGoods = 'magic_goods',
  magicNotice = 'magic_notice',
  magicPosition = 'magic_position',
  magicBackTop = 'magic_backTop'
}

export interface IComponentData {
  id: string
  name: IComponentName
  label: string
  icon: string
  data: any
}

interface IState {
  name: string
  componentsData: IComponentData[]
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'home'
  public componentsData: IComponentData[] = []

  @Mutation
  SET_COMPONENTS_DATA(data: IComponentData[]) {
    this.componentsData = data
  }

  @Action({ commit: 'SET_COMPONENTS_DATA' })
  setComponentsData(data: IComponentData[]) {
    return data
  }
}
