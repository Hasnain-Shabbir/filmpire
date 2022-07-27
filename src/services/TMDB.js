import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get the Movies Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get Movies by Search
        if (searchQuery) {
          return `/search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
        }

        // Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
        }

        // Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        // Get Popular Movies
        return `movie/popular?api_key=${tmdbApiKey}&page=${page}`;
      },
    }),

    // Get User Specific Movies Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    // Get Movie Info
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    // Get Recommended movies
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?&api_key=${tmdbApiKey}`,
    }),

    // Get the details about an Actor
    getActorsDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    // Get Movies related to an Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?api_key=${tmdbApiKey}&with_cast=${id}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetListQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;
