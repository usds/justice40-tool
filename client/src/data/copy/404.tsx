import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage} from 'gatsby-plugin-intl';
import {linkFn} from './common';
import {PAGES_ENDPOINTS} from '../constants';

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
    Sorry, the page you were looking for was not found. Click <link1>home</link1> to go home.
    `}
  description={'main error message'}
  values={{
    link1: linkFn(PAGES_ENDPOINTS.METHODOLOGY, true, false),
  }}
/>;
