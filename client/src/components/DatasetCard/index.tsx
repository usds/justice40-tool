import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './datasetCard.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

interface IDatasetCardProps {
  datasetCardProps: {
    [key:string]: string
  }
}

const DatasetCard = ({datasetCardProps}:IDatasetCardProps) => {
  const intl = useIntl();

  return (
    <div className={styles.datasetCard} id={datasetCardProps.domID ? datasetCardProps.domID : 'exp-pop-loss-rate'}>
      <h3 className={styles.datasetCardIndicator}>{datasetCardProps.indicator}</h3>
      <div className={styles.datasetCardDescription}>
        {datasetCardProps.description}
      </div>

      <ul className={styles.datasetCardList}>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.RESP_PARTY)}
          </span>
          <a href={datasetCardProps.dataSourceURL} target={'_blank'} rel="noreferrer">
            {datasetCardProps.respPartyLabel}
          </a>
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.DATE_RANGE)}
          </span>
          {datasetCardProps.dateRange}
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.USED_IN)}
          </span>
          {datasetCardProps.usedIn}
        </li>
      </ul>
    </div>
  );
};

export default DatasetCard;
