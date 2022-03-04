import React, {ReactNode} from 'react';
import {Helmet} from 'react-helmet';

import {URLFlagProvider} from '../contexts/FlagContext';

import J40Header from './J40Header';
import J40Footer from './J40Footer';

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
        <title>{`${title} - Climate & Economic Justice Screening Tool`}</title>

        {/* Description content should ideally be between 160 - 200 characters */}
        <meta
          name="description"
          // eslint-disable-next-line max-len
          content={`This screening tool identifies disadvantaged communities that are underserved &overburdened by pollution. It provides socioeconomic, environmental, health and climate info to inform decisions.`}
        />

        {/* Keyword content should list the top 10 words in order of relevance. The words chosen need
            to appear on every page. These words were chosen from the header as it appears on each page */}
        <meta
          name="keywords"
          content={`screening tool climate environmental economic justice beta council quality methodology`}
        />

        {/* Allows for Open Graph meta tags */}
        <meta property="og:url" content="https://screeningtool.geoplatform.gov"/>
        <meta property="og:title" content="Climate and Economic Justice Screening Tool"/>
        <meta property="og:site_name" content="Climate and Economic Justice Screening Tool"/>
        <meta
          property="og:description"
          // eslint-disable-next-line max-len
          content={`This screening tool identifies disadvantaged communities that are underserved &overburdened by pollution. It provides socioeconomic, environmental, health and climate info to inform decisions.`}
        />


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
        </main>
        <J40Footer/>
      </URLFlagProvider>
    </>
  );
};

export default Layout;
