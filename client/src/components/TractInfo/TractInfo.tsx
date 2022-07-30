import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './TractInfo.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';
import * as constants from '../../data/constants';

export interface ITractInfoProps {
  blockGroup: string,
  countyName: string,
  stateName: string,
  population: number,
  sidePanelState: string,
}

const TractInfo = ({blockGroup, countyName, stateName, population, sidePanelState}: ITractInfoProps) => {
  const intl = useIntl();

  return (
    <ul className={styles.tractInfoContainer}>
      <li>
        <span className={styles.tractInfoLabel}>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.CENSUS_INFO_TITLE)}
        </span>
      </li>
      <li>
        <span>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.CENSUS_BLOCK_GROUP)}
        </span>
        <span>{` ${blockGroup}`}</span>
      </li>
      <li>
        <span>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.COUNTY)}
        </span>
        <span>{` ${countyName}`}</span>
      </li>
      <li>
        <span>
          {sidePanelState !== constants.SIDE_PANEL_STATE_VALUES.NATION ?
              intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.TERRITORY) :
              intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.STATE)
          }
        </span>
        <span>{` ${stateName}`}</span>
      </li>
      <li>
        <span>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.POPULATION)}
        </span>
        <span>{` ${population.toLocaleString()}`}</span>
      </li>
    </ul>
  );
};

export default TractInfo;
