import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import React from 'react';

import { Error, Loader, SongCard } from '../components'
import { useGetSongsByCountryQuery } from '../redux/services/shazam';

const AroundYou = () => {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error} = useGetSongsByCountryQuery(country)

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_45iYMyLNgfaok5JDCwOetqiHODTUq`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [country])

    if (isFetching && loading) return <Loader title='Loading songs around you...' />
    if (error && country) return <Error />

    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-left text-white mt-4 mb-10'>
                Around You <span className='font-black'>{country}</span>
            </h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.tracks?.map((song, i) => (
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

export default AroundYou;
