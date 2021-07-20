import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Alert,
  Header,
  NavMenuButton,
  PrimaryNav,
  GovBanner,
  Title,
} from '@trussworks/react-uswds';
import {Helmet} from 'react-helmet';
import {useFlags} from '../contexts/FlagContext';
import {defineMessages} from 'react-intl';

const J40Header = () => {
  const flags = useFlags();
  const intl = useIntl();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const messages = defineMessages({
    title: {
      id: 'header.title',
      defaultMessage: 'Justice40',
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
      defaultMessage: 'Methodology',
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

  const headerLinks = (flags: {[key: string] : any} | undefined) => {
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

    // select which items from the above map to show, right now it's only two
    // possibilities so it's simple. Note: strings are used as react keys
    const menu =
      ('sprint3' in flags!) ?
        ['about', 'cejst', 'methodology', 'contact'] :
        ['about', 'cejst', 'methodology', 'contact'];
    // TODO: make feature flags flags work.
    return menu.map((key) => menuData.get(key));
  };

  return (
    <>
      <Helmet htmlAttributes={{lang: intl.locale}}>
        <meta charSet="utf-8"/>
        <title>{title}</title>
      </Helmet>
      <GovBanner/>
      <Header
        basic={true} role={'banner'}
        className={'usa-header j40-header'}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>{title}
              <div className={'byline'}>
                A climate and economic justice screening tool
              </div>
            </Title>

            <NavMenuButton
              key={'mobileMenuButton'}
              onClick={toggleMobileNav}
              label="Menu"/>
          </div>
          <PrimaryNav
            items={headerLinks(flags)}
            mobileExpanded={mobileNavOpen}
            onToggleMobileNav={toggleMobileNav}
            className={'j40-header'}
          >
          </PrimaryNav>
        </div>
      </Header>
      <Alert
        className={'j40-sitealert'}
        type="info">
        <b>Public beta — </b>
        Welcome to the public beta of the Just Progress Map, a climate and
        economic justice screening tool. The tool will be continuously updated.
        Please submit feedback.
        <br/>
      </Alert>
      <Alert
        className={'j40-sitealert'}
        type="warning">
        <b>Limited data sources — </b>
        This tool currently includes 16 datasets. Over time, datasets could be
        added, updated, or removed. The datasets come from a variety of sources
        based on availability, quality, and relevance to environmental, energy,
        and climate issues. Each dataset has limitations, such as how recently
        the data was updated.
      </Alert>
    </>
  );
};

export default J40Header;
