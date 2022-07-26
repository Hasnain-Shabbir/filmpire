import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MovieList, Pagination, FeaturedMovie } from '../components';
import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching, isError } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 17 : 19;

  // Handling the Fetching state show the Loading Spinner.
  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  // Showing the message to users if there is no movies match
  if (!data.results.length) {
    return (
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4'>
          No movies that match that name. <br />
          Please search something else
        </Typography>
      </Box>
    );
  }

  // Handling the Errors.
  if (isError) return 'An error has occured';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </div>
  );
};

export default Movies;
