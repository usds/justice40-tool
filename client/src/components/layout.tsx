import React, {ReactNode} from 'react';
import {GridContainer, Grid} from '@trussworks/react-uswds';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import {URLFlagProvider} from '../contexts/FlagContext';
import DatasetContainer from '../components/DatasetContainer';
// this has to be wrong

interface ILayoutProps {
  children: ReactNode,
  location: Location
}

const Layout = ({children, location}: ILayoutProps) => {
  const isMethodologyPage = location.pathname.match(/methodology\/?/);

  // @ts-ignore
  return (
    <URLFlagProvider location={location}>
      <J40Header location={location}/>
      <GridContainer containerSize={'desktop-lg'}
        className={'j40-grid-container'}>
        <Grid row>
          <main id={'main-content'}
            className={'usa-layout-docs j40-main-content desktop:grid-col-12'}>
            {children}
          </main>
        </Grid>
      </GridContainer>
      {isMethodologyPage ? <DatasetContainer />: null}
      <J40Footer/>
    </URLFlagProvider>
  );
};

export default Layout;
