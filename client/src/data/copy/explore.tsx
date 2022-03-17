
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, Link} from 'gatsby-plugin-intl';
import LinkTypeWrapper from '../../components/LinkTypeWrapper';

import * as CONTACT_COPY from './contact';
import * as METHODOLOGY_COPY from './methodology';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'exploreTool.title.text',
    defaultMessage: 'Explore the tool',
    description: 'explore the tool title text',
  },
  PAGE_HEADING: {
    id: 'exploreTool.heading.text',
    defaultMessage: 'Explore the tool',
    description: 'explore the tool heading text',
  },
});

export const PAGE_DESCRIPTION = <FormattedMessage
  id={'exploreTool.page.description'}
  defaultMessage={`
    Use the map to see communities that are identified as disadvantaged. The map uses 
    publicly-available, nationally-consistent datasets. Learn more about 
    the methodology and datasets that were used to identify disavantaged communities
    in the current version of the tool on the {methodologyLink} page.
    `}
  description={'page description'}
  values={{
    methodologyLink: <Link to={'/methodology'}>Methodology & data</Link>,
    methodologyLinkEs: <Link to={'/methodology'}>Metodología y datos</Link>,
  }}
/>;

export const LEGEND = defineMessages({
  PRIORITY_LABEL: {
    id: 'legend.info.priority.label',
    defaultMessage: 'Disadvantaged community',
    description: 'the label of the prioritized community legend',
  },
  PRIORITY_DESCRIPT: {
    id: 'legend.info.threshold.label',
    defaultMessage: `
      Communities identified as disadvantaged by the tool are those that are marginalized, underserved, 
      and overburdened by pollution. These communities are at or above the thresholds in one or 
      more of eight categories of criteria.
    `,
    description: 'the label of the threshold community legend',
  },
});


// Map
export const MAP = defineMessages({
  ZOOM_WARNING: {
    id: 'map.zoom.warning',
    defaultMessage: 'Zoom in to the state or regional level to see prioritized communities on the map.',
    description: 'zoom warning on map',
  },
  SEARCH_PLACEHOLDER: {
    id: 'map.search.placeholder.text',
    defaultMessage: 'Enter a city, state or ZIP',
    description: 'placeholder text for search',
  },
  SEARCH_RESULTS_EMPTY_MESSAGE: {
    id: 'map.search.results.empty.text',
    defaultMessage: 'No location found. Please try again.',
    description: 'text displaying message for no search results found',
  },
  LOWER48_SHORT: {
    id: 'map.territoryFocus.lower48.short',
    defaultMessage: '48',
    description: 'The abbreviated name indicating the bounds of the Lower 48 states',
  },
  LOWER48_LONG: {
    id: 'map.territoryFocus.lower48.long',
    defaultMessage: 'Lower 48',
    description: 'The longer name indicating the bounds of the Lower 48 states',
  },
  ALASKA_SHORT: {
    id: 'map.territoryFocus.alaska.short',
    defaultMessage: 'AK',
    description: 'The abbreviated indicating the bounds of Alaska',
  },
  ALASKA_LONG: {
    id: 'map.territoryFocus.alaska.long',
    defaultMessage: 'Alaska',
    description: 'The full name indicating the bounds of Alaska',
  },
  HAWAII_SHORT: {
    id: 'map.territoryFocus.hawaii.short',
    defaultMessage: 'HI',
    description: 'The abbreviated name indicating the bounds of Hawaii',
  },
  HAWAII_LONG: {
    id: 'map.territoryFocus.hawaii.long',
    defaultMessage: 'Hawaii',
    description: 'The longer name indicating the bounds of Hawaii',
  },
  PR_SHORT: {
    id: 'map.territoryFocus.puerto_rico.short',
    defaultMessage: 'PR',
    description: 'The abbreviated name indicating the bounds of Puerto Rico',
  },
  PR_LONG: {
    id: 'map.territoryFocus.puerto_rico.long',
    defaultMessage: 'Puerto Rico',
    description: 'The full name indicating the bounds of Puerto Rico',
  },
  GU_SHORT: {
    id: 'map.territoryFocus.guam.short',
    defaultMessage: 'GU',
    description: 'The abbreviated name indicating the bounds of Guam',
  },
  GU_LONG: {
    id: 'map.territoryFocus.guam.long',
    defaultMessage: 'Guam',
    description: 'The full name indicating the bounds of Guam',
  },
  AS_SHORT: {
    id: 'map.territoryFocus.american.samoa.short',
    defaultMessage: 'AS',
    description: 'The abbreviated name indicating the bounds of American Somoa',
  },
  AS_LONG: {
    id: 'map.territoryFocus.american.samoa.long',
    defaultMessage: 'American Samoa',
    description: 'The full name indicating the bounds of American Somoa',
  },
  MP_SHORT: {
    id: 'map.territoryFocus.commonwealth.nmp.short',
    defaultMessage: 'MP',
    description: 'The abbreviated name indicating the bounds of Commonwealth of Northern Mariana Islands',
  },
  MP_LONG: {
    id: 'map.territoryFocus.commonwealth.nmp.long',
    defaultMessage: 'Commonwealth of Northern Mariana Islands',
    description: 'The full name indicating the bounds of Commonwealth of Northern Mariana Islands',
  },
  VI_SHORT: {
    id: 'map.territoryFocus.us.virgin.islands.short',
    defaultMessage: 'VI',
    description: 'The abbreviated name indicating the bounds of US Virgin Islands',
  },
  VI_LONG: {
    id: 'map.territoryFocus.us.virgin.islands.long',
    defaultMessage: 'US Virgin Islands',
    description: 'The full name indicating the bounds of US Virgin Islands',
  },
});


