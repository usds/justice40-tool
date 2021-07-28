import React, {ReactNode} from 'react';
import {GridContainer, Grid} from '@trussworks/react-uswds';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import {URLFlagProvider} from '../contexts/FlagContext';
import {Helmet} from 'react-helmet';
import {useIntl} from 'gatsby-plugin-intl';

interface ILayoutProps {
  children: ReactNode,
  location: Location
}

const Layout = ({children, location}: ILayoutProps) => {
  const intl = useIntl();

  // @ts-ignore
  return (
    <URLFlagProvider location={location}>
      <Helmet htmlAttributes={{lang: intl.locale}}>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <J40Header/>
      <GridContainer containerSize={'desktop-lg'}
        className={'j40-grid-container'}>
        <Grid row>
          <main id={'main-content'}
            className={'usa-layout-docs j40-main-content desktop:grid-col-12'}>
            {children}
          </main>
        </Grid>
      </GridContainer>
      <J40Footer/>
    </URLFlagProvider>
  );
};

export default Layout;
