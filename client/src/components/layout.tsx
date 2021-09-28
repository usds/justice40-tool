import React, {ReactNode} from 'react';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import {URLFlagProvider} from '../contexts/FlagContext';
import {Helmet} from 'react-helmet';

interface ILayoutProps {
  children: ReactNode,
  location: Location,
  title: string,
}

const Layout = ({children, location, title}: ILayoutProps) => {
  // @ts-ignore
  return (
    <>
      <Helmet defer={false}>
        <html lang="en"/>
        <title>{title}</title>
        <script async
          type="text/javascript"
          id="_fed_an_ua_tag"
          src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=DOI&sitetopic=cejst&enhlink=true">
        </script>
      </Helmet>
      <URLFlagProvider location={location}>
        <J40Header />
        <main id={'main-content'}>
          {children}
        </main>
        <J40Footer/>
      </URLFlagProvider>
    </>
  );
};

export default Layout;