// Side Panel copy
export const SIDE_PANEL_INITIAL_STATE = defineMessages({
  TITLE: {
    id: 'mapIntro.mapIntroHeader',
    defaultMessage: 'Zoom and select a census tract to view data',
    description: 'introductory text of ways to use the map',
  },
  DID_YOU_KNOW: {
    id: 'mapIntro.didYouKnow',
    defaultMessage: ' Did you know?',
    description: 'text prompting a cite paragraph',
  },
  CBG_DEFINITION: {
    id: 'mapIntro.censusBlockGroupDefinition',
    defaultMessage: `
      A census tract is generally between 1,200 to 8,000 people, with an average size of 4,000 people. 
      Census tracts are small, relatively permanent subdivisions of a county defined by the 
      U.S. Census Bureau and usually cover a contiguous area. The census tract level currently represents the 
      smallest geographical unit for which publicly-available and nationally-consistent datasets can 
      be consistently displayed on the tool.
    `,
    description: 'cites the definition and helpful information about census groups',
  },
});

export const SIDE_PANEL_VERION = {
  TITLE: <FormattedMessage
    id={'areaDetail.side.panel.version.title'}
    defaultMessage={ 'Methodology version {version}'}
    description={'methodology version number'}
    values= {{
      version: METHODOLOGY_COPY.VERSION_NUMBER,
    }}
  />,
};

export const SIDE_PANEL_CBG_INFO = defineMessages({
  CENSUS_BLOCK_GROUP: {
    id: 'areaDetail.geographicInfo.censusBlockGroup',
    defaultMessage: 'Census tract:',
    description: 'the census tract id number of the feature selected',
  },
  COUNTY: {
    id: 'areaDetail.geographicInfo.county',
    defaultMessage: 'County:',
    description: 'the county of the feature selected',
  },
  STATE: {
    id: 'areaDetail.geographicInfo.state',
    defaultMessage: 'State: ',
    description: 'the state of the feature selected',
  },
  TERRITORY: {
    id: 'areaDetail.geographicInfo.territory',
    defaultMessage: 'Territory: ',
    description: 'the territory of the feature selected',
  },
  POPULATION: {
    id: 'areaDetail.geographicInfo.population',
    defaultMessage: 'Population:',
    description: 'the population of the feature selected',
  },
});

export const COMMUNITY = {
  OF_FOCUS: <FormattedMessage
    id={'areaDetail.categorization.community.of.focus'}
    defaultMessage={ 'YES'}
    description={'the communities the score currently is focused on'}
  />,
  NOT_OF_FOCUS: <FormattedMessage
    id= {'areaDetail.categorization.not.community.of.focus'}
    defaultMessage= {'No'}
    description= {'the communities the score currently is not focused on'}
  />,
  IS_FOCUS: <FormattedMessage
    id={'areaDetail.categorization.is.community.of.focus'}
    defaultMessage={ 'Identified as disadvantaged?'}
    description={'asking IF the communities is focused on'}
  />,
  SEND_FEEDBACK: {
    TITLE: <FormattedMessage
      id={'areaDetail.categorization.send.feedback.title'}
      defaultMessage={ 'Send feedback'}
      description={'link to send feedback'}
    />,
  },
};

