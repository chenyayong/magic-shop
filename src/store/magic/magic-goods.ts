import { VuexModule, Module } from 'vuex-module-decorators'
import { IGoods } from '@/api/types'

export type IMagicGoodsItem = IGoods

export interface IMagicGoods {
  background: string
  padding: number
  borderRadius: number
  layout: number
  attribute: number
  content: string[]
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
    borderRadius: 0,
    layout: 1,
    attribute: 0,
    content: ['title', 'old_price', 'new_price'],
    items: []
  }
}
