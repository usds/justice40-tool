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
    id: 'methodology.page.paragraph',
    defaultMessage: `
      This tool identifies commmunities that are economically disadvantaged, overburdened by 
      certain environmental risks, and marginalized by legacies of historic underinvestment.
      A community qualifies as 'disadvantaged' when a census tract is at or above a certain
      threshold for a climate or environmental burden indicator and also above a certain
      threshold for a socioeconomic indicator. Census tract geographical boundaries are 
      determined by the U.S. Census Bureau once every ten years. This tool untilizes the 
      census tract boundaries from 2010.
    `,
    description: 'methodology page paragraph',
  },
  FORMULA_INTRO: {
    id: 'methodology.page.formula.intro',
    defaultMessage: `
      Under the current formula, a census tract will be considered disadvantaged:
    `,
    description: 'methodology page introducing the formula',
  },
  CATEGORY_TEXT: {
    id: 'methodology.page.categories.title',
    defaultMessage: `
      Communities will be defined as disadvantaged if they meet the qualifications under any of the
      following 8 categories of criteria:
    `,
    description: 'methodology page explanation of the categories',
  },

});


export const FORMULA = {
  IF: <FormattedMessage
    id={'methodology.page.formula.first'}
    defaultMessage={ `{if} it is above the threshold for one or more climate or environmental indicator`}
    description={'the first part of the formula used in the methodology'}
    values= {{
      if: <span>IF</span>,
    }}
  />,
  AND: <FormattedMessage
    id={'methodology.page.formula.second'}
    defaultMessage={ `{and} it is above the threshold for one or more socioeconomic indicator`}
    description={'the second part of the formula used in the methodology'}
    values= {{
      and: <span>AND</span>,
    }}
  />,
  THEN: <FormattedMessage
    id={'methodology.page.formula.second'}
    defaultMessage={ `{then} the community is considered disadvantaged.`}
    description={'the second part of the formula used in the methodology'}
    values= {{
      then: <span>THEN</span>,
    }}
  />,
};

// Download Package
export const DOWNLOAD_FILE_SIZE = '111MB';
export const DOWNLOAD_LAST_UPDATED = '12/13/21';
export const DOWNLOAD_LAST_UPDATED_ES = '13/12/21';
export const VERSION_NUMBER = '0.1';

export const DOWNLOAD_ZIP_URL = [
  process.env.GATSBY_CDN_TILES_BASE_URL,
  process.env.GATSBY_DATA_PIPELINE_SCORE_PATH,
  process.env.GATSBY_SCORE_DOWNLOAD_FILE_PATH,
].join('/');

export const DOWNLOAD_PACKAGE = {
  TITLE: <FormattedMessage
    id={'downloadPacket.header.text'}
    defaultMessage={`Communities list v{versionNumber} ({downloadFileSize})`}
    description={'download packet header text'}
    values= {{
      versionNumber: VERSION_NUMBER,
      downloadFileSize: DOWNLOAD_FILE_SIZE,
    }}
  />,
  DESCRIPTION: <FormattedMessage
    id={ 'downloadPacket.info.text'}
    defaultMessage= {`
      The package includes v{versionNumber} of the list of disadvantaged communities
      (.csv and .xlsx) and information about how to use the list (.pdf).
    `}
    description= {'download packet info text'}
    values= {{
      versionNumber: VERSION_NUMBER,
    }}
  />,
  LAST_UPDATED: <FormattedMessage
    id={ 'downloadPacket.info.last.updated'}
    defaultMessage= {`Last updated: {downloadLastUpdated} `}
    description= {'download packet info last updated'}
    values= {{
      downloadLastUpdated: DOWNLOAD_LAST_UPDATED,
    }}
  />,
  BUTTON_TEXT: <FormattedMessage
    id={ 'downloadPacket.button.text'}
    defaultMessage= {'Download package'}
    description= {'download packet button text'}
  />,
};


// Low Income section
export const LOW_INCOME = defineMessages({
  HEADING: {
    id: 'low.income.heading',
    defaultMessage: 'Low Income',
    description: 'title of section describing low income',
  },
  INFO: {
    id: 'low.income.info',
    defaultMessage: `
      In the 65th percentile or above for percent of census tract population of households
      where houseshold income is less than or equal to twice the federal poverty level
    `,
    description: 'description of low income',
  },
});

export const CATEGORY= {
  HEADING: <FormattedMessage
    id={'indicator.categories.heading'}
    defaultMessage={'Categories'}
    description= {'category heading'}
  />,
};