export const SEND_FEEDBACK = defineMessages({
  EMAIL_BODY: {
    id: 'areaDetail.categorization.send.feedback.email.body',
    // eslint-disable-next-line max-len
    defaultMessage: `Please provide feedback about this census tract, including about the datasets, the data categories provided for this census tract, the communities who live in this census tract, and anything else relevant that CEQ should know about this census tract.
    `,
    description: 'link to send feedback',
  },
});

export const SIDE_PANEL_CATEGORY = defineMessages({
  INDICATOR: {
    id: 'areaDetail.category.header.indicator',
    defaultMessage: 'Indicator',
    description: 'header for each category',
  },
  PERCENTILE: {
    id: 'areaDetail.category.header.percentile',
    defaultMessage: 'Percentile (0-100)',
    description: 'header for each category',
  },
  CLIMATE: {
    id: 'areaDetail.indicator.title.climate',
    defaultMessage: 'Climate change',
    description: 'Climate change title',
  },
  CLEAN_ENERGY: {
    id: 'areaDetail.indicator.title.clean.energy',
    defaultMessage: 'Clean energy and energy efficiency',
    description: 'Clean, efficient energy title',
  },
  CLEAN_TRANSPORT: {
    id: 'areaDetail.indicator.title.clean.transport',
    defaultMessage: 'Clean transportation',
    description: 'Clean transportation title',
  },
  SUSTAIN_HOUSE: {
    id: 'areaDetail.indicator.title.sustain.house',
    defaultMessage: 'Sustainable housing',
    description: 'Sustainable housing title',
  },
  LEG_POLLUTE: {
    id: 'areaDetail.indicator.title.legacy.pollution',
    defaultMessage: 'Legacy pollution',
    description: 'Legacy pollution title',
  },
  CLEAN_WATER: {
    id: 'areaDetail.indicator.title.clean.water',
    defaultMessage: 'Clean water and waste infrastructure',
    description: 'Clean water and waste title',
  },
  HEALTH_BURDEN: {
    id: 'areaDetail.indicator.title.health.burden',
    defaultMessage: 'Health burdens',
    description: 'Health burdens title',
  },
  WORK_DEV: {
    id: 'areaDetail.indicator.title.work.dev',
    defaultMessage: 'Workforce development',
    description: 'Workforce development title',
  },
});

