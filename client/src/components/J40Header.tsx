import React from 'react';
import {GovBanner, Header, Title, PrimaryNav} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {Helmet} from 'react-helmet';

const headerLinks = [
  <></>,
];

const J40Header = () => {
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

      <GovBanner/>
      <Header className={'j40-header'} basic={true} role={'banner'}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title className={'j40-title'}>{title}</Title>
          </div>
          <PrimaryNav items={headerLinks}/>
        </div>
      </Header>
    </>
  );
};

export default J40Header;
