import * as React from 'react';
import * as constants from '../data/constants';
import * as styles from './popupContent.module.scss';
import {GeoJsonProperties} from 'geojson';

interface IPopupContentProps {
  properties: GeoJsonProperties,
}

const PopupContent = ({properties}:IPopupContentProps) => {
  const readablePercent = (percent: number) => {
    return `${(percent * 100).toFixed(2)}`;
  };

  const getCategorization = (percentile: number) => {
    let categorization;
    if (percentile >= 0.75 ) {
      categorization = 'Prioritized';
    } else if (0.60 <= percentile && percentile < 0.75) {
      categorization = 'Threshold';
    } else {
      categorization = 'Non-prioritized';
    }
    return categorization;
  };

  const getTitleContent = (properties: constants.J40Properties) => {
    const blockGroup = properties[constants.GEOID_PROPERTY];
    const score = properties[constants.SCORE_PROPERTY] as number;
    return (
      <div className={styles.titleContainer}>
        <div>
          <span className={styles.titleIndicatorName}>Census Block Group: </span>
          <span>{blockGroup}</span>
        </div>
        <div>
          <span className={styles.titleIndicatorName}>Just Progress Categorization: </span>
          <span>{getCategorization(score)}</span>
        </div>
        <div>
          <span className={styles.titleIndicatorName}>Cumulative Index Score: </span>
          <span>{readablePercent(score)}</span>
        </div>
      </div>
    );
  };

  const getBodyContent = (properties: constants.J40Properties) => {
    const rows = [];
    const sortedKeys = Object.entries(properties).sort();
    for (let [key, value] of sortedKeys) {
      // We should only format floats
      if (typeof value === 'number' && value % 1 !== 0) {
        value = readablePercent(value);
      }

      // Filter out all caps
      if (!key.match(/^[A-Z0-9]+$/)) {
        rows.push(<tr key={key} >
          <td>{key}</td>
          <td>{value}</td>
        </tr>);
      }
    }
    return rows;
  };


  return (
    <>
      {properties ?
      <div id='popupContainer'>
        {getTitleContent(properties)}
        <table className={'usa-table usa-table--borderless ' + styles.popupContentTable}>
          <thead>
            <tr>
              <th scope="col">INDICATOR</th>
              <th scope="col">VALUE</th>
            </tr>
          </thead>
          <tbody>
            {getBodyContent(properties)}
          </tbody>
        </table>
      </div> :
    '' }
    </>
  );
};

export default PopupContent;
