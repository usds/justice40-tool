import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, Link} from 'gatsby-plugin-intl';

export const PAGE = defineMessages({
  TITLE: {
    id: 'pageNotFound.title.text',
    defaultMessage: 'Page not found',
    description: 'page not found title text',
  },
  HEADING: {
    id: 'pageNotFound.heading.text',
    defaultMessage: 'Page not found',
    description: 'page not found heading text',
  },
  GUIDANCE: {
    id: 'pageNotFound.Guidance.text',
    defaultMessage: 'Try creating a page in',
    description: 'page not found guidance text',
  },
});

export const ERROR_MSG =
<FormattedMessage
  id={'pageNotFound.apology.text'}
  defaultMessage={`
    Sorry, the page you were looking for was not found. Click {home} to go home.
    `}
  description={'page description'}
  values={{
    home: <Link to={'/'}>here</Link>,
    homeEs: <Link to={'/methodology'}>aqui</Link>,
  }}
/>;
