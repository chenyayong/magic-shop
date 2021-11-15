import { VuexModule, Module } from 'vuex-module-decorators'
import { IGoods } from '@/api/types'

export type IMagicGoodsItem = IGoods

export enum ILayout {
  one,
  two,
  three,
  four
}

export enum IContent {
  goods_name,
  cost_price,
  shop_price,
  sales_sum
}

export interface IMagicGoods {
  background: string
  padding: number
  border_radius: number
  layout: ILayout
  attribute: number
  content: IContent[]
  items: IMagicGoodsItem[]
}
export interface IMagicGoodsComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicGoods
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
    border_radius: 0,
    layout: 1,
    attribute: 0,
    content: [(IContent[0] as unknown) as IContent, (IContent[1] as unknown) as IContent, (IContent[2] as unknown) as IContent],
    items: []
  }
}
