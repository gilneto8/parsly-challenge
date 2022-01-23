import React, { FC, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import MetaLayout from './meta-layout';
import { themes, getCookie, setCookie, themeCookie } from '../../../util';
import { DatesContextProvider } from '../../../hooks/use-dates-provider';
import { QueryClient, QueryClientProvider } from 'react-query';

const Layout: FC = (props) => {
  const [theme, setTheme] = useState<Theme>(
    themes[getCookie(themeCookie) ?? 'light'] as Theme,
  );
  const client = new QueryClient();

  const switchTheme = (): void => {
    setTheme((prev) => {
      const newTheme = prev.palette.type === 'dark' ? 'light' : 'dark';
      setCookie(themeCookie, newTheme);
      return themes[newTheme] as Theme;
    });
  };

  return (
    <QueryClientProvider client={client}>
      <DatesContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MetaLayout switchTheme={switchTheme}>{props.children}</MetaLayout>
        </ThemeProvider>
      </DatesContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;
