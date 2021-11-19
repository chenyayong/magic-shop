import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface IComponentData {
  componentsData: IComponentData[]
}
interface IState {
  name: string
  componentsData: any[]
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'home'
  public componentsData = []

  @Mutation
  SET_COMPONENTS_DATA(data: any) {
    this.componentsData = data
  }

  @Action
  setComponentsData(data: any) {
    this.SET_COMPONENTS_DATA(data)
  }
}
