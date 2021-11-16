import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Button} from '@trussworks/react-uswds';

import * as styles from './SurveyButton.module.scss';
import * as CONTACT_COPY from '../../data/copy/contact';

export const onClickHandler = () => {
  Object.assign(document.createElement('a'), {target: '_blank', href: 'https://www.surveymonkey.com/r/cejst-survey'}).click();
};

const SurveyButton = () => {
  const intl = useIntl();
  return (
    <Button
      type='button'
      className={styles.surveyButton}
      onClick={() => onClickHandler()}>
      {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.SURVEY_TEXT)}
    </Button>
  );
};

export default SurveyButton;
