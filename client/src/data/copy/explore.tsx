/* eslint-disable max-len */

import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';

import * as COMMON_COPY from './common';
import * as DOWNLOADS_COPY from './downloads';
import * as METHODOLOGY_COPY from './methodology';
import {PAGES_ENDPOINTS} from '../constants';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'explore.map.page.title.text',
    defaultMessage: 'Explore the map',
    description: 'On the explore the map page, the title of the page',
  },
  PAGE_HEADING: {
    id: 'explore.map.page.heading.text',
    defaultMessage: 'Explore the map',
    description: 'On the explore the map page, the heading of the page',
  },
});

export const PAGE_DESCRIPTION = <FormattedMessage
  id={'explore.map.page.description.text'}
  defaultMessage={`
    Use the map to see communities that are identified as disadvantaged. The map uses 
    publicly-available, nationally-consistent datasets. Learn more about 
    the methodology and datasets that were used to identify disadvantaged communities
    in the current version of the map on the <link1>Methodology & data</link1> page.
    `}
  description={'On the explore the map page, the description of the page'}
  values={{
    link1: COMMON_COPY.linkFn(PAGES_ENDPOINTS.METHODOLOGY, true, false),
  }}
/>;

export const LEGEND = defineMessages({
  PRIORITY_LABEL: {
    id: 'explore.map.page.label.text',
    defaultMessage: 'Disadvantaged community',
    description: 'On the explore the map page, the label of the legend',
  },
  PRIORITY_DESCRIPT: {
    id: 'explore.map.page.legend.description.text',
    defaultMessage: `
      Communities identified as disadvantaged by the map are those that are marginalized, underserved, 
      and overburdened by pollution. These communities are at or above the thresholds in one or 
      more of eight categories of criteria.
    `,
    description: 'On the explore the map page, the description of the legend',
  },
});


// Map
export const MAP = defineMessages({
  ZOOM_WARNING: {
    id: 'explore.map.page.map.zoom.warning',
    defaultMessage: 'Zoom in to the state or regional level to see prioritized communities on the map.',
    description: 'On the explore the map page, on the map, the zoom warning on map',
  },
  SEARCH_PLACEHOLDER: {
    id: 'explore.map.page.map.search.placeholder.text',
    defaultMessage: 'Search for an address, city, state or ZIP',
    description: 'On the explore the map page, on the map, the placeholder text for search',
  },
  SEARCH_PLACEHOLDER_MOBILE: {
    id: 'explore.map.page.map.search.placeholder.mobile.text',
    defaultMessage: 'Search locations',
    description: 'On the explore the map page, on the map, the placeholder text for search',
  },
  SEARCH_RESULTS_EMPTY_MESSAGE: {
    id: 'explore.map.page.map.search.results.empty.text',
    defaultMessage: 'Location not found or unknown. Please try a different search.',
    description: 'On the explore the map page, on the map, the text displaying message for no search results found',
  },
  LOWER48_SHORT: {
    id: 'explore.map.page.map.territoryFocus.lower48.short',
    defaultMessage: '48',
    description: `On the explore the map page, on the map, the abbreviated name indicating the bounds of 
      the Lower 48 states
    `,
  },
  LOWER48_LONG: {
    id: 'explore.map.page.map.territoryFocus.lower48.long',
    defaultMessage: 'Lower 48',
    description: `On the explore the map page, on the map, the longer name indicating the bounds of the Lower 48 states`,
  },
  ALASKA_SHORT: {
    id: 'explore.map.page.map.territoryFocus.alaska.short',
    defaultMessage: 'AK',
    description: 'On the explore the map page, on the map, the abbreviated indicating the bounds of Alaska',
  },
  ALASKA_LONG: {
    id: 'explore.map.page.map.territoryFocus.alaska.long',
    defaultMessage: 'Alaska',
    description: 'On the explore the map page, on the map, the full name indicating the bounds of Alaska',
  },
  HAWAII_SHORT: {
    id: 'explore.map.page.map.territoryFocus.hawaii.short',
    defaultMessage: 'HI',
    description: 'On the explore the map page, on the map, the abbreviated name indicating the bounds of Hawaii',
  },
  HAWAII_LONG: {
    id: 'explore.map.page.map.territoryFocus.hawaii.long',
    defaultMessage: 'Hawaii',
    description: 'On the explore the map page, on the map, the longer name indicating the bounds of Hawaii',
  },
  PR_SHORT: {
    id: 'explore.map.page.map.territoryFocus.puerto_rico.short',
    defaultMessage: 'PR',
    description: 'On the explore the map page, on the map, the abbreviated name indicating the bounds of Puerto Rico',
  },
  PR_LONG: {
    id: 'explore.map.page.map.territoryFocus.puerto_rico.long',
    defaultMessage: 'Puerto Rico',
    description: 'On the explore the map page, on the map, the full name indicating the bounds of Puerto Rico',
  },
  GU_SHORT: {
    id: 'explore.map.page.map.territoryFocus.guam.short',
    defaultMessage: 'GU',
    description: 'On the explore the map page, on the map, the abbreviated name indicating the bounds of Guam',
  },
  GU_LONG: {
    id: 'explore.map.page.map.territoryFocus.guam.long',
    defaultMessage: 'Guam',
    description: 'On the explore the map page, on the map, the full name indicating the bounds of Guam',
  },
  AS_SHORT: {
    id: 'explore.map.page.map.territoryFocus.american.samoa.short',
    defaultMessage: 'AS',
    description: `On the explore the map page, on the map, the abbreviated name indicating the bounds of American Samoa`,
  },
  AS_LONG: {
    id: 'explore.map.page.map.territoryFocus.american.samoa.long',
    defaultMessage: 'American Samoa',
    description: 'On the explore the map page, on the map, the full name indicating the bounds of American Samoa',
  },
  MP_SHORT: {
    id: 'explore.map.page.map.territoryFocus.commonwealth.nmp.short',
    defaultMessage: 'MP',
    description: `On the explore the map page, on the map, the abbreviated name indicating the bounds of Commonwealth of Northern Mariana Islands`,
  },
  MP_LONG: {
    id: 'explore.map.page.map.territoryFocus.commonwealth.nmp.long',
    defaultMessage: 'Commonwealth of Northern Mariana Islands',
    description: `On the explore the map page, on the map, the full name indicating the bounds of Commonwealth of Northern Mariana Islands`,
  },
  VI_SHORT: {
    id: 'explore.map.page.map.territoryFocus.us.virgin.islands.short',
    defaultMessage: 'VI',
    description: `On the explore the map page, on the map, the abbreviated name indicating the bounds of US Virgin Islands`,
  },
  VI_LONG: {
    id: 'explore.map.page.map.territoryFocus.us.virgin.islands.long',
    defaultMessage: 'US Virgin Islands',
    description: 'On the explore the map page, on the map, the full name indicating the bounds of US Virgin Islands',
  },
});


