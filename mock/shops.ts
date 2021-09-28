/* eslint-disable camelcase */
import Mock from 'mockjs'
import { Response, Request } from 'express'
import { iShopData } from '../src/api/types'
const shopList: iShopData[] = []
const articleCount = 100
for (let i = 0; i < articleCount; i++) {
  shopList.push({
    id: i,
    updated_at: Mock.mock('@datetime'),
    page_name: Mock.mock('@title'),
    page_scene_depict: Mock.mock('@word')
  })
}
export const getShops = (req: Request, res: Response) => {
  const { page = 1, limit = 10, page_name } = req.query

  const mockList = shopList.filter((item) => {
    if (page_name && page_name !== item.page_name) return false
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
