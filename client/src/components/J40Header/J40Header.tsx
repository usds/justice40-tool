import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  Grid,
  Alert,
  // NavDropDownButton,
  // Menu,
} from '@trussworks/react-uswds';
import BetaBanner from '../BetaBanner';
import J40MainGridContainer from '../J40MainGridContainer';
import GovernmentBanner from '../GovernmentBanner';
import Language from '../Language';

// @ts-ignore
import siteLogo from '../../images/j40-logo-v2.png';
import * as styles from './J40Header.module.scss';
import * as COMMON_COPY from '../../data/copy/common';
import {PAGES_ENDPOINTS} from '../../data/constants';

const isAlertValid = new Date < COMMON_COPY.ALERTS.EXPIRATION_DATE;

const J40Header = () => {
  const intl = useIntl();

  const titleL1 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_1);
  const titleL2 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_2);

  /**
   * State variable to control the mobile menu toggle
   */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = (): void =>
    setMobileNavOpen((prevOpen) => !prevOpen);

  /**
   * State variable to hold the open/close state of each nav dropdown. There are currently two
   * dropdowns that are being used, each corresponding to an index in the state array:
   *
   * index 0 = Data & Methodology dropdown
   * index 1 = About dropdown
   */
  // const [isOpen, setIsOpen] = useState([false, false]);
  // const onToggle = (index: number): void => {
  //   setIsOpen((prevIsOpen) => {
  //     const newIsOpen = [false, false];
  //     newIsOpen[index] = !prevIsOpen[index];
  //     return newIsOpen;
  //   });
  // };

  // Commenting out subnav links for now
  // const methPageSubNavLinks = [
  //   <Link
  //     to={PAGES_ENDPOINTS.METHODOLOGY}
  //     key={'methodology'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-methodology'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
  //   </Link>,
  //   <Link
  //     to={PAGES_ENDPOINTS.DOWNLOADS}
  //     key={'downloads'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-downloads'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.DOWNLOADS)}
  //   </Link>,
  //   <Link
  //     to={PAGES_ENDPOINTS.TSD}
  //     key={'tsd'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-technical-support-docs'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.TSD)}
  //   </Link>,
  // ];

  // const aboutSubNavLinks = [
  //   <Link
  //     to={PAGES_ENDPOINTS.ABOUT}
  //     key={'about'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-about'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
  //   </Link>,
  //   <Link
  //     to={PAGES_ENDPOINTS.FAQS}
  //     key={'faqs'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-faqs'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.FAQs)}
  //   </Link>,
  //   <Link
  //     to={PAGES_ENDPOINTS.PUBLIC_ENG}
  //     key={'publicEng'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-public-engagement'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.PUBLIC_ENG)}
  //   </Link>,
  // ];

  const navLinks = [
    <Link
      to={PAGES_ENDPOINTS.EXPLORE}
      key={'explore-tool'}
      activeClassName="usa-current"
      data-cy={'nav-link-explore-the-tool'}>
      {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.METHODOLOGY}
      key={'methodology'}
      activeClassName="usa-current"
      data-cy={'nav-link-methodology'}>
      {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.ABOUT}
      key={'about'}
      activeClassName="usa-current"
      data-cy={'nav-link-about'}>
      {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
    </Link>,
    // <>
    //   <NavDropDownButton
    //     key="methDropDown"
    //     label={intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
    //     menuId="methMenu"
    //     isOpen={isOpen[0]}
    //     onToggle={(): void => onToggle(0)}
    //     data-cy={'nav-dropdown-methodology'}
    //     className={styles.navDropDownBtn}
    //   >
    //   </NavDropDownButton>
    //   <Menu
    //     id='methMenu'
    //     type='subnav'
    //     items={methPageSubNavLinks}
    //     isOpen={isOpen[0]}
    //   >
    //   </Menu>
    // </>,
    // <>
    //   <NavDropDownButton
    //     key="aboutDropDown"
    //     label={intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
    //     menuId="aboutMenu"
    //     isOpen={isOpen[1]}
    //     onToggle={(): void => onToggle(1)}
    //     data-cy={'nav-dropdown-about'}
    //   >
    //   </NavDropDownButton>
    //   <Menu
    //     id='aboutMenu'
    //     type='subnav'
    //     items={aboutSubNavLinks}
    //     isOpen={isOpen[1]}
    //   >
    //   </Menu>
    // </>,
    <Link
      to={PAGES_ENDPOINTS.CONTACT}
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
            >
            </PrimaryNav>
          </Grid>

        </Grid>
      </J40MainGridContainer>

      {/* Alert */}
      {isAlertValid && <J40MainGridContainer>
        <Alert
          className={styles.alert}
          type="info"
          heading={intl.formatMessage(COMMON_COPY.ALERTS.CENSUS_TRACT.TITLE)}>
          {COMMON_COPY.ALERTS.CENSUS_TRACT_DESCRIPTION}
        </Alert>
      </J40MainGridContainer>
      }
    </Header>
  );
};

export default J40Header;
