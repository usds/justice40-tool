import React from 'react';
import {GovBanner, Header, Title, PrimaryNav} from '@trussworks/react-uswds';
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
      <Header>
        <Title>
          {title}
        </Title>
        <PrimaryNav items={headerLinks}/>
      </Header>
    </>
  );
};

export default J40Header;
