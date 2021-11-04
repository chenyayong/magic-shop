import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicPictureItem {
  imgUrl: string
  imgLink: string
}
export interface IMagicPicture {
  padding: number
  items: IMagicPictureItem[]
}

export interface IMagicPictureComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicPicture
}

interface IState {
  name: string
  rawData: IMagicPicture
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicPicture'
  public rawData = {
    padding: 0,
    items: [
      {
        imgUrl: '',
        imgLink: ''
      }
    ]
  }
}
