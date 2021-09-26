import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage} from 'gatsby-plugin-intl';

export const PAGE = defineMessages({
  TILE: {
    id: 'methodology.page.title.text',
    defaultMessage: 'Data and Methodology',
    description: 'methodology page title text',
  },
  HEADING: {
    id: 'methodology.page.header.text',
    defaultMessage: 'Methodology',
    description: 'methodology page header text',
  },
  DESCRIPTION: {
    id: 'methodology.page.paragraph.first',
    defaultMessage: 'The methodology for identifying communities of focus is currently ' +
      'in a draft, pre-decisional form that may change over time as more datasets become available.',
    description: 'methodology page paragraph 1',
  },
});


// Download Package
export const DOWNLOAD_FILE_SIZE = '143MB';
export const DOWNLOAD_LAST_UPDATED = '09/20/21';
export const VERSION_NUMBER = '0.1';

export const DOWNLOAD_ZIP_URL = [
  process.env.GATSBY_DATA_ROOT_PATH,
  process.env.GATSBY_DATA_PIPELINE_SCORE_PATH,
  process.env.GATSBY_SCORE_DOWNLOAD_FILE_PATH,
].join('/');

export const DOWNLOAD_PACKAGE = defineMessages({
  TITLE: {
    id: 'downloadPacket.header.text',
    defaultMessage: `Draft communities list v${VERSION_NUMBER} (${DOWNLOAD_FILE_SIZE})`,
    description: 'download packet header text',
  },
  DESCRIPTION: {
    id: 'downloadPacket.info.text',
    defaultMessage: `The package includes draft v${VERSION_NUMBER} `+
    ` of the list of communities of focus (.csv and .xlsx) ` +
    ` and information about how to use the list (.pdf).`,
    description: 'download packet info text',
  },
  LAST_UPDATED: {
    id: 'downloadPacket.info.last.updated',
    defaultMessage: `Last updated: ${DOWNLOAD_LAST_UPDATED} `,
    description: 'download packet info last updated',
  },
  BUTTON_TEXT: {
    id: 'downloadPacket.button.text',
    defaultMessage: 'Download package',
    description: 'download packet button text',
  },
});


// Dataset section
export const DATASETS = defineMessages({
  HEADING: {
    id: 'datasetContainer.heading',
    defaultMessage: 'Datasets used in methodology',
    description: 'section heading of which datasets are used in cumulative score',
  },
  INFO: {
    id: 'datasetContainer.info',
    defaultMessage: 'The datasets come from a variety of sources and were selected' +
    ' based on relevance, availability, recency, and quality. The datasets seek to' +
    ' identify a range of human health, environmental, climate-related, and other' +
    ' cumulative impacts on communities.',
    description: 'description of the dataset section',
  },
  ADDITIONAL_HEADING: {
    id: 'datasetContainer.additional.heading',
    defaultMessage: 'Additional Indicators',
    description: 'additional indicators heading',
  },
  ADDITIONAL_INFO: {
    id: 'datasetContainer.additional.info',
    defaultMessage: 'These datasets provide additional information about each community.',
    description: 'additional indicator info',
  },
});

export const DATASET_CARD_LABELS = defineMessages({
  RESOLUTION: {
    id: 'datasetCard.dataResolution',
    defaultMessage: 'Data resolution: ',
    description: 'label associated with explaining the card',
  },
  SOURCE: {
    id: 'datasetCard.dataSource',
    defaultMessage: 'Data source: ',
    description: 'label associated with explaining the card',
  },
  DATE_RANGE: {
    id: 'datasetCard.dataDateRange',
    defaultMessage: 'Data date range: ',
    description: 'label associated with explaining the card',
  },
});

export const INDICATORS = [
  {
    indicator: 'Area Median Income',
    description: `Median income of the census block group calculated as a percent 
    of the metropolitan area’s or state's median income.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
  {
    indicator: 'Poverty',
    description: `Percent of a block group's population in households where the household income` +
    ` is at or below 100% of the federal poverty level.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
  {
    indicator: 'Education, less than high school education',
    description: `Percent of people ages 25 years or older in a block group whose 
    education level is less than a high school diploma.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dataDateRange: `2015-2019`,
  },
];

export const ADDITIONAL_INDICATORS = [
  {
    indicator: 'Diabetes',
    description: `People ages 18 years and older who report having ever been 
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
    description: `People ages 18 years and older who report ever having been told 
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
    dataSourceLabel: `Department of Transportation (DOT) traffic data as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
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
    dataSourceLabel: `Department of Energy (DOE) LEAD Score`,
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
    indicator: 'Wastewater discharge',
    description: `RSEI modeled Toxic Concentrations at stream segments within 500 
    meters, divided by distance in kilometers (km).`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Environmental Protection Agency (EPA) Risk-Screening 
    Environmental Indicators (RSEI) Model as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
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
    as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dataDateRange: `5-year estimates, 2015-2019`,
  },
  {
    indicator: 'PM2.5',
    description: `Fine inhalable particles, with diameters that are generally 
    2.5 micrometers and smaller.`,
    dataResolution: `Census block group`,
    dataSourceLabel: `Environmental Protection Agency (EPA) Office of Air 
    and Radiation (OAR) fusion of model and monitor data as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dataDateRange: `2017`,
  },

];


