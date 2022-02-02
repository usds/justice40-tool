import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  Grid,
} from '@trussworks/react-uswds';
import BetaBanner from '../BetaBanner';
import J40MainGridContainer from '../J40MainGridContainer';
import GovernmentBanner from '../GovernmentBanner';
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

  const navLinks = [
    <Link
      to={'/'}
      key={'about'}
      activeClassName="usa-current"
      data-cy={'nav-link-about'}>
      {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
    </Link>,
    <Link
      to={'/cejst'}
      key={'cejst'}
      activeClassName="usa-current"
      data-cy={'nav-link-explore-the-tool'}>
      {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
    </Link>,
    <Link
      to={'/methodology'}
      key={'methodology'}
      activeClassName="usa-current"
      data-cy={'nav-link-methodology'}>
      {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
    </Link>,
    <Link
      to={'/contact'}
      key={'contact'}
      activeClassName="usa-current"
      data-cy={'nav-link-contact'}>
      {intl.formatMessage(COMMON_COPY.HEADER.CONTACT)}
    </Link>,
    <div key={'language'}>
      <Language isDesktop={false}/>
    </div>,
  ];

  return (
    <Header basic={true} role={'banner'}>

      {/* Banners */}
      <GovernmentBanner />
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
              label="Menu">
            </NavMenuButton>
            <PrimaryNav
              items={navLinks}
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
