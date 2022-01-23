import {
  Button,
  IconButton,
  IconButtonProps,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import { FCR } from '../../../typings';

type Props = {
  hidden?: boolean;
  style?: React.CSSProperties;
  className?: string;
  tooltip?: string;
  onClick?: (arg?: unknown) => void;
  type?: 'submit' | 'button' | 'reset';
  asButton?: boolean;
  noSideGutters?: boolean;
  fullWidth?: boolean;
  color?: string;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
} & IconButtonProps;

const useStyles = makeStyles((theme: Theme) => ({
  disableGutters: {
    padding: theme.spacing(1, 0),
  },
  fullWidth: {
    display: 'flex',
    width: '100%',
  },
}));
const WrappedButton: FCR<Props> = (props) => {
  const {
    hidden,
    style,
    className,
    onClick,
    tooltip,
    children,
    asButton,
    noSideGutters,
    fullWidth,
    type,
    color,
    variant,
    disabled,
  } = props;
  const styles = useStyles();
  const rootClasses = fullWidth ? styles.fullWidth : '';
  const iconClasses = `${noSideGutters ? styles.disableGutters : ''} ${
    className || ''
  }`;
  return hidden ? null : (
    <Tooltip title={tooltip || ''} className={rootClasses}>
      {!asButton ? (
        <IconButton
          className={iconClasses}
          style={style}
          {...(onClick ? { onClick } : {})}
          type={type || 'submit'}
          disabled={disabled}
        >
          {children}
        </IconButton>
      ) : (
        <Button
          {...(color ? { color } : {})}
          {...(variant ? { variant } : {})}
          className={className}
          style={style}
          {...(onClick ? { onClick } : {})}
          type={type || 'submit'}
          disabled={disabled}
        >
          {children}
        </Button>
      )}
    </Tooltip>
  );
};

export default WrappedButton;
