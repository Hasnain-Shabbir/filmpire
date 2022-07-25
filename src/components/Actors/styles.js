import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
  image: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    // [theme.breakpoints.down('sm')]: {
    //   margin: '0 auto',
    //   width: '50%',
    //   height: '350px',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   margin: '0 auto',
    //   width: '100%',
    //   height: '350px',
    //   marginBottom: '30px',
    // },
  },
}));
