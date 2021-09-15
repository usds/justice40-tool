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
      <Helmet title={title} defer={false} />
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