// Methodology Steps:
export const METHODOLOGY_STEPS = defineMessages({
  HEADING: {
    id: 'methodology.steps.heading',
    defaultMessage: `Methodology`,
    description: 'heading of methodology section',
  },
  DESCRIPTION_1: {
    id: 'methodology.steps.description.1',
    defaultMessage: 'The methodology for identifying communities of focus is'+
     ' calculated at the census block group level. Census block geographical boundaries'+
     ' are determined by the U.S. Census Bureau once every ten years. This tool utilizes'+
     ' the census block boundaries from 2010.',
    description: 'first description text ',
  },
  DESCRIPTION_2: {
    id: 'methodology.steps.description.2',
    defaultMessage: 'The following describes the process for identifying communities of focus.',
    description: 'second description text',
  },
  STEP_1_HEADING: {
    id: 'methodology.step.1.heading',
    defaultMessage: `Gather datasets`,
    description: 'first step heading',
  },
  STEP_1_INFO: {
    id: 'methodology.step.1.info',
    defaultMessage: `The methodology includes the following inputs that are equally weighted.`,
    description: 'first step info',
  },
  STEP_1_A_HEADING: {
    id: 'methodology.step.1.a.heading',
    defaultMessage: `Percent of Area Median Income`,
    description: 'step 1 a heading',
  },
  STEP_1_A_INFO_1: {
    id: 'methodology.step.1.a.info.1',
    defaultMessage: 'If a census block group is in a metropolitan area, this value is the'+
    ' median income of the census block group calculated as a percent of'+
    ' the metropolitan area’s median income.',
    description: 'step 1 a info 1',
  },
  STEP_1_A_INFO_2: {
    id: 'methodology.step.1.a.info.2',
    defaultMessage: 'If a census block group is not in a metropolitan area, this value is the'+
    ' median income of the census block group calculated as a percent of the state’s median'+
    ' income.',
    description: 'step 1 a info 2',
  },
  STEP_1_B_HEADING: {
    id: 'methodology.step.1.b.heading',
    defaultMessage: `Percent of households below or at 100% of the federal poverty line`,
    description: 'step 1 b heading',
  },
  STEP_1_C_HEADING: {
    id: 'methodology.step.1.c.heading',
    defaultMessage: `The high school degree achievement rate for adults 25 years and older`,
    description: 'step 1 a heading',
  },
  STEP_1_C_INFO: {
    id: 'methodology.step.1.c.info',
    defaultMessage: 'The percent of individuals who are 25 or older who have received a high school degree.',
    description: 'step 1 c info',
  },
  STEP_2_HEADING: {
    id: 'methodology.step.2.heading',
    defaultMessage: `Determine communites of focus`,
    description: 'second step heading',
  },
  STEP_2_INFO: {
    id: 'methodology.step.2.info',
    defaultMessage: `Under the existing formula, a census block group will be considered a community of focus if:`,
    description: 'second step info',
  },
});

const FED_POVERTY_LINE_URL = 'https://www.census.gov/topics/income-poverty/poverty/guidance/poverty-measures.html';

// Copy that has links or other HTML tags in them
export const COMPLEX_METH_STEPS = {
  STEP_2_B_INFO: <FormattedMessage
    id={'methodology.steps.2.b.info'}
    description={'Download the draft list of communities of focus and datasets used.'}
    defaultMessage={`This is the percent of households in a state with a household income 
    below or at 100% of the {federalPovertyLine}. This federal poverty line is calculated 
    based on the composition of each household (e.g., based on household size), but it does not vary geographically.`}
    values={{
      federalPovertyLine:
      <a href={FED_POVERTY_LINE_URL} target="_blank" rel="noreferrer">
        federal poverty line
      </a>,
    }}
  />,
  FORMULA: <FormattedMessage
    id={'methodology.steps.2.formula'}
    description={'Formala used to calculate communities of focus'}
    defaultMessage={`{medianIncome} {or} {livingAtPovery} {and} {education}`}
    values={{
      medianIncome:
        <p>
         (The median income is less than 80% of the area median income
        </p>,
      or:
        <p className={'flush'}>
          OR
        </p>,
      livingAtPovery:
        <p className={'flush'}>
          households living in poverty (at or below 100% of the federal poverty level) is greater than 20%)
        </p>,
      and:
        <p className={'flush'}>
          AND
        </p>,
      education:
        <p className={'flush'}>
          The high school degree achievement rate for adults 25 years and older is greater than 95%
        </p>,
    }}
  />,
};
