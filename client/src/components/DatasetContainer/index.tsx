import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import {Grid} from '@trussworks/react-uswds';

import DatasetCard from '../DatasetCard';
import AlertWrapper from '../AlertWrapper';

import * as styles from './dsContainer.module.scss';

export const indicators = [
  {
    indicator: 'Area Median Income',
    description: `Median income of the census block group calculated as a percent 
    of the metropolitan area’s or state's median income.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census' American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
  {
    indicator: 'Poverty',
    description: `Percent of a block group's population in households where the 
    household income is at or above 100% the federal "poverty level."`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
  {
    indicator: 'Education, less than high school education',
    description: `Percent of people ages 25 years or older in a block group whose 
    education is short of a high school diploma.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
];

export const additionalIndicators = [
  {
    indicator: 'Diabetes',
    description: `People ages 18 years and up who report having ever been 
    told by a doctor, nurse, or other health professionals that they have 
    diabetes other than diabetes during pregnancy.`,
    dataResolution: `Census tract`,
    dataSourceLabel: `Centers for Disease Control and Prevention (CDC) PLACES`,
    dataSourceURL: `https://www.cdc.gov/places/index.html`,
    dataDateRange: `2016-2019`,
  },
  {
    indicator: 'Asthma',
    description: `Weighted number of respondents people who answer “yes” both 
    to both of the following questions: “Have you ever been told by a doctor, 
    nurse, or other health professional that you have asthma?” and the question 
    “Do you still have asthma?”`,
    dataResolution: `Census tract`,
    dataSourceLabel: `Centers for Disease Control and Prevention (CDC) PLACES`,
    dataSourceURL: `https://www.cdc.gov/places/index.html`,
    dataDateRange: `2016-2019`,
  },
  {
    indicator: 'Heart disease',
    description: `People ages 18 years and up who report ever having been told 
    by a doctor, nurse, or other health professionals that they had angina or 
    coronary heart disease.`,
    dataResolution: `Census tract`,
    dataSourceLabel: `Centers for Disease Control and Prevention (CDC) PLACES`,
    dataSourceURL: `https://www.cdc.gov/places/index.html`,
    dataDateRange: `2016-2019`,
  },
  {
    indicator: 'Life expectancy',
    description: `Estimated years of life expectancy.`,
    dataResolution: `Census tract`,
    dataSourceLabel: `Centers for Disease Control and Prevention (CDC) 
    US Small-area Life Expectancy Estimates Project`,
    dataSourceURL: `https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html#data`,
    dataDateRange: `2010-2015`,
  },
  {
    indicator: 'Traffic proximity and volume',
    description: `Count of vehicles (average annual daily traffic) at major roads 
    within 500 meters, divided by distance in meters (not km).`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Department of Transportation (DOT) traffic data`,
    dataSourceURL: `#`,
    dataDateRange: `2017`,
  },
  {
    indicator: 'FEMA Risk Index Expected Annual Loss Score',
    description: `Average economic loss in dollars resulting from natural 
    hazards each year. It is calculated for each hazard type and quantifies 
    loss for relevant consequence types: buildings, people, and agriculture.`,
    dataResolution: `Census tract`,
    dataSourceLabel: `Federal Emergency Management Agency (FEMA)`,
    dataSourceURL: `https://hazards.fema.gov/nri/expected-annual-loss`,
    dataDateRange: `2014-2017`,
  },
  {
    indicator: 'Energy burden',
    description: `Average annual energy cost ($) divided by household income.`,
    dataResolution: `Census tract`,
    dataSourceLabel: `LEAD Score`,
    dataSourceURL: `https://www.energy.gov/eere/slsc/low-income-energy-affordability-data-lead-tool`,
    dataDateRange: `2018`,
  },
  {
    indicator: 'Housing cost burden',
    description: `Households that are low income and spend more than 30% of their 
    income to housing costs.`,
    dataResolution: `Census tract`,
    dataSourceLabel: `Department of Housing & Urban Development’s 
    (HUD) Comprehensive Housing Affordability Strategy dataset`,
    dataSourceURL: `https://www.huduser.gov/portal/datasets/cp.html`,
    dataDateRange: `2013-2017`,
  },
  {
    indicator: 'Wastewater Discharge',
    description: `RSEI modeled Toxic Concentrations at stream segments within 500 
    meters, divided by distance in kilometers (km).`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Environmental Protection Agency (EPA) Risk-Screening 
    Environmental Indicators (RSEI) Model`,
    dataSourceURL: `https://www.epa.gov/rsei`,
    dataDateRange: `2020`,
  },
  {
    indicator: 'Lead paint',
    description: `Percent of housing units built pre-1960, used as an 
    indicator of potential lead paint exposure in homes.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
  {
    indicator: 'Diesel particulate matter',
    description: `Mixture of particles that is part of diesel exhaust in the air.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Environmental Protection Agency (EPA) National Air Toxics Assessment (NATA)
    `,
    dataSourceURL: `https://www.epa.gov/national-air-toxics-assessment/2014-nata-assessment-results`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },
  {
    indicator: 'PM2.5',
    description: `Fine inhalable particles, with diameters that are generally 
    2.5 micrometers and smaller.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Environmental Protection Agency (EPA) Office of Air 
    and Radiation (OAR) fusion of model and monitor data`,
    dataSourceURL: `https://www.epa.gov/aboutepa/about-office-air-and-radiation-oar`,
    dataDateRange: `2017`,
  },

];

const DatasetContainer = () => {
  const intl = useIntl();
  const messages = defineMessages({
    cumulativeScore: {
      id: 'datasetContainer.header.cumulativeScore',
      defaultMessage: 'Datasets used methodology',
      description: 'section label of which datasets are used in cumulative score',
    },
    subTitle: {
      id: 'datasetContainer.subTitle',
      defaultMessage: 'The datasets come from a variety of sources and were selected' +
      ' based on relevance, availability, recency, and quality. The datasets seek to' +
      ' identify a range of human health, environmental, climate-related, and other' +
      ' cumulative impacts on communities.',
      description: 'description of the dataset section',
    },
    additionalSubtitle: {
      id: 'datasetContainer.additionalSubtitle',
      defaultMessage: 'Additional Indicators',
      description: 'indicator heading',
    },
    additionalText: {
      id: 'datasetContainer.additionalText',
      defaultMessage: 'These datasets provide additional information about each community.',
      description: 'additional indicator heading',
    },
  });

  //  JSX return value:
  return (
    <>
      <Grid row>
        <Grid col={12}>
          <AlertWrapper showBetaAlert={false} showLimitedDataAlert={true}/>
          <h2>{intl.formatMessage(messages.cumulativeScore)}</h2>
        </Grid>
      </Grid>

      <Grid row>
        <Grid col={12} tablet={{col: 7}} className={'j40-mb-3'}>
          <p>{intl.formatMessage(messages.subTitle)}</p>
        </Grid>
      </Grid>

      <div className={styles.datasetCardsContainer}>
        {indicators.map((card) => <DatasetCard
          key={card.indicator}
          datasetCardProps={card}/>)}
      </div>

      <Grid row>
        <Grid col={12}>
          <h2>{intl.formatMessage(messages.additionalSubtitle)}</h2>
        </Grid>
      </Grid>

      <Grid row>
        <Grid col={12} tablet={{col: 7}} className={'j40-mb-3'}>
          <p>{intl.formatMessage(messages.additionalText)}</p>
        </Grid>
      </Grid>

      <div className={styles.datasetCardsContainer}>
        {additionalIndicators.map((card) => <DatasetCard
          key={card.indicator}
          datasetCardProps={card}/>)}
      </div>
    </>
  );
};

export default DatasetContainer;
