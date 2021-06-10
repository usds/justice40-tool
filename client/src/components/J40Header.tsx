import React from 'react';
import {GovBanner,
  Header,
  Title,
  PrimaryNav,
  SiteAlert} from '@trussworks/react-uswds';
import {useIntl, Link} from 'gatsby-plugin-intl';
import {Helmet} from 'react-helmet';
import {useFlags} from '../contexts/FlagContext';

const headerLinks = (flags: string[] | undefined) => {
  const timelineLink = <Link key="/timeline" to="/timeline"> Timeline </Link>;
  const links = [];
  if (flags && flags.includes('timeline')) {
    links.push(timelineLink);
  }
  return links;
};

const J40Header = () => {
  const flags = useFlags();
  const intl = useIntl();
  const title = intl.formatMessage({
    id: '71L0pp',
    defaultMessage: 'Justice40',
    description: 'Title of the project',
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{title}</title>
      </Helmet>
      <SiteAlert
        variant="info"
        heading="Welcome to Justice40's Temporary Home">
        <p>
        While Justice40 gets up and running,
        we are using GitHub Pages as a temporary website host. <br/>
        To learn more about GitHub Pages, click &nbsp;
          <a href="https://pages.github.com/">here</a>.
        </p>
      </SiteAlert>
      <GovBanner/>
      <Header className={'j40-header'} basic={true} role={'banner'}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title className={'j40-title'}>{title}</Title>
          </div>
          <PrimaryNav items={headerLinks(flags)} />
        </div>
      </Header>
    </>
  );
};

export default J40Header;
