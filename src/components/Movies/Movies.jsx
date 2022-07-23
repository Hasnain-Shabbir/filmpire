import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MovieList } from '../components';
import { useGetMoviesQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName } = useSelector(
    state => state.currentGenreOrCategory
  );
  const { data, isFetching, isError } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
  });

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
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
