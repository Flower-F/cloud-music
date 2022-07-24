import { IBanner } from '@/components/BannerList'
import { IRank } from '@/components/RankList'
import { IRecommend } from '@/components/RecommendList'
import { ISinger } from '@/components/SingerList'
import { IAlbum, ISong } from '@/components/SongList'

import { request } from './config'

// RecommendPage
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

// SingerPage
export interface ISingerListApi {
  artists: ISinger[]
}
export const getHotSingerListApi = (count: number) => {
  return request<ISingerListApi>({
    method: 'GET',
    url: `/top/artists?offset=${count}`
  })
}
export const getSingerListApi = (type: string, area: string, alpha: string, offset: number) => {
  return request<ISingerListApi>({
    method: 'GET',
    url: `/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${offset}`
  })
}

// RankPage
export interface IRankListApi {
  list: IRank[]
}
export const getRankListApi = () => {
  return request<IRankListApi>({
    method: 'GET',
    url: '/toplist/detail'
  })
}

// AlbumPage
export interface IAlbumApi {
  playlist: IAlbum
}
export const getAlbumApi = (id: number) => {
  return request<IAlbumApi>({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}

// ArtistPage
export interface IArtistApi {
  artist: {
    picUrl: string
    name: string
  }
  hotSongs: ISong[]
}
export const getArtistApi = (id: number) => {
  return request<IArtistApi>({
    method: 'GET',
    url: `/artists?id=${id}`
  })
}
