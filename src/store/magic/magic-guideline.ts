import { VuexModule, Module } from 'vuex-module-decorators'

export interface IMagicGuideline {
  background: string
  padding: number
  border_radius: number
}
export interface IMagicGuidelineComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicGuideline
}

interface IState {
  name: string
  rawData: IMagicGuideline
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicPicture'
  public rawData = {
    background: '',
    padding: 0,
    border_radius: 0,
    layout: 1,
    attribute: 0
  }
}
