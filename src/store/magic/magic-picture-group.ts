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
  gridsIndex?: number
  gridsData?: IMagicPictureGroup[]
  background: string
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
    background: '',
    padding: 0,
    scale: 1,
    row: 1,
    col: 2,
    gridsIndex: 0,
    // gridsData: [
    //   {
    //     padding: 0,
    //     scale: 1,
    //     row: 1,
    //     col: 2,
    //     items: []
    //   },
    //   {
    //     padding: 0,
    //     scale: 1,
    //     row: 2,
    //     col: 2,
    //     items: []
    //   },
    //   {
    //     padding: 0,
    //     scale: 1,
    //     col: 2,
    //     row: 2,
    //     items: []
    //   },
    //   {
    //     padding: 0,
    //     scale: 1,
    //     col: 3,
    //     row: 3,
    //     items: []
    //   }
    // ],
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
