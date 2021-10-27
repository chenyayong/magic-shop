import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicSwiperItem {
  imgUrl: string
  imgLink: string
}
export interface IMagicSwiper {
  padding?: number
  items: IMagicSwiperItem[]
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
