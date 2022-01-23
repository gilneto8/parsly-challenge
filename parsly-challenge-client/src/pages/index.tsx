import React, { useState, useEffect } from 'react';
import LoginPage from './login';
import PageTwo from './page-two';

const IndexPage = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem('token'));
  }, []);

  return hasToken ? <PageTwo /> : <LoginPage />;
};

export default IndexPage;
