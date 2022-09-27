import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  Grid,
  NavDropDownButton,
  Menu,
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

interface IJ40Header {
  location: Location
}
/**
 * The J40Header component will control how the header looks for both mobile and desktop
 *
 * The Header is defined as
 * 1. Two rows of Banners (ie, official gov website and beta site)
 * 2. Logo and Nav Links Row
 * 3. Any Alerts
 *
 * @param {Location} location
 * @return {JSX.Element}
 */
const J40Header = ({location}:IJ40Header) => {
  const intl = useIntl();

  // Logo text
  const logoLine1 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_1);

  /**
   * State variable to control the toggling of mobile menu button
   */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = (): void => {
    console.log('mobile opened!');
    setMobileNavOpen((prevOpen) => !prevOpen);
  };

  /**
   * State variable to hold the open/close state of each nav dropdown. This will allow for two
   * dropdown that are being used, each corresponding to an index in the state array:
   *
   * index 0 = Data & Methodology dropdown
   * index 1 = About dropdown
   */
  const [isOpen, setIsOpen] = useState([false, false]);

  /**
   * This toggle function will handle both navigation toggle links (Meth and About).
   *
   * @param {number} index
   */
  const onToggle = (index: number): void => {
    console.log('🚀 ~ file: J40Header.tsx ~ line 57 ~ J40Header ~ isOpen before toggle', isOpen);

    // The setIsOpen is used to toggle the currently selected nav link
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...isOpen];
      newIsOpen[index] = !prevIsOpen[index];
      return newIsOpen;
    });

    // This logic handles closing an already open nav link
    if (index === 0 && isOpen[1] === true) {
      setIsOpen([isOpen[0], false]);
    } else if (index === 1 && isOpen[0] === true) {
      setIsOpen([false, isOpen[1]]);
    }
  };

  /**
   * On mobile, the Methodology & Data page should have two sub-nav links. This defines
   * the array that will hold these links
   */
  const methPageSubNavLinks = [
    <Link
      to={PAGES_ENDPOINTS.METHODOLOGY}
      key={'methodology'}
      activeClassName="usa-current"
      data-cy={'nav-link-methodology'}>
      {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.DOWNLOADS}
      key={'downloads'}
      activeClassName="usa-current"
      data-cy={'nav-link-downloads'}>
      {intl.formatMessage(COMMON_COPY.HEADER.DOWNLOADS)}
    </Link>,
    // <Link
    //   to={PAGES_ENDPOINTS.TSD}
    //   key={'tsd'}
    //   activeClassName="usa-current"
    //   data-cy={'nav-link-technical-support-docs'}>
    //   {intl.formatMessage(COMMON_COPY.HEADER.TSD)}
    // </Link>,
  ];

  /**
   * On mobile, the About page should have 3 sub-nav links. This defines
   * the array that will hold these links
   */
  const aboutPageSubNavLinks = [
    <Link
      to={PAGES_ENDPOINTS.ABOUT}
      key={'about'}
      activeClassName="usa-current"
      data-cy={'nav-link-about'}>
      {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.FAQS}
      key={'faqs'}
      activeClassName="usa-current"
      data-cy={'nav-link-faqs'}>
      {intl.formatMessage(COMMON_COPY.HEADER.FAQS)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.PUBLIC_ENG}
      key={'publicEng'}
      activeClassName="usa-current"
      data-cy={'nav-link-public-engagement'}>
      {intl.formatMessage(COMMON_COPY.HEADER.PUBLIC_ENG)}
    </Link>,
  ];


  /*
   * This is the array that holds the navigation links and eventually is the one
   * that is passed to the render function. It only defines Explore and
   * Contact.
   *
   * The Methodology & Data link along with the About link is passed in depending on
   * screen size. These will be spliced into this navLinks array manually.
   *
   */
  const navLinks = [
    <Link
      to={PAGES_ENDPOINTS.EXPLORE}
      key={'explore-map'}
      activeClassName="usa-current"
      data-cy={'nav-link-explore-the-map'}>
      {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
    </Link>,
    <>
      <NavDropDownButton
        className={
          location?.pathname === `/en${PAGES_ENDPOINTS.METHODOLOGY}` ||
          location?.pathname === `/en${PAGES_ENDPOINTS.DOWNLOADS}` ?
          'usa-current' :
          ''
        }
        key="methDropDown"
        label={intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
        menuId="methMenu"
        isOpen={isOpen[0]}
        onToggle={(): void => onToggle(0)}
        data-cy={'nav-dropdown-methodology'}
      >
      </NavDropDownButton>
      <Menu
        id='methMenu'
        type='subnav'
        items={methPageSubNavLinks}
        isOpen={isOpen[0]}
      >
      </Menu>
    </>,
    <>
      <NavDropDownButton
        className={
          location?.pathname === `/en${PAGES_ENDPOINTS.ABOUT}` ||
          location?.pathname === `/en${PAGES_ENDPOINTS.FAQS}` ||
          location?.pathname === `/en${PAGES_ENDPOINTS.PUBLIC_ENG}` ?
          'usa-current' :
          ''
        }
        key="aboutDropDown"
        label={intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
        menuId="aboutMenu"
        isOpen={isOpen[1]}
        onToggle={(): void => onToggle(1)}
        data-cy={'nav-dropdown-about'}
      >
      </NavDropDownButton>
      <Menu
        id='aboutMenu'
        type='subnav'
        items={aboutPageSubNavLinks}
        isOpen={isOpen[1]}
      >
      </Menu>
    </>,
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


  /**
   * Create the mobile/desktop components for Meth&Data and About respectively
   */

  // Methodology & Data component on mobile (with sub-pages)
  // const MethNavMobile = () =>
  //   <>
  //     <NavDropDownButton
  //       key="methDropDown"
  //       label={intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
  //       menuId="methMenu"
  //       isOpen={isOpen[0]}
  //       onToggle={(): void => onToggle(0)}
  //       data-cy={'nav-dropdown-methodology'}
  //     >
  //     </NavDropDownButton>
  //     <Menu
  //       id='methMenu'
  //       type='subnav'
  //       items={methPageSubNavLinks}
  //       isOpen={isOpen[0]}
  //     >
  //     </Menu>
  //   </>;

  // About component on mobile (with sub-pages)
  // const AboutNavMobile = () =>
  //   <>
  //     <NavDropDownButton
  //       key="methDropDown"
  //       label={intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
  //       menuId="methMenu"
  //       isOpen={isOpen[1]}
  //       onToggle={(): void => onToggle(1)}
  //       data-cy={'nav-dropdown-methodology'}
  //     >
  //     </NavDropDownButton>
  //     <Menu
  //       id='methMenu'
  //       type='subnav'
  //       items={aboutPageSubNavLinks}
  //       isOpen={isOpen[1]}
  //     >
  //     </Menu>
  //   </>;

  // Methodology & Data component on desktop (no sub-pages)
  // const MethNavDesktop = () =>
  //   <Link
  //     to={PAGES_ENDPOINTS.METHODOLOGY}
  //     key={'methodology'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-methodology'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
  //   </Link>;

  // // About component on desktop (no sub-pages)
  // const AboutNavDesktop = () =>
  //   <Link
  //     to={PAGES_ENDPOINTS.ABOUT}
  //     key={'about'}
  //     activeClassName="usa-current"
  //     data-cy={'nav-link-about'}>
  //     {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
  //   </Link>;

  // Modify navLinks to choose the appropriate Methodology & Data component, depending on screen size
  // navLinks.splice(1, 0, width > USWDS_BREAKPOINTS.DESKTOP ? <MethNavMobile/> : <MethNavMobile/>);

  // Modify navLinks to choose the appropriate About component, depending on screen size
  // navLinks.splice(2, 0, width > USWDS_BREAKPOINTS.DESKTOP ? <AboutNavMobile/> : <AboutNavMobile/>);

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
            <img className={styles.logo} src={siteLogo} alt={`${logoLine1}`} />
          </Grid>

          {/* Logo Title */}
          <Grid col={6}>
            <div className={styles.logoTitle}>
              {logoLine1}
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
      {/* {<J40MainGridContainer>
        <Alert
          className={styles.alert}
          type="info"
          heading={intl.formatMessage(COMMON_COPY.ALERTS.ALERT_2_TITLE.TITLE)}>
          {COMMON_COPY.ALERTS.ALERT_2_DESCRIPTION}
        </Alert>

        <Alert
          className={styles.alert}
          type="info"
          heading={intl.formatMessage(COMMON_COPY.ALERTS.ALERT_1_TITLE.TITLE)}>
          {COMMON_COPY.ALERTS.ALERT_1_DESCRIPTION}
        </Alert>
      </J40MainGridContainer>
      } */}
    </Header>
  );
};

export default J40Header;
