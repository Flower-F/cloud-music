import { noop } from 'lodash-es'

const timeRegExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

/** 播放状态 */
export enum EPlayingState {
  PAUSE,
  PLAYING
}

export interface ILine {
  /** 时间 ms */
  time: number
  /** 歌词文本 */
  text: string
}

/** 歌词解析类 */
export class LyricParser {
  /** 解析前的歌词 */
  private lrc: string
  /** 解析后的歌词数组 */
  public lines: ILine[]
  /** 回调函数 */
  private callback: ({ line, text }: { line: number; text: string }) => void
  /** 播放状态 */
  private state: EPlayingState
  /** 当前播放歌词所在行数 */
  private currentLineIndex: number
  /** 歌曲开始的时间戳 */
  private startStamp: number
  /** 定时器 */
  private timer: NodeJS.Timer | undefined

  /**
   *
   * @param lrc 歌词
   * @param callback 回调函数
   */
  constructor(lrc: string, callback?: ({ line, text }: { line: number; text: string }) => void) {
    if (!callback) {
      callback = noop
    }
    this.lrc = lrc
    this.lines = []
    this.callback = callback
    this.state = EPlayingState.PAUSE
    this.currentLineIndex = 0
    this.startStamp = 0
    this.timer = undefined

    this.initialLines()
  }

  /** 初始化歌词列表 */
  private initialLines() {
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const result = timeRegExp.exec(line)
      if (!result) {
        continue
      }
      const text = line.replace(timeRegExp, '').trim() // 把时间戳去掉，只剩下歌词文本
      if (text) {
        if (result[3].length === 3) {
          result[3] = String((result[3] as unknown as number) / 10) // [00:01.997]中匹配到的997就会被切成99
        }
        this.lines.push({
          time:
            (result[1] as unknown as number) * 60 * 1000 +
            (result[2] as unknown as number) * 1000 +
            ((result[3] as unknown as number) || 0) * 10, // 转化具体到毫秒的时间，result[3] * 10 可理解为 (result / 100) * 1000
          text
        })
      }
    }

    this.lines.sort((a, b) => a.time - b.time)
  }

  /**
   *
   * @param offset : 时间进度
   * @param isSeek : 用户是否进行手动调整
   */
  public play(offset = 0, isSeek = false) {
    if (this.lines.length === 0) {
      return
    }
    this.state = EPlayingState.PLAYING
    this.currentLineIndex = this.findCurrentLineIndex(offset)
    // 当前行数为 this.currentLineIndex-1
    this.callBackHandler(this.currentLineIndex - 1)
    // 计算时间戳
    this.startStamp = +new Date() - offset

    if (this.currentLineIndex < this.lines.length) {
      clearTimeout(this.timer)
      //继续播放
      this.playingRestSongs(isSeek)
    }
  }

  /**
   *
   * @param offset : 时间进度
   * @returns : 返回当前播放的歌词行
   */
  private findCurrentLineIndex(offset: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (offset <= this.lines[i].time) {
        return i
      }
    }

    return this.lines.length - 1
  }

  /** 回调函数封装 */
  private callBackHandler(index: number) {
    console.log('callback handle', index)
    if (index < 0) {
      return
    }
    this.callback({
      text: this.lines[index].text,
      line: index
    })
  }

  /**
   *
   * @param isSeek 用户是否手动调整进度
   */
  private playingRestSongs(isSeek = false) {
    console.log('playingRestSongs', this.currentLineIndex)
    const line = this.lines[this.currentLineIndex]

    let delay
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp)
    } else {
      const prevTime = this.lines[this.currentLineIndex - 1] ? this.lines[this.currentLineIndex - 1].time : 0
      delay = line.time - prevTime
    }

    this.timer = setTimeout(() => {
      this.callBackHandler(this.currentLineIndex++)
      if (this.currentLineIndex < this.lines.length && this.state === EPlayingState.PLAYING) {
        // 递归进行后续歌词播放
        this.playingRestSongs()
      }
    }, delay)
  }

  /** 暂停播放状态 */
  public stop() {
    this.state = EPlayingState.PAUSE
    clearTimeout(this.timer)
  }

  /** 切换播放状态 */
  public togglePlayingState(offset: number) {
    if (this.state === EPlayingState.PLAYING) {
      this.stop()
    } else {
      this.state = EPlayingState.PLAYING
      this.play(offset, true)
    }
  }

  /** 切换到某个时间点播放 */
  public seek(offset: number) {
    this.play(offset, true)
  }
}
