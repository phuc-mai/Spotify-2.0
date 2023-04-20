import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ song, activeSong, isPlaying, handlePause, handlePlay }) => {
  console.log(song)
  return (
    isPlaying && activeSong?.title === song.title ? (
      <FaPauseCircle
        size={30}
        className="text-gray-400"
        onClick={handlePause}
      />
    ) : (
      <FaPlayCircle size={30} className="text-gray-300" onClick={handlePlay} />
    )
  );
};
export default PlayPause;
