
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, Link} from 'gatsby-plugin-intl';

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
    Use the map to see disadvantaged communities that have been historically 
    marginalized, underserved, and overburdened by pollution. The map uses 
    publicly-available, nationally-consistent, high-quality datasets. Learn more about 
    the methodology and datasets that were used to identify disavantaged communities 
    on the {methodologyLink} page.
    `}
  description={'page description'}
  values={{
    methodologyLink: <Link to={'/methodology'}>methodology & data</Link>,
    methodologyLinkEs: <Link to={'/methodology'}>metodología y datos</Link>,
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
    Communities identified for the purposes of Justice40 as disadvantaged have been 
    historically marginalized, underserved, and overburdened by pollution. These communities 
    meet or exceed the criteria in one or more areas of focus. 

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
    defaultMessage: 'No location found. Please try another location.',
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
    defaultMessage: 'American Somoa',
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
      A census tract is generally between 1,200 and 8,000 people, with an optimum size of 4,000 people. 
      Census tracts are small, relatively permanent subdivisions of a county defined by the 
      U.S. Census Bureau and usually cover a contiguous area. The census tract level represents the 
      smallest geographical unity that can be presented in a statistically sound manner, given the 
      datasets that are being used.
    `,
    description: 'cites the definition and helpful information about census groups',
  },
});

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
  POPULATION: {
    id: 'areaDetail.geographicInfo.population',
    defaultMessage: 'Population:',
    description: 'the population of the feature selected',
  },
});

export const COMMUNITY = {
  OF_FOCUS: <FormattedMessage
    id={'areaDetail.categorization.community.of.focus'}
    defaultMessage={ 'Community of focus'}
    description={'the communities the score currently is focused on'}
  />,
  NOT_OF_FOCUS: <FormattedMessage
    id= {'areaDetail.categorization.not.community.of.focus'}
    defaultMessage= {'Not a community of focus'}
    description= {'the communities the score currently is not focused on'}
  />,
};

