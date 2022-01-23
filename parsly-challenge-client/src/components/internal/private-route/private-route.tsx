import React from 'react';
import { goto } from '../../../util/router';

const asPrivate = (Component: React.FC) => (props: any) => {
  if (!localStorage.getItem('token')) {
    goto('/login');
    return null;
  }
  return <Component {...props} />;
};

export default asPrivate;
