import React from 'react';
import * as styles from './datasetCard.module.scss';

interface IDatasetCardProps {
  key: number,
  datasetCardProps: { [key:string]: string }
}

const DatasetCard = ({key, datasetCardProps}:IDatasetCardProps) => {
  console.log(key);
  return (
    <div className={styles.datasetCard}>
      <h3 className={styles.datasetCardIndicator}>{datasetCardProps.indicator}</h3>
      <div className={styles.datasetCardWhatIsIt}>What is it?</div>
      <div className={styles.datasetCardDescription}>
        {datasetCardProps.description}
      </div>

      <ul className={styles.datasetCardList}>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            Data resolution:&nbsp;
          </span>
          {datasetCardProps.dataResolution}
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            Data source:&nbsp;
          </span>
          <a href={datasetCardProps.dataSourceURL}>
            {datasetCardProps.dataSourceLabel}
          </a>
        </li>
        <li className={styles.datasetCardListItem}>
          <span className={styles.datasetCardLabels}>
            Data data range:&nbsp;
          </span>
          {datasetCardProps.dataDateRange}
        </li>
      </ul>
    </div>
  );
};

export default DatasetCard;
