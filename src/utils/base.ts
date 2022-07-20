/** 拼接歌手列表的歌手名字 */
export const getName = (
  list: {
    name: string
  }[]
) => {
  let str = ''
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name
    return item
  })
  return str
}
