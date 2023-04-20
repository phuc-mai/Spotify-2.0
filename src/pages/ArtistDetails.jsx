import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery } from "../redux/services/shazam";

const ArtistDetails = () => {
    const { id: artistId } = useParams()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId)
    const { data: topSongsData, isFetching: isFetchingTopSongs } = useGetArtistTopSongsQuery(artistId)

    if (isFetchingArtistDetails || isFetchingTopSongs) return <Loader title="Loading artist details..." />
    if (error) return <Error />;
    console.log(topSongsData?.data)
    return (
        <div className="flex flex-col">
            <DetailsHeader
                artistId={artistId}
                artistData={artistData?.data[0]}
            />

            <RelatedSongs
                data={topSongsData?.data}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                
            />
        </div>
    )
}
export default ArtistDetails;
