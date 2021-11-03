/* eslint-disable camelcase */
import Mock from 'mockjs'
import { Response, Request } from 'express'
import { IGoods } from '../src/api/types'
const list: IGoods[] = []
const count = 100
for (let i = 0; i < count; i++) {
  list.push({
    id: i,
    src: Mock.mock('@image("50x50")'),
    title: Mock.mock('@title(3, 5)'),
    status: Mock.mock('@pick([0, 1])'),
    new_price: Mock.mock('@float(60, 1000, 2, 2)'),
    old_price: Mock.mock('@float(60, 1000, 2, 2)'),
    stock: Mock.mock('@integer(60, 100)')
  })
}
export const getGoods = (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query

  const pageList = list.filter(
    (_, index) =>
      index < (limit as number) * (page as number) &&
      index >= (limit as number) * ((page as number) - 1)
  )

  return res.json({
    code: 20000,
    msg: '成功',
    data: {
      total: list.length,
      items: pageList
    }
  })
}
