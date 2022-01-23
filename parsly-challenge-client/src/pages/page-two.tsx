import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Container, Theme } from '@material-ui/core';

import asPrivate from '../components/internal/private-route/private-route';
import { Seo } from '../components/internal';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
  },
}));

const PageTwo = () => {
  const styles = useStyles();
  return (
      <Container maxWidth="md" className={styles.root}>
        <Seo title="page-two" />
        <Typography variant="h2" gutterBottom component="h1">
          Hi from the second page
        </Typography>

        <Typography variant="body1">Welcome to page 2.</Typography>

        <Typography variant="body1">
          <Link component={GatsbyLink} to="/" className={styles.link}>
            Go back to the homepage
          </Link>
        </Typography>
      </Container>
  );
};

export default asPrivate(PageTwo);
