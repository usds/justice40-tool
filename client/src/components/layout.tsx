import React, {ReactNode} from 'react';
import {GridContainer, Grid} from '@trussworks/react-uswds';
// import * as styles from './layout.module.scss';
import J40Header2 from './J40Header2';
import J40Footer from './J40Footer';
import J40Aside from '../components/J40Aside';

interface ILayoutProps {
  children: ReactNode
}

const Layout = ({children}: ILayoutProps) => {
  return (
    <div className={''}>
      <J40Header2/>
      <GridContainer containerSize={'desktop-lg'}
        className={'j40-grid-container'}>
        <Grid row>
          <main
            id={'main-content'}
            className={'usa-layout-docs desktop:grid-col-9 j40-main-content'}>
            <section className={'usa-prose'}>
              {children}
            </section>
          </main>
          <J40Aside/>
        </Grid>
      </GridContainer>
      <J40Footer/>
    </div>
  );
};

export default Layout;
