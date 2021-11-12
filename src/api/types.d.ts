import { IComponentData } from '@/store/magic/index'
/* eslint-disable camelcase */
export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

export interface iShopData {
  id: number
  updated_at: Date
  page_title: string
  shop_data: IComponentData[]
  page_icon: string
  // page_scene_depict: string
}

export interface IGoods {
  id: number
  src: string
  title: string
  status: number
  new_price: number
  old_price: number
  stock: number
  sales: number
}

export interface IImages {
  id: number
  src: string
  title: string
  active?: boolean
}
