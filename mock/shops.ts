/* eslint-disable camelcase */
import Mock from 'mockjs'
import { Response, Request } from 'express'
import { iShopData } from '../src/api/types'
import { getShopData } from './shops/index'
const shopList: iShopData[] = []
const articleCount = 100

for (let i = 0; i < articleCount; i++) {
  shopList.push({
    shop_id: i,
    is_index: 0,
    // update_at: Mock.mock('@datetime'),
    update_at: Math.floor(Date.now() / 1000),
    page_title: Mock.mock('@title'),
    page_icon: Mock.mock('@image()'),
    shop_data: JSON.stringify(getShopData())
    // page_scene_depict: Mock.mock('@word')
  })
}
export const getShops = (req: Request, res: Response) => {
  const { page = 1, limit = 10, page_title } = req.query

  const mockList = shopList.filter((item) => {
    if (page_title && page_title !== item.page_title) return false
    return true
  })

  const pageList = mockList.filter(
    (_, index) =>
      index < (limit as number) * (page as number) &&
      index >= (limit as number) * ((page as number) - 1)
  )

  return res.json({
    code: 20000,
    msg: '成功',
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const deleteShop = (req: Request, res: Response) => {
  const { shopId } = req.params
  const index = shopList.findIndex((e) => e.shop_id === parseInt(shopId))
  if (index > -1) {
    shopList.splice(index, 1)
    return res.json({
      code: 20000,
      msg: '成功',
      data: {}
    })
  } else {
    return res.json({
      code: 40004,
      msg: '失败'
    })
  }
}

export const updateShop = (req: Request, res: Response) => {
  const { shopId } = req.params
  const body = req.body
  const index = shopList.findIndex((e) => e.shop_id === parseInt(shopId))
  if (index > -1) {
    const id = shopList[index].shop_id
    shopList[index] = body
    shopList[index].shop_id = id
    return res.json({
      code: 20000,
      msg: '成功'
    })
  } else {
    return res.json({
      code: 40004,
      msg: '失败'
    })
  }
}

export const getShop = (req: Request, res: Response) => {
  const { shopId } = req.params
  const item = shopList.find((e) => e.shop_id === parseInt(shopId))
  if (item) {
    return res.json({
      code: 20000,
      msg: '成功',
      data: item
    })
  } else {
    return res.json({
      code: 40004,
      msg: '失败'
    })
  }
}

export const createShop = (req: Request, res: Response) => {
  const body = req.body
  let shop_id = shopList[shopList.length - 1].shop_id
  shop_id++
  body.id = shop_id
  shopList.unshift(body)
  return res.json({
    code: 20000,
    msg: '成功'
  })
}
