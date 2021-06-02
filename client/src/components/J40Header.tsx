import React from 'react';
import {GovBanner,
  Header,
  Title,
  PrimaryNav,
  SiteAlert} from '@trussworks/react-uswds';
import {useIntl, Link} from 'gatsby-plugin-intl';
import {Helmet} from 'react-helmet';

const headerLinks = [
  <Link to="/" key="/">Home</Link>,
];

const J40Header = () => {
  const intl = useIntl();
  const title = intl.formatMessage({id: '71L0pp',
    defaultMessage: 'Justice40',
    description: 'Title of the project'});
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <GovBanner />
      <SiteAlert variant="info"
        heading="Welcome to Justice40's Temporary Home">
        <p>
        While Justice40 gets up and running,
        we are using GitHub Pages as a temporary website host.
        To learn more about GitHub Pages, click
          <a href="https://pages.github.com/"> here </a>
        </p>
      </SiteAlert>
      <Header>
        <Title className={'usa-hero__heading j40-title'}>
          {title}
        </Title>
        <PrimaryNav items={headerLinks}/>
      </Header>
    </>
  );
};

export default J40Header;
