import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicGoodsItem {
  imgUrl: string
  imgLink: string
}
export interface IMagicGoods {
  background: string
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
    background: '',
    padding: 0,
    items: [
      {
        imgUrl: '',
        imgLink: ''
      }
    ]
  }
}
