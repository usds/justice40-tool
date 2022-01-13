import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage} from 'gatsby-plugin-intl';

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
      This tool identifies communities that are overburdened by pollution and other environmental exposures 
      and disadvantaged by underinvestment. A community qualifies as disadvantaged when a census tract 
      is at or above a certain threshold for a climate or environmental burden indicator and also above 
      a certain threshold for a socioeconomic indicator. Census tract geographical boundaries are 
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
    Communities will be defined as disadvantaged for the purposes of Justice40 if they meet
     the qualifications under one or more of the eight categories of criteria below.
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
export const DOWNLOAD_FILE_SIZE = '73MB';
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
    defaultMessage={`Draft communities list v{versionNumber} ({downloadFileSize})`}
    description={'download packet header text'}
    values= {{
      versionNumber: VERSION_NUMBER,
      downloadFileSize: DOWNLOAD_FILE_SIZE,
    }}
  />,
  DESCRIPTION: <FormattedMessage
    id={ 'downloadPacket.info.text'}
    defaultMessage= {`
      The download package includes draft v{versionNumber} of the list of disadvantaged communities
      (.csv and .xlsx) and information (.pdf) about how to use the list.
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
      At or above 65th percentile  for percent of census tract population of households where household 
      income is at or below 200% of the federal poverty level
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


// Indicator Categories copy constants:
export const CATEGORIES = {
  ALL: {
    METHODOLOGY:
      <FormattedMessage
        id= {'methodologies.all.used.in.text'}
        defaultMessage= {`All methodologies except for training and workforce development`}
        description= {'used in text for all methodologies'}
      />,
  },
  CLIMATE_CHANGE: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.climate.change.methodology'}
      defaultMessage= {`Climate change methodology`}
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
      {if} at or above 90th percentile for {expAgrLossRate} OR {expbuildLossRate} OR {expPopLossRate}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        expAgrLossRate: <a href="#exp-agr-loss-rate">expected agriculture loss rate</a>,
        expbuildLossRate: <a href="#exp-bld-loss-rate">expected building loss rate</a>,
        expPopLossRate: <a href="#exp-pop-loss-rate">expected population loss rate</a>,
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
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.climate.change.methodology'}
      defaultMessage= {`Clean energy and energy efficiency methodology`}
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
        {if} at or above 90th percentile for {energyCostBur} score OR {pm25}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        energyCostBur: <a href='#energy-burden'>energy cost burden</a>,
        pm25: <a href='#pm-25'>PM2.5 in the air</a>,
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
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.clean.transport.methodology'}
      defaultMessage= {`Clean transportation methodology`}
      description= {`Clean transportation methodology`}
    />,
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
        dieselPM: <a href='#diesel-pm'>diesel particulate matter exposure</a>,
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
  AFFORDABLE_HOUSING: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.afford.housing.methodology'}
      defaultMessage= {`Affordable and sustainable housing methodology`}
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
        {if} at or above 90th percentile for {lead} AND {medianHomeVal} is at or less than
        90th percentile OR at or above the 90th percentile for the {houseBur}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        lead: <a href='#lead-paint'>lead paint</a>,
        medianHomeVal: <a href='#median-home'>low median home value</a>,
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
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.legacy.pollute.methodology'}
      defaultMessage= {`Reduction and remediation of legacy pollution methodology`}
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
        {if} at or above 90th percentile for {proxHaz} OR {proxNPL} OR {proxRMP}
      `}
      description= {'if portion of the formula'}
      values= {{
        if: <strong>IF</strong>,
        proxHaz: <a href='#prox-haz'>proximity to hazardous waste facilities</a>,
        proxNPL: <a href='#prox-npl'>proximity to NPL sites</a>,
        proxRMP: <a href='#prox-rmp'>proximity to RMP facilities</a>,
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
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.clean.water.methodology'}
      defaultMessage= {`Critical clean water and waste infrastructure methodology`}
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
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.health.burdens.methodology'}
      defaultMessage= {`Health burdens methodology`}
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
        {if} at or above 90th percentile for {asthma} OR {diabetes} OR {heart} OR {life}
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
  WORKFORCE_DEV: {
    METHODOLOGY: <FormattedMessage
      id= {'indicator.categories.workforce.dev.methodology'}
      defaultMessage= {`Training and workforce development methodology`}
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
        {if} at or above the 90th percentile for {lowMedInc} as a percent of area median income OR 
        {linIso} OR
        {unemploy} OR
        percent individuals in households at or below 100% federal {poverty} level
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
    AND: <FormattedMessage
      id= {'indicator.categories.work.dev.and'}
      defaultMessage= {`
      {and} where {highSchool} for adults 25 years and older is at or less than 90%
      `}
      description= {'and portion of the formula'}
      values= {{
        and: <strong>AND</strong>,
        highSchool: <a href='#high-school'>the high school degree achievement rates</a>,
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

export const RESPONSIBLE_PARTIES = {
  CENSUS_ACS: <FormattedMessage
    id= {'category.resp.party.census.link'}
    defaultMessage= {'{resPartyCensusLink}'}
    description= {'responsible party link for Census ACS'}
    values= {{
      resPartyCensusLink:
      <a href={`https://www.census.gov/programs-surveys/acs`} target={'_blank'} rel="noreferrer">
        {`Census's American Community Survey`}
      </a>,
    }}
  />,
  FEMA: <FormattedMessage
    id= {'category.resp.party.fema.link'}
    defaultMessage= {`{resPartyFemaLink}`}
    description= {'responsible party link for FEMA'}
    values={{
      resPartyFemaLink:
      <a href={`https://hazards.fema.gov/nri/expected-annual-loss`} target={'_blank'} rel="noreferrer">
        {`Federal Emergency Management Agency (FEMA)`}
      </a>,
    }}
  />,
  DOE: <FormattedMessage
    id= {'category.resp.party.doe.link'}
    defaultMessage= {`{resPartyDoeLink}`}
    description= {'responsible party link for FEMA'}
    values={{
      resPartyDoeLink:
      <a href={`https://www.energy.gov/eere/slsc/low-income-energy-affordability-data-lead-tool`}
        target={'_blank'}
        rel="noreferrer">
        {`Department of Energy (DOE) LEAD Score`}
      </a>,
    }}
  />,
  EPA_OAR: <FormattedMessage
    id= {'category.resp.party.epa.oar.link'}
    defaultMessage= {`{resPartyEpaOarLink}`}
    description= {'responsible party link for EPA OAR'}
    values={{
      resPartyEpaOarLink:
      <a href={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Environmental Protection Agency (EPA) Office of Air and Radiation (OAR) fusion of model and monitor 
          data as compiled by EPA's EJSCREEN, sourced from EPA National Air Toxics Assessment (NATA), 2017 
          U.S. Department of Transportation (DOT) traffic data
        `}
      </a>,
    }}
  />,
  EPA_NATA: <FormattedMessage
    id= {'category.resp.party.epa.nata.link'}
    defaultMessage= {`{resPartyEpaOarLink}`}
    description= {'responsible party link for EPA NATA'}
    values={{
      resPartyEpaOarLink:
      <a href={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Environmental Protection Agency (EPA) National Air Toxics Assessment (NATA)
          as compiled by EPA's EJSCREEN        
        `}
      </a>,
    }}
  />,
  DOT_EPA: <FormattedMessage
    id= {'category.resp.party.dot.epa.link'}
    defaultMessage= {`{resPartyDotEpaLink}`}
    description= {'responsible party link for DOT EPA'}
    values={{
      resPartyDotEpaLink:
      <a href={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Department of Transportation (DOT) traffic data as compiled by EPA's EJSCREEN      
        `}
      </a>,
    }}
  />,
  HUD: <FormattedMessage
    id= {'category.resp.party.hud.link'}
    defaultMessage= {`{resPartyHudLink}`}
    description= {'responsible party link for HUD'}
    values={{
      resPartyHudLink:
      <a href={`https://www.huduser.gov/portal/datasets/cp.html`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Department of Housing & Urban Development’s
          (HUD) Comprehensive Housing Affordability Strategy dataset
        `}
      </a>,
    }}
  />,
  EPA_TSDF: <FormattedMessage
    id= {'category.resp.party.epa.tsdf.link'}
    defaultMessage= {`{resPartyEpaTsdfLink}`}
    description= {'responsible party link for EPA TSDF'}
    values={{
      resPartyEpaTsdfLink:
      <a href={`https://enviro.epa.gov/facts/rcrainfo/search.html`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Environmental Protection Agency (EPA) Treatment Storage, and Disposal Facilities
          (TSDF) data calculated from EPA RCRA info database as compiled by EPA’s EJSCREEN
        `}
      </a>,
    }}
  />,
  EPA_CERCLIS: <FormattedMessage
    id= {'category.resp.party.epa.cerclis.link'}
    defaultMessage= {`{resPartyEpaCerclisLink}`}
    description= {'responsible party link for EPA CERCLIS'}
    values={{
      resPartyEpaCerclisLink:
      <a href={`https://enviro.epa.gov/facts/rcrainfo/search.html`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Environmental Protection Agency (EPA) CERCLIS database as compiled by EPA’s EJSCREEN        
        `}
      </a>,
    }}
  />,
  EPA_RMP: <FormattedMessage
    id= {'category.resp.party.epa.rmp.link'}
    defaultMessage= {`{resPartyEpaRmpLink}`}
    description= {'responsible party link for EPA RMP'}
    values={{
      resPartyEpaRmpLink:
      <a href={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Environmental Protection Agency (EPA) RMP database as compiled by EPA’s EJSCREEN        
        `}
      </a>,
    }}
  />,
  EPA_RSEI: <FormattedMessage
    id= {'category.resp.party.epa.rsei.link'}
    defaultMessage= {`{resPartyEpaRseiLink}`}
    description= {'responsible party link for EPA RSEI'}
    values={{
      resPartyEpaRseiLink:
      <a href={`https://www.epa.gov/ejscreen/technical-documentation-ejscreen`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Environmental Protection Agency (EPA) Risk-Screening
          Environmental Indicators (RSEI) Model as compiled by EPA's EJSCREEN        
        `}
      </a>,
    }}
  />,
  CDC_PLACES: <FormattedMessage
    id= {'category.resp.party.cdc.places.link'}
    defaultMessage= {`{resPartyCdcPlacesLink}`}
    description= {'responsible party link for CDC Places'}
    values={{
      resPartyCdcPlacesLink:
      <a href={`https://www.cdc.gov/places/index.html`}
        target={'_blank'}
        rel="noreferrer">
        {`
          Centers for Disease Control and Prevention (CDC) PLACES        
        `}
      </a>,
    }}
  />,
  CDC_SLEEP: <FormattedMessage
    id= {'category.resp.party.cdc.sleep.link'}
    defaultMessage= {`{resPartyCdcSleepLink}`}
    description= {'responsible party link for CDC Sleep'}
    values={{
      resPartyCdcSleepLink:
      <a href={`https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html#data`}
        target={'_blank'}
        rel="noreferrer">
        {`
          CDC’s U.S. Small-area Life Expectancy Estimates Project (USALEEP)        
        `}
      </a>,
    }}
  />,
};

export const DATE_RANGE = {
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

export const INDICATORS = [
  {
    domID: 'low-income',
    indicator: 'Low income',
    description: <FormattedMessage
      id= {'category.low.income.description.text'}
      defaultMessage= {`
        Percent of a census tract's population in households where household income is at or below
        200% of the federal poverty level.
      `}
      description= {'description text for low income'}
    />,
    usedIn: CATEGORIES.ALL.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'exp-agr-loss-rate',
    indicator: 'Expected agriculture loss rate',
    description: <FormattedMessage
      id= {'category.exp.agr.loss.rate.description.text'}
      defaultMessage= {`
        Percent of agriculture value at risk from losses due to natural hazards. Calculated by dividing 
        the agriculture value at risk in a census tract by the total agriculture value in that census 
        tract. Fourteen natural hazards that have some link to climate change include: avalanche, 
        coastal flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, 
        riverine flooding, strong wind, tornado, wildfire, and winter weather.
      `}
      description= {'description text for exp agr loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FEMA,
    dateRange: DATE_RANGE.FOURTEEN_PLUS_7,
  },
  {
    domID: 'exp-bld-loss-rate',
    indicator: 'Expected building loss rate',
    description: <FormattedMessage
      id= {'category.exp.bld.loss.rate.description.text'}
      defaultMessage= {`
        Percent of building value at risk from losses due to natural hazards. Calculated by dividing the 
        building value at risk in a census tract by the total building value in that census tract. 
        Fourteen natural hazards that have some link to climate change include: avalanche, 
        coastal flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, 
        riverine flooding, strong wind, tornado, wildfire, and winter weather.
        `}
      description= {'description text for exp bld loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FEMA,
    dateRange: DATE_RANGE.FOURTEEN_PLUS_7,
  },
  {
    domID: 'exp-pop-loss-rate',
    indicator: 'Expected population loss rate',
    description: <FormattedMessage
      id= {'category.exp.pop.loss.rate.description.text'}
      defaultMessage= {`
        Rate relative to the population in fatalities and injuries due to natural hazards each year. 
        Fourteen natural hazards that have some link to climate change include: avalanche, coastal 
        flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine 
        flooding, strong wind, tornado, wildfire, and winter weather.
        Population loss is defined as the Spatial Hazard Events and Losses or National Centers 
        for Environmental Information’s (NCEI) reported number of fatalities and injuries caused by the 
        hazard occurrence. To combine fatalities and injuries for the computation of population loss value, 
        an injury is counted as one-tenth (1/10) of a fatality. The NCEI Storm Events Database 
        classifies injuries and fatalities as direct or indirect. Both direct and indirect injuries 
        and fatalities are counted as population loss. This total number of injuries and fatalities 
        is then divided by the population in the census tract to get a per-capita rate of population risk.   
      `}
      description= {'description text for exp pop loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FEMA,
    dateRange: DATE_RANGE.FOURTEEN_PLUS_7,
  },
  {
    domID: 'energy-burden',
    indicator: 'Energy cost burden',
    description: <FormattedMessage
      id= {'category.energy.burden.description.text'}
      defaultMessage= {`Average annual energy cost ($) divided by household income.`}
      description= {'description text for energy burden'}
    />,
    usedIn: CATEGORIES.CLEAN_ENERGY.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOE,
    dateRange: DATE_RANGE.EIGHTEEN,
  },
  {
    domID: 'pm-25',
    indicator: 'PM2.5 in the air',
    description: <FormattedMessage
      id= {'category.pm2.5.description.text'}
      defaultMessage= {`
        Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller.
      `}
      description= {'description text for pm 2.5'}
    />,
    usedIn: CATEGORIES.CLEAN_ENERGY.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_OAR,
    dateRange: DATE_RANGE.SEVENTEEN,
  },
  {
    domID: 'diesel-pm',
    indicator: 'Diesel particulate matter exposure',
    description: <FormattedMessage
      id= {'category.diesel.pm.description.text'}
      defaultMessage= {`
        Mixture of particles that is part of diesel exhaust in the air.
      `}
      description= {'description text for diesel pm'}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_NATA,
    dateRange: DATE_RANGE.FOURTEEN,
  },
  {
    domID: 'traffic-vol',
    indicator: 'Traffic proximity and volume',
    description: <FormattedMessage
      id= {'category.traffic.vol.description.text'}
      defaultMessage= {`
        Count of vehicles (average annual daily traffic) at major roads
        within 500 meters, divided by distance in meters (not km).
      `}
      description= {'description text for traffic volume'}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOT_EPA,
    dateRange: DATE_RANGE.SEVENTEEN,
  },
  {
    domID: 'house-burden',
    indicator: 'Housing cost burden',
    description: <FormattedMessage
      id= {'category.house.burden.description.text'}
      defaultMessage= {`
        The percent of households in a census tract that are both earning less than 80% of HUD Area Median 
        Family Income by county and are paying greater than 30% of their income to housing costs.    
      `}
      description= {'description text for housing burden'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.HUD,
    dateRange: DATE_RANGE.FOURTEEN_PLUS_4,
  },
  {
    domID: 'lead-paint',
    indicator: 'Lead paint',
    description: <FormattedMessage
      id= {'category.lead.paint.description.text'}
      defaultMessage= {`
        Percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in 
        tracts with median home values less than 90th percentile
      `}
      description= {'description text for lead paint'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'median-home',
    indicator: 'Low median home value',
    description: <FormattedMessage
      id= {'category.lead.paint.description.text'}
      defaultMessage= {`
        Median home value of owner-occupied housing units in the census tract.
       `}
      description= {'description text for lead paint'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'prox-haz',
    indicator: 'Proximity to hazardous waste facilities',
    description: <FormattedMessage
      id= {'category.prox.haz.description.text'}
      defaultMessage= {`
        Count of hazardous waste facilities (Treatment, Storage, and Disposal Facilities and Large
        Quantity Generators) within 5 km (or nearest beyond 5 km), each divided by distance in kilometers.
      `}
      description= {'description text for proximity to hazards'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_TSDF,
    dateRange: DATE_RANGE.TWENTY,
  },
  {
    domID: 'prox-npl',
    indicator: 'Proximity to National Priorities List (NPL) sites',
    description: <FormattedMessage
      id= {'category.prox.npl.description.text'}
      defaultMessage= {`
        Count of proposed or listed NPL - also known as superfund - sites within 5 km (or nearest one
        beyond 5 km), each divided by distance in kilometers.      
        `}
      description= {'description text for proximity to npl'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_CERCLIS,
    dateRange: DATE_RANGE.TWENTY,
  },
  {
    domID: 'prox-rmp',
    indicator: 'Proximity to Risk Management Plan (RMP) facilities',
    description: <FormattedMessage
      id= {'category.prox.rmp.description.text'}
      defaultMessage= {`
        Count of RMP (potential chemical accident management plan) facilities within 5 km (or nearest
        one beyond 5 km), each divided by distance in kilometers.
      `}
      description= {'description text for proximity to rmp'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_RMP,
    dateRange: DATE_RANGE.TWENTY,
  },
  {
    domID: 'waste-water',
    indicator: 'Wastewater discharge',
    description: <FormattedMessage
      id= {'category.waste.water.description.text'}
      defaultMessage= {`
        Risk-Screening Environmental Indicators (RSEI) modeled Toxic Concentrations at 
        stream segments within 500 meters, divided by distance in kilometers (km).
      `}
      description= {'description text for waste water'}
    />,
    usedIn: CATEGORIES.CLEAN_WATER.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA_RSEI,
    dateRange: DATE_RANGE.TWENTY,
  },
  {
    domID: 'asthma',
    indicator: 'Asthma',
    description: <FormattedMessage
      id= {'category.asthma.description.text'}
      defaultMessage= {`
        Weighted percent of people who answer “yes” to both of the following questions: “Have you ever 
        been told by a doctor, nurse, or other health professional that you have asthma?” and the question
        “Do you still have asthma?”
      `}
      description= {'description text for asthma'}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC_PLACES,
    dateRange: DATE_RANGE.SIXTEEN_PLUS_3,
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
    responsibleParty: RESPONSIBLE_PARTIES.CDC_PLACES,
    dateRange: DATE_RANGE.SIXTEEN_PLUS_3,
  },
  {
    domID: 'heart-disease',
    indicator: 'Heart disease',
    description: <FormattedMessage
      id= {'category.diabetes.description.text'}
      defaultMessage= {`
        Weighted percent of people ages 18 years and older who report ever having been told
        by a doctor, nurse, or other health professionals that they had angina or
        coronary heart disease.
      `}
      description= {'description text for diabetes'}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC_PLACES,
    dateRange: DATE_RANGE.SIXTEEN_PLUS_3,
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
          Unlike most of the other datasets, high values of this indicator indicate low burdens. 
          For percentile calculations, the percentile is calculated in reverse order, so that the tract with 
          the highest median income relative to area median income (lowest burden on this measure) is at the 
          0th percentile, and the tract with the lowest median income relative to area median income 
          (highest burden on this measure) is at the 100th percentile.
        `}</p>,
      }}
    />,
    usedIn: CATEGORIES.HEALTH_BURDENS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CDC_SLEEP,
    dateRange: DATE_RANGE.TEN_PLUS_5,
  },
  {
    domID: 'low-med-inc',
    indicator: 'Low median Income',
    description: <FormattedMessage
      id= {'category.workforce.dev.description.text'}
      defaultMessage= {`
        Median income of the census tract calculated as a percent of the area’s median income.
      `}
      description= {'description text for workforce dev'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'ling-iso',
    indicator: 'Linguistic Isolation',
    description: <FormattedMessage
      id= {'category.linguistic.iso.description.text'}
      defaultMessage= {`
        The percent of limited speaking households, which are households where no one over age 14 speaks English well.
      `}
      description= {'description text for linguistic isolation'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'unemploy',
    indicator: 'Unemployment',
    description: <FormattedMessage
      id= {'category.unemploy.description.text'}
      defaultMessage= {`
      Number of unemployed people as a percentage of the civilian labor force
      `}
      description= {'description text for unemployment'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'poverty',
    indicator: 'Poverty',
    description: <FormattedMessage
      id= {'category.poverty.description.text'}
      defaultMessage= {`
        Percent of a tract's population in households where the household income is at or below 100% of 
        the federal poverty level.
      `}
      description= {'description text for poverty'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
  },
  {
    domID: 'high-school',
    indicator: 'High school degree achievement rate',
    description: <FormattedMessage
      id= {'category.highschool.description.text'}
      defaultMessage= {`
        Percent (not percentile) of people ages 25 years or older in a census tract whose
        education level is less than a high school diploma.
      `}
      description= {'description text for highschool'}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS_ACS,
    dateRange: DATE_RANGE.FIFETEEN_PLUS_4,
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
