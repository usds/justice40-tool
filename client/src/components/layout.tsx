import React, {ReactNode} from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {IntlProvider} from 'react-intl';
import {GridContainer, Grid} from '@trussworks/react-uswds';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import J40Aside from '../components/J40Aside';
import {URLFlagProvider} from '../contexts/FlagContext';
// this has to be wrong
import ES_LANG from '../intl/es.json';

interface ILayoutProps {
  children: ReactNode,
  location: Location
}

const Layout = ({children, location}: ILayoutProps) => {
  const intl = useIntl();
  const isWidthFullPage = location.pathname.match(/cejst\/?/);
  const conditionalAside = isWidthFullPage ? <></> : <J40Aside/>;
  const gridCssClass = isWidthFullPage ? ' desktop:grid-col-12' :
    'desktop:grid-col-9';

  // @ts-ignore
  return (
    <IntlProvider locale={intl.locale} defaultLocale={'en'}
      messages={intl.locale==='es' ? ES_LANG : {} }>
      <URLFlagProvider location={location}>
        <J40Header/>
        <GridContainer containerSize={'desktop-lg'}
          className={'j40-grid-container'}>
          <Grid row>
            <main id={'main-content'}
              className={'usa-layout-docs j40-main-content ' + gridCssClass}>
              {children}
            </main>
            {conditionalAside}
          </Grid>
        </GridContainer>
        <J40Footer/>
      </URLFlagProvider>
    </IntlProvider>
  );
};

export default Layout;
