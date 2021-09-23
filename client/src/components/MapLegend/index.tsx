import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './mapLegend.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

const MapLegend = () => {
  const intl = useIntl();
  return (
    <div className={styles.legendContainer}>
      <div className={styles.colorSwatch} />
      <div>
        <h4>
          {intl.formatMessage(EXPLORE_COPY.LEGEND.PRIORITY_LABEL)}
        </h4>
        <p className={'secondary'}>
          {intl.formatMessage(EXPLORE_COPY.LEGEND.PRIORITY_DESCRIPT)}
        </p>
      </div>
    </div>
  );
};

export default MapLegend;
