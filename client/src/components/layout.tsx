import React, {ReactNode} from 'react';
import {Helmet} from 'react-helmet';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import {URLFlagProvider} from '../contexts/FlagContext';

import J40Footer from './J40Footer';
import J40Header from './J40Header';
import SurveyFab from './SurveyFab';
interface ILayoutProps {
  children: ReactNode,
  location: Location,
  title: string,
}

const queryClient = new QueryClient();

const Layout = ({children, location, title}: ILayoutProps) => {
  // @ts-ignore
  return (
    <>
      <Helmet defer={false}>
        <html lang="en"/>
        <title>{title}</title>

        {/* DAP Tag */}
        <script async
          type="text/javascript"
          id="_fed_an_ua_tag"
          src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=DOI&sitetopic=cejst&enhlink=true">
        </script>
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <URLFlagProvider location={location}>
          <J40Header />
          <main id={'main-content'}>
            {children}
            <SurveyFab />
          </main>
          <J40Footer/>
        </URLFlagProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
};

export default Layout;
