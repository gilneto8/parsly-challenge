import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Container, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  heroContent: {
    marginTop: '5rem',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

export interface HeroProps {
  title: string | JSX.Element;
  description?: string | JSX.Element;
}

const Hero: FC<HeroProps> = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.heroContent}>
      <Container maxWidth="sm">
        {typeof props.title === 'string' ? (
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            {props.title}
          </Typography>
        ) : (
          props.title
        )}
        {typeof props.description === 'string' ? (
          <Typography variant="h5" align="center" paragraph>
            {props.description || ''}
          </Typography>
        ) : (
          props.description
        )}
        {props.children}
      </Container>
    </div>
  );
};

export default Hero;
