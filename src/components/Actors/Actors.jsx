import React from 'react';
import { Grid, Button, Typography, Box, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import { MovieList } from '../components';

const Actors = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetActorsDetailsQuery(id);
  const page = 1;
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}></Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.name}
          className={classes.image}
        />
      </Grid>
      <Grid
        item
        lg={7}
        xl={8}
        display='flex'
        justifyContent='center'
        flexDirection='column'
      >
        <Typography variant='h2' gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant='body1' paragraph>
          {data?.biography}
        </Typography>
        <Box
          marginTop='2rem'
          display='flex'
          justifyContent='space-around'
          width='100%'
        >
          <Button
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
            variant='contained'
            color='primary'
          >
            IMDB
          </Button>
          <Button
            target='_blank'
            rel='noopener noreferrer'
            variant='outlined'
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Grid>
      <Box width='100%' margin='2rem 0'>
        <Typography variant='h2' gutterBottom align='center'>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>
    </Grid>
  );
};

export default Actors;