// Side Panel copy
export const SIDE_PANEL_INITIAL_STATE = defineMessages({
  TITLE: {
    id: 'explore.map.page.side.panel.info.title',
    defaultMessage: 'Things to know',
    description: 'introductory text of ways to use the map',
  },
  PARA1: {
    id: 'explore.map.page.side.panel.info.para1',
    defaultMessage: `
      This tool identifies communities that are marginalized, underserved, and overburdened by pollution. These communities are located in census tracts that are at or above the thresholds in one or more of eight categories of criteria.
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the first paragraph of this side panel`,
  },
  HEADING1: {
    id: 'explore.map.page.side.panel.info.heading1',
    defaultMessage: `
      Zoom in or search and select to see data about any census tract of interest
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the first paragraph of this side panel`,
  },
  PARA2: {
    id: 'explore.map.page.side.panel.info.para2',
    defaultMessage: `
      The tool uses census tracts that represent about 4,000 people, which is the smallest unit of geography for which consistent data can be displayed on the map.
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the second paragraph of this side panel`,
  },
  PARA3: {
    id: 'explore.map.page.side.panel.info.para3',
    defaultMessage: `
      The tool ranks each census tract using percentiles that show how much burden each tract experiences relative to all other tracts, for each criterion.
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the third paragraph of this side panel`,
  },
  PARA4: {
    id: 'explore.map.page.side.panel.info.para4',
    defaultMessage: `
      Percentages are used for certain variables, i.e. those relating to high school achievement rate and to the share of individuals not currently enrolled in higher education.
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the forth paragraph of this side panel`,
  },
  ALT_TEXT_ICON1: {
    id: 'explore.map.page.side.panel.info.alt.text.icon1',
    defaultMessage: `
      An icon that has depicts pieces of a block selected mimicking the census block census tracts
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the first icon in this side panel`,
  },
  ALT_TEXT_ICON2: {
    id: 'explore.map.page.side.panel.info.alt.text.icon2',
    defaultMessage: `
      An icon that a bell curve or gaussian distribution
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the second icon in this side panel`,
  },
  ALT_TEXT_ICON3: {
    id: 'explore.map.page.side.panel.info.alt.text.icon3',
    defaultMessage: `
      An icon that depicts a part of pie chart being removed
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the third icon in this side panel`,
  },
  ALT_TEXT_ICON4: {
    id: 'explore.map.page.side.panel.info.alt.text.icon4',
    defaultMessage: `
      An icon that has an up arrow and a down arrow
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the forth icon in this side panel`,
  },
});

