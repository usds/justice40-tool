/* eslint-disable max-len */
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';
import {boldFn, linkFn, simpleLink} from './common';

export const PAGE = defineMessages({
  TILE: {
    id: 'methodology.page.title.text',
    defaultMessage: 'Methodology & data',
    description: 'Navigate to the methodology page. This is the methodology page title text',
  },
  HEADING: {
    id: 'methodology.page.header.text',
    defaultMessage: 'Methodology',
    description: 'Navigate to the methodology page. This is the methodology page header text',
  },
  DESCRIPTION: {
    id: 'methodology.page.paragraph',
    defaultMessage: `
      The current version of the tool identifies communities that are disadvantaged for the purposes of 
      the Justice40 Initiative using census tracts, which are the smallest geographic unit for 
      which publicly-available and nationally-consistent datasets can be consistently displayed on the 
      tool. Census tract geographical boundaries are determined by the U.S. Census Bureau once every ten 
      years. This tool utilizes the census tract boundaries from 2010 because they match the datasets used 
      in the tool. The U.S. Census Bureau will update these census tract boundaries in 2020.
    `,
    description: 'Navigate to the methodology page. This is the methodology page paragraph',
  },
  CATEGORY_TEXT: {
    id: 'methodology.page.categories.title',
    defaultMessage: `
      Communities are identified as disadvantaged by the current version of the tool for the purposes of 
      the Justice40 Initiative if they are located in census tracts that are at or above the 
      thresholds in one or more of eight categories of criteria below. 
    `,
    description: 'Navigate to the methodology page. This is the methodology page explanation of the categories',
  },

});


export const FORMULA = {
  INTRO: <FormattedMessage
    id={'methodology.page.formula.intro'}
    defaultMessage={`
      Under the current formula, a census tract will be identified as disadvantaged in one or more 
      categories of criteria: 
    `}
    description={'Navigate to the methodology page. This is the methodology page introducing the formula'}
  />,
  IF: <FormattedMessage
    id={'methodology.page.formula.first'}
    defaultMessage={ `
      <boldtag>IF</boldtag> the census tract is above the threshold for one or more environmental or climate indicators
      `}
    description={'Navigate to the methodology page. This is the first part of the formula used in the methodology'}
    values= {{
      boldtag: boldFn,
    }}
  />,
  AND: <FormattedMessage
    id={'methodology.page.formula.second'}
    defaultMessage={`
      <boldtag>AND</boldtag> the census tract is above the threshold for the socioeconomic indicators
    `}
    description={'Navigate to the methodology page. This is the second part of the formula used in the methodology'}
    values= {{
      boldtag: boldFn,
    }}
  />,
};

// Download Package
export const DOWNLOAD_FILE_SIZE = 52;
export const DOWNLOAD_LAST_UPDATED = 1645180697000;
export const VERSION_NUMBER = 0.1;

export const DOWNLOAD_ZIP_URL = [
  process.env.GATSBY_CDN_TILES_BASE_URL,
  process.env.GATSBY_DATA_PIPELINE_SCORE_PATH,
  process.env.GATSBY_SCORE_DOWNLOAD_FILE_PATH,
].join('/');

