import React from 'react';
import asPrivate from '../components/internal/private-route/private-route';
import { useLocation } from '../util/router';
import Organizations from '../components/organizations/organizations';

const OrganizationsPage = () => {
  const location = useLocation();
  return <Organizations showTips={location.state?.auth?.fromSignup} />;
};

export default asPrivate(OrganizationsPage);
