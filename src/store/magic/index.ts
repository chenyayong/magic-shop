import { icon } from 'vue-svgicon'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface IComponent {
  name: string
  icon: string
  label: string
}
export interface IMagicSwiper {
  data: {
    padding: number
    items: { imgUrl: string; imgLink: string }[]
  }
}
export interface IComponentData {
  id: string
  name: string
  label: string
  icon: string
  active?: boolean
  data?: IMagicSwiper
}

export interface IComponentsFormItemData {
  magicSwiper: IMagicSwiper
}

export interface IState {
  name: string
  componentsFormData: IComponentData[]
  baseComponents: IComponent[]
  shopComponents: IComponent[]
  saleComponents: IComponent[]
}

@Module({ namespaced: true })
class magic extends VuexModule implements IState {
  public name = 'magic'
  public componentsSetting = [
    { name: '页面', icon: 'el-icon-tickets' },
    { name: '楼层', icon: 'el-icon-menu' }
  ]

  public componentsSettingCurrentItem = 0

  public componentsFormData: IComponentData[] = []

  public componentsFormItemData: IComponentsFormItemData = {
    magicSwiper: {
      data: {
        padding: 0,
        items: [
          {
            imgUrl: '',
            imgLink: ''
          }
        ]
      }
    }
  }

  public baseComponents = [
    {
      name: 'magicSwiper',
      icon: 'el-icon-picture',
      label: '轮播图'
    },
    {
      name: 'magicButtonGroup',
      icon: 'el-icon-switch-button',
      label: '按钮组'
    },
    {
      name: 'magicPicture',
      icon: 'el-icon-picture-outline',
      label: '单图'
    },
    {
      name: 'magicPictureGroup',
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
      name: 'magicGoods',
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
    {
      name: '头条',
      icon: 'el-icon-eleme',
      label: '头条'
    },
    {
      name: '文章',
      icon: 'el-icon-zoom-out',
      label: '文章'
    },
    {
      name: '签到',
      icon: 'el-icon-remove-outline',
      label: '签到'
    },
    {
      name: '门店',
      icon: 'el-icon-remove-outline',
      label: '门店'
    },
    {
      name: '优惠券',
      icon: 'el-icon-picture-outline-round',
      label: '优惠券'
    },
    {
      name: '带货直播',
      icon: 'el-icon-picture-outline',
      label: '带货直播'
    },
    {
      name: '微社区',
      icon: 'el-icon-video-play',
      label: '微社区'
    },
    {
      name: '幸运大转盘',
      icon: 'el-icon-remove-outline',
      label: '幸运大转盘'
    },
    {
      name: '短视频',
      icon: 'el-icon-picture-outline-round',
      label: '短视频'
    },
    {
      name: '表单',
      icon: 'el-icon-picture-outline',
      label: '表单'
    },
    {
      name: '限时抢购',
      icon: 'el-icon-video-play',
      label: '限时抢购'
    },
    {
      name: '拼团',
      icon: 'el-icon-video-play',
      label: '拼团'
    },
    {
      name: '附近商品',
      icon: 'el-icon-remove-outline',
      label: '附近商品'
    },
    {
      name: '定金阶梯团',
      icon: 'el-icon-picture-outline-round',
      label: '定金阶梯团'
    },
    {
      name: '数据显示',
      icon: 'el-icon-picture-outline',
      label: '数据显示'
    },
    {
      name: '门店商家排名',
      icon: 'el-icon-video-play',
      label: '门店商家排名'
    }
  ]

  @Mutation
  SET_COMPONENTS_FORM_DATA(data: IComponentData[]) {
    this.componentsFormData = data
  }

  @Mutation
  ADD_COMPONENTS_FORM_DATA(payload: { data: IComponentData; index: number }) {
    const { data, index } = payload
    console.log('ADD_COMPONENTS_FORM_DATA', payload)
    if (typeof index === 'number') {
      this.componentsFormData.splice(index, 0, data)
    } else {
      this.componentsFormData.push(data)
    }
  }

  @Mutation
  DELE_COMPONENTS_FORM_DATA(data: IComponentData, index: number) {
    if (typeof index === 'number') {
      this.componentsFormData.splice(index, 0, data)
    } else {
      this.componentsFormData.push(data)
    }
  }

  @Mutation
  RESET_COMPONENTS_FORM_DATA(data: IComponentData[]) {
    if (data && data.length) {
      this.componentsFormData = data
    } else {
      this.componentsFormData = []
    }
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

  @Mutation
  SET_COMPONENTS_SETTING_CURRENT_ITEM(index: number): void {
    this.componentsSettingCurrentItem = index
  }

  @Action({ commit: 'SET_COMPONENTS_FORM_DATA' })
  SetCompoentsFormData(data: IComponentData) {
    return data
  }

  @Action({ commit: 'ADD_COMPONENTS_FORM_DATA' })
  AddCompoentsFormData(payload: { data: IComponentData; index: number }) {
    // const { data, index } = payload
    return payload
  }
}
export default magic