export const DOWNLOAD_PACKAGE = {
  TITLE: <FormattedMessage
    id={'methodology.page.downloadPacket.header.text'}
    defaultMessage={`Draft communities list v{version} ({downloadFileSize} unzipped)`}
    description={'Navigate to the methodology page. This is the download packet header text'}
    values= {{
      version: <FormattedNumber value={VERSION_NUMBER}/>,
      downloadFileSize: <FormattedNumber
        value={DOWNLOAD_FILE_SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  DESCRIPTION: <FormattedMessage
    id={ 'methodology.page.downloadPacket.info.text'}
    defaultMessage= {`
      The download package includes draft v{version} of the list of disadvantaged communities
      (.csv and .xlsx).
    `}
    description= {'Navigate to the methodology page. This is the download packet info text'}
    values= {{
      version: <FormattedNumber value={VERSION_NUMBER}/>,
    }}
  />,
  LAST_UPDATED: <FormattedMessage
    id={ 'methodology.page.downloadPacket.info.last.updated'}
    defaultMessage= {`Last updated: {downloadLastUpdated} `}
    description= {'Navigate to the methodology page. This is the download packet info last updated'}
    values= {{
      downloadLastUpdated: <FormattedDate
        value={DOWNLOAD_LAST_UPDATED}
        year="2-digit"
        month="2-digit"
        day="2-digit"
      />,
    }}
  />,
  BUTTON_TEXT: <FormattedMessage
    id={ 'methodology.page.downloadPacket.button.text'}
    defaultMessage= {'Download package'}
    description= {'Navigate to the methodology page. This is the download packet button text'}
  />,
};

export const CATEGORY= {
  HEADING: <FormattedMessage
    id={'methodology.page.indicator.categories.heading'}
    defaultMessage={'Categories'}
    description= {'Navigate to the methodology page. Navigate to the category section. This is category heading'}
  />,
  ID_AS_DISADV_TEXT: <FormattedMessage
    id={'methodology.page.category.card.title'}
    defaultMessage={`
      Communities are <boldtag>identified as disadvantaged</boldtag>
    `}
    description= {'Navigate to the methodology page. Navigate to the category section. This is category heading'}
    values={{
      boldtag: boldFn,
    }}
  />,
};

// Category AND Clause:
export const CATEGORY_AND_CLAUSE = {
  LOW_INC_65_WHEN_HIGH_ED_LTE_20: <FormattedMessage
    id= {'methodology.page.category.and.clause.low.inc.hs.ed'}
    defaultMessage={`
      <boldtag>AND</boldtag> is above the 65th percentile for <link1>low income</link1> AND 80% or more adults 15 or older are not enrolled in <link2>higher education</link2> 
    `}
    description= {'Navigate to the methodology page. Navigate to the category section. This is category portion of the formula dealing with lower income and high school degree rate'}
    values= {{
      boldtag: boldFn,
      link1: simpleLink('#low-income'),
      link2: simpleLink('#high-ed-enroll-rate'),
    }}
  />,
  HS_DEG_90_WHEN_HIGH_ED_LTE_20: <FormattedMessage
    id= {'methodology.page.category.and.clause.hs.ed.higher.ed'}
    defaultMessage= {`<boldtag>AND</boldtag> 10% or more of adults 25 or older have not attained a <link1>high school degree</link1> AND 80% or more of adults 15 or older are not enrolled in <link2>higher education</link2> 
  `}
    description= {'Navigate to the methodology page. Navigate to the category section. This is the portion of the formula dealing with higher ed enrollment and high school degree rate'}
    values= {{
      boldtag: boldFn,
      link1: simpleLink('#high-school'),
      link2: simpleLink('#high-ed-enroll-rate'),
    }}
  />,
};

// Indicator Categories copy constants:
export const CATEGORIES = {
  ALL: <FormattedMessage
    id= {'methodology.page.datasets.all.used.in.text'}
    defaultMessage= {`All categories`}
    description= {'Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card Used In text for all methodologies'}
  />,
  ALL_EXCEPT_WORKFORCE: <FormattedMessage
    id= {'methodology.page.datasets.all.except.workforce.used.in.text'}
    defaultMessage= {`All categories except for the training and workforce development catetory`}
    description= {'Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card Used In text for all methodologies except the workforce development'}
  />,
  CLIMATE_CHANGE: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.climate.change.methodology'}
      defaultMessage= {`Climate change category`}
      description= {'Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the climate change methodology'}
    />,
    TITLE: <FormattedMessage
      id={'methodology.page.indicator.categories.climate.change.title'}
      defaultMessage={'Climate change'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.climate.change.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>expected agriculture loss rate</link1> OR <link2>expected building loss rate</link2> OR <link3>expected population loss rate</link3>`}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#exp-agr-loss-rate'),
        link2: simpleLink('#exp-bld-loss-rate'),
        link3: simpleLink('#exp-pop-loss-rate'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  CLEAN_ENERGY: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.clean.energy.methodology'}
      defaultMessage= {`Clean energy and energy efficiency category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Clean energy and energy efficiency methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.energy.title'}
      defaultMessage={'Clean energy and energy efficiency'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.clean.energy.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>energy burden</link1> OR <link2>PM2.5 in the air</link2>`}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#energy-burden'),
        link2: simpleLink('#pm-25'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  CLEAN_TRANSPORT: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.clean.transport.methodology'}
      defaultMessage= {`Clean transit category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Clean transportation methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.transport.title'}
      defaultMessage={'Clean transit'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.clean.transport.if'}
      defaultMessage= {`
        <boldtag>IF</boldtag> at or above the 90th percentile for <link1>diesel particulate matter exposure</link1> or <link2>traffic proximity and volume</link2>
      `}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#diesel-pm'),
        link2: simpleLink('#traffic-vol'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  AFFORDABLE_HOUSING: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.afford.housing.methodology'}
      defaultMessage= {`Affordable and sustainable housing category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Affordable and sustainable housing methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.afford.house.title'}
      defaultMessage={'Affordable and sustainable housing'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.afford.house.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>lead paint</link1> AND <link2>median home value</link2> is at or less than the 90th percentile OR at or above the 90th percentile for the <link3>housing cost burden</link3>`}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#lead-paint'),
        link2: simpleLink('#median-home'),
        link3: simpleLink('#house-burden'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  LEGACY_POLLUTION: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.legacy.pollute.methodology'}
      defaultMessage= {`Reduction and remediation of legacy pollution category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Reduction and remediation of legacy pollution methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.legacy.pollution.title'}
      defaultMessage={'Reduction and remediation of legacy pollution'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.legacy.pollution.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>proximity to hazardous waste facilities</link1> OR <link2>proximity to National Priorities List (NPL) sites</link2> OR <link3>proximity to Risk Management Plan (RMP) facilities</link3>`}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#prox-haz'),
        link2: simpleLink('#prox-npl'),
        link3: simpleLink('#prox-rmp'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  CLEAN_WATER: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.clean.water.methodology'}
      defaultMessage= {`Critical clean water and waste infrastructure category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Critical clean water and waste infrastructure methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.water.title'}
      defaultMessage={'Critical clean water and waste infrastructure'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.clean.water.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>wastewater discharge</link1>`}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#waste-water'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  HEALTH_BURDENS: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.health.burdens.methodology'}
      defaultMessage= {`Health burdens category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Health burdens methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.health.burdens.title'}
      defaultMessage={'Health burdens'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.health.burdens.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>asthma</link1> OR <link2>diabetes</link2> OR <link3>heart disease</link3> OR <link4>low life expectancy</link4>`}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#asthma'),
        link2: simpleLink('#diabetes'),
        link3: simpleLink('#heart-disease'),
        link4: simpleLink('#life-exp'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
  },
  WORKFORCE_DEV: {
    METHODOLOGY: <FormattedMessage
      id= {'methodology.page.indicator.categories.workforce.dev.methodology'}
      defaultMessage= {`Training and workforce development category`}
      description= {`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Training and workforce development`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.work.dev.title'}
      defaultMessage={'Training and workforce development'}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id= {'methodology.page.indicator.categories.work.dev.if'}
      defaultMessage= {`<boldtag>IF</boldtag> at or above the 90th percentile for <link1>low median income</link1> as a percentage of area median income OR <link2>linguistic isolation</link2> OR <link3>unemployment</link3> OR percent individuals in households at or below 100% Federal <link4>poverty</link4> level
      `}
      description= {'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values= {{
        boldtag: boldFn,
        link1: simpleLink('#low-med-inc'),
        link2: simpleLink('#ling-iso'),
        link3: simpleLink('#unemploy'),
        link4: simpleLink('#poverty'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.HS_DEG_90_WHEN_HIGH_ED_LTE_20,
  },
};

// Dataset section
export const DATASETS = defineMessages({
  HEADING: {
    id: 'methodology.page.datasetContainer.heading',
    defaultMessage: 'Datasets used in beta methodology',
    description: 'Navigate to the Methodology page. This is the section heading of which datasets are used in cumulative score',
  },
  INFO: {
    id: 'methodology.page.datasetContainer.info',
    defaultMessage: `
      The datasets used in the current version of the tool come from a variety of sources and were 
      selected based on relevance, availability, and quality. The datasets seek to identify a range of 
      human health, environmental, climate-related, and other impacts on communities.
    `,
    description: 'Navigate to the Methodology page. This is the description of the dataset section',
  },
  ADDITIONAL_HEADING: {
    id: 'methodology.page.datasetContainer.additional.heading',
    defaultMessage: 'Additional Indicators',
    description: 'Navigate to the Methodology page. This is the additional indicators heading',
  },
  ADDITIONAL_INFO: {
    id: 'methodology.page.datasetContainer.additional.info',
    defaultMessage: 'These datasets provide additional information about each community.',
    description: 'Navigate to the Methodology page. This is the additional indicator info',
  },
});

export const DATASET_CARD_LABELS = defineMessages({
  USED_IN: {
    id: 'methodology.page.datasetCard.used.in',
    defaultMessage: 'Used in: ',
    description: 'Navigate to the Methodology page. This is the label associated with explaining the card',
  },
  RESP_PARTY: {
    id: 'methodology.page.datasetCard.responsible.party',
    defaultMessage: 'Responsible Party: ',
    description: 'Navigate to the Methodology page. This is the label associated with explaining the card',
  },
  DATE_RANGE: {
    id: 'methodology.page.datasetCard.date.range',
    defaultMessage: 'Date range: ',
    description: 'Navigate to the Methodology page. This is the label associated with explaining the card',
  },
  SOURCE: {
    id: 'methodology.page.datasetCard.source',
    defaultMessage: 'Source: ',
    description: 'Navigate to the Methodology page. This is the label associated with source of the card',
  },
  AVAILABLE_FOR: {
    id: 'methodology.page.datasetCard.available.for',
    defaultMessage: 'Available for: ',
    description: 'Navigate to the Methodology page. This is the label associated with available for which regions of the card',
  },
});

export const DATE_RANGE = {
  TEN: '2010',
  TEN_PLUS_5: '2010-2015',
  FOURTEEN: '2014',
  FOURTEEN_PLUS_4: '2014-2018',
  FOURTEEN_PLUS_7: '2014-2021',
  FIFETEEN_PLUS_4: '2015-2019',
  SIXTEEN_PLUS_3: '2016-2019',
  SIXTEEN_PLUS_4: '2016-2020',
  SEVENTEEN: '2017',
  EIGHTEEN: '2018',
  TWENTY: '2020',
};

export const RESPONSIBLE_PARTIES = {
  CDC: `Centers for Disease Control and Prevention (CDC)`,
  CENSUS: `Census`,
  DOE: `Department of Energy (DOE)`,
  DOT: `Department of Transportation (DOT)`,
  EPA: `Environmental Protection Agency (EPA)`,
  EPA_OAR: `Environmental Protection Agency (EPA) Office of Air and Radiation (OAR)`,
  FEMA: `Federal Emergency Management Agency (FEMA)`,
  HUD: `Department of Housing & Urban Development (HUD)`,
};

export const SOURCE_LINKS = {
  CENSUS_ACS_15_19: <FormattedMessage
    id= {'methodology.page.category.source.census.link.15'}
    defaultMessage= {'<link1>American Community Survey</link1> from {date15_19}'}
    description= {'Navigate to the Methodology page. This is the source link for Census ACS'}
    values= {{
      link1: linkFn('https://www.census.gov/programs-surveys/acs', false, true),
      date15_19: DATE_RANGE.FIFETEEN_PLUS_4,
    }}
  />,
  CENSUS_ACS_10: <FormattedMessage
    id= {'methodology.page.category.source.census.link.10'}
    defaultMessage= {'<link1>American Community Survey</link1> from {date10}'}
    description= {'Navigate to the Methodology page. This is the source link for Census ACS'}
    values= {{
      link1: linkFn('https://www.census.gov/data/developers/data-sets/acs-5year/2010.html', false, true),
      date10: DATE_RANGE.TEN,
    }}
  />,
  FEMA_NRI: <FormattedMessage
    id= {'methodology.page.category.source.fema.link'}
    defaultMessage= {`<link1>National Risk Index</link1> from {date14_21}`}
    description= {'Navigate to the Methodology page. This is the source link for FEMA'}
    values={{
      link1: linkFn('https://hazards.fema.gov/nri/expected-annual-loss', false, true),
      date14_21: DATE_RANGE.FOURTEEN_PLUS_7,
    }}
  />,
  DOE_LEAD: <FormattedMessage
    id= {'methodology.page.category.source.doe.lead.link'}
    defaultMessage= {`<link1>LEAD Score</link1> from {date18}`}
    description= {'Navigate to the Methodology page. This is the source link for DOE FEMA'}
    values={{
      link1: linkFn('https://www.energy.gov/eere/slsc/low-income-energy-affordability-data-lead-tool', false, true),
      date18: DATE_RANGE.EIGHTEEN,
    }}
  />,
  EPA_OAR: <FormattedMessage
    id= {'methodology.page.category.source.epa.oar.link'}
    defaultMessage= {`<link1>Fusion of model and monitor data</link1> from {date17} as compiled by EPA’s EJSCREEN, sourced from EPA National Air Toxics Assessment (NATA) and the U.S. Department of Transportation (DOT) traffic data
    `}
    description= {'Navigate to the Methodology page. This is the source link for EPA OAR'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  EPA_NATA: <FormattedMessage
    id= {'methodology.page.category.source.epa.nata.link'}
    defaultMessage= {`<link1>National Air Toxics Assessment (NATA)</link1> from {date14} as compiled by EPA's EJSCREEN`}
    description= {'Navigate to the Methodology page. This is the source link for EPA NATA'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date14: DATE_RANGE.FOURTEEN,
    }}
  />,
  DOT_EPA: <FormattedMessage
    id= {'methodology.page.category.source.dot.epa.link'}
    defaultMessage= {`<link1>Traffic Data</link1> from {date17} as compiled by EPA's EJSCREEN`}
    description= {'Navigate to the Methodology page. This is the source link for DOT EPA'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  HUD: <FormattedMessage
    id= {'methodology.page.category.source.hud.link'}
    defaultMessage= {`<link1>Comprehensive Housing Affordability Strategy dataset</link1> from {date14_18}`}
    description= {'Navigate to the Methodology page. This is the source link for HUD'}
    values={{
      link1: linkFn('https://www.huduser.gov/portal/datasets/cp.html', false, true),
      date14_18: DATE_RANGE.FOURTEEN_PLUS_4,
    }}
  />,
  EPA_TSDF: <FormattedMessage
    id= {'methodology.page.category.source.epa.tsdf.link'}
    defaultMessage= {`
      <link1>Treatment, Storage, and Disposal Facilities (TSDF) data</link1> from {date20} calculated from EPA's RCRA database as compiled 
      by EPA's EJSCREEN
    `}
    description= {'Navigate to the Methodology page. This is the source link for EPA TSDF'}
    values={{
      link1: linkFn('https://enviro.epa.gov/facts/rcrainfo/search.html', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_CERCLIS: <FormattedMessage
    id= {'methodology.page.category.source.epa.cerclis.link'}
    defaultMessage= {`<link1>CERCLIS database</link1> from {date20} as compiled by EPA’s EJSCREEN`}
    description= {'Navigate to the Methodology page. This is the source link for EPA CERCLIS'}
    values={{
      link1: linkFn('https://enviro.epa.gov/facts/rcrainfo/search.html', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_RMP: <FormattedMessage
    id= {'methodology.page.category.source.epa.rmp.link'}
    defaultMessage= {`<link1>RMP database</link1> from {date20} as compiled by EPA’s EJSCREEN`}
    description= {'Navigate to the Methodology page. This is the source link for EPA RMP'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_RSEI: <FormattedMessage
    id= {'methodology.page.category.source.epa.rsei.link'}
    defaultMessage= {`<link1>Risk-Screening Environmental Indicators (RSEI) Model</link1> from {date20} as compiled by EPA’s EJSCREEN`}
    description= {'Navigate to the Methodology page. This is the source link for EPA RSEI'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  CDC_PLACES: <FormattedMessage
    id= {'methodology.page.category.source.cdc.places.link'}
    defaultMessage= {`<link1>PLACES data</link1> from {date16_19}`}
    description= {'Navigate to the Methodology page. This is the source link for CDC Places'}
    values={{
      link1: linkFn('https://www.cdc.gov/places/index.html', false, true),
      date16_19: DATE_RANGE.SIXTEEN_PLUS_3,
    }}
  />,
  CDC_SLEEP: <FormattedMessage
    id= {'methodology.page.category.source.cdc.sleep.link'}
    defaultMessage= {`<link1>U.S. Small-area Life Expectancy Estimates Project (USALEEP)</link1> from {date10_15}`}
    description= {'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html#data', false, true),
      date10_15: DATE_RANGE.TEN_PLUS_5,
    }}
  />,
};

export const AVAILABLE_FOR = {
  ALL_US_DC: `All U.S. states and the District of Columbia`,
  ALL_US_DC_PR: `All U.S. states, the District of Columbia, and Puerto Rico`,
  AS_NMI: `American Samoa and the Northern Mariana Islands`,
};

export interface IIndicators {
  domID: string,
  indicator: JSX.Element,
  description: JSX.Element,
  note?: JSX.Element,
  usedIn: JSX.Element,
  responsibleParty: string,
  sources: [ {
    source: JSX.Element,
    availableFor: string,
  }]
};

export const INDICATORS = [
  {
    domID: 'low-income',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.low.income.title.text'}
      defaultMessage= {`Low income`}
      description= {'Navigate to the Methodology page. This is the title text for the low income dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.low.income.description.text'}
      defaultMessage= {`
        Percent of a census tract's population in households where household income is at or below
        200% of the Federal poverty level.
      `}
      description= {'Navigate to the Methodology page. This is the description text for low income'}
    />,
    usedIn: CATEGORIES.ALL_EXCEPT_WORKFORCE,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'high-ed-enroll-rate',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.high.ed.enroll.title.text'}
      defaultMessage= {`Higher education non-enrollment`}
      description= {'Navigate to the Methodology page. This is the title text for the high ed enrollment dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.high.ed.enroll.rate.description.text'}
      defaultMessage= {`
        Percent of people 15 or older who are not currently enrolled in college, university, or graduate school.
      `}
      description= {'Navigate to the Methodology page. This is the description text for high ed enrollment'}
    />,
    usedIn: CATEGORIES.ALL,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'exp-agr-loss-rate',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.expected.ag.loss.title.text'}
      defaultMessage= {`Expected agriculture loss rate`}
      description= {'Navigate to the Methodology page. This is the title text for the expected agr loss rate income dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.exp.agr.loss.rate.description.text'}
      defaultMessage= {`
        Percent of agriculture value at risk from losses due to fourteen types of 
        natural hazards that have some link 
        to climate change: avalanche, coastal flooding, 
        cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong 
        wind, tornado, wildfire, and winter weather. Rate calculated by dividing the agriculture value at risk in 
        a census tract by the total agriculture value in that census tract.
      `}
      description= {'Navigate to the Methodology page. This is the description text for exp agr loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FEMA,
    sources: [
      {
        source: SOURCE_LINKS.FEMA_NRI,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'exp-bld-loss-rate',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.exp.bld.loss.title.text'}
      defaultMessage= {`Expected building loss rate`}
      description= {'Navigate to the Methodology page. This is the title text for the exp bld loss income dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.exp.bld.loss.rate.description.text'}
      defaultMessage= {`
        Percent of building value at risk from losses due to fourteen types of natural hazards 
        that have some link to climate change: avalanche, coastal flooding, 
        cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong 
        wind, tornado, wildfire, and winter weather. Rate calculated by dividing the building value at risk in 
        a census tract by the total building value in that census tract.
      `}
      description= {'Navigate to the Methodology page. This is the description text for exp bld loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FEMA,
    sources: [
      {
        source: SOURCE_LINKS.FEMA_NRI,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'exp-pop-loss-rate',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.exp.pop.loss.title.text'}
      defaultMessage= {`Expected population loss rate`}
      description= {'Navigate to the Methodology page. This is the title text for the exp pop loss income dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.exp.pop.loss.rate.description.text'}
      defaultMessage= {`
        Rate relative to the population of fatalities and injuries due to fourteen types of
        natural hazards each year
        that have some link to climate change: avalanche, 
        coastal flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, 
        riverine flooding, strong wind, tornado, wildfire, and winter weather. Population loss is defined 
        as the Spatial Hazard Events and Losses or National Centers for Environmental Information’s 
        (NCEI) reported number of fatalities and injuries caused by the hazard occurrence. To 
        combine fatalities and injuries for the computation of population loss value, an injury is counted 
        as one-tenth (1/10) of a fatality. The NCEI Storm Events Database classifies injuries and fatalities 
        as direct or indirect. Both direct and indirect injuries and fatalities are counted as population 
        loss. This total number of injuries and fatalities is then divided by the population in the 
        census tract to get a per-capita rate of population risk. 
      `}
      description= {'Navigate to the Methodology page. This is the description text for exp pop loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FEMA,
    sources: [
      {
        source: SOURCE_LINKS.FEMA_NRI,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'energy-burden',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.energy.burden.title.text'}
      defaultMessage= {`Energy burden`}
      description= {'Navigate to the Methodology page. This is the title text for the energy burden dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.energy.burden.description.text'}
      defaultMessage= {`Average annual energy cost per household ($) divided by average household income.`}
      description= {'Navigate to the Methodology page. This is the description text for energy burden'}
    />,
    usedIn: CATEGORIES.CLEAN_ENERGY.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOE,
    sources: [
      {
        source: SOURCE_LINKS.DOE_LEAD,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'pm-25',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.pm25.title.text'}
      defaultMessage= {`PM2.5 in the air`}
      description= {'Navigate to the Methodology page. This is the title text for the pm25 dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.pm2.5.description.text'}
      defaultMessage= {`
        Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller. The value 
        in the fields is the weight of these particles in micrograms per cubic meter.

      `}
      description= {'Navigate to the Methodology page. This is the description text for pm 2.5'}
    />,
    usedIn: CATEGORIES.CLEAN_ENERGY.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_OAR,
    sources: [
      {
        source: SOURCE_LINKS.EPA_OAR,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'diesel-pm',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.diesel.pm.title.text'}
      defaultMessage= {`Diesel particulate matter exposure`}
      description= {'Navigate to the Methodology page. This is the title text for the diesel pm dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.diesel.pm.description.text'}
      defaultMessage= {`
        Mixture of particles that is part of diesel exhaust in the air. The value in the fields is the 
        weight of these particles in micrograms per cubic meter. 
      `}
      description= {'Navigate to the Methodology page. This is the description text for diesel pm'}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_NATA,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'traffic-vol',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.traffic.volume.title.text'}
      defaultMessage= {`Traffic proximity and volume`}
      description= {'Navigate to the Methodology page. This is the title text for the traffic.volume dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.traffic.vol.description.text'}
      defaultMessage= {`
        Count of vehicles (average annual daily traffic) at major roads
        within 500 meters, divided by distance in meters.
      `}
      description= {'Navigate to the Methodology page. This is the description text for traffic volume'}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOT,
    sources: [
      {
        source: SOURCE_LINKS.DOT_EPA,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'house-burden',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.house.burden.title.text'}
      defaultMessage= {`Housing cost burden`}
      description= {'Navigate to the Methodology page. This is the title text for the house burden dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.house.burden.description.text'}
      defaultMessage= {`
        Percent of households in a census tract that are both earning less than 80% of HUD Area Median
        Family Income by county and are spending more than 30% of their income on housing costs.
      `}
      description= {'Navigate to the Methodology page. This is the description text for housing burden'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.HUD,
    sources: [
      {
        source: SOURCE_LINKS.HUD,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'lead-paint',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.lead.paint.title.text'}
      defaultMessage= {`Lead paint`}
      description= {'Navigate to the Methodology page. This is the title text for the lead paint dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.lead.paint.description.text'}
      defaultMessage= {`
        Percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in
        census tracts with median home values less than the 90th percentile.
      `}
      description= {'Navigate to the Methodology page. This is the description text for lead paint'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'median-home',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.median.home.title.text'}
      defaultMessage= {`Median home value`}
      description= {'Navigate to the Methodology page. This is the title text for the median home dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.median.home.value.description.text'}
      defaultMessage= {`
        Median home value of owner-occupied housing units in the census tract.
       `}
      description= {'Navigate to the Methodology page. This is the description text for lead paint'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'prox-haz',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.prox.haz.title.text'}
      defaultMessage= {`Proximity to hazardous waste facilities`}
      description= {'Navigate to the Methodology page. This is the title text for the prox haz dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.prox.haz.description.text'}
      defaultMessage= {`
        Count of hazardous waste facilities (Treatment, Storage, and Disposal Facilities and Large
        Quantity Generators) within 5 kilometers (or nearest beyond 5 kilometers), each divided by 
        distance in kilometers.
      `}
      description= {'Navigate to the Methodology page. This is the description text for proximity to hazards'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_TSDF,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'prox-npl',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.prox.npl.title.text'}
      defaultMessage= {`Proximity to National Priorities List (NPL) sites`}
      description= {'Navigate to the Methodology page. This is the title text for the prox npl dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.prox.npl.description.text'}
      defaultMessage= {`
        Count of proposed or listed NPL - also known as Superfund - sites within 5 kilometers (or nearest one
        beyond 5 kilometers), each divided by distance in kilometers.
        `}
      description= {'Navigate to the Methodology page. This is the description text for proximity to npl'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_CERCLIS,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'prox-rmp',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.prox.rpm.title.text'}
      defaultMessage= {`Proximity to Risk Management Plan (RMP) facilities`}
      description= {'Navigate to the Methodology page. This is the title text for the prox rpm dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.prox.rmp.description.text'}
      defaultMessage= {`
        Count of RMP (potential chemical accident management plan) facilities within 5 kilometers (or nearest
        one beyond 5 kilometers), each divided by distance in kilometers.
      `}
      description= {'Navigate to the Methodology page. This is the description text for proximity to rmp'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_RMP,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'waste-water',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.waste.water.title.text'}
      defaultMessage= {`Wastewater discharge`}
      description= {'Navigate to the Methodology page. This is the title text for the waste water dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.waste.water.description.text'}
      defaultMessage= {`
        Risk-Screening Environmental Indicators (RSEI) modeled toxic concentrations at
        stream segments within 500 meters, divided by distance in kilometers.
      `}
      description= {'Navigate to the Methodology page. This is the description text for waste water'}
    />,
    usedIn: CATEGORIES.CLEAN_WATER.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_RSEI,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'asthma',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.asthma.title.text'}
      defaultMessage= {`Asthma`}
      description= {'Navigate to the Methodology page. This is the title text for the asthma dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.asthma.description.text'}
      defaultMessage= {`
        Weighted percent of people who answer “yes” to both of the following questions: “Have you ever
        been told by a doctor, nurse, or other health professional that you have asthma?” and
        “Do you still have asthma?”
      `}
      description= {'Navigate to the Methodology page. This is the description text for asthma'}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC,
    sources: [
      {
        source: SOURCE_LINKS.CDC_PLACES,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'diabetes',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.diabetes.title.text'}
      defaultMessage= {`Diabetes`}
      description= {'Navigate to the Methodology page. This is the title text for the diabetes dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.diabetes.description.text'}
      defaultMessage= {`
        Weighted percent of people ages 18 years and older who report having ever been
        told by a doctor, nurse, or other health professionals that they have
        diabetes other than diabetes during pregnancy.
      `}
      description= {'Navigate to the Methodology page. This is the description text for diabetes'}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC,
    sources: [
      {
        source: SOURCE_LINKS.CDC_PLACES,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'heart-disease',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.heart.disease.title.text'}
      defaultMessage= {`Heart disease`}
      description= {'Navigate to the Methodology page. This is the title text for the heart disease dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.heart.disease.description.text'}
      defaultMessage= {`
        Weighted percent of people ages 18 years and older who report ever having been told
        by a doctor, nurse, or other health professionals that they had angina or
        coronary heart disease.
      `}
      description= {'Navigate to the Methodology page. This is the description text for heart disease'}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC,
    sources: [
      {
        source: SOURCE_LINKS.CDC_PLACES,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'life-exp',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.life.exp.title.text'}
      defaultMessage= {`Low life expectancy`}
      description= {'Navigate to the Methodology page. This is the title text for the life exp dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.low.life.expectancy.description.text'}
      defaultMessage= {`
        Average number of years of life a person who has attained a given age can expect to live.
      `}
      description= {'Navigate to the Methodology page. This is the description text for low life expectancy'}
    />,
    note: <FormattedMessage
      id= {'methodology.page.category.low.life.expectancy.note.text'}
      defaultMessage= {`
        <boldtag>Note: </boldtag>The percentiles for this dataset have been reversed so that census tracts with lower numbers have higher life expectancies and the census tracts with higher numbers have lower life expectancy when compared to life expectancy in the area.
      `}
      description= {'Navigate to the Methodology page. This is the note text for low life expectancy'}
      values= {{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC,
    sources: [
      {
        source: SOURCE_LINKS.CDC_SLEEP,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'low-med-inc',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.low.median.income.title.text'}
      defaultMessage= {`Low median income`}
      description= {'Navigate to the Methodology page. This is the title text for the low median income dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.workforce.dev.description.text'}
      defaultMessage= {`
        Median income of the census tract calculated as a percent of the area’s median income.
      `}
      description= {'Navigate to the Methodology page. This is the description text for workforce dev'}
    />,
    note: <FormattedMessage
      id= {'methodology.page.category.low.median.expectancy.note.text'}
      defaultMessage= {`
        <boldtag>Note: </boldtag>The percentiles for this dataset have been reversed so that census tracts with lower numbers have higher median incomes and census tracts with the higher numbers have lower median income when compared to area median income.
      `}
      description= {'Navigate to the Methodology page. This is the note text for low median expectancy'}
      values= {{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
      {
        source: SOURCE_LINKS.CENSUS_ACS_10,
        availableFor: AVAILABLE_FOR.AS_NMI,
      },
    ],
  },
  {
    domID: 'ling-iso',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.ling.iso.title.text'}
      defaultMessage= {`Linguistic isolation`}
      description= {'Navigate to the Methodology page. This is the title text for the linguistic isolation dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.linguistic.iso.description.text'}
      defaultMessage= {`
        Percent of households where no one over the age 14 speaks English well.
      `}
      description= {'Navigate to the Methodology page. This is the description text for linguistic isolation'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'unemploy',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.unemploy.title.text'}
      defaultMessage= {`Unemployment`}
      description= {'Navigate to the Methodology page. This is the title text for the unemployment dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.unemploy.description.text'}
      defaultMessage= {`
      Number of unemployed people as a percentage of the civilian labor force.
      `}
      description= {'Navigate to the Methodology page. This is the description text for unemployment'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
      {
        source: SOURCE_LINKS.CENSUS_ACS_10,
        availableFor: AVAILABLE_FOR.AS_NMI,
      },
    ],
  },
  {
    domID: 'poverty',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.poverty.title.text'}
      defaultMessage= {`Poverty`}
      description= {'Navigate to the Methodology page. This is the title text for the poverty dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.poverty.description.text'}
      defaultMessage= {`
        Percent of a census tract's population in households where the household income is at or below 100% of
        the Federal poverty level.
      `}
      description= {'Navigate to the Methodology page. This is the description text for poverty'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
      {
        source: SOURCE_LINKS.CENSUS_ACS_10,
        availableFor: AVAILABLE_FOR.AS_NMI,
      },
    ],
  },
  {
    domID: 'high-school',
    indicator: <FormattedMessage
      id= {'methodology.page.dataset.indicator.high.school.title.text'}
      defaultMessage= {`High school degree non-attainment`}
      description= {'Navigate to the Methodology page. This is the title text for the high school dataset'}
    />,
    description: <FormattedMessage
      id= {'methodology.page.category.highschool.description.text'}
      defaultMessage= {`
        Percent of people age 25 years or older in a census tract whose education level is less than a high school diploma.
      `}
      description= {'Navigate to the Methodology page. This is the description text for high school'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
      {
        source: SOURCE_LINKS.CENSUS_ACS_10,
        availableFor: AVAILABLE_FOR.AS_NMI,
      },
    ],
    isPercent: true,
  },
];

export const RETURN_TO_TOP = {
  LINK: <FormattedMessage
    id={'methodology.page.return.to.top.link'}
    defaultMessage={'Return to top'}
    description= {'Navigate to the Methodology page. This is the link text to return to top'}
  />,
};
