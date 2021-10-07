import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import AlertWrapper from '../AlertWrapper';
import DatasetCard from '../DatasetCard';
import J40MainGridContainer from '../J40MainGridContainer';
import {hyphenizeString} from '../../../cypress/integration/common/helpers';

import * as styles from './dsContainer.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';


const DatasetContainer = () => {
  const intl = useIntl();

  return (
    <>
      <J40MainGridContainer fullWidth={true} blueBackground={true}>
        <J40MainGridContainer
          dataCy={`${hyphenizeString(METHODOLOGY_COPY.DATASETS.HEADING.defaultMessage)}-block`}>

          <Grid row>
            <Grid col={12}>
              <AlertWrapper showBetaAlert={false} showLimitedDataAlert={true}/>
              <h2>{intl.formatMessage(METHODOLOGY_COPY.DATASETS.HEADING)}</h2>
            </Grid>
          </Grid>

          <Grid row>
            <Grid col={12} tablet={{col: 7}} className={'j40-mb-3'}>
              <p>{intl.formatMessage(METHODOLOGY_COPY.DATASETS.INFO)}</p>
            </Grid>
          </Grid>

          <div className={styles.datasetCardsContainer}>
            {METHODOLOGY_COPY.INDICATORS.map((card) => <DatasetCard
              key={card.indicator}
              datasetCardProps={card}
              additionalIndicator={false}
            />)}
          </div>

        </J40MainGridContainer>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth={true} blueBackground={false} >
        <J40MainGridContainer
          dataCy={`${hyphenizeString(METHODOLOGY_COPY.DATASETS.ADDITIONAL_HEADING.defaultMessage)}-block`}>

          <Grid row>
            <Grid col={12}>
              <h2>{intl.formatMessage(METHODOLOGY_COPY.DATASETS.ADDITIONAL_HEADING)}</h2>
            </Grid>
          </Grid>

          <Grid row>
            <Grid col={12} tablet={{col: 7}} className={'j40-mb-3'}>
              <p>{intl.formatMessage(METHODOLOGY_COPY.DATASETS.ADDITIONAL_INFO)}</p>
            </Grid>
          </Grid>

          <div className={styles.datasetCardsContainer}>
            {METHODOLOGY_COPY.ADDITIONAL_INDICATORS.map((card) => <DatasetCard
              key={card.indicator}
              datasetCardProps={card}
              additionalIndicator={true}
            />)}
          </div>

        </J40MainGridContainer>
      </J40MainGridContainer>
    </>
  );
};

export default DatasetContainer;
