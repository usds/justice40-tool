import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './datasetCard.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

interface IDatasetCardProps {
  datasetCardProps: { [key:string]: string }
  additionalIndicator: boolean
}

const DatasetCard = ({datasetCardProps, additionalIndicator}:IDatasetCardProps) => {
  const intl = useIntl();

  return (
    <div className={additionalIndicator ? styles.datasetCardAdditional : styles.datasetCard}>
      <h3 className={styles.datasetCardIndicator}>{datasetCardProps.indicator}</h3>
      <div className={styles.datasetCardDescription}>
        {datasetCardProps.description}
      </div>

      <ul className={styles.datasetCardList}>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.SOURCE)}
          </span>
          <a href={datasetCardProps.dataSourceURL} target={'_blank'} rel="noreferrer">
            {datasetCardProps.dataSourceLabel}
          </a>
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.RESOLUTION)}
          </span>
          {datasetCardProps.dataResolution}
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.DATE_RANGE)}
          </span>
          {datasetCardProps.dataDateRange}
        </li>
      </ul>
    </div>
  );
};

export default DatasetCard;
