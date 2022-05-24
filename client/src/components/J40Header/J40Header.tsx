import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  Grid,
  Alert,
  NavDropDownButton,
  Menu,
} from '@trussworks/react-uswds';
import BetaBanner from '../BetaBanner';
import J40MainGridContainer from '../J40MainGridContainer';
import GovernmentBanner from '../GovernmentBanner';
import Language from '../Language';
import {useWindowSize} from 'react-use';

// @ts-ignore
import siteLogo from '../../images/j40-logo-v2.png';
import * as styles from './J40Header.module.scss';
import * as COMMON_COPY from '../../data/copy/common';
import {PAGES_ENDPOINTS} from '../../data/constants';

/**
 * The J40Header component will control how the header looks for both mobile and desktop
 *
 * The Header is defined as
 * 1. Two rows of Banners (ie, official gov website and beta site)
 * 2. Logo and Nav Links Row
 * 3. Any Alerts
 *
 * @return {JSX.Element}
 */
const J40Header = () => {
  const intl = useIntl();
  const {width} = useWindowSize();

  // Logo text
  const logoLine1 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_1);
  const logoLine2 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_2);

  /**
   * State variable to control the toggling of mobile menu button
   */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = (): void =>
    setMobileNavOpen((prevOpen) => !prevOpen);

  /**
   * This logic would apply if we were allowing the desktop navigation link to dropdown. This
   * is currently not in and may be placed in the future.
   *
   * State variable to hold the open/close state of each nav dropdown. This will allow for two
   * dropdown that are being used, each corresponding to an index in the state array:
   *
   * index 0 = Data & Methodology dropdown
   * index 1 = About dropdown (removed for now)
   */
  // const [isOpen, setIsOpen] = useState([false, false]);
  // const onToggle = (index: number): void => {
  //   setIsOpen((prevIsOpen) => {
  //     const newIsOpen = [false, false];
  //     newIsOpen[index] = !prevIsOpen[index];
  //     return newIsOpen;
  //   });
  // };

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
   * In the future, we may want to add sub-pages to the About page. This array will
   * define the sub-pages for the About page.
   */
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


  /**
   * This is the array that holds the navigation links and eventually is the one
   * that is passed to the render function. It only defines Explore, About and
   * Contact.
   *
   * The Methodology & Data link is passed in depending on screen size.
   *
   * For mobile: the Methodology & Data link should have sub-pages
   * For desktop: the Methodology & Data link should NOT have sub-pages
   */
  const navLinks = [
    <Link
      to={PAGES_ENDPOINTS.EXPLORE}
      key={'explore-map'}
      activeClassName="usa-current"
      data-cy={'nav-link-explore-the-map'}>
      {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.ABOUT}
      key={'about'}
      activeClassName="usa-current"
      data-cy={'nav-link-about'}>
      {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
    </Link>,
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

  // For mobile: the Methodology & Data link should have sub-pages
  const MethPageNavWithSubPages = () =>
    <>
      <NavDropDownButton
        key="methDropDown"
        label={intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
        menuId="methMenu"
        // isOpen={isOpen[0]} // Standard functionality commented out
        // onToggle={(): void => onToggle(0)} // Standard functionality commented out
        isOpen={true} // will keep the navDropDownButton permanently open
        onToggle={(): boolean => true} // will not allow toggling
        data-cy={'nav-dropdown-methodology'}
      >
      </NavDropDownButton>
      <Menu
        id='methMenu'
        type='subnav'
        items={methPageSubNavLinks}
        isOpen={true} // will keep the Menu permanently open
        // isOpen={isOpen[0]} // Standard functionality commented out
      >
      </Menu>
    </>;

  // For desktop: the Methodology & Data link should NOT have sub-pages
  const MethPageNav = () =>
    <Link
      to={PAGES_ENDPOINTS.METHODOLOGY}
      key={'methodology'}
      activeClassName="usa-current"
      data-cy={'nav-link-methodology'}>
      {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
    </Link>;

  // Modify navLinks to choose the appropriate Methodology & Data nav link depending on screen size
  navLinks.splice(1, 0, width > 1024 ? <MethPageNav/> : <MethPageNavWithSubPages/>);

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
            <img className={styles.logo} src={siteLogo} alt={`${logoLine1} ${logoLine2}`} />
          </Grid>

          {/* Logo Title */}
          <Grid col={6}>
            <div className={styles.logoTitle}>
              <div>{logoLine1}</div>
              <div className={styles.title2BetaPill}>
                <div> {logoLine2} </div>
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
      {<J40MainGridContainer>
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
      }
    </Header>
  );
};

export default J40Header;
