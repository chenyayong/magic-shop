import { VuexModule, Module } from 'vuex-module-decorators'

export interface IMagicTabbar {
  placeholder: string
  padding_top: number
  padding_bottom: number
  shape: string
  background: string
  link: string
}

export interface IMagicTabbarComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicTabbar
}

interface IState {
  name: string
  rawData: IMagicTabbar
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicTabbar'
  public rawData = {
    placeholder: '请输入搜索关键词',
    padding_top: 10,
    padding_bottom: 12,
    background: '#f2f2f2',
    shape: '',
    link: ''
  }
}
