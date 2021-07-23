import * as React from 'react';
import * as constants from '../data/constants';
import * as styles from './areaDetail.module.scss';

export const readablePercent = (percent: number) => {
  return `${(percent * 100).toFixed(1)}`;
};

export const getCategorization = (percentile: number) => {
  let categorization;
  let categoryCircleStyle;

  if (percentile >= 0.75 ) {
    categorization = 'Prioritized';
    categoryCircleStyle = styles.prioritized;
  } else if (0.60 <= percentile && percentile < 0.75) {
    categorization = 'Threshold';
    categoryCircleStyle = styles.threshold;
  } else {
    categorization = 'Non-prioritized';
    categoryCircleStyle = styles.nonPrioritized;
  }
  return [categorization, categoryCircleStyle];
};

interface IAreaDetailProps {
  properties: constants.J40Properties,
}

const AreaDetail = ({properties}:IAreaDetailProps) => {
  const score = properties[constants.SCORE_PROPERTY_HIGH] as number;
  const blockGroup = properties[constants.GEOID_PROPERTY];
  const population = properties[constants.TOTAL_POPULATION];

  interface indicatorInfo {
    label: string,
    description: string,
    value: number,
  }

  const povertyInfo:indicatorInfo = {
    label: 'Poverty',
    description: 'Household income is less than or equal to twice the federal "poverty level"',
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE],
  };
  const eduInfo:indicatorInfo = {
    label: 'Education',
    description: 'Percent of people age 25 or older that didn’t get a high school diploma',
    value: properties[constants.EDUCATION_PROPERTY_PERCENTILE],
  };
  const linIsoInfo:indicatorInfo = {
    label: 'Linguistic Isolation',
    description: 'Households in which all members speak a non-English language and speak English less than "very well"',
    value: properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE],
  };
  const umemployInfo:indicatorInfo = {
    label: 'Unemployment',
    description: 'Number of unemployed people as a percentage of the labor force',
    value: properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE],
  };
  const houseBurden:indicatorInfo = {
    label: 'Housing Burden',
    description: 'Households that are low income and spend more than 30% of their income to housing costs',
    value: properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE],
  };

  const indicators = [povertyInfo, eduInfo, linIsoInfo, umemployInfo, houseBurden];

  const [categorization, categoryCircleStyle] = getCategorization(score);

  // Todo VS: Understand how to make this more a11y
  return (
    <div role="table" className={styles.areaDetailContainer}>
      <div role="row" className={styles.topRow}>
        <div role="cell" className={styles.cumltveIndScore}>
          <div role="columnheader" className={styles.topRowTitle}>Cumulative Index Score</div>
          <div className={styles.score}>{`${readablePercent(score)}`}
            <sup className={styles.scoreSuperscript}><span>th</span></sup>
          </div>
          <div className={styles.topRowSubTitle}>percentile</div>
        </div>
        <div role="cell" className={styles.categorization}>
          <div className={styles.topRowTitle}>Categorization</div>
          <div className={styles.priority}>
            <div className={categoryCircleStyle} />
            <div className={styles.prioritization}>{categorization}</div>
          </div>
        </div>
      </div>
      <div role="rowgroup" className={styles.censusRow}>
        <div>
          <span className={styles.censusLabel}>Census block group: </span>
          <span className={styles.censusText}>{blockGroup}</span>
        </div>
        <div>
          <span className={styles.censusLabel}>County: </span>
          <span className={styles.censusText}>{'Washington County'}</span></div>
        <div>
          <span className={styles.censusLabel}>State: </span>
          <span className={styles.censusText}>{'District of Columbia'}</span></div>
        <div>
          <span className={styles.censusLabel}>Population: </span>
          <span className={styles.censusText}>{population.toLocaleString()}</span></div>
      </div>
      <div role="row" className={styles.divider}>
        <div>INDICATORS</div>
        <div>PERCENTILE (0-100)</div>
      </div>

      {indicators.map((indicator, index) => (
        <div role="rowgroup" key={index} className={styles.indicatorBox}>
          <div className={styles.indicatorInfo}>
            <div className={styles.indicatorTitle}>{indicator.label}</div>
            <div className={styles.indicatorDescription}>
              {indicator.description}
            </div>
          </div>
          <div className={styles.indicatorValue}>{readablePercent(indicator.value)}</div>
        </div>
      ))}

    </div>
  );
};

export default AreaDetail;