// Indicator Categories
export const CATEGORIES = {
  CLIMATE_CHANGE: {
    TITLE: <FormattedMessage
      id={'indicator.categories.climate.change.title'}
      defaultMessage={'Climate Change'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.climate.change.if'}
      defaultMessage= {'{if} at or above 90th percentile for {expLossRate}'}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        expLossRate: <a href="#exp-pop-loss-rate">expected population loss rate</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.climate.change.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.climate.change.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  CLEAN_ENERGY: {
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.energy.title'}
      defaultMessage={'Clean Energy and Energy Efficiency'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.clean.energy.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {energyCostBur} OR {pm25}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        energyCostBur: <a href='#energy-burden'>energy cost burden score</a>,
        pm25: <a href='#pm-25'>PM2.5</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.clean.energy.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.clean.energy.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  CLEAN_TRANSPORT: {
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.transport.title'}
      defaultMessage={'Clean transportation'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.clean.transport.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {dieselPM} or {traffic}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        dieselPM: <a href='#diesel-pm'>diesel particulate matter</a>,
        traffic: <a href='#traffic-vol'>traffic proximity and volume</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.clean.transport.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.clean.transport.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  AFFORDABLE_HOUSE: {
    TITLE: <FormattedMessage
      id={'indicator.categories.afford.house.title'}
      defaultMessage={'Affordable and sustainable housing'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.afford.house.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {lead} AND {medianHouseVal} is less than
        90th percentile OR at or above the 90th percentile for the {houseBur}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        lead: <a href='#lead-paint'>lead paint</a>,
        medianHouseVal: <a href='#median-house'>the median house value</a>,
        houseBur: <a href='#house-burden'>housing cost burden</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.afford.house.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.afford.house.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  LEGACY_POLLUTION: {
    TITLE: <FormattedMessage
      id={'indicator.categories.legacy.pollution.title'}
      defaultMessage={'Reduction and remediation of legacy pollution'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.legacy.pollution.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {proxRMP} OR {proxNPL}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        proxRMP: <a href='#prox-rmp'>proximity to RMP sites</a>,
        proxNPL: <a href='#prox-npl'>proximity to NLP sites</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.legacy.pollution.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.legacy.pollution.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  CLEAN_WATER: {
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.water.title'}
      defaultMessage={'Critical Clean Water and Waste Infrastructure'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.clean.water.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {wasteWater}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        wasteWater: <a href='#waste-water'>wastewater discharge</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.clean.water.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.clean.water.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  HEALTH_BURDENS: {
    TITLE: <FormattedMessage
      id={'indicator.categories.health.burdens.title'}
      defaultMessage={'Health Burdens'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.health.burdens.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {diabetes} OR {asthma} OR {heart} OR
        in the 90th percentile for above for {life}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        diabetes: <a href='#diabetes'>diabetes</a>,
        asthma: <a href='#asthma'>asthma</a>,
        heart: <a href='#heart-disease'>heart disease</a>,
        life: <a href='#life-exp'>life expectancy</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.health.burdens.and'}
      defaultMessage= {'{and} is low income{asterisk}'}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.health.burdens.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
  WORK_DEV: {
    TITLE: <FormattedMessage
      id={'indicator.categories.work.dev.title'}
      defaultMessage={'Training and workforce development'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.work.dev.if'}
      defaultMessage= {`
        {if} at or above 90th percentile for {unemploy} OR {linIso} OR for %
        households at or below 100% federal {poverty} level OR at or below 90th percentile
        for {areaMedian}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        unemploy: <a href='#unemploy'>unemployment</a>,
        linIso: <a href='#ling-iso'>linguistic isolation</a>,
        poverty: <a href='#poverty'>poverty</a>,
        areaMedian: <a href='#median-income'>area median income</a>,
      }}
    />,
    AND: <FormattedMessage
      id= {'indicator.categories.work.dev.and'}
      defaultMessage= {`
      {and} where {highSchool} for adults 25 years and older is less than 95%
      `}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        highSchool: <a href='#education'>the high school degree achievement rates</a>,
      }}
    />,
    THEN: <FormattedMessage
      id= {'indicator.categories.work.dev.then'}
      defaultMessage= {'{then} the community is disadvantaged.'}
      description= {'then portion of the formula'}
      values= {{
        then: <strong>THEN</strong>,
        asterisk: <sup>*</sup>,
      }}
    />,
  },
};

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
  USED_IN: {
    id: 'datasetCard.used.in',
    defaultMessage: 'Used in: ',
    description: 'label associated with explaining the card',
  },
  RESP_PARTY: {
    id: 'datasetCard.responsible.party',
    defaultMessage: 'Responsible Party: ',
    description: 'label associated with explaining the card',
  },
  DATE_RANGE: {
    id: 'datasetCard.date.range',
    defaultMessage: 'Date range: ',
    description: 'label associated with explaining the card',
  },
});

export const INDICATORS = [
  {
    domID: 'low-income',
    indicator: 'Low Income',
    description: `
    Percent of a block group's population in households where household income is at or below
    200% of the federal poverty level.
    `,
    usedIn: `All methodologies except for training and workforce development`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'exp-pop-loss-rate',
    indicator: 'Expected Population Loss Rate',
    description: `
    Economic loss rate to the population in fatalities and injuries resulting from the natural
    hazards each year. This rate is monetized into a population equivalence using a value of
    statistical life (VSL) approach where each fatality or ten injuries is treated as $7.6 million
    of economic loss. This was determined by inflating the 2015 VSL of $6.9 million to 2020 dollars
    using the Bureau of Labor Statistics' Consumer Price Index Inflation Calculator.
    `,
    usedIn: `Climate change methodology`,
    respPartyLabel: `Federal Emergency Management Agency (FEMA)`,
    dataSourceURL: `https://hazards.fema.gov/nri/expected-annual-loss`,
    dateRange: `2014-2021`,
  },
  {
    domID: 'energy-burden',
    indicator: 'Energy burden',
    description: `Average annual energy cost ($) divided by household income.`,
    usedIn: `Clean energy and energy efficiency methodology`,
    respPartyLabel: `Department of Energy (DOE) LEAD Score`,
    dataSourceURL: `https://www.energy.gov/eere/slsc/low-income-energy-affordability-data-lead-tool`,
    dateRange: `2018`,
  },
  {
    domID: 'pm-25',
    indicator: 'PM2.5',
    description: `Fine inhalable particles, with diameters that are generally 
    2.5 micrometers and smaller.`,
    usedIn: `Clean energy and energy efficiency methodology`,
    respPartyLabel: `Environmental Protection Agency (EPA) Office of Air 
    and Radiation (OAR) fusion of model and monitor data as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dateRange: `2017`,
  },
  {
    domID: 'diesel-pm',
    indicator: 'Diesel particulate matter',
    description: `Mixture of particles that is part of diesel exhaust in the air.`,
    usedIn: `Clean transportation methodology`,
    respPartyLabel: `Environmental Protection Agency (EPA) National Air Toxics Assessment (NATA)
    as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dateRange: `2014`,
  },
  {
    domID: 'traffic-vol',
    indicator: 'Traffic proximity and volume',
    description: `Count of vehicles (average annual daily traffic) at major roads 
    within 500 meters, divided by distance in meters (not km).`,
    usedIn: `Clean transportation methodology`,
    respPartyLabel: `Department of Transportation (DOT) traffic data as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dateRange: `2017`,
  },
  {
    domID: 'lead-paint',
    indicator: 'Lead paint',
    description: `Percent of housing units built pre-1960, used as an 
    indicator of potential lead paint exposure in homes.`,
    usedIn: `Affordable and sustainable housing methodology`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'median-house',
    indicator: 'Median house value',
    description: `XXX`,
    usedIn: `Affordable and sustainable housing methodology`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'house-burden',
    indicator: 'Housing cost burden',
    description: `Households that are low income and spend more than 30% of their 
    income to housing costs.`,
    usedIn: `Affordable and sustainable housing methodology`,
    respPartyLabel: `Department of Housing & Urban Development’s 
    (HUD) Comprehensive Housing Affordability Strategy dataset`,
    dataSourceURL: `https://www.huduser.gov/portal/datasets/cp.html`,
    dateRange: `2013-2017`,
  },
  {
    domID: 'prox-rmp',
    indicator: 'Proximity to Risk Management Plan (RMP) Sites',
    description: `
    Count of RMP (potential chemical accident management plan) facilities within 5 km (or nearest 
      one beyond 5 km), each divided by distance in kilometers.`,
    usedIn: `Affordable and sustainable housing methodology`,
    respPartyLabel: `Environmental Protection Agency (EPA) RMP database as compiled by EPA’s  EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dateRange: `2020`,
  },
  {
    domID: 'prox-npl',
    indicator: 'Proximity to National Priorities List (NPL) Sites',
    description: `
    Count of proposed or listed NPL - also known as superfund - sites within 5 km (or nearest one 
      beyond 5 km), each divided by distance in kilometers.`,
    usedIn: `Reduction and remediation of legacy pollution methodology`,
    respPartyLabel: `Environmental Protection Agency (EPA) RMP database as compiled by EPA’s EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dateRange: `2020`,
  },
  {
    domID: 'waste-water',
    indicator: 'Wastewater discharge',
    description: `RSEI modeled Toxic Concentrations at stream segments within 500 
    meters, divided by distance in kilometers (km).`,
    usedIn: `Critical clean water and waste infrastructure`,
    respPartyLabel: `Environmental Protection Agency (EPA) Risk-Screening 
    Environmental Indicators (RSEI) Model as compiled by EPA's EJSCREEN`,
    dataSourceURL: `https://www.epa.gov/ejscreen/technical-documentation-ejscreen`,
    dateRange: `2020`,
  },
  {
    domID: 'diabetes',
    indicator: 'Diabetes',
    description: `People ages 18 years and older who report having ever been 
    told by a doctor, nurse, or other health professionals that they have 
    diabetes other than diabetes during pregnancy.`,
    usedIn: `Health burdens methodology`,
    respPartyLabel: `Centers for Disease Control and Prevention (CDC) PLACES`,
    dataSourceURL: `https://www.cdc.gov/places/index.html`,
    dateRange: `2016-2019`,
  },
  {
    domID: 'asthma',
    indicator: 'Asthma',
    description: `Weighted number of respondents people who answer “yes” both 
    to both of the following questions: “Have you ever been told by a doctor, 
    nurse, or other health professional that you have asthma?” and the question 
    “Do you still have asthma?”`,
    usedIn: `Health burdens methodology`,
    respPartyLabel: `Centers for Disease Control and Prevention (CDC) PLACES`,
    dataSourceURL: `https://www.cdc.gov/places/index.html`,
    dateRange: `2016-2019`,
  },
  {
    domID: 'heart-disease',
    indicator: 'Heart disease',
    description: `People ages 18 years and older who report ever having been told 
    by a doctor, nurse, or other health professionals that they had angina or 
    coronary heart disease.`,
    usedIn: `Health burdens methodology`,
    respPartyLabel: `Centers for Disease Control and Prevention (CDC) PLACES`,
    dataSourceURL: `https://www.cdc.gov/places/index.html`,
    dateRange: `2016-2019`,
  },
  {
    domID: 'life-exp',
    indicator: 'Life expectancy',
    description: `Estimated years of life expectancy.`,
    usedIn: `Health burdens methodology`,
    respPartyLabel: `Centers for Disease Control and Prevention (CDC) 
    US Small-area Life Expectancy Estimates Project`,
    dataSourceURL: `https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html#data`,
    dateRange: `2010-2015`,
  },
  {
    domID: 'unemploy',
    indicator: 'Unemployment',
    description: `Number of unemployed people as a percentage of the civilian labor force`,
    usedIn: `Training and workforce development`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'ling-iso',
    indicator: 'Linguistic Isolation',
    description: `Households in which no one age 14 and over speaks English only or also a language
    other than English`,
    usedIn: `Training and workforce development`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'poverty',
    indicator: 'Poverty',
    description: `Percent of a block group's population in households where the household income` +
    ` is at or below 100% of the federal poverty level.`,
    usedIn: `Training and workforce development`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'median-income',
    indicator: 'Area Median Income',
    description: `Median income of the census block group calculated as a percent 
    of the metropolitan area’s or state's median income.`,
    usedIn: `Training and workforce development`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'education',
    indicator: 'Education, less than high school education',
    description: `Percent of people ages 25 years or older in a block group whose 
    education level is less than a high school diploma.`,
    usedIn: `Training and workforce development`,
    respPartyLabel: `Census's American Community Survey`,
    dataSourceURL: `https://www.census.gov/programs-surveys/acs`,
    dateRange: `2015-2019`,
  },
  {
    domID: 'fema-risk',
    indicator: 'FEMA Risk Index Expected Annual Loss Score',
    description: `Average economic loss in dollars resulting from natural 
    hazards each year. It is calculated for each hazard type and quantifies 
    loss for relevant consequence types: buildings, people, and agriculture.`,
    usedIn: `?`,
    respPartyLabel: `Federal Emergency Management Agency (FEMA)`,
    dataSourceURL: `https://hazards.fema.gov/nri/expected-annual-loss`,
    dateRange: `2014-2017`,
  },
];


// Methodology Steps:
// export const METHODOLOGY_STEPS = defineMessages({
//   HEADING: {
//     id: 'methodology.steps.heading',
//     defaultMessage: `Methodology`,
//     description: 'heading of methodology section',
//   },
//   DESCRIPTION_1: {
//     id: 'methodology.steps.description.1',
//     defaultMessage: 'The methodology for identifying communities of focus is'+
//      ' calculated at the census block group level. Census block geographical boundaries'+
//      ' are determined by the U.S. Census Bureau once every ten years. This tool utilizes'+
//      ' the census block boundaries from 2010.',
//     description: 'first description text ',
//   },
//   DESCRIPTION_2: {
//     id: 'methodology.steps.description.2',
//     defaultMessage: 'The following describes the process for identifying communities of focus.',
//     description: 'second description text',
//   },
//   STEP_1_HEADING: {
//     id: 'methodology.step.1.heading',
//     defaultMessage: `Gather datasets`,
//     description: 'first step heading',
//   },
//   STEP_1_INFO: {
//     id: 'methodology.step.1.info',
//     defaultMessage: `The methodology includes the following inputs that are equally weighted.`,
//     description: 'first step info',
//   },
//   STEP_1_A_HEADING: {
//     id: 'methodology.step.1.a.heading',
//     defaultMessage: `Percent of Area Median Income`,
//     description: 'step 1 a heading',
//   },
//   STEP_1_A_INFO_1: {
//     id: 'methodology.step.1.a.info.1',
//     defaultMessage: 'If a census block group is in a metropolitan area, this value is the'+
//     ' median income of the census block group calculated as a percent of'+
//     ' the metropolitan area’s median income.',
//     description: 'step 1 a info 1',
//   },
//   STEP_1_A_INFO_2: {
//     id: 'methodology.step.1.a.info.2',
//     defaultMessage: 'If a census block group is not in a metropolitan area, this value is the'+
//     ' median income of the census block group calculated as a percent of the state’s median'+
//     ' income.',
//     description: 'step 1 a info 2',
//   },
//   STEP_1_B_HEADING: {
//     id: 'methodology.step.1.b.heading',
//     defaultMessage: `Percent of households below or at 100% of the federal poverty line`,
//     description: 'step 1 b heading',
//   },
//   STEP_1_C_HEADING: {
//     id: 'methodology.step.1.c.heading',
//     defaultMessage: `The high school degree achievement rate for adults 25 years and older`,
//     description: 'step 1 a heading',
//   },
//   STEP_1_C_INFO: {
//     id: 'methodology.step.1.c.info',
//     defaultMessage: 'The percent of individuals who are 25 or older who have received a high school degree.',
//     description: 'step 1 c info',
//   },
//   STEP_2_HEADING: {
//     id: 'methodology.step.2.heading',
//     defaultMessage: `Determine communites of focus`,
//     description: 'second step heading',
//   },
//   STEP_2_INFO: {
//     id: 'methodology.step.2.info',
//     defaultMessage: `Under the existing formula, a census block group will be considered a community of focus if:`,
//     description: 'second step info',
//   },
// });

// const FED_POVERTY_LINE_URL = 'https://www.census.gov/topics/income-poverty/poverty/guidance/poverty-measures.html';

// // Copy that has links or other HTML tags in them
// export const COMPLEX_METH_STEPS = {
//   STEP_2_B_INFO: <FormattedMessage
//     id={'methodology.steps.2.b.info'}
//     description={'Download the draft list of communities of focus and datasets used.'}
//     defaultMessage={`This is the percent of households in a state with a household income
//     below or at 100% of the {federalPovertyLine}. This federal poverty line is calculated
//     based on the composition of each household (e.g., based on household size), but it does
//     not vary geographically.`}
//     values={{
//       federalPovertyLine:
//       <a href={FED_POVERTY_LINE_URL} target="_blank" rel="noreferrer">
//         federal poverty line
//       </a>,
//     }}
//   />,
//   FORMULA: <FormattedMessage
//     id={'methodology.steps.2.formula'}
//     description={'Formala used to calculate communities of focus'}
//     defaultMessage={`{medianIncome} {or} {livingAtPovery} {and} {education}`}
//     values={{
//       medianIncome:
//         <p>
//          (The median income is less than 80% of the area median income
//         </p>,
//       or:
//         <p className={'flush'}>
//           OR
//         </p>,
//       livingAtPovery:
//         <p className={'flush'}>
//           households living in poverty (at or below 100% of the federal poverty level) is greater than 20%)
//         </p>,
//       and:
//         <p className={'flush'}>
//           AND
//         </p>,
//       education:
//         <p className={'flush'}>
//           The high school degree achievement rate for adults 25 years and older is greater than 95%
//         </p>,
//     }}
//   />,
// };
