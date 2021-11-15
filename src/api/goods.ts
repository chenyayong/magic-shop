import request from '@/utils/request'
import { IResponse } from './types'
export const getGoods = (params: any) =>
  (request({
    // url: '/goods',
    url: '/test/index.php/Admin/DiyApi/goods',
    method: 'get',
    params
  }) as unknown) as IResponse
