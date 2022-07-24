import MiniPlayer from '@/components/MiniPlayer'

const PlayerLayout = () => {
  const currentSong = {
    al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg' },
    name: '木偶人',
    ar: [{ name: '薛之谦' }]
  }

  return (
    <div>
      <MiniPlayer song={currentSong} />
    </div>
  )
}

export default PlayerLayout
