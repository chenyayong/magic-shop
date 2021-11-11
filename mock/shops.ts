/* eslint-disable camelcase */
import Mock from 'mockjs'
import { Response, Request } from 'express'
import { uuid } from '../src/utils/index'
import { iShopData } from '../src/api/types'

interface IMapComponent {
  [key: string]: any
}
interface IComponentData {
  id: string
  name: string
  label: string
  icon: string
  data: any
}

const shopList: iShopData[] = []
const articleCount = 100

const cellsData = (col: number, row: number) => {
  const data = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const temp = {
        id: uuid(),
        size: '1:1',
        position: `${j}:${i}`,
        img_url: imgUrl(),
        img_link: Mock.mock('@url()')
      }
      data.push(temp)
    }
  }
  return data
}

const imgUrl = () => {
  const text = Mock.mock('@word(5)')
  const bgcolor = Mock.mock('@color()')
  const textcolor = Mock.mock('@color()')
  const url = Mock.mock(`@image('200x200', '${bgcolor}', '${textcolor}', '${text}')`)
  return url
}

function swiper() {
  const item = {
    img_url: imgUrl(),
    img_link: Mock.mock('@url()')
  }
  const ret = {
    padding: Mock.mock('@integer(0, 100)'),
    items: new Array(Mock.mock('@integer(1, 2)')).fill(item)
  }
  return ret
}

function buttonGroup() {
  const item = {
    img_url: imgUrl(),
    img_link: Mock.mock('@url()'),
    img_label: Mock.mock('@word(5)')
  }
  const data = {
    row_button_count: Mock.mock('@pick([4, 5])'),
    swiper: Mock.mock('@pick([0, 1])'),
    row_swiper: Mock.mock('@pick([1, 2, 3])'),
    padding_top: Mock.mock('@integer(0, 100)'),
    padding_bottom: Mock.mock('@integer(0, 100)'),
    button_size: Mock.mock('@integer(30, 70)'),
    button_round: Mock.mock('@integer(0, 35)'),
    text_size: Mock.mock('@integer(12, 30)'),
    text_color: Mock.mock('@color()'),
    background: Mock.mock('@color()'),
    items: new Array(Mock.mock('@integer(1, 2)')).fill(item)
  }
  return data
}

function picture() {
  const item = {
    img_url: imgUrl(),
    img_link: Mock.mock('@url()')
  }
  const ret = {
    padding: Mock.mock('@integer(0, 100)'),
    items: new Array(Mock.mock('@integer(1, 2)')).fill(item)
  }
  return ret
}

function pictureGroup() {
  const rawData = {
    background: Mock.mock('@color()'),
    padding: Mock.mock('@integer(0, 30)'),
    grids_index: Mock.mock('@pick([0, 1, 2, 3])'),
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
            img_url: imgUrl(),
            img_link: Mock.mock('@url()')
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:0',
            img_url: imgUrl(),
            img_link: Mock.mock('@url()')
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:1',
            img_url: imgUrl(),
            img_link: Mock.mock('@url()')
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
  return rawData
}

function goodsItem() {
  const data = {
    id: Mock.mock('@id()'),
    src: imgUrl(),
    title: Mock.mock('@title(3, 5)'),
    status: Mock.mock('@pick([0, 1])'),
    new_price: Mock.mock('@float(60, 1000, 2, 2)'),
    old_price: Mock.mock('@float(60, 1000, 2, 2)'),
    stock: Mock.mock('@integer(60, 100)'),
    sales: Mock.mock('@integer(60, 100)')
  }
  return data
}

function goods() {
  const item = goodsItem()
  const rawData = {
    background: Mock.mock('@color()'),
    padding: Mock.mock('@integer(0, 30)'),
    border_radius: Mock.mock('@integer(0, 50)'),
    layout: Mock.mock('@pick([0, 1, 2, 3])'),
    attribute: Mock.mock('@pick([0, 1, 2, 3, 4, 5])'),
    content: ['title', 'old_price', 'new_price', 'sales'].slice(0, Mock.mock('@pick([1, 2, 3, 4])')),
    items: new Array(Mock.mock('@integer(1, 2)')).fill(item)
  }
  return rawData
}

const mapComponent: IMapComponent = {
  magic_swiper: swiper,
  magic_button_group: buttonGroup,
  magic_picture: picture,
  magic_picture_group: pictureGroup,
  magic_goods: goods
}
const mapLabel: IMapComponent = {
  magic_swiper: '轮播图',
  magic_button_group: '按钮组',
  magic_picture: '单图',
  magic_picture_group: '图片组合',
  magic_goods: '商品列表'
}

function getShopData() {
  const ret: any[] = []
  for (let i = 0; i < 5; i++) {
    const componentData: IComponentData = {
      id: uuid(),
      name: Mock.mock('@pick(["magic_swiper", "magic_button_group", "magic_picture", "magic_picture_group", "magic_goods"])'),
      label: '',
      icon: Mock.mock('@pick(["el-icon-picture", "el-icon-switch-button", "el-icon-picture-outlin", "el-icon-camera", "商品列表"])'),
      data: {}
    }
    componentData.label = mapLabel[componentData.name]
    componentData.data = mapComponent[componentData.name]()
    ret.push(componentData)
  }
  return ret
}

for (let i = 0; i < articleCount; i++) {
  shopList.push({
    id: i,
    updated_at: Mock.mock('@datetime'),
    page_title: Mock.mock('@title'),
    shop_data: getShopData()
    // page_scene_depict: Mock.mock('@word')
  })
}
export const getShops = (req: Request, res: Response) => {
  const { page = 1, limit = 10, page_title } = req.query

  const mockList = shopList.filter((item) => {
    if (page_title && page_title !== item.page_title) return false
    return true
  })

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * ((page as number) - 1))

  return res.json({
    code: 20000,
    msg: '成功',
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}
