import React, { ReactNode } from 'react';
import * as styles from './layout.module.css';

import { GovBanner } from '@trussworks/react-uswds';

interface ILayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
    return (
        <>
        <GovBanner />
        <div className={styles.siteContent}>{children}</div>
        </>
    );
};

  export default Layout;