export const SIDE_PANEL_INDICATORS = defineMessages({
  EXP_AG_LOSS: {
    id: 'areaDetail.indicator.exp.ag.loss',
    defaultMessage: 'Expected agriculture loss rate',
    description: 'agriculture loss rate',
  },
  EXP_BLD_LOSS: {
    id: 'areaDetail.indicator.exp.bld.loss',
    defaultMessage: 'Expected building loss rate',
    description: 'building loss rate',
  },
  EXP_POP_LOSS: {
    id: 'areaDetail.indicator.exp.pop.loss',
    defaultMessage: 'Expected population loss rate',
    description: 'population loss rate',
  },
  LOW_INCOME: {
    id: 'areaDetail.indicator.low.income',
    defaultMessage: 'Low income',
    description: 'low income',
  },
  HIGH_ED: {
    id: 'areaDetail.indicator.high.ed',
    defaultMessage: 'Higher ed enrollment rate',
    description: 'Higher ed degree achievement rate',
  },
  ENERGY_BURDEN: {
    id: 'areaDetail.indicator.energyBurden',
    defaultMessage: 'Energy burden',
    description: 'Average annual energy cost ($) divided by household income',
  },
  PM_2_5: {
    id: 'areaDetail.indicator.pm25',
    defaultMessage: 'PM2.5 in the air',
    description: 'Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller',
  },
  DIESEL_PARTICULATE_MATTER: {
    id: 'areaDetail.indicator.dieselPartMatter',
    defaultMessage: 'Diesel particulate matter exposure',
    description: 'Diesel particulate matter level in air',
  },
  TRAFFIC_VOLUME: {
    id: 'areaDetail.indicator.trafficVolume',
    defaultMessage: 'Traffic proximity and volume',
    description: 'Count of vehicles (average annual daily traffic) at major roads within 500 meters,' +
      ' divided by distance in meters',
  },
  LEAD_PAINT: {
    id: 'areaDetail.indicator.leadPaint',
    defaultMessage: 'Lead paint',
    description: 'Housing units built pre-1960, used as an indicator of potential'+
      ' lead paint exposure in homes',
  },
  MED_HOME_VAL: {
    id: 'areaDetail.indicator.med.home.val',
    defaultMessage: 'Median home value',
    description: 'Median home value of owner-occupied housing units in the area.',
  },
  HOUSE_BURDEN: {
    id: 'areaDetail.indicator.houseBurden',
    defaultMessage: 'Housing cost burden',
    description: 'People ages 18 and up who report having been told by a doctor,' +
      ' nurse, or other health professionals that they have diabetes other than diabetes during pregnancy',
  },
  PROX_HAZ: {
    id: 'areaDetail.indicator.prox.haz',
    defaultMessage: 'Proximity to hazardous waste facilities',
    description: 'Count of hazardous waste facilities ',
  },
  PROX_NPL: {
    id: 'areaDetail.indicator.prox.npl',
    defaultMessage: 'Proximity to NPL sites',
    description: 'Count of proposed or listed NPL ',
  },
  PROX_RMP: {
    id: 'areaDetail.indicator.prox.rmp',
    defaultMessage: 'Proximity to RMP facilities',
    description: 'Count of proposed or listed RMP',
  },
  WASTE_WATER: {
    id: 'areaDetail.indicator.wasteWater',
    defaultMessage: 'Wastewater discharge',
    description: 'Toxic concentrations at stream segments within 500 meters divided by distance in' +
      ' kilometers',
  },
  ASTHMA: {
    id: 'areaDetail.indicator.asthma',
    defaultMessage: 'Asthma',
    description: 'have asthma or been diagnosed by a doctor to have asthma',
  },
  DIABETES: {
    id: 'areaDetail.indicator.diabetes',
    defaultMessage: 'Diabetes',
    description: 'diabetes from dr or nurse',
  },
  HEART_DISEASE: {
    id: 'areaDetail.indicator.heartDisease',
    defaultMessage: 'Heart disease',
    description: 'People ages 18 and up who report ever having been told by a' +
      'doctor, nurse, or other health professionals that they had angina or coronary heart disease',
  },
  LIFE_EXPECT: {
    id: 'areaDetail.indicator.lifeExpect',
    defaultMessage: 'Low life expectancy',
    description: 'Estimated years of life expectancy',
  },
  LOW_MED_INC: {
    id: 'areaDetail.indicator.low.med.income',
    defaultMessage: 'Low median income',
    description: 'Low median income',
  },
  LING_ISO: {
    id: 'areaDetail.indicator.ling.iso',
    defaultMessage: 'Linguistic isolation',
    description: 'Linguistic isolation',
  },
  UNEMPLOY: {
    id: 'areaDetail.indicator.unemploy',
    defaultMessage: 'Unemployment',
    description: 'Unemployment',
  },
  POVERTY: {
    id: 'areaDetail.indicator.poverty',
    defaultMessage: 'Poverty',
    description: 'Unemployment',
  },
  HIGH_SCL: {
    id: 'areaDetail.indicator.high.school',
    defaultMessage: 'High school degree attainment rate',
    description: 'High school degree achievement rate',
  },
});

