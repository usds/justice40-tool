import React from 'react';
import {Link, useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import DatasetCard from '../DatasetCard';
import J40MainGridContainer from '../J40MainGridContainer';
import {hyphenizeString} from '../../../cypress/integration/common/helpers';

import * as styles from './dsContainer.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';


const DatasetContainer = () => {
  const intl = useIntl();

  return (
    <>
      <J40MainGridContainer fullWidth={true} blueBackground={false}>
        <J40MainGridContainer
          dataCy={`${hyphenizeString(METHODOLOGY_COPY.DATASETS.HEADING.defaultMessage)}-block`}>

          <Grid row>
            <Grid col={12}>
              <h2>{intl.formatMessage(METHODOLOGY_COPY.DATASETS.HEADING)}</h2>
            </Grid>
          </Grid>

          <Grid row>
            <Grid desktop={{col: 9}}>
              <p>{intl.formatMessage(METHODOLOGY_COPY.DATASETS.INFO)}</p>
            </Grid>
          </Grid>

          <Grid row>
            <Grid col={12}>
              <div className={styles.datasetCardsContainer}>
                {METHODOLOGY_COPY.INDICATORS.map((card, index) => <DatasetCard
                  key={index}
                  datasetCardProps={card}
                />)}
              </div>
            </Grid>
          </Grid>

          <div className={styles.returnToTop}>
            <Link to={`/methodology`}>
              {METHODOLOGY_COPY.RETURN_TO_TOP.LINK}
            </Link>
          </div>

        </J40MainGridContainer>
      </J40MainGridContainer>

    </>
  );
};

export default DatasetContainer;
