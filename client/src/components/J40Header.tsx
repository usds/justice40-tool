import React from 'react';
import {GovBanner, Header, Title, PrimaryNav} from '@trussworks/react-uswds';
import {useIntl, Link} from 'gatsby-plugin-intl';

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
      <GovBanner />
      <Header>
        <Title className={'j40title'}>
          {title}
        </Title>
        <PrimaryNav items={headerLinks}/>
      </Header>
    </>
  );
};

export default J40Header;
