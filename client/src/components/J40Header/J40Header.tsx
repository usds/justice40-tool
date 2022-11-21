import React, {useEffect, useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Alert,
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
// import Language from '../Language';
import {useWindowSize} from 'react-use';

// @ts-ignore
import siteLogo from '../../images/j40-logo-v2.png';
import * as styles from './J40Header.module.scss';
import * as COMMON_COPY from '../../data/copy/common';
import {PAGES_ENDPOINTS, USWDS_BREAKPOINTS} from '../../data/constants';


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

  // grab last segment of location pathname
  const [lastSegmentLocation] = location.pathname.split('/').slice(-1);

  // Logo text
  const logoLine1 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_1);

  /**
   * State variable to control the toggling of mobile menu button
   */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = (): void => {
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
   * When transitioning between anything larger than desktop and anything less than desktop the nav menu
   * changes from the usual row of nav links (dektop) to the MENU button(mobile). On desktop all nav drop
   * dropdowns should be closed, while on mobile all nav links should be open.
   *
   * The useWindowSize provides the device width and the useEffect allows the side effect (opening/closing
   * nav links) to occur anytime the device width changes.
   */
  const {width} = useWindowSize();
  useEffect( () => {
    if (width < USWDS_BREAKPOINTS.DESKTOP) {
      setIsOpen([true, true]);
    } else {
      setIsOpen([false, false]);
    }
  }, [width]);

  /**
   * This toggle function will handle both navigation toggle links (Meth and About).
   *
   * @param {number} index
   */
  const onToggle = (index: number): void => {
    // The setIsOpen is used to toggle the currently selected nav link
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...isOpen];
      newIsOpen[index] = !prevIsOpen[index];
      return newIsOpen;
    });

    /**
     * When on desktop only, the dropdown nav links (Meth and About) should close if any of the other ones
     * are still open. This next set of logic handles that.
     */
    if (index === 0 && isOpen[1] === true && width > USWDS_BREAKPOINTS.DESKTOP) {
      setIsOpen([isOpen[0], false]);
    } else if (index === 1 && isOpen[0] === true && width > USWDS_BREAKPOINTS.DESKTOP) {
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
    <Link
      to={PAGES_ENDPOINTS.PREVIOUS_VERSIONS}
      key={'previous-versions'}
      activeClassName="usa-current"
      data-cy={'nav-link-previous-versions'}>
      {intl.formatMessage(COMMON_COPY.HEADER.PREVIOUS_VERSIONS)}
    </Link>,
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
      to={PAGES_ENDPOINTS.PUBLIC_ENG}
      key={'publicEng'}
      activeClassName="usa-current"
      data-cy={'nav-link-public-engagement'}>
      {intl.formatMessage(COMMON_COPY.HEADER.PUBLIC_ENG)}
    </Link>,
    <Link
      to={PAGES_ENDPOINTS.FAQS}
      key={'faqs'}
      activeClassName="usa-current"
      data-cy={'nav-link-faqs'}>
      {intl.formatMessage(COMMON_COPY.HEADER.FAQS)}
    </Link>,
  ];

  // Methodology & Data Nav component
  const MethNav = () =>
    <>
      {/* Add a className of usa-current anytime this component renders when the location of the app is on
      the Methodology page or the downloads page. This will style the nav link with a bottom border */}
      <NavDropDownButton
        className={
          lastSegmentLocation === PAGES_ENDPOINTS.METHODOLOGY.slice(1) ||
          lastSegmentLocation === PAGES_ENDPOINTS.DOWNLOADS.slice(1) ?
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
    </>;

  // About Nav component
  const AboutNav = () =>
    <>
      {/* Add a className of usa-current anytime this component renders when the location of the app is on
      the About, FAQS or Public Eng page. This will style the nav link with a bottom border */}
      <NavDropDownButton
        className={
          lastSegmentLocation === PAGES_ENDPOINTS.ABOUT.slice(1) ||
          lastSegmentLocation === PAGES_ENDPOINTS.FAQS.slice(1) ||
          lastSegmentLocation === PAGES_ENDPOINTS.PUBLIC_ENG.slice(1) ?
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
    </>;

  // Navigation links for app
  const navLinks = [
    <Link
      to={PAGES_ENDPOINTS.EXPLORE}
      key={'explore-map'}
      activeClassName="usa-current"
      data-cy={'nav-link-explore-the-map'}>
      {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
    </Link>,
    <MethNav key="methDropDown"/>,
    <AboutNav key="aboutDropDown"/>,
    <Link
      to={PAGES_ENDPOINTS.CONTACT}
      key={'contact'}
      activeClassName="usa-current"
      data-cy={'nav-link-contact'}>
      {intl.formatMessage(COMMON_COPY.HEADER.CONTACT)}
    </Link>,
    // Temporarily removing language link until translation is completed
    // <div key={'language'}>
    //   <Language isDesktop={false}/>
    // </div>,
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
            <Link
              to={PAGES_ENDPOINTS.EXPLORE}
              key={'explore-map'}
              data-cy={'nav-link-explore-the-map'}
            >
              <img className={styles.logo} src={siteLogo} alt={`${logoLine1}`} />
            </Link>
          </Grid>

          {/* Logo Title */}
          <Grid col={6}>
            <Link
              to={PAGES_ENDPOINTS.EXPLORE}
              key={'explore-map'}
              className="remove-link-style"
              data-cy={'nav-link-explore-the-map'}
            >
              <div className={styles.logoTitle}>
                {logoLine1}
              </div>
            </Link>
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
        {/* <Alert
          className={styles.alert}
          type="info"
          heading={intl.formatMessage(COMMON_COPY.ALERTS.ALERT_2_TITLE.TITLE)}
          headingLevel={'h1'}>
          {COMMON_COPY.ALERTS.ALERT_2_DESCRIPTION}
        </Alert> */}

        <Alert
          className={styles.alert}
          type="info"
          heading={intl.formatMessage(COMMON_COPY.ALERTS.ALERT_1_TITLE.TITLE)}
          headingLevel={'h1'}>
          {COMMON_COPY.ALERTS.ALERT_1_DESCRIPTION}
        </Alert>
      </J40MainGridContainer>
      }
    </Header>
  );
};

export default J40Header;
