import React, {ReactNode} from 'react';
import * as styles from './layout.module.scss';
import J40Header from './J40Header';
import J40Footer from './J40Footer';
import {URLFlagProvider} from '../contexts/FlagContext';

interface ILayoutProps {
  children: ReactNode,
  location: URL
}

const Layout = ({children, location}: ILayoutProps) => {
  return (
    <URLFlagProvider location={location}>
      <div className={styles.site}>
        <J40Header />
        <div className={styles.siteContent}>{children}</div>
        <J40Footer />
      </div>
    </URLFlagProvider>
  );
};

export default Layout;
