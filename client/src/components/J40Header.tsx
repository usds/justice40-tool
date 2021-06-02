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
      <SiteAlert variant="emergency"
        heading="Work In Progress">
        <p>This site is still a work in
          progress and has not been released.
          Please
        <a href="mailto:justice40open@usds.gov"> contact the J40 Team </a>
          for feedback
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
