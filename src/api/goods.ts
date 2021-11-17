import request from '@/utils/request'
import { IResponse } from './types'
console.log(process.env.NODE_ENV)
export const getGoods = (params: any) => {
  const url = process.env.NODE_ENV === 'production' ? '/index.php/Admin/DiyApi/goods' : '/test/index.php/Admin/DiyApi/goods'
  return (request({
    // url: '/goods',
    // url: '/test/index.php/Admin/DiyApi/goods',
    // url: '/index.php/Admin/DiyApi/goods',
    url: url,
    method: 'get',
    params
  }) as unknown) as IResponse
}
