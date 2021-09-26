import React from 'react';
import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
  Grid,
} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as METHODOLOGY_COPY from '../data/copy/methodology';

const ScoreStepsList = () => {
  const intl = useIntl();

  return (
    <>
      <h2>
        {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.HEADING)}
      </h2>
      <Grid row>
        <Grid col={7}>
          <p>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.DESCRIPTION_1)}
          </p>
          <p>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.DESCRIPTION_2)}
          </p>
        </Grid>
      </Grid>

      <ProcessList>

        {/* Step 1 */}
        <ProcessListItem>

          <ProcessListHeading type="h4">
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_HEADING)}
          </ProcessListHeading>
          <p>{' '}</p>
          <p className={'flush'}>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_INFO)}
          </p>

          {/* Step 1 A */}
          <h4>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_A_HEADING)}
          </h4>
          <p className={'flush'}>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_A_INFO_1)}
          </p>
          <p>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_A_INFO_2)}
          </p>

          {/* Step 1 B */}
          <h4>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_B_HEADING)}
          </h4>
          {METHODOLOGY_COPY.COMPLEX_METH_STEPS.STEP_2_B_INFO}

          {/* Step 1 C */}
          <h4>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_C_HEADING)}
          </h4>
          <p className={'flush'}>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_1_C_INFO)}
          </p>
        </ProcessListItem>

        {/* Step 2 */}
        <ProcessListItem>

          <ProcessListHeading type="h4">
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_2_HEADING)}
          </ProcessListHeading>

          <p>{' '}</p>
          <p className={'flush'}>
            {intl.formatMessage(METHODOLOGY_COPY.METHODOLOGY_STEPS.STEP_2_INFO)}
          </p>

          {METHODOLOGY_COPY.COMPLEX_METH_STEPS.FORMULA}

        </ProcessListItem>

      </ProcessList>
    </>
  );
};

export default ScoreStepsList;
