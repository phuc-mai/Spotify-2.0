import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazam";

const SongDetails = () => {
    const dispatch = useDispatch()
    const { songid } = useParams()
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery(songid)

    const { data: relatedSongsData, isFetching: isFetchingRelatedSongs } = useGetSongRelatedQuery(songid)

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }
    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))
    }
    
    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details..." />
    if (error) return <Error />;
  
    const lyricId = songData.resources['shazam-songs'][songid]['relationships']['lyrics']['data'][0]['id']

    return (
        <div className="flex flex-col">
            <DetailsHeader
                songData={songData}
                songId={songid}
            />

            <div className="mb-10">
                <h2 className="text-white font-bold text-3xl">Lyrics:</h2>

                <div className="mt-5">
                    {songData?.resources?.lyrics ? songData?.resources?.lyrics[lyricId]['attributes']['text'].map((line, i) => (
                        <p className="text-gray-400 text-base my-1">{line}</p>
                    )) : <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>}
                </div>
            </div>

            <RelatedSongs
                data={Object.values(relatedSongsData?.resources['shazam-songs'])}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
}
export default SongDetails;
