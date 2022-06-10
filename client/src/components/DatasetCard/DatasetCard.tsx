/* eslint-disable valid-jsdoc */
import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './datasetCard.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

interface IDatasetCardProps {
  datasetCardProps: METHODOLOGY_COPY.IIndicators
}

/**
 * This component will take in a card and render a dataset card
 *
 * @param {IDatasetCardProps}
 * @return {JSX.Element}
 */
const DatasetCard = ({datasetCardProps}: IDatasetCardProps) => {
  const intl = useIntl();

  return (
    <div className={styles.datasetCard} id={datasetCardProps.domID}>

      {/* Dataset header */}
      <h3 className={styles.datasetCardIndicator}>{datasetCardProps.indicator}</h3>

      {/* Dataset description */}
      <div className={styles.datasetCardDescription}>
        {datasetCardProps.description}
      </div>

      {/* Dataset note */}
      {datasetCardProps.note && <div className={styles.datasetCardDescription}>
        <p>{datasetCardProps.note}</p>
      </div>}

      <ul className={styles.datasetCardList}>

        {/* Dataset Used in */}
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.USED_IN)}
          </span>
          {datasetCardProps.usedIn}
        </li>

        {/* Dataset Responsible Party */}
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.RESP_PARTY)}
          </span>
          {datasetCardProps.responsibleParty}
        </li>


        {datasetCardProps.sources.map((dataSource, index) => (
          <React.Fragment key={index}>
            {/* Dataset Source */}
            <li className={styles.datasetCardListItemSource}>
              <span className={styles.datasetCardLabels}>
                {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.SOURCE)}
              </span>
              {dataSource.source}
            </li>

            {/* Dataset Available for */}
            <li className={styles.datasetCardListItem}>
              <span className={styles.datasetCardLabels}>
                {intl.formatMessage(METHODOLOGY_COPY.DATASET_CARD_LABELS.AVAILABLE_FOR)}
              </span>
              {intl.formatMessage(dataSource.availableFor)}
            </li>
          </React.Fragment>
        ))}

      </ul>
    </div>
  );
};

export default DatasetCard;
