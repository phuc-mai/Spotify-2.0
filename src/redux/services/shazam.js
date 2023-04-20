import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamApi = createApi ({
    reducerPath: 'shazamApi', // The name of API
    baseQuery: fetchBaseQuery ({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '01253ca4c5msh795d55f936c5075p1e3dc7jsnbf3901177195')
            headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com')
            return headers
        }
    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track' }),
        getSongDetails: builder.query({ query: (songid) => `/shazam-songs/get-details?id=${songid}` }),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/get-details?id=${artistId}` }),
        getSongRelated: builder.query({ query: (songid) => `/shazam-songs/list-similarities?id=${`track-similarities-id-${songid}`}`}),
        getArtistTopSongs: builder.query({ query: (artistId) => `/artists/get-top-songs?id=${artistId}` }),
        getSongsByCountry: builder.query({ query: (country) => `/charts/track?listId=${`ip-country-chart-${country}`}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` })
    })
})

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistTopSongsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery
} = shazamApi