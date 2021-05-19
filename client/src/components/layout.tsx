import React from 'react';
import * as styles from './layout.module.css';

import { GovBanner } from '@trussworks/react-uswds';

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <GovBanner />
            <div className={styles.siteContent}>
                {children}
            </div>
        </>
    );
};

export default Layout;