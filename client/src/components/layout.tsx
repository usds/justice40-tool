import React, {ReactNode} from 'react';
import {GridContainer, Grid} from '@trussworks/react-uswds';
// import * as styles from './layout.module.scss';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import J40Aside from '../components/J40Aside';
import {URLFlagProvider} from '../contexts/FlagContext';

interface ILayoutProps {
  children: ReactNode,
  location: Location
}

const Layout = ({children, location}: ILayoutProps) => {
  return (
    <URLFlagProvider location={location}>
      <J40Header/>
      <GridContainer containerSize={'desktop-lg'}
        className={'j40-grid-container'}>
        <Grid row>
          <main id={'main-content'}
            className={'usa-layout-docs desktop:grid-col-9 j40-main-content'}>
            <section className={'usa-prose'}>
              {children}
            </section>
          </main>
          <J40Aside/>
        </Grid>
      </GridContainer>
      <J40Footer/>
    </URLFlagProvider>
  );
};

export default Layout;
