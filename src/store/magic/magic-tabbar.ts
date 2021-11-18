import { VuexModule, Module } from 'vuex-module-decorators'

export interface IMagicTabbarListItem {
  page_path: string
  text: string
  icon_path: string
  selected_icon_path: string
}

export interface IMagicTabbar {
  color: string
  selected_color: string
  background_color: string
  items: IMagicTabbarListItem[]
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
    color: '#7d7e80',
    selected_color: '#1989fa',
    background_color: '#fff',
    items: [
      {
        page_path: '',
        text: '首页',
        icon_path: 'van-icon-wap-home-o',
        selected_icon_path: 'van-icon-wap-home-o'
      },
      {
        page_path: '',
        text: '分类',
        icon_path: 'van-icon-goods-collect-o',
        selected_icon_path: 'van-icon-goods-collect-o'
      },
      {
        page_path: '',
        text: '会员中心',
        icon_path: 'van-icon-gem-o',
        selected_icon_path: 'van-icon-gem-o'
      },
      {
        page_path: '',
        text: '购物',
        icon_path: 'van-icon-shopping-cart-o',
        selected_icon_path: 'van-icon-shopping-cart-o'
      },
      {
        page_path: '',
        text: '我的',
        icon_path: 'van-icon-user-o',
        selected_icon_path: 'van-icon-user-o'
      }
    ]
  }
}
