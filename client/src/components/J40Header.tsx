import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  GovBanner,
} from '@trussworks/react-uswds';
import {defineMessages} from 'react-intl';
// @ts-ignore
import siteLogo from '../../src/images/icon.png';

const J40Header = () => {
  const intl = useIntl();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const messages = defineMessages({
    titleLine1: {
      id: 'header.title.line1',
      defaultMessage: `Climate and Economic Justice`,
      description: 'Title in nav header line 1 of 2',
    },
    titleLine2: {
      id: 'header.title.line2',
      defaultMessage: `Screening Tool`,
      description: 'Title in nav header line 2 of 2',
    },
    about: {
      id: 'header.about',
      defaultMessage: 'About',
      description: 'Header navigate item to the about page',
    },
    explore: {
      id: 'header.explore',
      defaultMessage: 'Explore the tool',
      description: 'Header navigate item to the Explore the tool page',
    },
    methodology: {
      id: 'header.methodology',
      defaultMessage: 'Data & methodology',
      description: 'Header navigate item to the Methodology page',
    },
    contact: {
      id: 'header.contact',
      defaultMessage: 'Contact',
      description: 'Header navigate item to the Contact page',
    },
  });
  const titleL1 = intl.formatMessage(messages.titleLine1);
  const titleL2 = intl.formatMessage(messages.titleLine2);

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
          className={'j40-header'}>{intl.formatMessage(messages.about)}</Link>],
      ['cejst',
        <Link
          to={'/cejst'}
          key={'cejst'}
          activeClassName="usa-current"
          className={'j40-header'}>{intl.formatMessage(messages.explore)}</Link>],
      ['methodology',
        <Link
          to={'/methodology'}
          key={'methodology'}
          activeClassName="usa-current"
          className={'j40-header'}>{intl.formatMessage(messages.methodology)}</Link>],
      ['contact',
        <Link
          to={'/contact'}
          key={'contact'}
          activeClassName="usa-current"
          className={'j40-header'}>{intl.formatMessage(messages.contact)}</Link>],
    ]);

    const menu =['about', 'cejst', 'methodology', 'contact'];
    return menu.map((key) => menuData.get(key));
  };

  return (
    <>
      <GovBanner/>
      <Header
        basic={true} role={'banner'}
        className={'usa-header j40-header'}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <h1 className="usa-logo">
              <img className="j40-sitelogo" src={siteLogo} alt={`${titleL1} ${titleL2}`} />
              <span className={'usa-logo__text j40-title'}>
                <span className={'j40-title-line1'}>{titleL1}</span><br/>
                <span className={'j40-title-line2'}>{titleL2}</span>
              </span>
            </h1>
            <NavMenuButton
              key={'mobileMenuButton'}
              onClick={toggleMobileNav}
              label="Menu"/>
          </div>
          <PrimaryNav
            items={headerLinks()}
            mobileExpanded={mobileNavOpen}
            onToggleMobileNav={toggleMobileNav}
            className={'j40-header'}
          >
          </PrimaryNav>
        </div>
      </Header>
    </>
  );
};

export default J40Header;
