import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicGoodsItem {
  imgUrl: string
  imgLink: string
}
export interface IMagicGoods {
  padding: number
  items: IMagicGoodsItem[]
}
interface IState {
  name: string
  rawData: IMagicGoods
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicPicture'
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
