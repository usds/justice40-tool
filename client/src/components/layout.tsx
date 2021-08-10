import React, {ReactNode} from 'react';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import {URLFlagProvider} from '../contexts/FlagContext';

interface ILayoutProps {
  children: ReactNode,
  location: Location
}

const Layout = ({children, location}: ILayoutProps) => {
  // @ts-ignore
  return (
    <URLFlagProvider location={location}>
      <J40Header />
      <main id={'main-content'}>
        {children}
      </main>
      <J40Footer/>
    </URLFlagProvider>
  );
};

export default Layout;
