import React, { FC } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import useSiteMetadata from '../../../hooks/use-site-metadata';
import Header from './header';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

type MetaLayoutProps = {
  switchTheme: () => void;
};

const MetaLayout: FC<MetaLayoutProps> = (props) => {
  const styles = useStyles();
  const { title } = useSiteMetadata();
  return (
    <div className={styles.root}>
      <Header switchTheme={props.switchTheme} siteTitle={title} />
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default MetaLayout;