export const SIDE_PANEL_INDICATORS = defineMessages({
  INDICATOR_COLUMN_HEADER: {
    id: 'areaDetail.indicators.indicatorColumnHeader',
    defaultMessage: 'Indicator',
    description: 'the population of the feature selected',
  },
  PERCENTILE_COLUMN_HEADER: {
    id: 'areaDetail.indicators.percentileColumnHeader',
    defaultMessage: 'Percentile (0-100)',
    description: 'the population of the feature selected',
  },
  POVERTY: {
    id: 'areaDetail.indicator.poverty',
    defaultMessage: 'Poverty',
    description: 'Household income is less than or equal to twice the federal "poverty level"',
  },
  AREA_MEDIAN_INCOME: {
    id: 'areaDetail.indicator.areaMedianIncome',
    defaultMessage: 'Area Median Income',
    description: 'calculated as percent of the area median income',
  },
  EDUCATION: {
    id: 'areaDetail.indicator.education',
    defaultMessage: 'Education, less than high school',
    description: 'Percent of people age 25 or older that didn’t get a high school diploma',
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
  DIESEL_PARTICULATE_MATTER: {
    id: 'areaDetail.indicator.dieselPartMatter',
    defaultMessage: 'Diesel particulate matter',
    description: 'Diesel particulate matter level in air',
  },
  ENERGY_BURDEN: {
    id: 'areaDetail.indicator.energyBurden',
    defaultMessage: 'Energy burden',
    description: 'Average annual energy cost ($) divided by household income',
  },
  FEMA_RISK: {
    id: 'areaDetail.indicator.femaRisk',
    defaultMessage: 'FEMA Risk Index',
    description: 'Risk based on 18 natural hazard types, in addition to a '+
      'community\'s social vulnerability and community resilience',
  },
  HEART_DISEASE: {
    id: 'areaDetail.indicator.heartDisease',
    defaultMessage: 'Heart disease',
    description: 'People ages 18 and up who report ever having been told by a' +
      'doctor, nurse, or other health professionals that they had angina or coronary heart disease',
  },
  HOUSE_BURDEN: {
    id: 'areaDetail.indicator.houseBurden',
    defaultMessage: 'Housing cost burden',
    description: 'People ages 18 and up who report having been told by a doctor,' +
      ' nurse, or other health professionals that they have diabetes other than diabetes during pregnancy',
  },
  LEAD_PAINT: {
    id: 'areaDetail.indicator.leadPaint',
    defaultMessage: 'Lead paint',
    description: 'Housing units built pre-1960, used as an indicator of potential'+
      ' lead paint exposure in homes',
  },
  LIFE_EXPECT: {
    id: 'areaDetail.indicator.lifeExpect',
    defaultMessage: 'Life expectancy',
    description: 'Estimated years of life expectancy',
  },
  PM_2_5: {
    id: 'areaDetail.indicator.pm25',
    defaultMessage: 'PM2.5',
    description: 'Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller',
  },
  TRAFFIC_VOLUME: {
    id: 'areaDetail.indicator.trafficVolume',
    defaultMessage: 'Traffic proximity and volume',
    description: 'Count of vehicles (average annual daily traffic) at major roads within 500 meters,' +
      ' divided by distance in meters',
  },
  WASTE_WATER: {
    id: 'areaDetail.indicator.wasteWater',
    defaultMessage: 'Wastewater discharge',
    description: 'Toxic concentrations at stream segments within 500 meters divided by distance in' +
      ' kilometers',
  },
});


export const SIDE_PANEL_INDICATOR_DESCRIPTION = defineMessages({
  AREA_MEDIAN_INCOME: {
    id: 'areaDetail.indicator.description.area_median_income',
    defaultMessage: 'Median income of the census tract calculated as a percent of the metropolitan'+
        ' area’s or state\'s median income',
    description: 'Median income of the census tract calculated as a percent of the metropolitan'+
    ' area’s or state\'s median income',
  },
  EDUCATION: {
    id: 'areaDetail.indicator.description.education',
    defaultMessage: 'Percent of people age 25 or older that didn’t get a high school diploma',
    description: 'Percent of people age 25 or older that didn’t get a high school diploma',
  },
  POVERTY: {
    id: 'areaDetail.indicator.description.poverty',
    defaultMessage: 'Percent of a tract\'s population in households where the household income' +
    ' is at or below 100% of the federal poverty level',
    description: 'Percent of a tract\'s population in households where the household income' +
    ' is at or below 100% of the federal poverty level',
  },
  ASTHMA: {
    id: 'areaDetail.indicator.description.asthma',
    defaultMessage: 'People who answer “yes” to both of the questions: “Have you ever been told by' +
    ' a doctor nurse, or other health professional that you have asthma?” and “Do you still have asthma?"',
    description: 'People who answer “yes” to both of the questions: “Have you ever been told by' +
    ' a doctor nurse, or other health professional that you have asthma?” and “Do you still have asthma?"',
  },
  DIABETES: {
    id: 'areaDetail.indicator.description.diabetes',
    defaultMessage: 'People ages 18 and up who report having been told by a doctor, nurse, or other' +
    ' health professionals that they have diabetes other than diabetes during pregnancy',
    description: 'People ages 18 and up who report having been told by a doctor, nurse, or other' +
    ' health professionals that they have diabetes other than diabetes during pregnancy',
  },
  DIESEL_PARTICULATE_MATTER: {
    id: 'areaDetail.indicator.description.dieselPartMatter',
    defaultMessage: 'Mixture of particles that is part of diesel exhaust in the air',
    description: 'Mixture of particles that is part of diesel exhaust in the air',
  },
  ENERGY_BURDEN: {
    id: 'areaDetail.indicator.description.energyBurden',
    defaultMessage: 'Average annual energy cost ($) divided by household income',
    description: 'Average annual energy cost ($) divided by household income',
  },
  FEMA_RISK: {
    id: 'areaDetail.indicator.description.femaRisk',
    defaultMessage: 'Expected Annual Loss Score, which is the average economic loss in dollars' +
    ' resulting from natural hazards each year.',
    description: 'Expected Annual Loss Score, which is the average economic loss in dollars' +
    ' resulting from natural hazards each year.',
  },
  HEART_DISEASE: {
    id: 'areaDetail.indicator.description.heartDisease',
    defaultMessage: 'People ages 18 and up who report ever having been told by a' +
    ' doctor, nurse, or other health professionals that they had angina or coronary heart disease',
    description: 'People ages 18 and up who report ever having been told by a' +
    ' doctor, nurse, or other health professionals that they had angina or coronary heart disease',
  },
  HOUSE_BURDEN: {
    id: 'areaDetail.indicator.description.houseBurden',
    defaultMessage: 'Households that are low income and spend more than 30% of their income on' +
    ' housing costs',
    description: 'Households that are low income and spend more than 30% of their income on' +
    ' housing costs',
  },
  LEAD_PAINT: {
    id: 'areaDetail.indicator.description.leadPaint',
    defaultMessage: 'Housing units built pre-1960, used as an indicator of potential'+
    ' lead paint exposure in homes',
    description: 'Housing units built pre-1960, used as an indicator of potential'+
    ' lead paint exposure in homes',
  },
  LIFE_EXPECT: {
    id: 'areaDetail.indicator.description.lifeExpect',
    defaultMessage: 'Estimated years of life expectancy',
    description: 'Estimated years of life expectancy',
  },
  PM_2_5: {
    id: 'areaDetail.indicator.description.pm25',
    defaultMessage: 'Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller',
    description: 'Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller',
  },
  TRAFFIC_VOLUME: {
    id: 'areaDetail.indicator.description.trafficVolume',
    defaultMessage: 'Count of vehicles (average annual daily traffic) at major roads within 500 meters,' +
    ' divided by distance in meters',
    description: 'Count of vehicles (average annual daily traffic) at major roads within 500 meters,' +
    ' divided by distance in meters',
  },
  WASTE_WATER: {
    id: 'areaDetail.indicator.description.wasteWater',
    defaultMessage: 'Toxic concentrations at stream segments within 500 meters divided by distance in' +
    ' kilometers',
    description: 'Toxic concentrations at stream segments within 500 meters divided by distance in' +
    ' kilometers',
  },
});


export const DOWNLOAD_DRAFT = {
  PARAGRAPH_1: <FormattedMessage
    id={'download.draft.ptag.1'}
    description={'Download the current list of communities and datasets used.'}
    defaultMessage={`
    {downloadDraft} of communities and datasets used (ZIP file will contain one .xlsx, 
    one .csv, and one .pdf, with a size of {downloadFileSize}). Last updated: {dateUpdated}.
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

export const HOW_YOU_CAN_HELP_LIST_ITEMS = {
  HEADING: <FormattedMessage
    id={'youCanHelpInfoText.heading'}
    description={'how one can help us improve the tool'}
    defaultMessage={`How you can help improve the tool`}
  />,
  LIST_ITEM_1: <FormattedMessage
    id={'youCanHelpInfoText.list.item.1'}
    description={'give us feedback on our data and methodology'}
    defaultMessage={`View our {dataMeth} page and send us feedback.`}
    values={{
      dataMeth:
    <Link to={'/methodology'}>
      {'Methodology and data'}
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
    defaultMessage={`Find communities of interest and {shareFeedback}.`}
    values={{
      shareFeedback:
        <a href={`mailto:${CONTACT_COPY.FEEDBACK_EMAIL}`}>
          {'share your feedback'}
        </a>,
    }}
  />,
  LIST_ITEM_3: <FormattedMessage
    id={'youCanHelpInfoText.list.item.3'}
    description={'share your feedback'}
    defaultMessage={`Respond to our request for information on {federalRegisterLink}.`}
    values={{
      federalRegisterLink:
        <a href={`https://www.federalregister.gov/`}>
          {'federalregister.gov'}
        </a>,
    }}
  />,

};
