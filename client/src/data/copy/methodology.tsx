import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';
import LinkTypeWrapper from '../../components/LinkTypeWrapper';

export const PAGE = defineMessages({
  TILE: {
    id: 'methodology.page.title.text',
    defaultMessage: 'Methodology & data',
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
      The current version of the tool identifies communities that are disadvantaged for the purposes of 
      the Justice40 Initiative using census tracts, which are the smallest geographic unit for 
      which publicly-available and nationally-consistent datasets can be consistently displayed on the 
      tool. Census tract geographical boundaries are determined by the U.S. Census Bureau once every ten 
      years. This tool utilizes the census tract boundaries from 2010 because they match the datasets used 
      in the tool. The U.S. Census Bureau will update these census tract boundaries in 2020.
    `,
    description: 'methodology page paragraph',
  },
  CATEGORY_TEXT: {
    id: 'methodology.page.categories.title',
    defaultMessage: `
      Communities are identified as disadvantaged by the current version of the tool for the purposes of 
      the Justice40 Initiative if they are located in census tracts that are at or above the 
      thresholds in one or more of eight categories of criteria below. 
    `,
    description: 'methodology page explanation of the categories',
  },

});


export const FORMULA = {
  INTRO: <FormattedMessage
    id={'methodology.page.formula.intro'}
    defaultMessage={`
      Under the current formula, a census tract will be identified as disadvantaged in one or more 
      categories of criteria: 
    `}
    description={'methodology page introducing the formula'}
    values={{
      identifiedDis: <strong>identified as disadvantaged</strong>,
    }}
  />,
  IF: <FormattedMessage
    id={'methodology.page.formula.first'}
    defaultMessage={ `
      {if} the census tract is above the threshold for one or more environmental or climate indicators
      `}
    description={'the first part of the formula used in the methodology'}
    values= {{
      if: <span>IF</span>,
    }}
  />,
  AND: <FormattedMessage
    id={'methodology.page.formula.second'}
    defaultMessage={ `
      {and} the census tract is above the threshold for the socioeconomic indicators
    `}
    description={'the second part of the formula used in the methodology'}
    values= {{
      and: <span>AND</span>,
    }}
  />,
  THEN: <FormattedMessage
    id={'methodology.page.formula.third'}
    defaultMessage={ `{then} the community is considered disadvantaged.`}
    description={'the third part of the formula used in the methodology'}
    values= {{
      then: <span>THEN</span>,
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
    id={'downloadPacket.header.text'}
    defaultMessage={`Draft communities list v{version} ({downloadFileSize} unzipped)`}
    description={'download packet header text'}
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
    id={ 'downloadPacket.info.text'}
    defaultMessage= {`
      The download package includes draft v{version} of the list of disadvantaged communities
      (.csv and .xlsx).
    `}
    description= {'download packet info text'}
    values= {{
      version: <FormattedNumber value={VERSION_NUMBER}/>,
    }}
  />,
  LAST_UPDATED: <FormattedMessage
    id={ 'downloadPacket.info.last.updated'}
    defaultMessage= {`Last updated: {downloadLastUpdated} `}
    description= {'download packet info last updated'}
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
      At or above 65th percentile  for percent of census tract population of households where household 
      income is at or below 200% of the Federal poverty level
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
  ID_AS_DISADV_TEXT: <FormattedMessage
    id={'methodology.category.card.title'}
    defaultMessage={`
      Communities are {idAsDisadv} 
    `}
    description= {'category heading'}
    values={{
      idAsDisadv: <strong>identified as disadvantaged</strong>,
    }}
  />,
};

// Category AND Clause:
export const CATEGORY_AND_CLAUSE = {
  LOW_INC_65_WHEN_HIGH_ED_LTE_20: <FormattedMessage
    id= {'methodology.paage.category.and.clause.low.inc.hs.ed'}
    defaultMessage={`
      {and} is above the 65th percentile for {lowIncome} AND at or below 20% for {highEdEnrollRate} 
    `}
    description= {'and portion of the formula dealing with lower income and high school degree rate'}
    values= {{
      and: <strong>AND</strong>,
      lowIncome: <a href="#low-income">low income</a>,
      highEdEnrollRate: <a href="#high-ed-enroll-rate">higher ed enrollment rate</a>,
    }}
  />,
  HS_DEG_90_WHEN_HIGH_ED_LTE_20: <FormattedMessage
    id= {'methodology.paage.category.and.clause.hs.ed.higher.ed'}
    defaultMessage= {`
    {and} is at or less than 90% for {highSchoolRate} for adults 25 years and older AND 
    at or below 20% for {highEdEnrollRate} 
  `}
    description= {'and portion of the formula dealing with higher ed enrollment and high school degree rate'}
    values= {{
      and: <strong>AND</strong>,
      highSchoolRate: <a href="#high-school">high school degree attainment rate</a>,
      highEdEnrollRate: <a href="#high-ed-enroll-rate">higher ed enrollment rate</a>,
    }}
  />,
};

// Indicator Categories copy constants:
export const CATEGORIES = {
  ALL: <FormattedMessage
    id= {'categories.all.used.in.text'}
    defaultMessage= {`All categories`}
    description= {'used in text for all methodologies'}
  />,
  ALL_EXCEPT_WORKFORCE: <FormattedMessage
    id= {'methodologies.all.except.workforce.used.in.text'}
    defaultMessage= {`All categories except for the training and workforce development catetory`}
    description= {'used in text for all methodologies'}
  />,
  CLIMATE_CHANGE: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.climate.change.methodology'}
      defaultMessage= {`Climate change category`}
      description= {'climate change methodology'}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.climate.change.title'}
      defaultMessage={'Climate change'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.climate.change.if'}
      defaultMessage= {`
      {if} at or above the 90th percentile for {expAgrLossRate} OR {expbuildLossRate} OR {expPopLossRate}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        expAgrLossRate: <a href="#exp-agr-loss-rate">expected agriculture loss rate</a>,
        expbuildLossRate: <a href="#exp-bld-loss-rate">expected building loss rate</a>,
        expPopLossRate: <a href="#exp-pop-loss-rate">expected population loss rate</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.climate.change.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  CLEAN_ENERGY: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.clean.energy.methodology'}
      defaultMessage= {`Clean energy and energy efficiency category`}
      description= {`Clean energy and energy efficiency methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.energy.title'}
      defaultMessage={'Clean energy and energy efficiency'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.clean.energy.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {energyCostBur} OR {pm25}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        energyCostBur: <a href='#energy-burden'>energy burden</a>,
        pm25: <a href='#pm-25'>PM2.5 in the air</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.clean.energy.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  CLEAN_TRANSPORT: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.clean.transport.methodology'}
      defaultMessage= {`Clean transit category`}
      description= {`Clean transportation methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.transport.title'}
      defaultMessage={'Clean transit'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.clean.transport.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {dieselPM} or {traffic}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        dieselPM: <a href='#diesel-pm'>diesel particulate matter exposure</a>,
        traffic: <a href='#traffic-vol'>traffic proximity and volume</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.clean.transport.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  AFFORDABLE_HOUSING: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.afford.housing.methodology'}
      defaultMessage= {`Affordable and sustainable housing category`}
      description= {`Affordable and sustainable housing methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.afford.house.title'}
      defaultMessage={'Affordable and sustainable housing'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.afford.house.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {lead} AND {medianHomeVal} is at or less than
        the 90th percentile OR at or above the 90th percentile for the {houseBur}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        lead: <a href='#lead-paint'>lead paint</a>,
        medianHomeVal: <a href='#median-home'>median home value</a>,
        houseBur: <a href='#house-burden'>housing cost burden</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.afford.house.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  LEGACY_POLLUTION: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.legacy.pollute.methodology'}
      defaultMessage= {`Reduction and remediation of legacy pollution category`}
      description= {`Reduction and remediation of legacy pollution methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.legacy.pollution.title'}
      defaultMessage={'Reduction and remediation of legacy pollution'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.legacy.pollution.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {proxHaz} OR {proxNPL} OR {proxRMP}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        proxHaz: <a href='#prox-haz'>proximity to hazardous waste facilities</a>,
        proxNPL: <a href='#prox-npl'>proximity to National Priorities List (NPL) sites</a>,
        proxRMP: <a href='#prox-rmp'>proximity to Risk Management Plan (RMP) facilities</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.legacy.pollution.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  CLEAN_WATER: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.clean.water.methodology'}
      defaultMessage= {`Critical clean water and waste infrastructure category`}
      description= {`Critical clean water and waste infrastructure methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.water.title'}
      defaultMessage={'Critical clean water and waste infrastructure'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.clean.water.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {wasteWater}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        wasteWater: <a href='#waste-water'>wastewater discharge</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.clean.water.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  HEALTH_BURDENS: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.health.burdens.methodology'}
      defaultMessage= {`Health burdens category`}
      description= {`Health burdens methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.health.burdens.title'}
      defaultMessage={'Health burdens'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.health.burdens.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {asthma} OR {diabetes} OR {heart} OR {life}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        diabetes: <a href='#diabetes'>diabetes</a>,
        asthma: <a href='#asthma'>asthma</a>,
        heart: <a href='#heart-disease'>heart disease</a>,
        life: <a href='#life-exp'>low life expectancy</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.health.burdens.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
  WORKFORCE_DEV: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.workforce.dev.methodology'}
      defaultMessage= {`Training and workforce development category`}
      description= {`Training and workforce development`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.work.dev.title'}
      defaultMessage={'Training and workforce development'}
      description= {'category title'}
    />,
    IF: <FormattedMessage
      id= {'indicator.categories.work.dev.if'}
      defaultMessage= {`
        {if} at or above the 90th percentile for {lowMedInc} as a percentage of area median income OR 
        {linIso} OR
        {unemploy} OR
        percent individuals in households at or below 100% Federal {poverty} level
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        lowMedInc: <a href='#low-med-inc'>low median income</a>,
        linIso: <a href='#ling-iso'>linguistic isolation</a>,
        unemploy: <a href='#unemploy'>unemployment</a>,
        poverty: <a href='#poverty'>poverty</a>,
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.HS_DEG_90_WHEN_HIGH_ED_LTE_20,
    // THEN: <FormattedMessage
    //   id= {'indicator.categories.work.dev.then'}
    //   defaultMessage= {'{then} the community is disadvantaged.'}
    //   description= {'then portion of the formula'}
    //   values= {{
    //     then: <strong>THEN</strong>,
    //     asterisk: <sup>*</sup>,
    //   }}
    // />,
  },
};

// Dataset section
export const DATASETS = defineMessages({
  HEADING: {
    id: 'datasetContainer.heading',
    defaultMessage: 'Datasets used in beta methodology',
    description: 'section heading of which datasets are used in cumulative score',
  },
  INFO: {
    id: 'datasetContainer.info',
    defaultMessage: `
      The datasets used in the current version of the tool come from a variety of sources and were 
      selected based on relevance, availability, and quality. The datasets seek to identify a range of 
      human health, environmental, climate-related, and other impacts on communities.
    `,
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
  SOURCE: {
    id: 'datasetCard.source',
    defaultMessage: 'Source: ',
    description: 'label associated with source of the card',
  },
  AVAILABLE_FOR: {
    id: 'datasetCard.available.for',
    defaultMessage: 'Available for: ',
    description: 'label associated with available for which regions of the card',
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
    id= {'category.source.census.link.15'}
    defaultMessage= {'{sourceCensusLink} from {date15_19}'}
    description= {'source link for Census ACS'}
    values= {{
      sourceCensusLink:
        <LinkTypeWrapper
          linkText={`American Community Survey`}
          internal={false}
          url={`https://www.census.gov/programs-surveys/acs`}
          openUrlNewTab={true}
        />,
      date15_19: DATE_RANGE.FIFETEEN_PLUS_4,
    }}
  />,
  CENSUS_ACS_10: <FormattedMessage
    id= {'category.source.census.link.10'}
    defaultMessage= {'{sourceCensusLink} from {date10}'}
    description= {'source link for Census ACS'}
    values= {{
      sourceCensusLink:
        <LinkTypeWrapper
          linkText={`American Community Survey`}
          internal={false}
          url={`https://www.census.gov/data/developers/data-sets/acs-5year/2010.html`}
          openUrlNewTab={true}
        />,
      date10: DATE_RANGE.TEN,
    }}
  />,
  FEMA_NRI: <FormattedMessage
    id= {'category.source.fema.link'}
    defaultMessage= {`{sourceFemaLink} from {date14_21}`}
    description= {'source link for FEMA'}
    values={{
      sourceFemaLink:
        <LinkTypeWrapper
          linkText={`National Risk Index`}
          internal={false}
          url={`https://hazards.fema.gov/nri/expected-annual-loss`}
          openUrlNewTab={true}
        />,
      date14_21: DATE_RANGE.FOURTEEN_PLUS_7,
    }}
  />,
  DOE_LEAD: <FormattedMessage
    id= {'category.source.doe.lead.link'}
    defaultMessage= {`{sourceDoeLeadLink} from {date18}`}
    description= {'source link for DOE FEMA'}
    values={{
      sourceDoeLeadLink:
        <LinkTypeWrapper
          linkText={`LEAD Score`}
          internal={false}
          url={`https://www.energy.gov/eere/slsc/low-income-energy-affordability-data-lead-tool`}
          openUrlNewTab={true}
        />,
      date18: DATE_RANGE.EIGHTEEN,
    }}
  />,
  EPA_OAR: <FormattedMessage
    id= {'category.source.epa.oar.link'}
    defaultMessage= {`
      {sourceEpaOarLink} from {date17} as compiled by EPA’s EJSCREEN, sourced from EPA National Air 
      Toxics Assessment (NATA) and the U.S. Department of Transportation (DOT) traffic data
    `}
    description= {'source link for EPA OAR'}
    values={{
      sourceEpaOarLink:
        <LinkTypeWrapper
          linkText={`Fusion of model and monitor data`}
          internal={false}
          url={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
          openUrlNewTab={true}
        />,
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  EPA_NATA: <FormattedMessage
    id= {'category.source.epa.nata.link'}
    defaultMessage= {`{sourceEpaOarLink} from {date14} as compiled by EPA's EJSCREEN`}
    description= {'source link for EPA NATA'}
    values={{
      sourceEpaOarLink:
        <LinkTypeWrapper
          linkText={`National Air Toxics Assessment (NATA)`}
          internal={false}
          url={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
          openUrlNewTab={true}
        />,
      date14: DATE_RANGE.FOURTEEN,
    }}
  />,
  DOT_EPA: <FormattedMessage
    id= {'category.source.dot.epa.link'}
    defaultMessage= {`{sourceDotEpaLink} from {date17} as compiled by EPA's EJSCREEN`}
    description= {'source link for DOT EPA'}
    values={{
      sourceDotEpaLink:
        <LinkTypeWrapper
          linkText={`Traffic Data`}
          internal={false}
          url={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
          openUrlNewTab={true}
        />,
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  HUD: <FormattedMessage
    id= {'category.source.hud.link'}
    defaultMessage= {`{sourceHudLink} from {date14_18}`}
    description= {'source link for HUD'}
    values={{
      sourceHudLink:
        <LinkTypeWrapper
          linkText={`Comprehensive Housing Affordability Strategy dataset`}
          internal={false}
          url={`https://www.huduser.gov/portal/datasets/cp.html`}
          openUrlNewTab={true}
        />,
      date14_18: DATE_RANGE.FOURTEEN_PLUS_4,
    }}
  />,
  EPA_TSDF: <FormattedMessage
    id= {'category.source.epa.tsdf.link'}
    defaultMessage= {`
      {sourceEpaTsdfLink} from {date20} calculated from EPA's RCRA database as compiled 
      by EPA's EJSCREEN
    `}
    description= {'source link for EPA TSDF'}
    values={{
      sourceEpaTsdfLink:
        <LinkTypeWrapper
          linkText={`Treatment, Storage, and Disposal Facilities (TSDF) data`}
          internal={false}
          url={`https://enviro.epa.gov/facts/rcrainfo/search.html`}
          openUrlNewTab={true}
        />,
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_CERCLIS: <FormattedMessage
    id= {'category.source.epa.cerclis.link'}
    defaultMessage= {`{sourceEpaCerclisLink} from {date20} as compiled by EPA’s EJSCREEN`}
    description= {'source link for EPA CERCLIS'}
    values={{
      sourceEpaCerclisLink:
        <LinkTypeWrapper
          linkText={`CERCLIS database`}
          internal={false}
          url={`https://enviro.epa.gov/facts/rcrainfo/search.html`}
          openUrlNewTab={true}
        />,
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_RMP: <FormattedMessage
    id= {'category.source.epa.rmp.link'}
    defaultMessage= {`{sourceEpaRmpLink} from {date20} as compiled by EPA’s EJSCREEN`}
    description= {'source link for EPA RMP'}
    values={{
      sourceEpaRmpLink:
        <LinkTypeWrapper
          linkText={`RMP database`}
          internal={false}
          url={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
          openUrlNewTab={true}
        />,
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_RSEI: <FormattedMessage
    id= {'category.source.epa.rsei.link'}
    defaultMessage= {`{sourceEpaRseiLink} from {date20} as compiled by EPA’s EJSCREEN`}
    description= {'source link for EPA RSEI'}
    values={{
      sourceEpaRseiLink:
        <LinkTypeWrapper
          linkText={`Risk-Screening Environmental Indicators (RSEI) Model`}
          internal={false}
          url={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
          openUrlNewTab={true}
        />,
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  CDC_PLACES: <FormattedMessage
    id= {'category.source.cdc.places.link'}
    defaultMessage= {`{sourceCdcPlacesLink} from {date16_19}`}
    description= {'source link for CDC Places'}
    values={{
      sourceCdcPlacesLink:
        <LinkTypeWrapper
          linkText={`PLACES data`}
          internal={false}
          url={`https://www.cdc.gov/places/index.html`}
          openUrlNewTab={true}
        />,
      date16_19: DATE_RANGE.SIXTEEN_PLUS_3,
    }}
  />,
  CDC_SLEEP: <FormattedMessage
    id= {'category.source.cdc.sleep.link'}
    defaultMessage= {`{sourceCdcSleepLink} from {date10_15}`}
    description= {'source link for CDC Sleep'}
    values={{
      sourceCdcSleepLink:
        <LinkTypeWrapper
          linkText={`U.S. Small-area Life Expectancy Estimates Project (USALEEP)`}
          internal={false}
          url={`https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html#data`}
          openUrlNewTab={true}
        />,
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
  indicator: string,
  description: string,
  usedIn: string,
  responsibleParty: string,
  sources: [ {
    source: string,
    availableFor: string,
  }]
};

export const INDICATORS = [
  {
    domID: 'low-income',
    indicator: 'Low income',
    description: <FormattedMessage
      id= {'category.low.income.description.text'}
      defaultMessage= {`
        Percent of a census tract's population in households where household income is at or below
        200% of the Federal poverty level.
      `}
      description= {'description text for low income'}
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
    indicator: 'Higher ed enrollment rate',
    description: <FormattedMessage
      id= {'category.high.ed.enroll.rate.description.text'}
      defaultMessage= {`
        Percent of people who are currently enrolled in college or graduate school.
      `}
      description= {'description text for low income'}
    />,
    usedIn: CATEGORIES.ALL,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'exp-agr-loss-rate',
    indicator: 'Expected agriculture loss rate',
    description: <FormattedMessage
      id= {'category.exp.agr.loss.rate.description.text'}
      defaultMessage= {`
        Percent of agriculture value at risk from losses due to fourteen types of 
        natural hazards that have some link 
        to climate change: avalanche, coastal flooding, 
        cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong 
        wind, tornado, wildfire, and winter weather. Rate calculated by dividing the agriculture value at risk in 
        a census tract by the total agriculture value in that census tract.
      `}
      description= {'description text for exp agr loss rate'}
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
    indicator: 'Expected building loss rate',
    description: <FormattedMessage
      id= {'category.exp.bld.loss.rate.description.text'}
      defaultMessage= {`
        Percent of building value at risk from losses due to fourteen types of natural hazards 
        that have some link to climate change: avalanche, coastal flooding, 
        cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong 
        wind, tornado, wildfire, and winter weather. Rate calculated by dividing the building value at risk in 
        a census tract by the total building value in that census tract.
      `}
      description= {'description text for exp bld loss rate'}
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
    indicator: 'Expected population loss rate',
    description: <FormattedMessage
      id= {'category.exp.pop.loss.rate.description.text'}
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
      description= {'description text for exp pop loss rate'}
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
    indicator: 'Energy burden',
    description: <FormattedMessage
      id= {'category.energy.burden.description.text'}
      defaultMessage= {`Average annual energy cost per household ($) divided by average household income.`}
      description= {'description text for energy burden'}
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
    indicator: 'PM2.5 in the air',
    description: <FormattedMessage
      id= {'category.pm2.5.description.text'}
      defaultMessage= {`
        Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller. The value 
        in the fields is the weight of these particles in micrograms per cubic meter.

      `}
      description= {'description text for pm 2.5'}
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
    indicator: 'Diesel particulate matter exposure',
    description: <FormattedMessage
      id= {'category.diesel.pm.description.text'}
      defaultMessage= {`
        Mixture of particles that is part of diesel exhaust in the air. The value in the fields is the 
        weight of these particles in micrograms per cubic meter. 
      `}
      description= {'description text for diesel pm'}
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
    indicator: 'Traffic proximity and volume',
    description: <FormattedMessage
      id= {'category.traffic.vol.description.text'}
      defaultMessage= {`
        Count of vehicles (average annual daily traffic) at major roads
        within 500 meters, divided by distance in meters.
      `}
      description= {'description text for traffic volume'}
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
    indicator: 'Housing cost burden',
    description: <FormattedMessage
      id= {'category.house.burden.description.text'}
      defaultMessage= {`
        Percent of households in a census tract that are both earning less than 80% of HUD Area Median
        Family Income by county and are spending more than 30% of their income on housing costs.
      `}
      description= {'description text for housing burden'}
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
    indicator: 'Lead paint',
    description: <FormattedMessage
      id= {'category.lead.paint.description.text'}
      defaultMessage= {`
        Percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in
        census tracts with median home values less than the 90th percentile.
      `}
      description= {'description text for lead paint'}
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
    indicator: 'Median home value',
    description: <FormattedMessage
      id= {'category.median.home.value.description.text'}
      defaultMessage= {`
        Median home value of owner-occupied housing units in the census tract.
       `}
      description= {'description text for lead paint'}
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
    indicator: 'Proximity to hazardous waste facilities',
    description: <FormattedMessage
      id= {'category.prox.haz.description.text'}
      defaultMessage= {`
        Count of hazardous waste facilities (Treatment, Storage, and Disposal Facilities and Large
        Quantity Generators) within 5 kilometers (or nearest beyond 5 kilometers), each divided by 
        distance in kilometers.
      `}
      description= {'description text for proximity to hazards'}
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
    indicator: 'Proximity to National Priorities List (NPL) sites',
    description: <FormattedMessage
      id= {'category.prox.npl.description.text'}
      defaultMessage= {`
        Count of proposed or listed NPL - also known as Superfund - sites within 5 kilometers (or nearest one
        beyond 5 kilometers), each divided by distance in kilometers.
        `}
      description= {'description text for proximity to npl'}
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
    indicator: 'Proximity to Risk Management Plan (RMP) facilities',
    description: <FormattedMessage
      id= {'category.prox.rmp.description.text'}
      defaultMessage= {`
        Count of RMP (potential chemical accident management plan) facilities within 5 kilometers (or nearest
        one beyond 5 kilometers), each divided by distance in kilometers.
      `}
      description= {'description text for proximity to rmp'}
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
    indicator: 'Wastewater discharge',
    description: <FormattedMessage
      id= {'category.waste.water.description.text'}
      defaultMessage= {`
        Risk-Screening Environmental Indicators (RSEI) modeled toxic concentrations at
        stream segments within 500 meters, divided by distance in kilometers.
      `}
      description= {'description text for waste water'}
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
    indicator: 'Asthma',
    description: <FormattedMessage
      id= {'category.asthma.description.text'}
      defaultMessage= {`
        Weighted percent of people who answer “yes” to both of the following questions: “Have you ever
        been told by a doctor, nurse, or other health professional that you have asthma?” and
        “Do you still have asthma?”
      `}
      description= {'description text for asthma'}
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
    indicator: 'Diabetes',
    description: <FormattedMessage
      id= {'category.diabetes.description.text'}
      defaultMessage= {`
        Weighted percent of people ages 18 years and older who report having ever been
        told by a doctor, nurse, or other health professionals that they have
        diabetes other than diabetes during pregnancy.
      `}
      description= {'description text for diabetes'}
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
    indicator: 'Heart disease',
    description: <FormattedMessage
      id= {'category.heart.disease.description.text'}
      defaultMessage= {`
        Weighted percent of people ages 18 years and older who report ever having been told
        by a doctor, nurse, or other health professionals that they had angina or
        coronary heart disease.
      `}
      description= {'description text for heart disease'}
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
    indicator: 'Low life expectancy',
    description: <FormattedMessage
      id= {'category.low.life.expectancy.description.text'}
      defaultMessage= {`
        Average number of years of life a person who has attained a given age can expect to live.
        {note}
      `}
      description= {'description text for low life expectancy'}
      values= {{
        note: <p><strong>Note:</strong>{`
          Unlike most of the other datasets, high values of this data indicate low burdens. For 
          percentile calculations of burden, the percentile is calculated in reverse order, so that the 
          census tract with the highest life expectancy relative to area life expectancy (lowest burden 
            on this measure) is at the 0th percentile, and the census tract with the lowest life 
          expectancy relative to area life expectancy (highest burden on this measure) is at the 
          100th percentile. Census tracts with the highest number have the lowest life expectancy.
        `}</p>,
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
    indicator: 'Low median income',
    description: <FormattedMessage
      id= {'category.workforce.dev.description.text'}
      defaultMessage= {`
        Median income of the census tract calculated as a percent of the area’s median income.
        {note}
      `}
      description= {'description text for workforce dev'}
      values= {{
        note: <p><strong>Note:</strong>{`
          Unlike most of the other datasets, high values of this data indicate low burdens. For 
          percentile calculations of burden, the percentile is calculated in reverse order, so that the 
          census tract with the highest median income relative to area median income (lowest burden on this 
          measure) is at the 0th percentile, and the census tract with the lowest median income relative to 
          area median income (highest burden on this measure) is at the 100th percentile. Census tracts with 
          the highest number have the lowest median income.
        `}</p>,
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
    indicator: 'Linguistic isolation',
    description: <FormattedMessage
      id= {'category.linguistic.iso.description.text'}
      defaultMessage= {`
        Percent of households where no one over the age 14 speaks English well.
      `}
      description= {'description text for linguistic isolation'}
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
    indicator: 'Unemployment',
    description: <FormattedMessage
      id= {'category.unemploy.description.text'}
      defaultMessage= {`
      Number of unemployed people as a percentage of the civilian labor force.
      `}
      description= {'description text for unemployment'}
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
    indicator: 'Poverty',
    description: <FormattedMessage
      id= {'category.poverty.description.text'}
      defaultMessage= {`
        Percent of a census tract's population in households where the household income is at or below 100% of
        the Federal poverty level.
      `}
      description= {'description text for poverty'}
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
    indicator: 'High school degree attainment rate',
    description: <FormattedMessage
      id= {'category.highschool.description.text'}
      defaultMessage= {`
        Percent of people ages 25 years or older in a census tract whose
        education level is less than a high school diploma.
      `}
      description= {'description text for highschool'}
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
    description= {'link text to return to top'}
  />,
};
