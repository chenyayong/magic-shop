import Mock from 'mockjs'
import { uuid } from '../../src/utils/index'

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
    // padding: Mock.mock('@integer(0, 100)'),
    padding: 0,
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
    // padding_top: Mock.mock('@integer(0, 100)'),
    // padding_bottom: Mock.mock('@integer(0, 100)'),
    padding_top: 0,
    padding_bottom: 0,
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
    // padding: Mock.mock('@integer(0, 100)'),
    padding: 0,
    items: new Array(Mock.mock('@integer(1, 2)')).fill(item)
  }
  return ret
}
const cellsData = (
  col: number,
  row: number,
  img_url: string,
  img_link: string,
  filter: boolean
) => {
  const data = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const temp = {
        id: uuid(),
        size: '1:1',
        position: `${j}:${i}`,
        img_url: img_url,
        img_link: img_link,
        filter: filter
      }
      data.push(temp)
    }
  }
  return data
}

function pictureGroup() {
  const rawData = {
    background: Mock.mock('@color()'),
    // padding: Mock.mock('@integer(0, 30)'),
    padding: 0,
    grids_index: Mock.mock('@pick([0, 1, 2, 3])'),
    grids_data: [
      {
        scale: 1,
        row: 1,
        col: 2,
        items: cellsData(2, 1, '', '', false)
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
            filter: false
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:0',
            img_url: '',
            img_link: '',
            filter: false
          },
          {
            id: uuid(),
            size: '1:1',
            position: '1:1',
            img_url: '',
            img_link: '',
            filter: false
          }
        ]
      },
      {
        scale: 1,
        col: 2,
        row: 2,
        items: cellsData(2, 2, '', '', false)
      },
      {
        scale: 1,
        col: 3,
        row: 3,
        items: cellsData(3, 3, '', '', true)
      }
    ]
  }
  const items = rawData.grids_data[rawData.grids_index].items
  items.forEach((e) => {
    e.img_url = imgUrl()
    e.img_link = Mock.mock('@url()')
    e.filter = false
  })
  return rawData
}

function goodsItem() {
  const data = {
    goods_id: Mock.mock('@id()'),
    original_img: Mock.mock('@image("50x50")'),
    goods_name: Mock.mock('@title(3, 5)'),
    is_on_sale: Mock.mock('@pick([0, 1])'),
    shop_price: Mock.mock('@float(60, 1000, 2, 2)'),
    old_price: Mock.mock('@float(60, 1000, 2, 2)'),
    store_count: Mock.mock('@integer(60, 100)'),
    sales_sum: Mock.mock('@integer(60, 100)')
  }
  return data
}

function goods() {
  const item = goodsItem()
  const rawData = {
    background: Mock.mock('@color()'),
    // padding: Mock.mock('@integer(0, 30)'),
    padding: 0,
    border_radius: Mock.mock('@integer(0, 50)'),
    layout: Mock.mock('@pick([0, 1, 2, 3])'),
    attribute: Mock.mock('@pick([0, 1, 2, 3, 4, 5])'),
    content: ['title', 'old_price', 'new_price', 'sales'].slice(
      0,
      Mock.mock('@pick([1, 2, 3, 4])')
    ),
    items: new Array(Mock.mock('@integer(1, 2)')).fill(item)
  }
  return rawData
}

export const getShopData = function() {
  const ret: any[] = []
  for (let i = 0; i < 3; i++) {
    const componentData: IComponentData = {
      id: uuid(),
      name: Mock.mock(
        '@pick(["magic_swiper", "magic_button_group", "magic_picture", "magic_picture_group", "magic_goods"])'
      ),
      label: '',
      icon: Mock.mock(
        '@pick(["el-icon-picture", "el-icon-switch-button", "el-icon-picture-outlin", "el-icon-camera", "el-icon-goods"])'
      ),
      data: {}
    }
    componentData.label = mapLabel[componentData.name]
    componentData.data = mapComponent[componentData.name]()
    ret.push(componentData)
  }
  return ret
}
