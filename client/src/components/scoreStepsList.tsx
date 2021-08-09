import React from 'react';
import {GridContainer, Grid} from '@trussworks/react-uswds';

const ScoreProgressStepsList = () => {
  return (<>
    <div className={'j40-process-list-wrapper'}>
      <ul>
        <li>
          <section>
            <h3 className={'j40-item-list-title'}>Gather datasets</h3>
            <p><h4 className={'j40-item-list-subtitle'}>Data inputs</h4>
              The cumulative index score includes the following equally
              weighted inputs.
              <ul>
                <li>Poverty</li>
                <li>Less than high school education</li>
                <li>Linguistic isolation</li>
                <li>Unemployment rate</li>
                <li>Housing burden</li>
              </ul>
            </p>
            <p>
              <h4 className={'j40-item-list-subtitle'}>
                Combining data from different geographic units</h4>
                Some data is not available at the census block group level and is
                instead only available for larger units such as census tracts or
                counties. In these cases, all census block groups will get an even
                contribution from the larger unit. For example, if a census tract
                scores 90th percentile on an indicator, then all census block
                groups within that tract will receive a value of 90th percentile.
            </p>
            <p><h4 className={'j40-item-list-subtitle'}>Normalizing data</h4>
                The range of the data that makes up the score varies, so the data
                must be normalized so that each data indicator can be more equally
                weighted. Min-max normalization is utilized, where the minimum
                value in the range of values for each dataset is set at 0, the
                maximum value is set at 1, and every other value is transformed
                into a decimal between 0 and 1. For example, if the minimum value
                for unemployment was 10 and the maximum value was 30, a value of
                20 would be transformed to 0.5 since it is halfway between 10 and
                30.
            </p>
          </section>
        </li>

        <li>
          <section>
            <h3>Calculate cumulative index score</h3>
            <p>To combine all variables into a single cumulative index score,
                we average the normalized values across indicators.
            </p>
            <p>
              <GridContainer className={''}>
                <Grid row className={'J40MathDivisionContainer'}>
                  <Grid col className={'J40MathEqLeftSide grid-col-fill'}>
                    <div className={'J40DivNumerator'}>
                Dataset 1 + Dataset 2 + ... + Dataset N
                    </div>
                    <div className={'J40MathEqDenominator'}>
                # of datasets
                    </div>
                  </Grid>
                  <Grid col className={'J40MathEqMiddle grid-col-auto'}>=</Grid>
                  <Grid col className={'J40MathEqRightSide grid-col-fill'}>Cumulative index score</Grid>
                </Grid>
              </GridContainer>
            </p>
          </section>
        </li>

        <li>
          <section>
            <h3 className={'j40-item-list-title'}>Assign priority</h3>
            <p>
                Census block groups are sorted by their cumulative index score
                from highest to lowest. Census block groups that are in the top 25
                percentile (i.e. have a cumulative index score in the 75 - 100th
                percentile) will be considered the prioritized communities.
            </p>
          </section>
        </li>
      </ul>
    </div>
  </>
  );
};

export default ScoreProgressStepsList;
