import React, { FC, useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Tooltip,
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    height: 50,
    zIndex: 1500,
  },
  toolbar: {
    height: 50,
  },
  title: {
    flexGrow: 1,
    marginBottom: 10,
  },
  link: {
    textDecoration: 'none',
  },
  switch: {
    marginBottom: 10,
  },
}));

export interface HeaderProps {
  switchTheme: () => void;
  siteTitle?: string;
}

const Header: FC<HeaderProps> = (props) => {
  const [showOn, setShowOn] = useState<boolean>(false);
  const styles = useStyles();

  const onSwitch = (): void => {
    setShowOn((prev) => !prev);
    props.switchTheme();
  };

  return (
    <AppBar
      elevation={1}
      component="header"
      position="static"
      className={styles.root}
    >
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.title}>
          <Link
            to="/"
            component={GatsbyLink}
            color="inherit"
            className={styles.link}
          >
            {props.siteTitle || ''}
          </Link>
        </Typography>
        <Tooltip title="switch theme">
          <Button onClick={onSwitch} className={styles.switch}>
            {showOn ? <BsToggleOn size="40" /> : <BsToggleOff size="40" />}
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
