import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicButtonGroupItem {
  img_url: string
  img_link: string
  img_label: string
}
export interface IMagicButtonGroup {
  row_button_count?: number
  swiper?: number
  row_swiper?: number
  padding_top?: number
  padding_bottom?: number
  button_size?: number
  button_round?: number
  text_size?: number
  text_color?: string
  background?: string
  items: IMagicButtonGroupItem[]
}

export interface IMagicButtonGroupComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicButtonGroup
}

interface IState {
  name: string
  rawData: IMagicButtonGroup
}
@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicButtonGroup'
  public rawData = {
    row_button_count: 4,
    swiper: 0,
    row_swiper: 1,
    padding_top: 0,
    padding_bottom: 0,
    button_size: 50,
    button_round: 0,
    text_size: 0,
    text_color: '',
    background: '',
    items: [
      {
        img_url: '',
        img_link: '',
        img_label: '文本'
      }
    ]
  }
}
