import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

interface IState {
  name: string
  home: any
  goods: any
  membercenter: any
  shoppingCart: any
  my: any
}

export interface IHome {
  componentsData: any[]
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'pages'
  public home: IHome = {
    componentsData: []
  }

  public goods = {}
  public membercenter = {}
  public shoppingCart = {}
  public my = {}

  @Mutation
  SET_HOME_COMPONENTS_DATA(data: any) {
    this.home.componentsData = data
  }

  @Action
  setHomeComponentsData(data: any) {
    this.SET_HOME_COMPONENTS_DATA(data)
  }
}
