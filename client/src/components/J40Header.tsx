import React, {useState} from 'react';
import {FormattedMessage, Link, useIntl} from 'gatsby-plugin-intl';
import {
  Alert,
  Header,
  NavMenuButton,
  PrimaryNav,
  GovBanner,
} from '@trussworks/react-uswds';
import {defineMessages} from 'react-intl';
// @ts-ignore
import siteLogo from '../../src/images/icon.png';

interface HeaderProps {
  location?: Location; // optional param makes unit tests easier
}

const J40Header = ({location}: HeaderProps) => {
  const intl = useIntl();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const messages = defineMessages({
    title: {
      id: 'header.title',
      defaultMessage: 'Climate and Economic Justice Screening Tool',
      description: 'Title in header',
    },
    about: {
      id: 'header.about',
      defaultMessage: 'About',
      description: 'Navigate to the about page',
    },
    explore: {
      id: 'header.explore',
      defaultMessage: 'Explore the tool',
      description: 'Navigate to the Explore the tool page',
    },
    methodology: {
      id: 'header.methodology',
      defaultMessage: 'Data & methodology',
      description: 'Navigate to the Methodology page',
    },
    contact: {
      id: 'header.contact',
      defaultMessage: 'Contact',
      description: 'Navigate to the Contact page',
    },
    timeline: {
      id: 'header.timeline',
      defaultMessage: 'Timeline',
      description: 'Navigate to the Timeline page',
    },
  });
  const title = intl.formatMessage(messages.title);

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
      ['timeline',
        <Link
          to={'/timeline'}
          key={'timline'}
          activeClassName="usa-current"
          className={'j40-header'}>{intl.formatMessage(messages.timeline)}</Link>],
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
              <img className="sitelogo" src={siteLogo} alt={title} />
              <span className={'usa-logo__text'}>{title}</span>
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

      <Alert className={'j40-sitealert'} type="info">
        <b><FormattedMessage
          id='header.alertTitleBeta'
          description={'Alerts that appear on every page - title'}
          defaultMessage={`Public beta`}/> - </b>
        <FormattedMessage
          id='header.alertBodyBeta'
          description={'Alerts that appear on every page'}
          defaultMessage={`This website will be continuously updated`}/>
        <br/>
      </Alert>

      { // include this alert ONLY on the maps page.
        location?.pathname.includes('cejst') ?
        <Alert className={'j40-sitealert'} type="warning">
          <b><FormattedMessage
            id='header.alertTitleLimitedData'
            description={'Alerts that appear on maps page - title'}
            defaultMessage={`Limited data sources`}/> — </b>
          <FormattedMessage
            id='header.alertBodyLimitedData'
            description={'Alerts that appear on maps page'}
            defaultMessage={`Datasets may be added, updated, or removed.`}/>
          <br/>
        </Alert> : <></>
      }
    </>
  );
};

export default J40Header;
