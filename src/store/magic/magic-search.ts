import { VuexModule, Module } from 'vuex-module-decorators'

export interface IMagicSearch {
  placeholder: string
  padding_top: number
  padding_bottom: number
  shape: string
  background: string
  link: string
}

export interface IMagicSearchComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicSearch
}

interface IState {
  name: string
  rawData: IMagicSearch
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicPicture'
  public rawData = {
    placeholder: '请输入搜索关键词',
    padding_top: 10,
    padding_bottom: 12,
    background: '#f2f2f2',
    shape: '',
    link: ''
  }
}
