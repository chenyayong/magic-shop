import request from '@/utils/request'
import { IResponse } from './types'
export const getImages = (params: any) =>
  (request({
    // url: '/images',
    // url: '/test/index.php/Admin/DiyApi/images',
    url: '/index.php/Admin/DiyApi/images',
    method: 'get',
    params
  }) as unknown) as IResponse
