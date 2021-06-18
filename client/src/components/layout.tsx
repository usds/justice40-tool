import React, {ReactNode} from 'react';
import {GridContainer, Grid} from '@trussworks/react-uswds';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import J40Aside from '../components/J40Aside';
import {URLFlagProvider} from '../contexts/FlagContext';

interface ILayoutProps {
  children: ReactNode,
  location: Location
}

const Layout = ({children, location}: ILayoutProps) => {
  const isWidthFullPage = location.pathname.endsWith('/cejst');
  const conditionalAside = isWidthFullPage ? <></> : <J40Aside/>;
  const gridCssClass = isWidthFullPage ? ' desktop:grid-col-12' :
    'desktop:grid-col-9';

  return (
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
  );
};

export default Layout;
