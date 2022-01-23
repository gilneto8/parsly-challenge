import React, { useState, useEffect } from 'react';
import LoginPage from './login';
import OrganizationsPage from './organizations';

const IndexPage = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem('token'));
  }, []);

  return hasToken ? <OrganizationsPage /> : <LoginPage />;
};

export default IndexPage;
