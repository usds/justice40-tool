// External Libs:
import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

// Components:

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';

export const readablePercentile = (percentile: number) => {
  return Math.round(percentile * 100);
};


// Todo: Add internationalization to superscript ticket #582
const getSuperscriptOrdinal = (percentile: number) => {
  const englishOrdinalRules = new Intl.PluralRules('en', {
    type: 'ordinal',
  });
  const suffixes = {
    zero: 'th',
    one: 'st',
    two: 'nd',
    few: 'rd',
    many: 'th',
    other: 'th',
  };
  return suffixes[englishOrdinalRules.select(percentile)];
};

export const getCategorization = (percentile: number) => {
  let categorization;
  let categoryCircleStyle;

  if (percentile >= constants.SCORE_BOUNDARY_PRIORITIZED ) {
    categorization = 'Prioritized';
    categoryCircleStyle = styles.prioritized;
  } else if (constants.SCORE_BOUNDARY_THRESHOLD <= percentile && percentile < constants.SCORE_BOUNDARY_PRIORITIZED) {
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
  const intl = useIntl();
  const messages = defineMessages({
    cumulativeIndexScore: {
      id: 'areaDetail.priorityInfo.cumulativeIndexScore',
      defaultMessage: 'Cumulative Index Score',
      description: 'the cumulative score of the feature selected',
    },
    percentile: {
      id: 'areaDetail.priorityInfo.percentile',
      defaultMessage: 'percentile',
      description: 'the percentil of the feature selected',
    },
    categorization: {
      id: 'areaDetail.priorityInfo.categorization',
      defaultMessage: 'Categorization',
      description: 'the categorization of prioritized, threshold or non-prioritized',
    },
    censusBlockGroup: {
      id: 'areaDetail.geographicInfo.censusBlockGroup',
      defaultMessage: 'Census block group:',
      description: 'the census block group id number of the feature selected',
    },
    county: {
      id: 'areaDetail.geographicInfo.county',
      defaultMessage: 'County:',
      description: 'the county of the feature selected',
    },
    state: {
      id: 'areaDetail.geographicInfo.state',
      defaultMessage: 'State: ',
      description: 'the state of the feature selected',
    },
    population: {
      id: 'areaDetail.geographicInfo.population',
      defaultMessage: 'Population:',
      description: 'the population of the feature selected',
    },
    indicatorColumnHeader: {
      id: 'areaDetail.indicators.indicatorColumnHeader',
      defaultMessage: 'Indicators',
      description: 'the population of the feature selected',
    },
    percentileColumnHeader: {
      id: 'areaDetail.indicators.percentileColumnHeader',
      defaultMessage: 'Percentile (0-100)',
      description: 'the population of the feature selected',
    },
    poverty: {
      id: 'areaDetail.indicator.poverty',
      defaultMessage: 'Poverty',
      description: 'Household income is less than or equal to twice the federal "poverty level"',
    },
    education: {
      id: 'areaDetail.indicator.education',
      defaultMessage: 'Education',
      description: 'Percent of people age 25 or older that didn’t get a high school diploma',
    },
    linguisticIsolation: {
      id: 'areaDetail.indicator.linguisticIsolation',
      defaultMessage: 'Linguistic isolation',
      description: 'Households in which all members speak a non-English language and ' +
      'speak English less than "very well"',
    },
    unemployment: {
      id: 'areaDetail.indicator.unemployment',
      defaultMessage: 'Unemployment rate',
      description: 'Number of unemployed people as a percentage of the labor force',
    },
    houseBurden: {
      id: 'areaDetail.indicator.houseBurden',
      defaultMessage: 'Housing Burden',
      description: 'Households that are low income and spend more than 30% of their income to housing costs',
    },
  });

  const score = properties[constants.SCORE_PROPERTY_HIGH] as number;
  const blockGroup = properties[constants.GEOID_PROPERTY];
  const population = properties[constants.TOTAL_POPULATION];
  const countyName = properties[constants.COUNTY_NAME];
  const stateName = properties[constants.STATE_NAME];

  interface indicatorInfo {
    label: string,
    description: string,
    value: number,
  }

  // Todo: Ticket #367 will be replacing descriptions with YAML file
  const povertyInfo:indicatorInfo = {
    label: intl.formatMessage(messages.poverty),
    description: 'Household income is less than or equal to twice the federal "poverty level"',
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE],
  };
  const eduInfo:indicatorInfo = {
    label: intl.formatMessage(messages.education),
    description: 'Percent of people age 25 or older that didn’t get a high school diploma',
    value: properties[constants.EDUCATION_PROPERTY_PERCENTILE],
  };
  const linIsoInfo:indicatorInfo = {
    label: intl.formatMessage(messages.linguisticIsolation),
    description: 'Households in which all members speak a non-English language and speak English less than "very well"',
    value: properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE],
  };
  const umemployInfo:indicatorInfo = {
    label: intl.formatMessage(messages.unemployment),
    description: 'Number of unemployed people as a percentage of the labor force',
    value: properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE],
  };
  const houseBurden:indicatorInfo = {
    label: intl.formatMessage(messages.houseBurden),
    description: 'Households that are low income and spend more than 30% of their income to housing costs',
    value: properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE],
  };

  const indicators = [povertyInfo, eduInfo, linIsoInfo, umemployInfo, houseBurden];

  const [categorization, categoryCircleStyle] = getCategorization(score);

  return (
    <aside className={styles.areaDetailContainer} data-cy={'aside'}>
      <header className={styles.topRow }>
        <div className={styles.cumulativeIndexScore}>
          <div className={styles.topRowTitle}>{intl.formatMessage(messages.cumulativeIndexScore)}</div>
          <div className={styles.score} data-cy={'score'}>{`${readablePercentile(score)}`}
            <sup className={styles.scoreSuperscript}><span>th</span></sup>
          </div>
          <div className={styles.topRowSubTitle}>{intl.formatMessage(messages.percentile)}</div>
        </div>
        <div className={styles.categorization}>
          <h6 className={styles.topRowTitle}>{intl.formatMessage(messages.categorization)}</h6>
          <div className={styles.priority}>
            <div className={categoryCircleStyle} />
            <div className={styles.prioritization}>{categorization}</div>
          </div>
        </div>
      </header>
      <ul className={styles.censusRow}>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.censusBlockGroup)} </span>
          <span className={styles.censusText}>{blockGroup}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.county)} </span>
          <span className={styles.censusText}>{countyName}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.state)}</span>
          <span className={styles.censusText}>{stateName}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.population)} </span>
          <span className={styles.censusText}>{population.toLocaleString()}</span>
        </li>
      </ul>
      <div className={styles.divider}>
        <h6>{intl.formatMessage(messages.indicatorColumnHeader)}</h6>
        <h6>{intl.formatMessage(messages.percentileColumnHeader)}</h6>
      </div>

      {indicators.map((indicator, index) => (
        <li key={index} className={styles.indicatorBox} data-cy={'indicatorBox'}>
          <div>
            <h4>{indicator.label}</h4>
            <p className={'secondary'}>
              {indicator.description}
            </p>
          </div>
          <div className={styles.indicatorValue}>
            {readablePercentile(indicator.value)}
            <sup className={styles.indicatorSuperscript}><span>
              {getSuperscriptOrdinal(readablePercentile(indicator.value))}
            </span></sup>
          </div>
        </li>
      ))}

    </aside>
  );
};

export default AreaDetail;
