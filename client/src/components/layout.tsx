import React, { ReactNode } from "react";
import * as styles from './layout.module.scss';
import J40Header from './J40Header';
import J40Footer from "./J40Footer";
interface ILayoutProps {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
      <div className={styles.site}>
        <J40Header />
        <div className={styles.siteContent}>{children}</div>
        <J40Footer />
      </div>
  );
};

export default Layout;