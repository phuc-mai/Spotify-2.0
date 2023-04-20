import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div className="flex flex-col p-4 w-[200px] bg-white/5 rounded-lg cursor-pointer animate-slideup">
      <div className="relative w-full group">
        <div className={`absolute inset-0 justify-center items-center bg-black/50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black/70' : 'hidden'}`}>
          <PlayPause
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img src={song.images?.coverart} alt='song_img' />
      </div>

      <div className="mt-4">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p>

        <p className="text-sm text-gray-300 mt-1 truncate">
          <Link to={song?.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  )
};

export default SongCard;
