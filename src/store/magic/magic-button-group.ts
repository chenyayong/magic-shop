import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicButtonGroupItem {
  imgUrl: string
  imgLink: string
  imgLabel: string
}
export interface IMagicButtonGroup {
  rowButtonCount?: number
  swiper?: number
  rowSwiper?: number
  paddingTop?: number
  paddingBottom?: number
  buttonSize?: number
  buttonRound?: number
  textSize?: number
  textColor?: string
  background?: string
  items: IMagicButtonGroupItem[]
}
interface IState {
  name: string
  rawData: IMagicButtonGroup
}
@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicButtonGroup'
  public rawData = {
    rowButtonCount: 4,
    swiper: 0,
    rowSwiper: 1,
    paddingTop: 0,
    paddingBottom: 0,
    buttonSize: 50,
    buttonRound: 0,
    textSize: 0,
    textColor: '',
    background: '',
    items: [
      {
        imgUrl: '',
        imgLink: '',
        imgLabel: '文本'
      }
    ]
  }
}
