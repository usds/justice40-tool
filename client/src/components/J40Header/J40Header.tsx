import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  GovBanner,
  Grid,
} from '@trussworks/react-uswds';
import BetaBanner from '../BetaBanner';
import J40MainGridContainer from '../J40MainGridContainer';
import Language from '../Language';

// @ts-ignore
import siteLogo from '../../images/j40-logo-v2.png';
import * as styles from './J40Header.module.scss';
import * as COMMON_COPY from '../../data/copy/common';

const J40Header = () => {
  const intl = useIntl();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const titleL1 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_1);
  const titleL2 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_2);

  const toggleMobileNav = (): void =>
    setMobileNavOpen((prevOpen) => !prevOpen);

  const headerLinks = () => {
    // static map of all possible menu items. Originally, it was all strings,
    // but we need to handle both onsite and offsite links.
    const menuData = new Map<string, JSX.Element>([
      ['about',
        <Link
          to={'/'}
          key={'about'}
          activeClassName="usa-current"
          data-cy={'nav-link-about'}>
          {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
        </Link>,
      ],
      ['cejst',
        <Link
          to={'/cejst'}
          key={'cejst'}
          activeClassName="usa-current"
          data-cy={'nav-link-explore-the-tool'}>
          {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
        </Link>,
      ],
      ['methodology',
        <Link
          to={'/methodology'}
          key={'methodology'}
          activeClassName="usa-current"
          data-cy={'nav-link-methodology'}>
          {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
        </Link>,
      ],
      ['contact',
        <Link
          to={'/contact'}
          key={'contact'}
          activeClassName="usa-current"
          data-cy={'nav-link-contact'}>
          {intl.formatMessage(COMMON_COPY.HEADER.CONTACT)}
        </Link>,
      ],
    ]);

    const menu =['about', 'cejst', 'methodology', 'contact'];
    return menu.map((key) => menuData.get(key));
  };

  return (
    <Header basic={true} role={'banner'}>

      {/* Move to it's own component */}
      {/* Gov Banners */}
      <div className={styles.fullScreenContainer}>
        <div className={styles.bannerContainer}>
          <GovBanner/>
          <Language />
        </div>
      </div>

      <BetaBanner/>

      {/* Logo and Navigation */}
      <J40MainGridContainer>

        <Grid className={styles.logoNavRow} row>

          {/* Logo */}
          <Grid col={1}>
            <img className={styles.logo} src={siteLogo} alt={`${titleL1} ${titleL2}`} />
          </Grid>

          {/* Logo Title */}
          <Grid col={6}>
            <div className={styles.logoTitle}>
              <div>{titleL1}</div>
              <div className={styles.title2BetaPill}>
                <div> {titleL2} </div>
                <div className={styles.betaPill}>BETA</div>
              </div>
            </div>
          </Grid>

          {/* Nav links */}
          <Grid col={'fill'} className={styles.navLinks}>
            <NavMenuButton
              key={'mobileMenuButton'}
              onClick={toggleMobileNav}
              label="Menu"/>
            <PrimaryNav
              items={headerLinks()}
              mobileExpanded={mobileNavOpen}
              onToggleMobileNav={toggleMobileNav}
            />
          </Grid>

        </Grid>
      </J40MainGridContainer>
    </Header>
  );
};

export default J40Header;
