import { Error, Loader, SongCard } from '../components'
import { useGetTopChartsQuery } from '../redux/services/shazam'
import { useDispatch, useSelector } from 'react-redux'

const Discover = () => {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    const { data, isFetching, error } = useGetTopChartsQuery()

    if (isFetching) return <Loader title="Loading songs..." />
    if (error) return <Error />

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4'>
                <h2 className='text-white font-bold text-3xl'>Discover</h2>
            </div>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8 mt-10'>
                {data.tracks?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default Discover;