export const SIDE_PANEL_INDICATOR_DESCRIPTION = defineMessages({
  EXP_AG_LOSS: {
    id: 'areaDetail.indicator.description.exp.ag.loss',
    defaultMessage: 'Economic loss rate to agriculture resulting from natural hazards',
    description: 'Economic loss rate to agriculture resulting from natural hazards',

  },
  EXP_BLD_LOSS: {
    id: 'areaDetail.indicator.description.exp.bld.loss',
    defaultMessage: 'Economic loss rate to buildings resulting from natural hazards',
    description: 'Economic loss rate to buildings resulting from natural hazards',
  },
  EXP_POP_LOSS: {
    id: 'areaDetail.indicator.description.exp.pop.loss',
    defaultMessage: `
      Rate of fatalities and injuries resulting from natural hazards each year
    `,
    description: 'Economic loss rate to the population in fatalities and injuries resulting from natural hazards',
  },
  LOW_INCOME: {
    id: 'areaDetail.indicator.description.low.income',
    defaultMessage: `
      Household income is less than or equal to twice the federal poverty level 
    `,
    description: 'Household income is less than or equal to twice the federal poverty level',
  },
  HIGH_ED: {
    id: 'areaDetail.indicator.description.high.ed',
    defaultMessage: `
    Percent of population enrolled in college, university, or graduate school 
    `,
    description: 'Percent of people ages 25 years or older whose education level is less than a high school diploma',
  },
  ENERGY_BURDEN: {
    id: 'areaDetail.indicator.description.energyBurden',
    defaultMessage: 'Average annual energy costs divided by household income',
    description: 'Energy costs divided by household income',
  },
  PM_2_5: {
    id: 'areaDetail.indicator.description.pm25',
    defaultMessage: 'Fine inhalable particles, 2.5 micrometers and smaller',
    description: 'Fine inhalable particles, 2.5 micrometers and smaller',
  },

  DIESEL_PARTICULATE_MATTER: {
    id: 'areaDetail.indicator.description.dieselPartMatter',
    defaultMessage: 'Diesel exhaust in the air',
    description: 'Diesel exhaust in the air',
  },
  TRAFFIC_VOLUME: {
    id: 'areaDetail.indicator.description.trafficVolume',
    defaultMessage: 'Count of vehicles at major roads within 500 meters',
    description: 'Count of vehicles at major roads within 500 meters',
  },

  LEAD_PAINT: {
    id: 'areaDetail.indicator.description.leadPaint',
    defaultMessage: `
      Percentile of number of homes built before 1960 that are not among the most expensive
    `,
    description: 'Pre-1960 housing',
  },
  MED_HOME_VAL: {
    id: 'areaDetail.indicator.description.med.home.val',
    defaultMessage: 'Median home value in area',
    description: 'Meidan home value in area',

  },
  HOUSE_BURDEN: {
    id: 'areaDetail.indicator.description.houseBurden',
    defaultMessage: 'Low income households spending more than 30% of income on housing',
    description: 'Low income households spending more than 30% of income on housing',
  },

  PROX_HAZ: {
    id: 'areaDetail.indicator.description.prox.haz',
    defaultMessage: 'Count of hazardous waste facilities within 5 kilometers',
    description: 'Count of hazardous waste facilities within 5 kilometers',
  },
  PROX_NPL: {
    id: 'areaDetail.indicator.description.prox.npl',
    defaultMessage: 'Proposed or listed NPL (Superfund) sites within 5 kilometers',
    description: 'Proposed or listed NPL (Superfund) sites within 5 kilometers',
  },
  PROX_RMP: {
    id: 'areaDetail.indicator.description.prox.rmp',
    defaultMessage: 'Risk Management Plan facilities within 5 kilometers',
    description: 'Risk Management Plan facilities within 5 kilometers',
  },

  WASTE_WATER: {
    id: 'areaDetail.indicator.description.wasteWater',
    defaultMessage: 'Toxic concentrations at stream segments within 500 meters',
    description: 'Toxic concentrations at stream segments within 500 meters',
  },

  ASTHMA: {
    id: 'areaDetail.indicator.description.asthma',
    defaultMessage: 'Weighted percent of people who have been told they have asthma',
    description: 'Number of people who have been told they have asthma',
  },
  DIABETES: {
    id: 'areaDetail.indicator.description.diabetes',
    defaultMessage: `
      Weighted percent of people ages 18 years and older who have diabetes other than 
      diabetes during pregnancy
    `,
    description: 'People ages 18 years and older who have diabetes other than diabetes during pregnancy',
  },
  HEART_DISEASE: {
    id: 'areaDetail.indicator.description.heartDisease',
    defaultMessage: `
      Weighted percent of people ages 18 years and older who have been told they have heart disease
    `,
    description: 'People ages 18 years and older who have been told they have heart disease',
  },
  LOW_LIFE_EXPECT: {
    id: 'areaDetail.indicator.description.lifeExpect',
    defaultMessage: 'Average number of years a person can expect to live',
    description: 'Average number of years of life a person can expect to live',
  },

  LOW_MED_INCOME: {
    id: 'areaDetail.indicator.description.low.med.income',
    defaultMessage: 'Median income calculated as a percent of the area’s median income',
    description: 'Median income calculated as a percent of the area’s median income',
  },
  LING_ISO: {
    id: 'areaDetail.indicator.description.ling.iso',
    defaultMessage: `
      Percent of households where no one over the age 14 speaks English well
    `,
    description: `Households in which no one age 14 and over speaks English only or also speaks 
    a language other than English`,
  },
  UNEMPLOY: {
    id: 'areaDetail.indicator.description.unemploy',
    defaultMessage: 'Number of unemployed people as a percentage of the labor force',
    description: 'Number of unemployed people as a percentage of the labor force',
  },
  POVERTY: {
    id: 'areaDetail.indicator.description.poverty',
    defaultMessage: `
      Percent of a tract's population in households where the household income is at or below 100% of 
      the Federal poverty level   
    `,
    description: `Percent of individuals in households where the household income is at or 
    below 100% of the federal poverty level`,
  },
  HIGH_SKL: {
    id: 'areaDetail.indicator.description.high.school',
    defaultMessage: `
      Proportion of people ages 25 years or older whose education level is less than a high school diploma 
    `,
    description: 'Percent of people ages 25 years or older whose education level is less than a high school diploma',
  },
});

