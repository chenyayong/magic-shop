import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

export interface IMagicSwiper {
  padding: number
  items: { imgUrl: string; imgLink: string }[]
}
export interface IMagicButtonGroup {
  padding: number
  items: { imgUrl: string; imgLink: string }[]
}
export interface IMagicPicture {
  padding: number
  items: { imgUrl: string; imgLink: string }[]
}
export interface IMagicPictureGroup {
  padding: number
  items: { imgUrl: string; imgLink: string }[]
}
export interface IMagicGoods {
  padding: number
  items: { imgUrl: string; imgLink: string }[]
}

export enum ComponentName {
  magicSwiper = 'magicSwiper',
  magicButtonGroup = 'magicButtonGroup',
  magicPicture = 'magicPicture',
  magicPictureGroup = 'magicPictureGroup',
  magicGoods = 'magicGoods'
}

export interface IComponentData {
  id?: string
  name: ComponentName
  label: string
  icon: string
  active?: boolean
  data?: IMagicSwiper
}

export interface IComponentsFormDataMap {
  magicSwiper: IMagicSwiper
  magicButtonGroup: IMagicButtonGroup
  magicPicture: IMagicPicture
  magicPictureGroup: IMagicPictureGroup
  magicGoods: IMagicGoods
}

export interface IState {
  name: string
  componentsFormData: IComponentData[]
  baseComponents: IComponentData[]
  shopComponents: IComponentData[]
  saleComponents: IComponentData[]
}

@Module({ namespaced: true })
class magic extends VuexModule implements IState {
  public name = 'magic'
  public componentsFormData: IComponentData[] = []
  public componentsFormDataMap: IComponentsFormDataMap = {
    magicSwiper: {
      padding: 0,
      items: [
        {
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    magicButtonGroup: {
      padding: 0,
      items: [
        {
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    magicPicture: {
      padding: 0,
      items: [
        {
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    magicPictureGroup: {
      padding: 0,
      items: [
        {
          imgUrl: '',
          imgLink: ''
        }
      ]
    },
    magicGoods: {
      padding: 0,
      items: [
        {
          imgUrl: '',
          imgLink: ''
        }
      ]
    }
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
    }
    // {
    //   name: '标题栏',
    //   icon: 'el-icon-eleme'
    // },
    // {
    //   name: '辅助空白',
    //   icon: 'el-icon-zoom-out'
    // },
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
    //   name: '公告',
    //   icon: 'el-icon-picture-outline'
    // },
    // {
    //   name: '店招',
    //   icon: 'el-icon-video-play'
    // },
    // {
    //   name: '悬浮按钮',
    //   icon: 'el-icon-remove-outline'
    // },
    // {
    //   name: '地图',
    //   icon: 'el-icon-picture-outline-round'
    // },
    // {
    //   name: '回到顶部',
    //   icon: 'el-icon-picture-outline'
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

  get componentsFormDataActionItem() {
    const ret = this.componentsFormData.filter((item) => item.active)
    return ret && ret[0]
  }

  @Mutation
  RESET_ACTION_COMPONENTS_FORM_DATA(index: number) {
    this.componentsFormData = this.componentsFormData.map((item, i) => {
      if (i === index) {
        item.active = true
      } else {
        delete item.active
      }
      return item
    })
  }
}
export default magic
