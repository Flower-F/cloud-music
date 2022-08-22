import { debounce } from 'lodash-es'
import { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'

interface IProps {
  /** 搜索关键词 */
  newQuery: string
  /** 搜索请求相关的处理 */
  handleQueryRequest: (...args: any) => any
  className?: string
}

const SearchBox: FC<IProps> = ({ newQuery, handleQueryRequest, className }) => {
  const queryRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState('')

  const handleQueryRequestDebounce = useMemo(() => {
    return debounce(handleQueryRequest, 500)
  }, [handleQueryRequest])

  const clearQuery = useCallback(() => {
    setQuery('')
    queryRef.current?.focus()
  }, [])

  const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  useEffect(() => {
    queryRef.current?.focus()
  }, [])

  useEffect(() => {
    handleQueryRequestDebounce(query)
  }, [query])

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery)
    }
  }, [newQuery])

  return (
    <div className={className}>
      <input
        type="text"
        ref={queryRef}
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleQueryChange}
        className="h-6 w-full flex-1 bg-transparent text-lg text-light_color outline-none placeholder:text-light_color/60"
      />
      <TiDeleteOutline
        onClick={clearQuery}
        className={`visible text-2xl text-white ${query.length === 0 && 'invisible'}`}
      />
    </div>
  )
}

export default memo(SearchBox)
