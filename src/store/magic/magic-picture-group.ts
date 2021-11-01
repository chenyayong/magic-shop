import { VuexModule, Module } from 'vuex-module-decorators'
export interface IMagicPictureGroupItem {
  id?: string
  size: string
  position: string
  imgUrl: string
  imgLink: string
  filter?: boolean
}
export interface IMagicPictureGroup {
  padding: number
  scale: number
  row: number
  col: number
  items: IMagicPictureGroupItem[]
}

interface IState {
  name: string
  rawData: IMagicPictureGroup
}

@Module({ namespaced: true })
export default class extends VuexModule implements IState {
  public name = 'magicPicture'
  public rawData = {
    padding: 0,
    scale: 1,
    row: 1,
    col: 2,
    items: [
      {
        size: '1:1',
        position: '0:0',
        imgUrl: '',
        imgLink: ''
      },
      {
        size: '1:1',
        position: '1:0',
        imgUrl: '',
        imgLink: ''
      }
    ]
  }
}
