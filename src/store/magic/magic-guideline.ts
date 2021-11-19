import { VuexModule, Module } from 'vuex-module-decorators'

export enum IBorderStyle {
  solid,
  dashed,
  dotted,
  double
}

export interface IMagicGuideline {
  background: string
  border_color: string
  paddingLeftAndRight: number
  paddingTopAndBottom: number
  border_style: IBorderStyle
  border_width: number
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
    background: '#fff',
    border_color: '#ddd',
    paddingLeftAndRight: 0,
    paddingTopAndBottom: 5,
    border_style: (IBorderStyle[0] as unknown) as IBorderStyle,
    border_width: 3
  }
}
