import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Button} from '@trussworks/react-uswds';

import * as styles from './SurveyFab.module.scss';
import * as CONTACT_COPY from '../../data/copy/contact';

const SurveyFab = () => {
  const intl = useIntl();
  return (
    <Button
      type='button'
      className={styles.surveyFabContainer}
      onClick={() => Object.assign(document.createElement('a'), {target: '_blank', href: 'https://www.surveymonkey.com/r/cejst-survey'}).click()}>
      {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.SURVEY_TEXT)}
    </Button>
  );
};

export default SurveyFab;
