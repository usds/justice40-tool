import React, {useState} from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  GovBanner,
  Tag,
} from '@trussworks/react-uswds';

// @ts-ignore
import siteLogo from '../../src/images/icon.png';
import * as COMMON_COPY from '../data/copy/common';

const J40Header = () => {
  const intl = useIntl();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const titleL1 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_1);
  const titleL2 = intl.formatMessage(COMMON_COPY.HEADER.TITLE_LINE_2);

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
          className={'j40-header'}
          data-cy={'nav-link-about'}>
          {intl.formatMessage(COMMON_COPY.HEADER.ABOUT)}
        </Link>,
      ],
      ['cejst',
        <Link
          to={'/cejst'}
          key={'cejst'}
          activeClassName="usa-current"
          className={'j40-header'}
          data-cy={'nav-link-explore'}>
          {intl.formatMessage(COMMON_COPY.HEADER.EXPLORE)}
        </Link>,
      ],
      ['methodology',
        <Link
          to={'/methodology'}
          key={'methodology'}
          activeClassName="usa-current"
          className={'j40-header'}
          data-cy={'nav-link-methodology'}>
          {intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
        </Link>,
      ],
      ['contact',
        <Link
          to={'/contact'}
          key={'contact'}
          activeClassName="usa-current"
          className={'j40-header'}
          data-cy={'nav-link-contact'}>
          {intl.formatMessage(COMMON_COPY.HEADER.CONTACT)}
        </Link>,
      ],
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
            {/* Removing h1 from logo ease transition to USWDS tokens in headers */}
            {/* https://wehavezeal.com/blog/web-development/2016/01/12/should-i-use-the-h1-tag-for-my-website-logo */}
            <div className="usa-logo">
              <img className="j40-sitelogo" src={siteLogo} alt={`${titleL1} ${titleL2}`} />
              <span className={'usa-logo__text j40-title'}>
                <span className={'j40-title-line1'}>{titleL1}</span><br/>
                <span className={'j40-title-line2'}>{titleL2}</span>
                <Tag className={'j40'}>Beta</Tag>
              </span>
            </div>
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
