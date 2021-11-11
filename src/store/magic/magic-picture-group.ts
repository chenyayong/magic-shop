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
        img_url: '',
        img_link: '',
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
  img_url: string
  img_link: string
  filter?: boolean
}
export interface IMagicPictureGroupSub {
  scale: number
  row: number
  col: number
  items: IMagicPictureGroupItem[]
}
export interface IMagicPictureGroup {
  grids_index: number
  grids_data: IMagicPictureGroupSub[]
  background: string
  padding: number
}

export interface IMagicPictureGroupComponent {
  id?: string
  name: string
  label: string
  icon: string
  data: IMagicPictureGroup
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
    grids_index: 0,
    grids_data: [
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
            img_url: '',
            img_link: '',
            filter: true
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:0',
            img_url: '',
            img_link: '',
            filter: true
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:1',
            img_url: '',
            img_link: '',
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