export const SIDE_PANEL_INITIAL_STATE_PARA5 = <FormattedMessage
  id={'explore.map.page.side.panel.info.para5'}
  defaultMessage={ `
    Thresholds for each category determine if a tract should be identified as disadvantaged because it has exceeded a certain value for the relevant indicators.
  `}
  description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the fifth paragraph of this side pane`}
/>;

export const SIDE_PANEL_VERION = {
  TITLE: <FormattedMessage
    id={'explore.map.page.side.panel.version.title'}
    defaultMessage={ 'Methodology version {version}'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the methodology version number`}
    values= {{
      version: <FormattedNumber value={METHODOLOGY_COPY.VERSION_NUMBER}/>,
    }}
  />,
};

export const SIDE_PANEL_CBG_INFO = defineMessages({
  CENSUS_BLOCK_GROUP: {
    id: 'explore.map.page.side.panel.geographicInfo.censusBlockGroup',
    defaultMessage: 'Census tract:',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the census tract id number of the feature selected`,
  },
  COUNTY: {
    id: 'explore.map.page.side.panel.geographicInfo.county',
    defaultMessage: 'County:',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the county of the feature selected`,
  },
  STATE: {
    id: 'explore.map.page.side.panel.geographicInfo.state',
    defaultMessage: 'State: ',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the state of the feature selected`,
  },
  TERRITORY: {
    id: 'explore.map.page.side.panel.geographicInfo.territory',
    defaultMessage: 'Territory: ',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the territory of the feature selected`,
  },
  POPULATION: {
    id: 'explore.map.page.side.panel.geographicInfo.population',
    defaultMessage: 'Population:',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the population of the feature selected`,
  },
});

export const COMMUNITY = {
  OF_FOCUS: <FormattedMessage
    id={'explore.map.page.side.panel.community.of.focus'}
    defaultMessage={ 'YES'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the communities the score currently is focused on`}
  />,
  NOT_OF_FOCUS: <FormattedMessage
    id= {'explore.map.page.side.panel.not.community.of.focus'}
    defaultMessage= {'No'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the communities the score currently is not focused on`}
  />,
  IS_FOCUS: <FormattedMessage
    id={'explore.map.page.side.panel.is.community.of.focus'}
    defaultMessage={ 'Identified as disadvantaged?'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show asking IF the communities is focused on`}
  />,
  SEND_FEEDBACK: {
    TITLE: <FormattedMessage
      id={'explore.map.page.side.panel.send.feedback.title'}
      defaultMessage={ 'Send feedback'}
      description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show link to send feedback`}
    />,
    IMG_ICON: defineMessages({
      ALT_TAG: {
        id: 'explore.map.page.side.panel.send.feedback.alt.img',
        defaultMessage: 'Send feedback',
        description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a send feedback icon, this is the images alt tag`,
      },
    }),
  },
};

