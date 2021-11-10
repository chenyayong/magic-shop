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
        imgUrl: imgUrl(),
        imgLink: Mock.mock('@url()'),
        filter: false
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
    imgUrl: imgUrl(),
    imgLink: Mock.mock('@url()')
  }
  const ret = {
    padding: Mock.mock('@integer(0, 100)'),
    items: new Array(Mock.mock('@integer(1, 5)')).fill(item)
  }
  return ret
}

function buttonGroup() {
  const item = {
    imgUrl: imgUrl(),
    imgLink: Mock.mock('@url()'),
    imgLabel: Mock.mock('@word(5)')
  }
  const data = {
    rowButtonCount: Mock.mock('@pick([4, 5])'),
    swiper: Mock.mock('@pick([0, 1])'),
    rowSwiper: Mock.mock('@pick([1, 2, 3])'),
    paddingTop: Mock.mock('@integer(0, 100)'),
    paddingBottom: Mock.mock('@integer(0, 100)'),
    buttonSize: Mock.mock('@integer(30, 70)'),
    buttonRound: Mock.mock('@integer(0, 35)'),
    textSize: Mock.mock('@integer(12, 30)'),
    textColor: Mock.mock('@color()'),
    background: Mock.mock('@color()'),
    items: new Array(Mock.mock('@integer(1, 5)')).fill(item)
  }
  return data
}

function picture() {
  const item = {
    imgUrl: imgUrl(),
    imgLink: Mock.mock('@url()')
  }
  const ret = {
    padding: Mock.mock('@integer(0, 100)'),
    items: new Array(Mock.mock('@integer(1, 5)')).fill(item)
  }
  return ret
}

function pictureGroup() {
  const rawData = {
    background: Mock.mock('@color()'),
    padding: Mock.mock('@integer(0, 30)'),
    gridsIndex: Mock.mock('@pick([0, 1, 2, 3])'),
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
            imgUrl: imgUrl(),
            imgLink: Mock.mock('@url()'),
            filter: false
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:0',
            imgUrl: imgUrl(),
            imgLink: Mock.mock('@url()'),
            filter: false
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:1',
            imgUrl: imgUrl(),
            imgLink: Mock.mock('@url()'),
            filter: false
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
    borderRadius: Mock.mock('@integer(0, 50)'),
    layout: Mock.mock('@pick([0, 1, 2, 3])'),
    attribute: Mock.mock('@pick([0, 1, 2, 3, 4, 5])'),
    content: ['title', 'old_price', 'new_price', 'sales'].slice(0, Mock.mock('@pick([1, 2, 3, 4])')),
    items: new Array(Mock.mock('@integer(1, 5)')).fill(item)
  }
  return rawData
}

const mapComponent: IMapComponent = {
  magicSwiper: swiper,
  magicButtonGroup: buttonGroup,
  magicPicture: picture,
  magicPictureGroup: pictureGroup,
  magicGoods: goods
}
const mapLabel: IMapComponent = {
  magicSwiper: '轮播图',
  magicButtonGroup: '按钮组',
  magicPicture: '单图',
  magicPictureGroup: '图片组合',
  magicGoods: '商品列表'
}

function getShopData() {
  const ret: any[] = []
  for (let i = 0; i < 10; i++) {
    const componentData: IComponentData = {
      id: uuid(),
      name: Mock.mock('@pick(["magicSwiper", "magicButtonGroup", "magicPicture", "magicPictureGroup", "magicGoods"])'),
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
