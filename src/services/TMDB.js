import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
//* https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: builder => ({
    //* Get the Movies Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName }) => {
        //* Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
        }

        //* Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        //* Get Popular Movies
        return `movie/popular?api_key=${tmdbApiKey}&page=${page}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
