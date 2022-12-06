import React from 'react';
import {FormattedDate, FormattedMessage, defineMessages} from 'gatsby-plugin-intl';
import {METH_1_0_RELEASE_DATE, METH_BETA_RELEASE_DATE} from './common';

export const PAGE = defineMessages({
  TITLE: {
    id: 'previous.versions.page.title.text',
    defaultMessage: 'Previous versions',
    description: 'Navigate to the previous version page. This is the page title text',
  },
});

export const CARD = {
  TITLE: <FormattedMessage
    id={'previous.versions.page.card.text'}
    defaultMessage={'Beta version'}
    description={'Navigate to the previous version page. This is the Cards title text'}
  />,
  BODY: <FormattedMessage
    id={'previous.versions.page.body.text'}
    defaultMessage={`The beta version of the methodology and data was used during the public 
    beta period to get feedback on the tool from {betaDate} - {releaseDate}.`}
    description={'Navigate to the previous version page. This is the Cards body text'}
    values={{
      betaDate: <FormattedDate
        value={METH_BETA_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
      releaseDate: <FormattedDate
        value={METH_1_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,
  BUTTON1: <FormattedMessage
    id={'previous.versions.page.button1.text'}
    defaultMessage={'Data & documentation'}
    description={'Navigate to the previous version page. This is the Cards button1 text'}
  />,
  BUTTON1_ALT_TAG: <FormattedMessage
    id={'previous.versions.page.button1.alt.tag.text'}
    defaultMessage={'a button that allows to download the data and documentation to the tool'}
    description={'Navigate to the previous version page. This is the Cards button1.alt.tag text'}
  />,
  BUTTON2: <FormattedMessage
    id={'previous.versions.page.button2.text'}
    defaultMessage={'Shapefile & codebook'}
    description={'Navigate to the previous version page. This is the Cards button2 text'}
  />,
  BUTTON2_ALT_TAG: <FormattedMessage
    id={'previous.versions.page.button2.alt.tag.text'}
    defaultMessage={'a button that allows to download the shapefile and codebook to the tool'}
    description={'Navigate to the previous version page. This is the Cards button2.alt.tag text'}
  />,
};

export const BUTTON = defineMessages({
  TITLE1: {
    id: 'previous.versions.page.button1.text',
    defaultMessage: 'Data & documentation',
    description: 'Navigate to the previous version page. This is the Cards button1 text',
  },
  TITLE2: {
    id: 'previous.versions.page.button2.text',
    defaultMessage: 'Shapefile & codebook',
    description: 'Navigate to the previous version page. This is the Cards button2 text',
  },
  BUTTON1_ALT_TAG: {
    id: 'previous.versions.page.button1.alt.tag.text',
    defaultMessage: 'a button that allows to download the data and documentation to the tool',
    description: 'Navigate to the previous version page. This is the Cards button1.alt.tag text',
  },
  BUTTON2_ALT_TAG: {
    id: 'previous.versions.page.button2.alt.tag.text',
    defaultMessage: 'a button that allows to download the shapefile and codebook to the tool',
    description: 'Navigate to the previous version page. This is the Cards button2.alt.tag text',
  },

});
