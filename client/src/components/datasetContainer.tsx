import React from 'react';
import DatasetCard from './datasetCard';
import * as styles from './datasetContainer.module.scss';

const cards = [
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
  return (
    <div className={`${styles.datasetContainer} desktop:grid-col`}>
      <div className={'grid-container-desktop-lg'}>
        <h1 className={styles.datasetContainerHeader}>Datasets used in cumulative score</h1>
        <p className={styles.datasetContainerSubTitle}>
        The datasets come from a variety of sources and were selected after
        considering relevance, availability, recency and quality.
        </p>
        <div className={styles.datasetCardsContainer}>
          {cards.map((card, index) => <DatasetCard key={index} datasetCardProps={card}/>)}
        </div>
      </div>
    </div>
  );
};

export default DatasetContainer;
