import React from 'react';
import {Button} from '@trussworks/react-uswds';

import * as styles from './SurveyFab.module.scss';

const SurveyFab = () => {
  return (
    <Button
      type='button'
      className={styles.surveyFabContainer}
      onClick={() => Object.assign(document.createElement('a'), {target: '_blank', href: 'https://www.surveymonkey.com/r/cejst-survey'}).click()}
    >
      Take our survey!
    </Button>
  );
};

export default SurveyFab;
