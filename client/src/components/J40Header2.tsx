import React, {useState} from 'react';
import {Link} from 'gatsby-plugin-intl';
import {
  // GovBanner,
  Header,
  Title,
  PrimaryNav,
  SiteAlert,
  NavDropDownButton,
  NavMenuButton,
  Menu,
} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {Helmet} from 'react-helmet';

const J40Header2 = () => {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: '71L0pp',
    defaultMessage: 'Justice40',
    description: 'Title of the project',
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenuOpen = (): void =>
    setSubMenuOpen((prevOpen) => !prevOpen );

  const toggleMobileNav = () : void =>
    setMobileNavOpen((prevOpen) => !prevOpen);

  const aboutSubMenuItems = [
    <Link to={'/#'} key={'aboutlink'}>About</Link>,
    <Link to={'/timeline'} key={'timelinelink'}>Timeline</Link>,
  ];

  const primaryNavItemsMenu = [
    <>
      <NavDropDownButton
        key={'navDropDownButton'}
        menuId={'aboutDropdownId'}
        onToggle={toggleSubMenuOpen}
        isOpen={subMenuOpen}
        label="About menu"
        isCurrent={true}
        className={'j40-header'}
      />
      <Menu
        key={'aboutDropdownMenu'}
        id="aboutDropdownId"
        items={aboutSubMenuItems}
        isOpen={subMenuOpen}
        className={'j40-header'}
      />
    </>,
    <Link to={'/#cejst'} key={'cejstlink'}
      className={'j40-header'}>CEJST</Link>,
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{title}</title>
      </Helmet>
      {/* <GovBanner/> */}
      <SiteAlert
        variant="info">
        <p>
          <b>Welcome to Justice40&apos;s Temporary Home</b>While Justice40 gets
          up and running, we are using GitHub Pages as a temporary website host.
          <br/>To learn more about GitHub Pages, click &nbsp;
          <a href="https://pages.github.com/">here</a>.
        </p>
      </SiteAlert>
      {/* <div className={`usa-overlay*/}
      {/*  ${subMenuExpanded ? 'is-visible' : ''}`} />*/}
      <Header basic={true} role={'banner'}
        className={'usa-header j40-header'}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>{title}</Title>
            <NavMenuButton
              key={'mobileMenuButton'}
              onClick={toggleMobileNav}
              label="Menu" />
          </div>
          <PrimaryNav
            items={primaryNavItemsMenu}
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

export default J40Header2;
