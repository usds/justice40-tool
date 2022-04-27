import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Button} from '@trussworks/react-uswds';

import * as styles from './SurveyButton.module.scss';
import * as CONTACT_COPY from '../../data/copy/contact';
import J40MainGridContainer from '../J40MainGridContainer';

// @ts-ignore
import launchIcon from '/node_modules/uswds/dist/img/usa-icons/launch.svg';

const SurveyButton = () => {
  const intl = useIntl();
  const href = intl.formatMessage(CONTACT_COPY.PAGE_INTRO.SURVEY_URL);

  return (
    <J40MainGridContainer className={styles.surveyButtonContainer}>
      <a href={href}>
        <Button
          type="button"
          className={styles.surveyButton}>
          {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.SURVEY_TEXT)}
          <img
            className={styles.launchIcon}
            src={launchIcon}
            alt={'launch icon'}
          />
        </Button>
      </a>
    </J40MainGridContainer>
  );
};

export default SurveyButton;
