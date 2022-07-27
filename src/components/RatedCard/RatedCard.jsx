import React from 'react';
import { Typography, Box } from '@mui/material';
import { Movie } from '../components';

const RatedCard = ({ data, title }) => {
  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <Box display='flex' flexWrap='wrap'>
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCard;