export const DOWNLOAD_DRAFT = {
  PARAGRAPH_1: <FormattedMessage
    id={'download.draft.ptag.1'}
    description={'Download the current list of communities and datasets used.'}
    defaultMessage={`
    {downloadDraft} of communities and datasets used (ZIP file will contain one .xlsx 
    and one .csv, with a size of {downloadFileSize}). Last updated: {dateUpdated}.
    `}
    values={{
      downloadDraft:
        <a href={METHODOLOGY_COPY.DOWNLOAD_ZIP_URL}>
          {`Download the current list`}
        </a>,
      downloadDraftEs:
      <a href={METHODOLOGY_COPY.DOWNLOAD_ZIP_URL}>
        {`Descargue la lista preliminar`}
      </a>,
      dateUpdated: METHODOLOGY_COPY.DOWNLOAD_LAST_UPDATED,
      dateUpdatedEs: METHODOLOGY_COPY.DOWNLOAD_LAST_UPDATED_ES,
      downloadFileSize: METHODOLOGY_COPY.DOWNLOAD_FILE_SIZE,
    }}
  />,
  PARAGRAPH_2: <FormattedMessage
    id={'download.draft.ptag.2'}
    description={'Information on the contents and type of the download file'}
    defaultMessage={`ZIP file will contain one .xlsx, one .csv, and one .pdf ({downloadFileSize}).`}
    values={{
      downloadFileSize: METHODOLOGY_COPY.DOWNLOAD_FILE_SIZE,
    }}
  />,
};

export const NOTE_ON_TERRITORIES = {
  INTRO: <FormattedMessage
    id={'explore.page.note.on.territories.intro'}
    defaultMessage={`A note on the U.S. territories`}
    description={`territories intro text`}
  />,
  PARA_1: <FormattedMessage
    id={'explore.page.note.on.territories.para.1'}
    defaultMessage={`
      The data sources described on the {dataMethLink} page are used to 
      identify disadvantaged communities in all fifty states and the District of Columbia. However, not all 
      of these data sources are currently available for the U.S. territories.
    `}
    description={`territories paragraph 1`}
    values={{
      dataMethLink: <Link to="/methodology">Methodology & data</Link>,
    }}
  />,
  PARA_2: <FormattedMessage
    id={'explore.page.note.on.territories.para.2'}
    defaultMessage={`
      For Puerto Rico, the Census Bureau’s American Community Survey data from 2015-2019 are used for higher 
      ed enrollment rate and all the other fields in the Training and Workforce Development category 
      to identify disadvantaged communities. Data in the other categories are unavailable at this 
      time.
    `}
    description={`territories paragraph 2`}
  />,
  PARA_3: <FormattedMessage
    id={'explore.page.note.on.territories.para.3'}
    defaultMessage={`
      For American Samoa and the Northern Mariana Islands, the data used to identify 
      disadvantaged communities are from the 2010 Decennial Census, the last reported data from the 
      U.S. Census Bureau. Available data for these territories includes unemployment, poverty,  
      low median income, and high school degree achievement rate fields in the Training and 
      Workforce Development category.
    `}
    description={`territories paragraph 3`}
  />,
  PARA_4: <FormattedMessage
    id={'explore.page.note.on.territories.para.4'}
    defaultMessage={`
      Work is currently underway to identify disadvantaged communities and update the 
      tool accordingly for Guam and the U.S. Virgin Islands.
        `}
    description={`territories paragraph 4`}
  />,
};

