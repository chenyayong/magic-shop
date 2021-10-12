import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

export interface IMagicSwiper {
  name: string
  module: string
  data: {
    padding: number
    items: { imgUrl: string; imgLink: string }[]
  }
}

interface IStore {
  componentsSetting: {
    magicSwiper: IMagicSwiper
  }
  componentsSettingKey: string
}

@Module({ namespaced: true })
export default class extends VuexModule implements IStore {
  public name = 'magicSetting'
  public componentsSetting = {
    magicSwiper: {
      name: '轮播模块',
      module: 'magicSwiper',
      data: {
        padding: 10,
        items: [
          {
            imgUrl: '',
            imgLink: ''
          }
        ]
      }
    }
  }

  public componentsSettingKey = ''

  get componentsSettingCurrent() {
    return this.componentsSetting[this.componentsSettingKey]
  }

  @Mutation
  SET_COMPONENTS_SETTING_KEY(key: string) {
    this.componentsSettingKey = key
  }
}
