import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

import magicSwiper, { IMagicSwiper } from './magic-swiper'
import magicButtonGroup, { IMagicButtonGroup } from './magic-button-group'
import magicPicture, { IMagicPicture } from './magic-picture'
import magicPictureGroup, { IMagicPictureGroup } from './magic-picture-group'
import magicSearch, { IMagicSearch } from './magic-search'
import magicTabbar, { IMagicTabbar } from './magic_tabbar'
import magicGoods, { IMagicGoods } from './magic-goods'

export enum ComponentName {
  magicSwiper = 'magic_swiper',
  magicButtonGroup = 'magic_button_group',
  magicPicture = 'magic_picture',
  magicPictureGroup = 'magic_picture_group',
  magicSearch = 'magic_search',
  magicTabbar = 'magic_tabbar',
  magicGoods = 'magic_goods',
  magicNotice = 'magic_notice',
  magicPosition = 'magic_position',
  magicBackTop = 'magic_backTop'
}

export interface IComponentData {
  id?: string
  name: ComponentName
  label?: string
  icon?: string
  data: IMagicSwiper & IMagicButtonGroup & IMagicPicture & IMagicPictureGroup & IMagicSearch & IMagicTabbar & IMagicGoods
}

export interface IComponentsFormDataMap {
  magic_swiper: IMagicSwiper
  magic_button_group: IMagicButtonGroup
  magic_picture: IMagicPicture
  magic_picture_group: IMagicPictureGroup
  magic_search: IMagicSearch
  magic_tabbar: IMagicTabbar
  magic_goods: IMagicGoods
  magic_notice: any
  magic_position: any
  magic_backTop: any
}

export interface IComponent {
  id?: string
  name: ComponentName
  icon: string
  label: string
  data?: any
}

interface IState {
  name: string
  componentsFormData: IComponentData[]
  baseComponents: IComponent[]
  shopComponents: IComponent[]
  saleComponents: IComponent[]
}

export interface IPageData {
  shop_id?: number
  page_title: string
  page_icon: string
  page_description?: string
  update_at?: string
  shop_data?: JSON
}

@Module({ namespaced: true })
class magic extends VuexModule implements IState {
  public name = 'magic'
  public componentsFormDataIndex = 0
  public componentsFormData: IComponentData[] = []
  public pageData: IPageData = {
    page_title: '',
    page_icon: ''
  }

  public componentsFormDataMap: IComponentsFormDataMap = {
    magic_swiper: magicSwiper.state.rawData,
    magic_button_group: magicButtonGroup.state.rawData,
    magic_picture: magicPicture.state.rawData,
    magic_picture_group: magicPictureGroup.state.rawData,
    magic_search: magicSearch.state.rawData,
    magic_tabbar: magicTabbar.state.rawData,
    magic_goods: magicGoods.state.rawData,
    magic_notice: {},
    magic_position: {},
    magic_backTop: {}
  }

  public baseComponents = [
    {
      name: ComponentName.magicSwiper,
      icon: 'el-icon-picture',
      label: '轮播图'
    },
    {
      name: ComponentName.magicButtonGroup,
      icon: 'el-icon-switch-button',
      label: '按钮组'
    },
    {
      name: ComponentName.magicPicture,
      icon: 'el-icon-picture-outline',
      label: '单图'
    },
    {
      name: ComponentName.magicPictureGroup,
      icon: 'el-icon-camera',
      label: '图片组合'
    },
    {
      name: ComponentName.magicSearch,
      icon: 'el-icon-search',
      label: '搜索栏'
    },
    {
      name: ComponentName.magicTabbar,
      icon: 'el-icon-menu',
      label: '标签栏'
    }
    // {
    //   name: '辅助线',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '富文本',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '视频',
    //   icon: 'el-icon-video-play'
    // }
  ]

  public shopComponents = [
    {
      name: ComponentName.magicGoods,
      icon: 'el-icon-goods',
      label: '商品列表'
    },
    {
      name: ComponentName.magicNotice,
      icon: 'el-icon-chat-dot-round',
      label: '公告'
    },
    {
      name: ComponentName.magicPosition,
      label: '悬浮按钮',
      icon: 'el-icon-place'
    },
    {
      name: ComponentName.magicBackTop,
      label: '回到顶部',
      icon: 'el-icon-top'
    }
    // {
    //   name: '定位',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '搜索框',
    //   icon: 'el-icon-picture-outline-round'
    // },
    // {
    //   name: '店招',
    //   icon: 'el-icon-video-play'
    // },
    // {
    //   name: '地图',
    //   icon: 'el-icon-picture-outline-round'
    // },
    // {
    //   name: '选项卡',
    //   icon: 'el-icon-video-play'
    // }
  ]

  public saleComponents = [
    // {
    //   name: '头条',
    //   icon: 'el-icon-eleme',
    //   label: '头条'
    // },
    // {
    //   name: '文章',
    //   icon: 'el-icon-zoom-out',
    //   label: '文章'
    // },
    // {
    //   name: '签到',
    //   icon: 'el-icon-remove-outline',
    //   label: '签到'
    // },
    // {
    //   name: '门店',
    //   icon: 'el-icon-remove-outline',
    //   label: '门店'
    // },
    // {
    //   name: '优惠券',
    //   icon: 'el-icon-picture-outline-round',
    //   label: '优惠券'
    // },
    // {
    //   name: '带货直播',
    //   icon: 'el-icon-picture-outline',
    //   label: '带货直播'
    // },
    // {
    //   name: '微社区',
    //   icon: 'el-icon-video-play',
    //   label: '微社区'
    // },
    // {
    //   name: '幸运大转盘',
    //   icon: 'el-icon-remove-outline',
    //   label: '幸运大转盘'
    // },
    // {
    //   name: '短视频',
    //   icon: 'el-icon-picture-outline-round',
    //   label: '短视频'
    // },
    // {
    //   name: '表单',
    //   icon: 'el-icon-picture-outline',
    //   label: '表单'
    // },
    // {
    //   name: '限时抢购',
    //   icon: 'el-icon-video-play',
    //   label: '限时抢购'
    // },
    // {
    //   name: '拼团',
    //   icon: 'el-icon-video-play',
    //   label: '拼团'
    // },
    // {
    //   name: '附近商品',
    //   icon: 'el-icon-remove-outline',
    //   label: '附近商品'
    // },
    // {
    //   name: '定金阶梯团',
    //   icon: 'el-icon-picture-outline-round',
    //   label: '定金阶梯团'
    // },
    // {
    //   name: '数据显示',
    //   icon: 'el-icon-picture-outline',
    //   label: '数据显示'
    // },
    // {
    //   name: '门店商家排名',
    //   icon: 'el-icon-video-play',
    //   label: '门店商家排名'
    // }
  ]

  get componentsFormDataCurrentItem() {
    const ret = this.componentsFormData[this.componentsFormDataIndex]
    return ret
  }

  @Mutation
  SET_PAGE_DATA(data: IPageData) {
    this.pageData = data
  }

  @Mutation
  SET_COMPONENTS_FORM_DATA(data: IComponentData[]) {
    this.componentsFormData = data
  }

  @Mutation
  DELE_COMPONENTS_FORM_DATA(id: string) {
    const index = this.componentsFormData.findIndex((e) => e.id === id)
    if (index > -1) {
      this.componentsFormData.splice(index, 1)
    }
  }

  @Mutation
  SET_COMPONENTS_FORM_DATA_INDEX(index: number) {
    this.componentsFormDataIndex = index
  }
}
export default magic
