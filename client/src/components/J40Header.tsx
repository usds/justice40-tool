import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  SiteAlert,
  Title,
} from '@trussworks/react-uswds';
import {Helmet} from 'react-helmet';
import {useFlags} from '../contexts/FlagContext';

const J40Header = () => {
  const flags = useFlags();
  const intl = useIntl();
  const title = intl.formatMessage({
    id: '71L0pp',
    defaultMessage: 'Justice40',
    description: 'Title of the project',
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = (): void =>
    setMobileNavOpen((prevOpen) => !prevOpen);

  const headerLinks = (flags: string[] | undefined) => {
    // static map of all possible menu items. Originally, it was all strings,
    // but we need to handle both onsite and offsite links.
    const menuData = new Map<string, JSX.Element>([
      ['about',
        <Link
          key={'about'} className={'j40-header'}
          to={'/'}>About</Link>],
      ['timeline',
        <Link
          to={'/timeline'}
          key={'timline'}
          className={'j40-header'}>Timeline</Link>],
      ['cejst',
        <Link
          to={'/#cejst'}
          key={'cejst'}
          target={'_blank'}
          className={'j40-header'}>CEJST</Link>],
    ]);

    // select which items from the above map to show, right now it's only two
    // possibilities so it's simple. Note: strings are used as react keys
    const menu =
      flags?.includes('timeline') ?
        ['about', 'timeline', 'cejst'] :
        ['about', 'timeline', 'cejst']; // ['about', 'cejst'];
    // TODO: make feature flags flags work.
    return menu.map((key) => menuData.get(key));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{title}</title>
      </Helmet>
      {/* <GovBanner/> */}
      <SiteAlert
        variant="info"
        className={'j40-sitealert'}>
        <b>Welcome to Justice40&apos;s Temporary Home</b> While Justice40 gets
        up and running, we are using GitHub Pages as a temporary website
        host. To learn more about GitHub Pages, click <a href="https://pages.github.com/">here</a>.
      </SiteAlert>
      <Header
        basic={true} role={'banner'}
        className={'usa-header j40-header'}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>{title}</Title>
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
    </>
  );
};

export default J40Header;