export const numberOfCategoriesExceeded = (categoryCount:number) => <FormattedMessage
  id={'explore.map.page.side.panel.num.categories.exceeded'}
  defaultMessage={`in {numberOfDisCategories, plural, one {# category} other {# categories}}`}
  description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show how many categories are exceeded`}
  values={{
    numberOfDisCategories: categoryCount,
  }}
/>;

// Temporarily commenting out as it may be needed again:
// export const numberOfThresholdsExceeded = (thresholds:number) => <FormattedMessage
//   id={'explore.map.page.side.panel.num.thresholds.exceeded'}
//   defaultMessage={`At or above {numberOfThresholdExceed, plural, one {# threshold} other {# thresholds}}`}
//   description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show how many thresholds are exceeded`}
//   values={{
//     numberOfThresholdExceed: thresholds,
//   }}
// />;

export const SEND_FEEDBACK = defineMessages({
  EMAIL_BODY: {
    id: 'explore.map.page.side.panel.send.feedback.email.body',
    defaultMessage: `Please provide feedback about this census tract, including about the datasets, the data categories provided for this census tract, the communities who live in this census tract, and anything else relevant that CEQ should know about this census tract.
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show link to send feedback
`,
  },
});

export const SIDE_PANEL_CATEGORY = defineMessages({
  INDICATOR: {
    id: 'explore.map.page.side.panel.category.header.indicator',
    defaultMessage: 'Indicator',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show header for each category
`,
  },
  PERCENTILE: {
    id: 'explore.map.page.side.panel.category.header.percentile',
    defaultMessage: 'Percentile (0-100)',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show header for each category
`,
  },
  CLIMATE: {
    id: 'explore.map.page.side.panel.indicator.title.climate',
    defaultMessage: 'Climate change',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Climate change title
`,
  },
  CLEAN_ENERGY: {
    id: 'explore.map.page.side.panel.indicator.title.clean.energy',
    defaultMessage: 'Clean energy and energy efficiency',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Clean, efficient energy title
`,
  },
  CLEAN_TRANSPORT: {
    id: 'explore.map.page.side.panel.indicator.title.clean.transport',
    defaultMessage: 'Clean transit',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Clean transportation title
`,
  },
  SUSTAIN_HOUSE: {
    id: 'explore.map.page.side.panel.indicator.title.sustain.house',
    defaultMessage: 'Sustainable housing',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Sustainable housing title
`,
  },
  LEG_POLLUTE: {
    id: 'explore.map.page.side.panel.indicator.title.legacy.pollution',
    defaultMessage: 'Legacy pollution',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Legacy pollution title
`,
  },
  CLEAN_WATER: {
    id: 'explore.map.page.side.panel.indicator.title.clean.water',
    defaultMessage: 'Clean water and wastewater infrastructure',
    description: `Navigate to the explore the tool page. When the map is in view, click on the map. The side panel will show Clean water and waste title
`,
  },
  HEALTH_BURDEN: {
    id: 'explore.map.page.side.panel.indicator.title.health.burden',
    defaultMessage: 'Health burdens',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Health burdens title
`,
  },
  WORK_DEV: {
    id: 'explore.map.page.side.panel.indicator.title.work.dev',
    defaultMessage: 'Workforce development',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Workforce development title
`,
  },
});

export const SIDE_PANEL_INDICATORS = defineMessages({
  EXP_AG_LOSS: {
    id: 'explore.map.page.side.panel.indicator.exp.ag.loss',
    defaultMessage: 'Expected agriculture loss rate',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show agriculture loss rate
`,
  },
  EXP_BLD_LOSS: {
    id: 'explore.map.page.side.panel.indicator.exp.bld.loss',
    defaultMessage: 'Expected building loss rate',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show building loss rate
`,
  },
  EXP_POP_LOSS: {
    id: 'explore.map.page.side.panel.indicator.exp.pop.loss',
    defaultMessage: 'Expected population loss rate',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show population loss rate
`,
  },
  LOW_INCOME: {
    id: 'explore.map.page.side.panel.indicator.low.income',
    defaultMessage: 'Low income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show low income`},
  HIGH_ED: {
    id: 'explore.map.page.side.panel.indicator.high.ed',
    defaultMessage: 'Higher education non-enrollment',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Higher ed degree achievement rate
`,
  },
  ENERGY_BURDEN: {
    id: 'explore.map.page.side.panel.indicator.energyBurden',
    defaultMessage: 'Energy burden',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Energy burden`,
  },
  PM_2_5: {
    id: 'explore.map.page.side.panel.indicator.pm25',
    defaultMessage: 'PM2.5 in the air',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show PM2.5 in the air`,
  },
  DIESEL_PARTICULATE_MATTER: {
    id: 'explore.map.page.side.panel.indicator.dieselPartMatter',
    defaultMessage: 'Diesel particulate matter exposure',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Diesel particulate matter exposure`,
  },
  TRAFFIC_VOLUME: {
    id: 'explore.map.page.side.panel.indicator.trafficVolume',
    defaultMessage: 'Traffic proximity and volume',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Traffic proximity and volume`,
  },
  LEAD_PAINT: {
    id: 'explore.map.page.side.panel.indicator.leadPaint',
    defaultMessage: 'Lead paint',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Lead paint`,
  },
  MED_HOME_VAL: {
    id: 'explore.map.page.side.panel.indicator.med.home.val',
    defaultMessage: 'Median home value',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Housing cost burden`,
  },
  HOUSE_BURDEN: {
    id: 'explore.map.page.side.panel.indicator.houseBurden',
    defaultMessage: 'Housing cost burden',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Housing cost burden`,
  },
  PROX_HAZ: {
    id: 'explore.map.page.side.panel.indicator.prox.haz',
    defaultMessage: 'Proximity to hazardous waste facilities',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Proximity to hazardous waste facilities`,
  },
  PROX_NPL: {
    id: 'explore.map.page.side.panel.indicator.prox.npl',
    defaultMessage: 'Proximity to National Priorities List (NPL) sites',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Count of proposed or listed NPL `,
  },
  PROX_RMP: {
    id: 'explore.map.page.side.panel.indicator.prox.rmp',
    defaultMessage: 'Proximity to Risk Management Plan (RMP) facilities',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Count of proposed or listed RMP`,
  },
  WASTE_WATER: {
    id: 'explore.map.page.side.panel.indicator.wasteWater',
    defaultMessage: 'Wastewater discharge',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Wastewater discharge`,
  },
  ASTHMA: {
    id: 'explore.map.page.side.panel.indicator.asthma',
    defaultMessage: 'Asthma',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Asthma`,
  },
  DIABETES: {
    id: 'explore.map.page.side.panel.indicator.diabetes',
    defaultMessage: 'Diabetes',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Diabetes`,
  },
  HEART_DISEASE: {
    id: 'explore.map.page.side.panel.indicator.heartDisease',
    defaultMessage: 'Heart disease',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Heart disease`,
  },
  LIFE_EXPECT: {
    id: 'explore.map.page.side.panel.indicator.lifeExpect',
    defaultMessage: 'Low life expectancy',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Low life expectancy`,
  },
  LOW_MED_INC: {
    id: 'explore.map.page.side.panel.indicator.low.med.income',
    defaultMessage: 'Low median income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Low median income`,
  },
  LING_ISO: {
    id: 'explore.map.page.side.panel.indicator.ling.iso',
    defaultMessage: 'Linguistic isolation',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Linguistic isolation`,
  },
  UNEMPLOY: {
    id: 'explore.map.page.side.panel.indicator.unemploy',
    defaultMessage: 'Unemployment',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Unemployment`,
  },
  POVERTY: {
    id: 'explore.map.page.side.panel.indicator.poverty',
    defaultMessage: 'Poverty',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Unemployment`,
  },
  HIGH_SCL: {
    id: 'explore.map.page.side.panel.indicator.high.school',
    defaultMessage: 'High school degree non-attainment',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show High school degree achievement rate`,
  },
});

export const SIDE_PANEL_VALUES = {
  ABOVE: <FormattedMessage
    id={'explore.map.page.side.panel.indicator.value.subtext.above'}
    description={'indicating above threshold'}
    defaultMessage={`above `}
  />,
  BELOW: <FormattedMessage
    id={'explore.map.page.side.panel.indicator.value.subtext.below'}
    description={'indicating below threshold'}
    defaultMessage={`below `}
  />,
  PERCENT: <FormattedMessage
    id={'explore.map.page.side.panel.indicator.value.subtext.percent'}
    description={'indicating percent units'}
    defaultMessage={`percent`}
  />,
  PERCENTILE: <FormattedMessage
    id={'explore.map.page.side.panel.indicator.value.subtext.percentile'}
    description={'indicating percentile units'}
    defaultMessage={`percentile`}
  />,
  IMG_ALT_TEXT: defineMessages({
    ARROW_UP: {
      id: 'explore.map.page.side.panel.indicator.value.arrow.up.alt.text',
      description: 'image alt text for the up arrow',
      defaultMessage: `an icon for the up arrow`,
    },
    ARROW_DOWN: {
      id: 'explore.map.page.side.panel.indicator.value.arrow.down.alt.text',
      description: 'image alt text for the down arrow',
      defaultMessage: `an icon for the down arrow`,
    },
    UNAVAILABLE: {
      id: 'explore.map.page.side.panel.indicator.value.unavailable.alt.text',
      description: 'image alt text for unavailable icon',
      defaultMessage: `an icon to represent data is unavailable`,
    },
  }),
  UNAVAILBLE_MSG: <FormattedMessage
    id={'explore.map.page.side.panel.indicator.value.subtext.unavailable'}
    description={'subtext for indicator when data is N/A'}
    defaultMessage={`data is not available`}
  />,
};

export const SIDE_PANEL_INDICATOR_DESCRIPTION = defineMessages({
  EXP_AG_LOSS: {
    id: 'explore.map.page.side.panel.indicator.description.exp.ag.loss',
    defaultMessage: 'Economic loss rate to agricultural value resulting from natural hazards each year',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Economic loss rate to agriculture resulting from natural hazards
    `,

  },
  EXP_BLD_LOSS: {
    id: 'explore.map.page.side.panel.indicator.description.exp.bld.loss',
    defaultMessage: 'Economic loss rate to building value resulting from natural hazards each year',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side 
    panel will show an indicator description of Economic loss rate to buildings resulting from natural hazards`,
  },
  EXP_POP_LOSS: {
    id: 'explore.map.page.side.panel.indicator.description.exp.pop.loss',
    defaultMessage: `
      Rate of fatalities and injuries resulting from natural hazards each year
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Economic loss rate to the population in fatalities and 
      injuries resulting from natural hazards`,
  },
  LOW_INCOME: {
    id: 'explore.map.page.side.panel.indicator.description.low.income',
    defaultMessage: `
      Household income is less than or equal to twice the federal poverty level 
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Household income is less than or equal to twice the federal poverty level`,
  },
  HIGH_ED: {
    id: 'explore.map.page.side.panel.indicator.description.high.ed',
    defaultMessage: `
      Percent of the census tract's population 15 or older not enrolled in college, university, or 
      graduate school 
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Percent of the census tract's population 15 or older not 
      enrolled in college, university, or graduate school`,
  },
  ENERGY_BURDEN: {
    id: 'explore.map.page.side.panel.indicator.description.energyBurden',
    defaultMessage: 'Average annual energy costs divided by household income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Energy costs divided by household income`,
  },
  PM_2_5: {
    id: 'explore.map.page.side.panel.indicator.description.pm25',
    defaultMessage: 'Fine inhalable particles, 2.5 micrometers or smaller',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Fine inhalable particles, 2.5 micrometers and smaller`,
  },

  DIESEL_PARTICULATE_MATTER: {
    id: 'explore.map.page.side.panel.indicator.description.dieselPartMatter',
    defaultMessage: 'Diesel exhaust in the air',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Diesel exhaust in the air`,
  },
  TRAFFIC_VOLUME: {
    id: 'explore.map.page.side.panel.indicator.description.trafficVolume',
    defaultMessage: 'Count of vehicles at major roads within 500 meters',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Count of vehicles at major roads within 500 meters`,
  },

  LEAD_PAINT: {
    id: 'explore.map.page.side.panel.indicator.description.leadPaint',
    defaultMessage: `
      Percentile of number of homes built before 1960 that are not among the most expensive
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Pre-1960 housing`,
  },
  MED_HOME_VAL: {
    id: 'explore.map.page.side.panel.indicator.description.med.home.val',
    defaultMessage: 'Median home value in area',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Median home value in area`,

  },
  HOUSE_BURDEN: {
    id: 'explore.map.page.side.panel.indicator.description.houseBurden',
    defaultMessage: 'Low income households spending more than 30% of income on housing',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Low income households spending more than 30% of income housing
    `,
  },

  PROX_HAZ: {
    id: 'explore.map.page.side.panel.indicator.description.prox.haz',
    defaultMessage: 'Count of hazardous waste facilities within 5 kilometers',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Count of hazardous waste facilities within 5 kilometers`,
  },
  PROX_NPL: {
    id: 'explore.map.page.side.panel.indicator.description.prox.npl',
    defaultMessage: 'Proposed or listed NPL (Superfund) sites within 5 kilometers',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Proposed or listed NPL (Superfund) sites within 5 kilometers`,
  },
  PROX_RMP: {
    id: 'explore.map.page.side.panel.indicator.description.prox.rmp',
    defaultMessage: 'RMP facilities within 5 kilometers',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Risk Management Plan facilities within 5 kilometers`,
  },

  WASTE_WATER: {
    id: 'explore.map.page.side.panel.indicator.description.wasteWater',
    defaultMessage: 'Toxic concentrations at stream segments within 500 meters',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Toxic concentrations at stream segments within 500 meters`,
  },

  ASTHMA: {
    id: 'explore.map.page.side.panel.indicator.description.asthma',
    defaultMessage: 'Weighted percent of people who have been told they have asthma',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Number of people who have been told they have asthma`,
  },
  DIABETES: {
    id: 'explore.map.page.side.panel.indicator.description.diabetes',
    defaultMessage: `
      Weighted percent of people ages 18 years and older who have diabetes other than 
      diabetes during pregnancy
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of People ages 18 years and older who have diabetes other than 
      diabetes during pregnancy`,
  },
  HEART_DISEASE: {
    id: 'explore.map.page.side.panel.indicator.description.heartDisease',
    defaultMessage: `People ages 18 years and older who have been told they have heart disease`,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Weighted percent of people ages 18 years and older who have 
    been told they have heart disease`,
  },
  LOW_LIFE_EXPECT: {
    id: 'explore.map.page.side.panel.indicator.description.lifeExpect',
    defaultMessage: 'Average number of years a person can expect to live',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Average number of years of life a person can expect to live`,
  },

  LOW_MED_INCOME: {
    id: 'explore.map.page.side.panel.indicator.description.low.med.income',
    defaultMessage: 'Median income calculated as a percent of the area’s median income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Median income calculated as a percent of the area’s median income`,
  },
  LING_ISO: {
    id: 'explore.map.page.side.panel.indicator.description.ling.iso',
    defaultMessage: `
      Percent of households where no one over the age 14 speaks English well
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Households in which no one age 14 and over speaks English only or also speaks a language other than English`,
  },
  UNEMPLOY: {
    id: 'explore.map.page.side.panel.indicator.description.unemploy',
    defaultMessage: 'Number of unemployed people as a percentage of the labor force',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side 
    panel will show an indicator description of Number of unemployed people as a percentage of the labor force`,
  },
  POVERTY: {
    id: 'explore.map.page.side.panel.indicator.description.poverty',
    defaultMessage: `
      Percent of a census tract's population in households where the household income is at or below 100% 
      of the Federal poverty level 
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Percent of individuals in households where the household income is at or below 100% of the federal poverty level`,
  },
  HIGH_SKL: {
    id: 'explore.map.page.side.panel.indicator.description.high.school',
    defaultMessage: `
      Percent of people ages 25 years or older whose education level is less than a high school diploma 
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Percent of people ages 25 years or older whose education level 
      is less than a high school diploma`,
  },
});

export const SIDE_PANEL_SPACERS = {
  EXCEED_ONE_OR_MORE: <FormattedMessage
    id={'explore.map.page.side.panel.at.or.above.at.least.one'}
    defaultMessage={`At or above at least one threshold?`}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. Click on a category to expand. This is the first question text around thresholds.`}
  />,
  EXCEED_BOTH_SOCIO: <FormattedMessage
    id={'explore.map.page.side.panel.at.or.above.both.thresholds'}
    defaultMessage={`At or above both associated thresholds?`}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. Click on a category to expand. This is the second question text around thresholds.`}
  />,
  YES: <FormattedMessage
    id={'explore.map.page.side.panel.exceed.burden.answer.yes'}
    defaultMessage={`Yes`}
    description={'Navigate to the explore the map page. When the map is in view, click on the map. This will display YES if the census tract is disadvantaged'}
  />,
  NO: <FormattedMessage
    id={'explore.map.page.side.panel.exceed.burden.answer.no'}
    defaultMessage={`No`}
    description={'Navigate to the explore the map page. When the map is in view, click on the map. This will display NO if the census tract is disadvantaged'}
  />,
  AND: <FormattedMessage
    id={'explore.map.page.side.panel.spacer.and'}
    defaultMessage={`AND`}
    description={'Navigate to the explore the map page. When the map is in view, click on the map. Click on a category to expand. This is the AND spacer around thresholds.'}
  />,
};

export const DOWNLOAD_DRAFT = {
  PARAGRAPH_1: <FormattedMessage
    id={'explore.map.page.under.map.download.draft.ptag.1'}
    defaultMessage={`
      <link1>Download the data sources</link1> used in the CEJST (.csv, .xlxs, .pdf that describes how to use the list, and a codebook, {downloadFileSize} unzipped). Last updated: {dateUpdated}.
    `}
    description={`
      Navigate to the explore the map page. Under the map, you will see a link that is placed below the 
      map that will download the data packet
    `}
    values={{
      link1: COMMON_COPY.downloadLink(DOWNLOADS_COPY.DOWNLOAD_FILES.SHAPE_FILE.URL),
      downloadFileSize: <FormattedNumber
        value={DOWNLOADS_COPY.DOWNLOAD_FILES.SHAPE_FILE.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
      dateUpdated: <FormattedDate
        value={DOWNLOADS_COPY.DOWNLOAD_FILES.SHAPE_FILE.LAST_UPDATED}
        year="2-digit"
        month="2-digit"
        day="2-digit"
      />,
    }}
  />,
};

export const NOTE_ON_TERRITORIES = {
  INTRO: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.intro'}
    defaultMessage={`A note on the U.S. territories`}
    description={`Navigate to the explore the map page. Under the map, you will see territories intro text`}
  />,
  PARA_1: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.1'}
    defaultMessage={`
      The data sources described on the <link1>Methodology & data</link1> page are used to 
      identify disadvantaged communities in all fifty states and the District of Columbia. However, not all 
      of these data sources are currently available for the U.S. territories.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 1`}
    values={{
      link1: COMMON_COPY.linkFn(PAGES_ENDPOINTS.METHODOLOGY, true, false),
    }}
  />,
  PARA_2: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.2'}
    defaultMessage={`
      For Puerto Rico, the Census Bureau’s American Community Survey data from 2015-2019 are used for higher 
      ed enrollment rate and all the other fields in the Training and Workforce Development category 
      to identify disadvantaged communities. Data in the other categories are unavailable at this 
      time.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 2`}
  />,
  PARA_3: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.3'}
    defaultMessage={`
      For American Samoa and the Northern Mariana Islands, the data used to identify 
      disadvantaged communities are from the 2010 Decennial Census, the last reported data from the 
      U.S. Census Bureau. Available data for these territories includes unemployment, poverty,  
      low median income, and high school degree achievement rate fields in the Training and 
      Workforce Development category.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 3`}
  />,
  PARA_4: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.4'}
    defaultMessage={`
      Work is currently underway to identify disadvantaged communities and update the 
      map accordingly for Guam and the U.S. Virgin Islands.
        `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 4`}
  />,
};

export const NOTE_ON_TRIBAL_NATIONS = {
  INTRO: <FormattedMessage
    id={'explore.map.page.under.map.note.on.tribal.nations.intro'}
    defaultMessage={`A note on Tribal Nations`}
    description={`Navigate to the explore the map page. Under the map, you will see tribal nations intro text`}
  />,
  PARA_1: <FormattedMessage
    id={'explore.map.page.under.map.note.on.tribal.nations.para.1'}
    defaultMessage={`
      The map covers all U.S. census tracts, including those located within Tribal Nations, to the extent 
      that data is available (see our <link1>Methodology & data</link1> page for more information). CEQ 
      is engaging in consultation and coordination with Tribal Nations on the beta version of the map 
      to provide Tribal Nations with meaningful opportunities for input, consistent with CEQ’s <link2>
      Action Plan for Consultation and Coordination with Tribal Nations</link2>,
      <link3>President Biden’s Memorandum on Tribal Consultation and Strengthening 
      Nation-to-Nation Consultation</link3>, and Executive Order 13175 on <link4>Consultation and 
      Coordination With Indian Tribal Governments</link4>.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see tribal nations paragraph 1`}
    values={{
      link1: COMMON_COPY.linkFn(PAGES_ENDPOINTS.METHODOLOGY, true, false),
      link2: COMMON_COPY.linkFn(`https://www.whitehouse.gov/wp-content/uploads/2022/01/CEQ-Tribal-Consultation-Plan-04.26.2021.pdf`, false, true),
      link3: COMMON_COPY.linkFn(`https://www.whitehouse.gov/briefing-room/presidential-actions/2021/01/26/memorandum-on-tribal-consultation-and-strengthening-nation-to-nation-relationships/`, false, true),
      link4: COMMON_COPY.linkFn(`https://www.federalregister.gov/documents/2000/11/09/00-29003/consultation-and-coordination-with-indian-tribal-governments`, false, true),
    }}
  />,
};

export const HOW_YOU_CAN_HELP_LIST_ITEMS = {
  HEADING: <FormattedMessage
    id={'explore.map.page.under.map.how.you.can.help.heading'}
    description={`Navigate to the explore the map page. Under the map, you will see how one can help us improve the map`}
    defaultMessage={`How you can help improve the map`}
  />,
  LIST_ITEM_1: <FormattedMessage
    id={'explore.map.page.under.map.how.you.can.help.list.item.1'}
    description={`
      Navigate to the explore the map page. Under the map, you will see give us feedback on our data and methodology
    `}
    defaultMessage={`View the <link1>Methodology & data</link1> page and send feedback.`}
    values={{
      link1: COMMON_COPY.linkFn(PAGES_ENDPOINTS.METHODOLOGY, true, false),
    }}
  />,
  LIST_ITEM_2: <FormattedMessage
    id={'explore.map.page.under.map.how.you.can.help.list.item.2'}
    description={`Navigate to the explore the map page. Under the map, you will see share your feedback`}
    defaultMessage={`Use the map to find communities and <link1>share your feedback</link1>.`}
    values={{
      link1: COMMON_COPY.linkFn(`mailto:${COMMON_COPY.FEEDBACK_EMAIL}`, false, true),
    }}
  />,
  LIST_ITEM_3: <FormattedMessage
    id={'explore.map.page.under.map.how.you.can.help.list.item.3'}
    description={`Navigate to the explore the map page. Under the map, you will see RFI is expired`}
    defaultMessage={`The Request for Information on the Federal Register is now closed.`}
  />,

};
