import { VuexModule, Module } from 'vuex-module-decorators'
import { uuid } from '@/utils/index'

export const cellsData = (col: number, row: number) => {
  const data = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const temp = {
        id: uuid(),
        size: '1:1',
        position: `${j}:${i}`,
        imgUrl: '',
        imgLink: '',
        filter: true
      }
      data.push(temp)
    }
  }
  return data
}

export interface IMagicPictureGroupItem {
  id?: string
  size: string
  position: string
  imgUrl: string
  imgLink: string
  filter?: boolean
}
export interface IMagicPictureGroupSub {
  scale: number
  row: number
  col: number
  items: IMagicPictureGroupItem[]
}
export interface IMagicPictureGroup {
  gridsIndex: number
  gridsData: IMagicPictureGroupSub[]
  background: string
  padding: number
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
    gridsIndex: 0,
    gridsData: [
      {
        scale: 1,
        row: 1,
        col: 2,
        items: cellsData(2, 1)
      },
      {
        scale: 1,
        row: 2,
        col: 2,
        items: [
          {
            id: uuid(),
            size: '1:2',
            position: '0:0',
            imgUrl: '',
            imgLink: '',
            filter: true
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:0',
            imgUrl: '',
            imgLink: '',
            filter: true
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:1',
            imgUrl: '',
            imgLink: '',
            filter: true
          }
        ]
      },
      {
        scale: 1,
        col: 2,
        row: 2,
        items: cellsData(2, 2)
      },
      {
        scale: 1,
        col: 3,
        row: 3,
        items: cellsData(3, 3)
      }
    ]
  }
}