export const NOTE_ON_TRIBAL_NATIONS = {
  INTRO: <FormattedMessage
    id={'explore.page.note.on.tribal.nations.intro'}
    defaultMessage={`A note on Tribal Nations`}
    description={`tribal nations intro text`}
  />,
  PARA_1: <FormattedMessage
    id={'explore.page.note.on.tribal.nations.para.1'}
    defaultMessage={`
      The tool covers all U.S. census tracts, including those located within Tribal Nations, to the extent 
      that data is available (see our {dataMethLink} page for more information). CEQ is engaging 
      in consultation and coordination with Tribal Nations on the beta version of the tool to provide 
      Tribal Nations with meaningful opportunities for input, consistent with CEQ’s {actionPlanTribalNation},
      {bidenMemoNat2Nat}, and Executive Order 13175 on {coordinateTribal}.
    `}
    description={`tribal nations paragraph 1`}
    values={{
      dataMethLink: <Link to="/methodology">Methodology & data</Link>,
      actionPlanTribalNation: <LinkTypeWrapper
        linkText= {'Action Plan for Consultation and Coordination with Tribal Nations'}
        internal= {false}
        url= {`https://www.whitehouse.gov/wp-content/uploads/2022/01/CEQ-Tribal-Consultation-Plan-04.26.2021.pdf`}
        openUrlNewTab= {true}
      />,
      bidenMemoNat2Nat: <LinkTypeWrapper
        linkText= {`
          President Biden’s Memorandum on Tribal Consultation and Strengthening Nation-to-Nation Consultation
        `}
        internal= {false}
        url= {`
          https://www.whitehouse.gov/briefing-room/presidential-actions/2021/01/26/memorandum-on-tribal-consultation-and-strengthening-nation-to-nation-relationships/
        `}
        openUrlNewTab= {true}
      />,
      coordinateTribal: <LinkTypeWrapper
        linkText= {`
        Consulation and Coordination With Indian Tribal Governments
        `}
        internal= {false}
        url= {`
          https://www.federalregister.gov/documents/2000/11/09/00-29003/consultation-and-coordination-with-indian-tribal-governments
        `}
        openUrlNewTab= {true}
      />,
    }}
  />,
};

export const HOW_YOU_CAN_HELP_LIST_ITEMS = {
  HEADING: <FormattedMessage
    id={'youCanHelpInfoText.heading'}
    description={'how one can help us improve the tool'}
    defaultMessage={`How you can help improve the tool`}
  />,
  LIST_ITEM_1: <FormattedMessage
    id={'youCanHelpInfoText.list.item.1'}
    description={'give us feedback on our data and methodology'}
    defaultMessage={`View the {dataMeth} page and send feedback.`}
    values={{
      dataMeth:
    <Link to={'/methodology'}>
      {'Methodology & data'}
    </Link>,
      dataMethEs:
    <Link to={'/methodology'}>
      {'Metodología y datos'}
    </Link>,
    }}
  />,
  LIST_ITEM_2: <FormattedMessage
    id={'youCanHelpInfoText.list.item.2'}
    description={'share your feedback'}
    defaultMessage={`Use the tool to find communities and {shareFeedback}.`}
    values={{
      shareFeedback:
        <LinkTypeWrapper
          linkText= {'share your feedback'}
          internal= {false}
          url= {`mailto:${CONTACT_COPY.FEEDBACK_EMAIL}`}
          openUrlNewTab= {true}
        />,
    }}
  />,
  LIST_ITEM_3: <FormattedMessage
    id={'youCanHelpInfoText.list.item.3'}
    description={'share your feedback'}
    defaultMessage={`Respond to our Request for Information on {federalRegisterLink}.`}
    values={{
      federalRegisterLink:
      <LinkTypeWrapper
        linkText={'federalregister.gov'}
        internal={false}
        url={`https://www.federalregister.gov/d/2022-03920`}
        openUrlNewTab={true}
      />,
    }}
  />,

};
