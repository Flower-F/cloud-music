import axios from 'axios'

import { BASE_REQUEST_URL } from '@/constants'
import { ISingerConfig } from '@/ui/Horizon'

const axiosInstance = axios.create({
  baseURL: BASE_REQUEST_URL
})

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Toast.error('网络错误')
    return Promise.reject(new Error(error))
  }
)

export { axiosInstance as request }

export const singerTypes: ISingerConfig[] = [
  {
    name: '全部',
    key: '-1'
  },
  {
    name: '男歌手',
    key: '1'
  },
  {
    name: '女歌手',
    key: '2'
  },
  {
    name: '乐队',
    key: '3'
  }
]

export const singerAreas: ISingerConfig[] = [
  {
    name: '全部',
    key: '-1'
  },
  {
    name: '华语',
    key: '7'
  },
  {
    name: '欧美',
    key: '96'
  },
  {
    name: '日本',
    key: '8'
  },
  {
    name: '韩国',
    key: '16'
  },
  {
    name: '其他',
    key: '0'
  }
]

export const singerAlphas: ISingerConfig[] = [
  {
    key: 'A',
    name: 'A'
  },
  {
    key: 'B',
    name: 'B'
  },
  {
    key: 'C',
    name: 'C'
  },
  {
    key: 'D',
    name: 'D'
  },
  {
    key: 'E',
    name: 'E'
  },
  {
    key: 'F',
    name: 'F'
  },
  {
    key: 'G',
    name: 'G'
  },
  {
    key: 'H',
    name: 'H'
  },
  {
    key: 'I',
    name: 'I'
  },
  {
    key: 'J',
    name: 'J'
  },
  {
    key: 'K',
    name: 'K'
  },
  {
    key: 'L',
    name: 'L'
  },
  {
    key: 'M',
    name: 'M'
  },
  {
    key: 'N',
    name: 'N'
  },
  {
    key: 'O',
    name: 'O'
  },
  {
    key: 'P',
    name: 'P'
  },
  {
    key: 'Q',
    name: 'Q'
  },
  {
    key: 'R',
    name: 'R'
  },
  {
    key: 'S',
    name: 'S'
  },
  {
    key: 'T',
    name: 'T'
  },
  {
    key: 'U',
    name: 'U'
  },
  {
    key: 'V',
    name: 'V'
  },
  {
    key: 'W',
    name: 'W'
  },
  {
    key: 'X',
    name: 'X'
  },
  {
    key: 'Y',
    name: 'Y'
  },
  {
    key: 'Z',
    name: 'Z'
  }
]

export enum playingMode {
  /** 顺序播放 */
  SEQUENCE_MODE,
  /** 循环播放 */
  LOOP_MODE,
  /** 随机播放 */
  RANDOM_MODE
}
