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
    Sorry, the page you are looking for is not found. <link1>Explore the map</link1> or learn 
    more <link2>about</link2> the tool.
  `}
  description={'main error message'}
  values={{
    link1: linkFn(PAGES_ENDPOINTS.EXPLORE, true, false),
    link2: linkFn(PAGES_ENDPOINTS.ABOUT, true, false),
  }}
/>;
