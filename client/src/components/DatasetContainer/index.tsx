import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import DatasetCard from '../DatasetCard';
import J40Alert from '../J40Alert';
import * as styles from './dsContainer.module.scss';

export const cards = [
  {
    indicator: 'Poverty',
    description: `Percent of a block group's population in households where the household 
    income is less than or equal to twice the federal "poverty level"`,
    dataResolution: `Census block group`,
    dataSourceLabel: `U.S. Census Bureau`,
    dataSourceURL: `https://www.census.gov/`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },
  {
    indicator: 'Education (less than high school)',
    description: `Percent of people age 25 or older in a block group whose education is short of a high school diploma`,
    dataResolution: `Census block group`,
    dataSourceLabel: `U.S. Census Bureau`,
    dataSourceURL: `https://www.census.gov/`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },
  {
    indicator: 'Linguistic isolation',
    description: `Percent of people in a block group living in linguistically 
    isolated households — a linguistically isolated household is a household in 
    which all members aged 14 years and over speak a non-English language and also speak 
    English less than "very well" (i.e., have difficulty with English)`,
    dataResolution: `Census block group`,
    dataSourceLabel: `U.S. Census Bureau`,
    dataSourceURL: `https://www.census.gov/`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },
  {
    indicator: 'Unemployment rate',
    description: `Unemployment rate (people who are unemployed divided by the total population of 
      people in the labor force over 16 years old)`,
    dataResolution: `Census block group`,
    dataSourceLabel: `U.S. Census Bureau`,
    dataSourceURL: `https://www.census.gov/`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },
  {
    indicator: 'Housing burden',
    description: `Percent of households in a census tract that are both low income (making less
       than 80% of the HUD Area Median Family Income) and severely burdened by housing costs 
       (paying greater than 30% of their income to housing costs)`,
    dataResolution: `Census block group`,
    dataSourceLabel: `U.S. Census Bureau`,
    dataSourceURL: `https://www.census.gov/`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },

];

const DatasetContainer = () => {
  const intl = useIntl();
  const messages = defineMessages({
    cumulativeScore: {
      id: 'datasetContainer.header.cumulativeScore',
      defaultMessage: 'Datasets used in cumulative score',
      description: 'section label of which datasets are used in cumulative score',
    },
    subTitle: {
      id: 'datasetContainer.subTitle',
      defaultMessage: 'The datasets come from a variety of sources and ' +
      'were selected after considering relevance, availability, recency and quality.',
      description: 'description of the dataset section',
    },
  });

  return (
    <div className={`${styles.datasetContainer} desktop:grid-col`}>
      <div className={`${styles.j40AlertContainer} desktop:grid-col`}>
        <div className={'grid-container-desktop-lg'}>
          <J40Alert />
        </div>
      </div>
      <div className={'grid-container-desktop-lg'}>
        <h1 className={styles.datasetContainerHeader}>{intl.formatMessage(messages.cumulativeScore)}</h1>
        <p className={styles.datasetContainerSubTitle}>{intl.formatMessage(messages.subTitle)}</p>
        <div className={styles.datasetCardsContainer}>
          {cards.map((card, index) => <DatasetCard key={index} datasetCardProps={card}/>)}
        </div>
      </div>
    </div>
  );
};

export default DatasetContainer;
