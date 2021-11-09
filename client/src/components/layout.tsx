import React, {ReactNode, useEffect, useState} from 'react';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import {URLFlagProvider} from '../contexts/FlagContext';
import {Helmet} from 'react-helmet';
import SurveyFab from './SurveyFab';

interface ILayoutProps {
  children: ReactNode,
  location: Location,
  title: string,
}

const Layout = ({children, location, title}: ILayoutProps) => {
  const [locationState, setLocationState] = useState(location);

  useEffect(() => {
    setLocationState(location);
  }, [location]);

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
      <URLFlagProvider location={location}>
        <J40Header />
        <main id={'main-content'}>
          {children}
          {!locationState.pathname.includes('survey') ? <SurveyFab /> : null}
        </main>
        <J40Footer/>
      </URLFlagProvider>
    </>
  );
};

export default Layout;
