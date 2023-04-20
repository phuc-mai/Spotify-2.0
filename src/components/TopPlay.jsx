import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazam";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, i, data, activeSong, isPlaying }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    console.log(song)

    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer`}
    >
      <h3 className="font-bold text-white text-base mr-3">{i + 1}.</h3>

      <div className="flex-1 flex flex-row items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.images?.coverart}
          alt={song?.title}
        />

        <div className="flex-1 flex flex-col justify-center mx-5">
          <Link to={`/songs/${song.key}`}>
            <p className="text-base font-bold text-white">{song?.title}</p>
          </Link>

          <Link to={`/artists/${song.artists && song?.artists[0].adamid}`}>
            <p className="text-sm text-gray-300 mt-1">{song?.subtitle}</p>
          </Link>
        </div>
      </div>

      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  )
};

const TopPlay = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.tracks?.slice(0, 5);

  return (
    <>
      <div
        ref={divRef}
        className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col"
      >
        <div>
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Charts</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-pointer">See More</p>
            </Link>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            {topPlays?.map((song, i) => (
              <TopChartCard
                key={song.key}
                data={data}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See More</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {topPlays?.map((artist) => (
              <SwiperSlide
                key={artist?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link
                  to={`/artists/${
                    artist.artists && artist?.artists[0]?.adamid
                  }`}
                >
                  <img
                    src={artist?.images?.background}
                    alt="Artist"
                    className="rounded-full object-contain"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopPlay;
