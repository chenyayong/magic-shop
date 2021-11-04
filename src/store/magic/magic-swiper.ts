import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicSwiperItem {
  imgUrl: string
  imgLink: string
}
export interface IMagicSwiper {
  padding?: number
  items: IMagicSwiperItem[]
}

export interface IMagicSwiperComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicSwiper
}

interface IState {
  name: string
  rawData: IMagicSwiper
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicSwiper'
  public rawData = {
    padding: 0,
    items: [
      {
        imgUrl: '',
        imgLink: ''
      }
    ]
  }
}
