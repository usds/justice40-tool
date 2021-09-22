import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './mapLegend.module.scss';
import * as constants from '../../data/constants';

const MapLegend = () => {
  const intl = useIntl();
  return (
    <div className={styles.legendContainer}>
      <div className={styles.colorSwatch} />
      <div>
        <h4>
          {intl.formatMessage(constants.EXPLORE_TOOL_PAGE_TEXT.PRIORITY_LABEL)}
        </h4>
        <p className={'secondary'}>
          {intl.formatMessage(constants.EXPLORE_TOOL_PAGE_TEXT.PRIORITY_DESCRIPT)}
        </p>
      </div>
    </div>
  );
};

export default MapLegend;
