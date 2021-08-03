import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import * as styles from './datasetCard.module.scss';

interface IDatasetCardProps {
  datasetCardProps: { [key:string]: string }
}

const DatasetCard = ({datasetCardProps}:IDatasetCardProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    whatIsIt: {
      id: 'datasetCard.whatIsIt',
      defaultMessage: 'What is it?',
      description: 'label associated with explaining the card',
    },
    dataResolution: {
      id: 'datasetCard.dataResolution',
      defaultMessage: 'Data resolution: ',
      description: 'label associated with explaining the card',
    },
    dataSource: {
      id: 'datasetCard.dataSource',
      defaultMessage: 'Data source: ',
      description: 'label associated with explaining the card',
    },
    dataDateRange: {
      id: 'datasetCard.dataDateRange',
      defaultMessage: 'Data date range: ',
      description: 'label associated with explaining the card',
    },
  });

  return (
    <div className={styles.datasetCard}>
      <h3 className={styles.datasetCardIndicator}>{datasetCardProps.indicator}</h3>
      <div className={styles.datasetCardWhatIsIt}>{intl.formatMessage(messages.whatIsIt)}</div>
      <div className={styles.datasetCardDescription}>
        {datasetCardProps.description}
      </div>

      <ul className={styles.datasetCardList}>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(messages.dataResolution)}
          </span>
          {datasetCardProps.dataResolution}
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(messages.dataSource)}
          </span>
          <a href={datasetCardProps.dataSourceURL} target={'_blank'} rel="noreferrer">
            {datasetCardProps.dataSourceLabel}
          </a>
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            {intl.formatMessage(messages.dataDateRange)}
          </span>
          {datasetCardProps.dataDateRange}
        </li>
      </ul>
    </div>
  );
};

export default DatasetCard;
