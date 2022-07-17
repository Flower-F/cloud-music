import { memo } from 'react'

import RankList from '@/components/RankList'
import Scroll from '@/ui/Scroll'

const RankPage = () => {
  const rankList = [
    {
      coverImgUrl:
        'https://p1.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg',
      tracks: [
        {
          first: '隆里电丝 (LIVE版)',
          second: '盛宇DamnShine/KEY.L刘聪/ICE'
        },
        {
          first: '黑夜骑士',
          second: '某幻君'
        },
        {
          first: '兄妹',
          second: '刘大拿'
        }
      ],
      coverImgId: 109951166952713760,
      updateFrequency: '刚刚更新',
      name: '飙升榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [
        {
          first: '给你一瓶魔法药水',
          second: '告五人'
        },
        {
          first: '我多想拥抱你',
          second: '黑屋乐队'
        },
        {
          first: '隆里电丝 (LIVE版)',
          second: '盛宇DamnShine/KEY.L刘聪/ICE'
        }
      ],
      coverImgId: 109951166952686380,
      updateFrequency: '刚刚更新',
      name: '新歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 3,
      updateFrequency: '每周四更新',
      name: '原创榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 4,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 6,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 7,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 8,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 9,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 10,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 11,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 12,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 13,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 14,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 15,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 16,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 17,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 18,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 19,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 20,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    },
    {
      coverImgUrl:
        'https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg',
      tracks: [],
      coverImgId: 21,
      updateFrequency: '刚刚更新',
      name: '热歌榜'
    }
  ]

  return (
    <div className="fixed top-24 bottom-0 w-full">
      <Scroll>
        <RankList rankList={rankList} />
      </Scroll>
    </div>
  )
}

export default memo(RankPage)
