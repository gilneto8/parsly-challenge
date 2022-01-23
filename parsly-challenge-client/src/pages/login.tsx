import React, { useEffect } from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Login, Signup } from '../components/auth';
import { goto } from '../util/router';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  paper: {
    width: '75%',
    height: '60%',
    '& > *': {
      height: '100%',
    },
  },
}));

const LoginPage = () => {
  const styles = useStyles();

  useEffect(() => {
    if (!!localStorage.getItem('accessToken')) goto('/page-two');
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={styles.root}
    >
      <Paper className={styles.paper} variant="elevation" elevation={4}>
        <Grid container justifyContent="center" alignItems="center">
          <Login />
          <Signup />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
