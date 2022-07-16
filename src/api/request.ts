import { IBanner } from '@/components/BannerList'
import { IRecommend } from '@/components/RecommendList'

import { request } from './config'

export interface IBannerListApi {
  banners: IBanner[]
}
export const getBannerListApi = () => {
  return request<IBannerListApi>({
    method: 'GET',
    url: '/banner'
  })
}

export interface IRecommendListApi {
  result: IRecommend[]
}
export const getRecommendListApi = () => {
  return request<IRecommendListApi>({
    method: 'GET',
    url: '/personalized'
  })
}
