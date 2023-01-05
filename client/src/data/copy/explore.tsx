/* eslint-disable max-len */

import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';

import {linkFn, boldFn, downloadLink} from './common';
import {DOWNLOAD_FILES} from './downloads';
import {VERSION_NUMBER} from './methodology';
import {PAGES_ENDPOINTS} from '../constants';

export const EXPLORE_PAGE_LINKS = {
  WH_GOV_TRIBAL_ACTION_PLAN_4_26_21: `https://www.whitehouse.gov/wp-content/uploads/2022/01/CEQ-Tribal-Consultation-Plan-04.26.2021.pdf`,
  WH_GOV_TRIBAL_CONSULT_NATION_NATION_01_25_21: `https://www.whitehouse.gov/briefing-room/presidential-actions/2021/01/26/memorandum-on-tribal-consultation-and-strengthening-nation-to-nation-relationships/`,
  FED_REGISTER_CONSULT_TRIBE_GOV_2000: `https://www.federalregister.gov/documents/2000/11/09/00-29003/consultation-and-coordination-with-indian-tribal-governments`,
  CENSUS_15_19: `https://www.census.gov/programs-surveys/decennial-census/data.html`,
  DECENNIAL: `https://www.census.gov/programs-surveys/decennial-census/data.html`,
};

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

export const PAGE_DESCRIPTION1 = <FormattedMessage
  id={'explore.map.page.description.1'}
  defaultMessage={`
    Census tracts that are overburdened and underserved are highlighted as being disadvantaged on the map. Federally Recognized Tribes, including Alaska Native Villages, are also considered disadvantaged communities. 
  `}
  description={'On the explore the map page, the first description of the page'}
/>;

export const PAGE_DESCRIPTION2 = <FormattedMessage
  id={'explore.map.page.description.2'}
  defaultMessage={`
    Zooming in and selecting shows information about each census tract. 
  `}
  description={'On the explore the map page, the fifth description of the page'}
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

// Explore the data box
export const EXPLORE_DATA_BOX = defineMessages({
  TITLE: {
    id: 'explore.map.page.explore.data.box.title',
    defaultMessage: 'Get the data',
    description: 'On the explore the map page, a summary box title of Get the data',
  },
});

export const EXPLORE_DATA_BOX_BODY = <FormattedMessage
  id={'explore.map.page.explore.data.box.body'}
  defaultMessage={ `
    Download the data with documentation and shapefile from the <link1>downloads</link1> page.
  `}
  description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know, this is the fifth paragraph of this side pane`}
  values={{
    link1: linkFn(PAGES_ENDPOINTS.DOWNLOADS, true, false),
  }}
/>;

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
  GEOLOC_MSG_LOCATING: {
    id: 'explore.map.page.map.geolocation.locating',
    defaultMessage: 'Finding location...',
    description: 'On the explore the map page, on the map, this is the message above the gelocation icon that geolocation is locating.',
  },
  GEOLOC_MSG_DISABLED: {
    id: 'explore.map.page.map.geolocation.disabled',
    defaultMessage: 'Geolocation disabled',
    description: 'On the explore the map page, on the map, this is the message above the gelocation icon that geolocation is disabled.',
  },
  // GEOLOC_MSG_OFF: {
  //   id: 'explore.map.page.map.geolocation.off',
  //   defaultMessage: 'Geolocation off',
  //   description: 'On the explore the map page, on the map, this is the message above the gelocation icon that geolocation is off.',
  // },
  // GEOLOC_MSG_LOCKED: {
  //   id: 'explore.map.page.map.geolocation.locked',
  //   defaultMessage: 'Geolocation locked',
  //   description: 'On the explore the map page, on the map, this is the message above the gelocation icon that geolocation is locked.',
  // },
  CENSUS_TRACT_LONG: {
    id: 'explore.map.page.map.layer.selector.tracts.long',
    defaultMessage: 'Census Tracts',
    description: 'On the explore the map page, on the map, the full name indicating Census Tracts',
  },
  CENSUS_TRACT_SHORT: {
    id: 'explore.map.page.map.layer.selector.tracts.short',
    defaultMessage: 'Tracts',
    description: 'On the explore the map page, on the map, the short name indicating Census Tracts',
  },
  TRIBAL_LANDS_LONG: {
    id: 'explore.map.page.map.layer.selector.tribal.long',
    defaultMessage: 'Tribal Lands',
    description: 'On the explore the map page, on the map, the full name indicating Tribal Lands',
  },
  TRIBAL_LANDS_SHORT: {
    id: 'explore.map.page.map.layer.selector.tribal.short',
    defaultMessage: 'Tribal',
    description: 'On the explore the map page, on the map, the short name indicating Tribal Lands',
  },
});


// Side Panel non-selected state copy
export const SIDE_PANEL_INITIAL_STATE = defineMessages({
  HEADING1: {
    id: 'explore.map.page.side.panel.info.heading1',
    defaultMessage: `
      How to use the map:
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the first heading of the non-selected side panel',
  },
  PARA1_PART1: {
    id: 'explore.map.page.side.panel.info.para.1.part.1',
    defaultMessage: `
      Zoom in
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Zoom in',
  },
  PARA1_PART2: {
    id: 'explore.map.page.side.panel.info.para.1.part.2',
    defaultMessage: `
      , search
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show search',
  },
  PARA1_PART3: {
    id: 'explore.map.page.side.panel.info.para.1.part.3',
    defaultMessage: `
      , or locate yourself 
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show or locate yourself',
  },
  PARA1_PART4: {
    id: 'explore.map.page.side.panel.info.para.1.part.4',
    defaultMessage: `
      and select
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show and select',
  },
  PARA1_PART5: {
    id: 'explore.map.page.side.panel.info.para.1.part.5',
    defaultMessage: `
      to see information about any census tract.
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show to see information about any census tract',
  },
  HEADING2: {
    id: 'explore.map.page.side.panel.info.heading2',
    defaultMessage: `
     Things to know:
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Things to know:`,
  },
  PARA2_PART1: {
    id: 'explore.map.page.side.panel.info.para.2.part.1',
    defaultMessage: `
      The tool uses census tracts
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show The tool uses census tracts',
  },
  PARA2_PART2: {
    id: 'explore.map.page.side.panel.info.para.2.part.2',
    defaultMessage: `
    . Census tracts are a small unit of geography. They generally have populations 
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Census tracts are a small unit of geography. They generally have populations of between 1,200 - 8,000 people.',
  },
  PARA2_PART3: {
    id: 'explore.map.page.side.panel.info.para.2.part.3',
    defaultMessage: `
      of between 1,200 - 8,000 people.
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Census tracts are a small unit of geography. They generally have populations of between 1,200 - 8,000 people.',
  },
  PARA3_PART1: {
    id: 'explore.map.page.side.panel.info.para.3.part.1',
    defaultMessage: `
      Communities that are disadvantaged live in tracts that experience burdens. These tracts are highlighted 
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Communities that are disadvantaged live in tracts that experience burdens. These tracts are highlighted on the map.',
  },
  PARA3_PART2: {
    id: 'explore.map.page.side.panel.info.para.3.part.2',
    defaultMessage: `
    on the map.
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show on the map. This color is an opacity. This is so information about the map can be seen.',
  },
  PARA4_PART1: {
    id: 'explore.map.page.side.panel.info.para.4.part.1',
    defaultMessage: `
      The tool ranks most of the burdens using percentiles
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show The tool ranks most of the burdens using percentiles',
  },
  PARA4_PART2: {
    id: 'explore.map.page.side.panel.info.para.4.part.2',
    defaultMessage: `
    . Percentiles show how much burden each tract experiences when compared to other tracts.
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show percentages',
  },
  PARA5_PART1: {
    id: 'explore.map.page.side.panel.info.para.1',
    defaultMessage: `
      Thresholds
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Thresholds, or cutoffs, are used to determine if communities in a tract are disadvantaged. Certain burdens use percentages or a simple yes/no.',
  },
  PARA5_PART2: {
    id: 'explore.map.page.side.panel.info.para.2',
    defaultMessage: `
    , or cutoffs, are used to determine if communities in a tract are disadvantaged. Certain burdens use percentages 
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Thresholds, or cutoffs, are used to determine if communities in a tract are disadvantaged. Certain burdens use percentages or a simple yes/no.',
  },
  PARA5_PART3: {
    id: 'explore.map.page.side.panel.info.para.3',
    defaultMessage: `
      or a simple yes/no
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Thresholds, or cutoffs, are used to determine if communities in a tract are disadvantaged. Certain burdens use percentages or a simple yes/no.',
  },
  PARA5_PART4: {
    id: 'explore.map.page.side.panel.info.para.4',
    defaultMessage: `
      .
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Thresholds, or cutoffs, are used to determine if communities in a tract are disadvantaged. Certain burdens use percentages or a simple yes/no.',
  },
  PARA6_PART1: {
    id: 'explore.map.page.side.panel.info.para.6.part1',
    defaultMessage: `
      Land within the boundaries of Federally Recognized Tribes and point locations for Alaska Native Villages are highlighted
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Federally Recognized Tribal lands are also highlighted on the map. These communities are also considered disadvantaged.',
  },
  PARA6_PART2: {
    id: 'explore.map.page.side.panel.info.para.6.part2',
    defaultMessage: `
      on the map. These communities are also considered disadvantaged.
    `,
    description: '`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Federally Recognized Tribal lands are also highlighted on the map. These communities are also considered disadvantaged.',
  },
});

export const SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT = defineMessages({
  PLUS: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.plus',
    defaultMessage: `
      a plus icon indicating that the user can zoom in
    *`,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a plus icon indicating that the user can zoom in`,
  },
  SEARCH: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.search',
    defaultMessage: `
      a magnifying glass icon informing the user can search
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a magnifying glass icon informing the user can search`,
  },
  LOCATE: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.locate',
    defaultMessage: `
      a gps icon informing the user can locate
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a gps icon informing the user can locate`,
  },
  MOUSE: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.mouse',
    defaultMessage: `
      a mouse arrow icon informing the user can use the mouse
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a mouse arrow icon informing the user can use the mouse`,
  },
  TRACT: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.tract',
    defaultMessage: `
      a tract icon informing the user of census tracts
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a tract icon informing the user of census tracts`,
  },
  PEOPLE: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.people',
    defaultMessage: `
      a people icon informing the user of communities
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a tract icon informing the user of people`,
  },
  DAC_CIRCLE: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.dac.circle',
    defaultMessage: `
      a blue circle icon informing the user of what a disadvantaged community is depicted as
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show a blue circle icon informing the user of what a disadvantaged community is depicted as`,
  },
  BELL_CURVE: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.bell',
    defaultMessage: `
      An icon that a bell curve or gaussian distribution
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show An icon that a bell curve or gaussian distribution`,
  },
  FILE_UP: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.file.up',
    defaultMessage: `
      An icon shows a up arrow with a lower limit implying that it's above a threshold
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show An icon that a bell curve or gaussian distribution`,
  },
  PIE_CHART: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.pie',
    defaultMessage: `
      An icon that depicts a part of pie chart being removed
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show An icon that depicts a part of pie chart being removed`,
  },
  CHECK: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.check',
    defaultMessage: `
      An icon that depicts a check mark conveying yes and/or no
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show An icon that depicts a check mark conveying yes and/or no`,
  },
  UP_ARROW: {
    id: 'explore.map.page.side.panel.info.alt.text.icon.up.arrow',
    defaultMessage: `
      An icon that has an up arrow and a down arrow
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show An icon that has an up arrow and a down arrow`,
  },
});

export const SIDE_PANEL_VERSION = {
  TITLE: <FormattedMessage
    id={'explore.map.page.side.panel.version.title'}
    defaultMessage={ 'Methodology version {version}'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the methodology version number`}
    values= {{
      /**
       * FormattedNumber currently renders 1.0 as 1. When the version number has a decimal point add back the
       * Formatted Message component. Using toFixed will render the desire, however it returns a string which
       * is unacceptable by the value prop of FormattedNumber.
       */
      // version: <FormattedNumber value={VERSION_NUMBER} style="decimal"/>,
      version: VERSION_NUMBER,
    }}
  />,
};

export const SIDE_PANEL_CBG_INFO = defineMessages({
  CENSUS_INFO_TITLE: {
    id: 'explore.map.page.side.panel.geographicInfo.title',
    defaultMessage: 'Tract information',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the census tract info title`,
  },
  CENSUS_BLOCK_GROUP: {
    id: 'explore.map.page.side.panel.geographicInfo.censusBlockGroup',
    defaultMessage: 'Number:',
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

export const SIDE_PANEL_DEMOGRAPHICS = {
  TITLE: <FormattedMessage
    id={'explore.map.page.side.panel.demo.title'}
    defaultMessage={'Tract demographics'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demograhics title`}
  />,
  RACE_TITLE: <FormattedMessage
    id={'explore.map.page.side.panel.demo.race.title'}
    defaultMessage={'Race / Ethnicity'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demograhics race title`}
  />,
  AGE_TITLE: <FormattedMessage
    id={'explore.map.page.side.panel.demo.age.title'}
    defaultMessage={'Age'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demograhics age title`}
  />,
  DEMO_NON_HISPANIC_WHITE: <FormattedMessage
    id={'explore.map.page.side.panel.demo.white'}
    defaultMessage={'White'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: White`}
  />,
  DEMO_BLACK: <FormattedMessage
    id={'explore.map.page.side.panel.demo.black'}
    defaultMessage={'Black or African American'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Black`}
  />,
  DEMO_AMERICAN_INDIAN: <FormattedMessage
    id={'explore.map.page.side.panel.demo.american.indian'}
    defaultMessage={'American Indian and Alaska Native'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: American Indian and Alaska Native`}
  />,
  DEMO_ASIAN: <FormattedMessage
    id={'explore.map.page.side.panel.demo.asian'}
    defaultMessage={'Asian'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Asian`}
  />,
  DEMO_HAWAIIAN: <FormattedMessage
    id={'explore.map.page.side.panel.demo.hawaiian'}
    defaultMessage={'Native Hawaiian or Pacific Islander'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Native Hawiian or Pacific Islander`}
  />,
  DEMO_OTHER_RACE: <FormattedMessage
    id={'explore.map.page.side.panel.demo.other'}
    defaultMessage={'Other'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Other`}
  />,
  DEMO_TWO_OR_MORE_RACES: <FormattedMessage
    id={'explore.map.page.side.panel.demo.two.or.more'}
    defaultMessage={'Two or more races'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Two or more races`}
  />,
  DEMO_HISPANIC: <FormattedMessage
    id={'explore.map.page.side.panel.demo.hispanic'}
    defaultMessage={'Hispanic or Latino'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Hispanic or Latino`}
  />,
  DEMO_AGE_UNDER_10: <FormattedMessage
    id={'explore.map.page.side.panel.demo.age.under.10'}
    defaultMessage={'Children under 10'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Children under 10`}
  />,
  DEMO_AGE_MID: <FormattedMessage
    id={'explore.map.page.side.panel.demo.of.age.mid'}
    defaultMessage={'Ages 10 - 64'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Ages 10 - 64`}
  />,
  DEMO_AGE_OVER_65: <FormattedMessage
    id={'explore.map.page.side.panel.demo.age.over.65'}
    defaultMessage={'Elderly over 65'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the demographics: Elderly over 65`}
  />,
};

export const SIDE_PANEL_TRIBAL_INFO = defineMessages({
  LAND_AREA_NAME: {
    id: 'explore.map.page.side.panel.tribalInfo.landAreaName',
    defaultMessage: 'Land Area Name:',
    description: `Navigate to the explore the map page. Click on Tribal Lands, when the map is in view, 
    click on the map. The side panel will show the land area name of the feature selected`,
  },
});

export const PRIORITIZATION_COPY = {
  NOT_PRIO: <FormattedMessage
    id={'explore.map.page.side.panel.prio.copy.not.prio'}
    defaultMessage={'This tract is not considered disadvantaged. It does not meet any burden thresholds <bold>OR</bold> at least one associated socioeconomic threshold.'}
    description={`Navigate to the explore the map page. Click on tract, The side panel will show This tract is not considered disadvantaged. It does not meet any burden thresholds OR at least one associated socioeconomic threshold.`}
    values = {{
      bold: boldFn,
    }}
  />,
  NOT_PRIO_1BUR: <FormattedMessage
    id={'explore.map.page.side.panel.prio.copy.not.prio.one.burden'}
    defaultMessage={'This tract is not considered disadvantaged. It meets 1 burden threshold <bold>BUT</bold> no associated socioeconomic thresholds.'}
    description={`Navigate to the explore the map page. Click on tract, The side panel will show This tract is not considered disadvantaged. It meets [1] burden threshold <bold>BUT</bold> no associated socioeconomic thresholds.`}
    values= {{
      bold: boldFn,
    }}
  />,
  NOT_PRIO_NBUR: <FormattedMessage
    id={'explore.map.page.side.panel.prio.copy.not.prio.n.burden'}
    defaultMessage={'This tract is not considered disadvantaged. It meets more than 1 burden threshold <bold>BUT</bold> no associated socioeconomic thresholds.'}
    description={`Navigate to the explore the map page. Click on tract, The side panel will show This tract is not considered disadvantaged. It meets more than 1 burden threshold <bold>BUT</bold> no associated socioeconomic thresholds.`}
    values= {{
      bold: boldFn,
    }}
  />,
  NOT_PRIO_SURR_LI: <FormattedMessage
    id={'explore.map.page.side.panel.prio.copy.not.prio.surr.li'}
    defaultMessage={'This tract is not considered disadvantaged. It is surrounded by tracts that are disadvantaged <bold>BUT</bold> does not meet the adjusted low income threshold. The adjustment does not apply to any of the categories.'}
    description={`Navigate to the explore the map page. Click on tract, The side panel will show This tract is not considered disadvantaged. It is surrounded by tracts that are disadvantaged <bold>BUT</bold> does not meet the adjusted low income threshold.`}
    values={{
      bold: boldFn,
    }}
  />,
  PAR_PRIO_SURR_NO_LI: <FormattedMessage
    id={'explore.map.page.side.panel.prio.copy.par.prio.surr.no.li'}
    defaultMessage={'This tract is partially disadvantaged. It is surrounded by tracts that are disadvantaged <bold>BUT</bold> does not meet the adjusted low income threshold. The adjustment does not apply to any of the categories.'}
    description={`Navigate to the explore the map page. Click on tract, The side panel will show This tract is not considered disadvantaged. It is surrounded by tracts that are disadvantaged <bold>BUT</bold> does not meet the adjusted low income threshold.`}
    values={{
      bold: boldFn,
    }}
  />,
  PRIO_SURR_LI: <FormattedMessage
    id={'explore.map.page.side.panel.prio.copy.prio.donut'}
    defaultMessage={'This tract is considered disadvantaged. It is completely surrounded by tracts that are disadvantaged <bold>AND</bold> meets an adjusted low income threshold. The adjustment does not apply to any of the categories.'}
    description={`Navigate to the explore the map page. Click on tract, The side panel will show This tract is considered disadvantaged. It is completely surrounded by tracts that are disadvantaged <bold>AND</bold> meets an adjusted low income threshold. The adjustment does not apply to any of the categories.`}
    values={{
      bold: boldFn,
    }}
  />,
};

export const getPrioNBurdenCopy = (burdens:string) => {
  return (
    <FormattedMessage
      id={'explore.map.page.side.panel.prio.copy.prio.n.burden'}
      defaultMessage={ 'This tract is considered disadvantaged because it meets {burdens} burden threshold <bold>AND</bold> the associated socioeconomic threshold.'}
      description={`Navigate to the explore the map page. Click on tract, This tract is considered disadvantaged because it meets {burdens} burden thresholds <bold>AND</bold> the associated socioeconomic threshold.`}
      values={{
        burdens: burdens,
        bold: boldFn,
      }}
    />
  );
};

// Copy around Federally recognized tribes
export const getPrioFRTCopy = (amount:string, isAlso:boolean = false) => {
  return (
    <FormattedMessage
      id={'explore.map.page.side.panel.prio.copy.prio.frt'}
      defaultMessage={ 'The lands of Federally Recognized Tribes that cover {amount} of this tract are {also} considered disadvantaged.'}
      description={`Navigate to the explore the map page. Click on tract, The lands of Federally Recognized Tribes that cover [#%] of this tract are considered disadvantaged.`}
      values={{
        amount: amount,
        also: isAlso? 'also' : '',
      }}
    />
  );
};

// Copy around Federally recognized tribes points copy
export const getPrioFRTPointsCopy = (numPoints:string, isAlso:boolean = false) => {
  return (
    <FormattedMessage
      id={'explore.map.page.side.panel.prio.copy.prio.frt.n.points'}
      defaultMessage={ 'The {numPoints} that are Federally Recognized Tribes in this tract are are {also} considered disadvantaged.'}
      description={`Navigate to the explore the map page. Click on tract, The {numPoints} that are Federally Recognized Tribes in this tract ares are {also} considered disadvantaged.`}
      values={{
        numPoints: numPoints,
        also: isAlso? 'also' : '',
      }}
    />
  );
};

// Copy around Alaska Native Villages
export const getPrioANVCopy = (numPoints:number, isAlso:boolean = false) => {
  return (
    <FormattedMessage
      id={'explore.map.page.side.panel.prio.copy.prio.anv'}
      defaultMessage={ 'The {numPoints} Alaska Native Villages in this tract that are Federally Recognized are {also} considered disadvantaged.'}
      description={`Navigate to the explore the map page. Click on tract, The {numPoints} of this tract that are Federally Recognized Tribal lands are {also} considered disadvantaged.`}
      values={{
        numPoints: numPoints,
        also: isAlso? 'also' : '',
      }}
    />
  );
};

// Copy around Alaska Native Villages points and US points
export const getPrioAKUSCopy = (numAKpoints:number, numUSpoints:number, isAlso:boolean = false) => {
  return (
    <FormattedMessage
      id={'explore.map.page.side.panel.prio.copy.prio.akus'}
      defaultMessage={ 'The {numAKpoints} Alaska Native Villages and the {numUSpoints} tribes in this tract that are Federally Recognized are {also} considered disadvantaged.'}
      description={`Navigate to the explore the map page. Click on tract, The {numAKpoints} Alaska Native Villages and the {numUSpoints} tribes in this tract that are Federally Recognized are considered disadvantaged.`}
      values={{
        numAKpoints: numAKpoints,
        numUSpoints: numUSpoints,
        also: isAlso ? 'also' : '',
      }}
    />
  );
};

// Copy percentile of track in FRT and number of points in FRT with "also"
export const getPrioPercAndNumPointsAlsoCopy = (amount:string, numPoints:number) => {
  return (
    <FormattedMessage
      id={'explore.map.page.side.panel.prio.copy.prio.perc.num.points'}
      defaultMessage={ 'The lands of Federally Recognized Tribes that cover {amount} of this tract and the {numPoints} tribes that are Federally Recognized are also considered disadvantaged.'}
      description={`Navigate to the explore the map page. Click on tract, The Federally Recognized Tribal lands that cover {amount} of this tract and the {numPoints} tribes that are Federally Recognized are also considered disadvantaged.`}
      values={{
        amount: amount,
        numPoints: numPoints,
      }}
    />
  );
};

export const DONUT_COPY = defineMessages({
  COMP_SURR: {
    id: 'explore.map.page.side.panel.donut.copy.complete.surround',
    defaultMessage: 'Completely surrounded',
    description: `Navigate to the explore the map page. Click on side panel, this copy may show up`,
  },
  ADJ_LOW_INC: {
    id: 'explore.map.page.side.panel.donut.copy.adj.low.income',
    defaultMessage: 'Adjusted low income',
    description: `Navigate to the explore the map page. Click on side panel, this copy may show up`,
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
    defaultMessage= {'NO'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the communities the score currently is not focused on`}
  />,
  PARTIAL: <FormattedMessage
    id= {'explore.map.page.side.panel.partial.community.of.focus'}
    defaultMessage= {'PARTIALLY'}
    description={`Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show the communities the score currently is partially focused on`}
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
    defaultMessage: 'Energy',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Energy title
`,
  },
  HEALTH_BURDEN: {
    id: 'explore.map.page.side.panel.indicator.title.health.burden',
    defaultMessage: 'Health',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Healt title
`,
  },
  SUSTAIN_HOUSE: {
    id: 'explore.map.page.side.panel.indicator.title.sustain.house',
    defaultMessage: 'Housing',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Housing title
`,
  },
  LEG_POLLUTE: {
    id: 'explore.map.page.side.panel.indicator.title.legacy.pollution',
    defaultMessage: 'Legacy pollution',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Legacy pollution title
`,
  },
  CLEAN_TRANSPORT: {
    id: 'explore.map.page.side.panel.indicator.title.clean.transport',
    defaultMessage: 'Transportation',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Transportation title
`,
  },
  CLEAN_WATER: {
    id: 'explore.map.page.side.panel.indicator.title.clean.water',
    defaultMessage: 'Water and wastewater',
    description: `Navigate to the explore the tool page. When the map is in view, click on the map. The side panel will show Water and wastewater title
`,
  },
  WORK_DEV: {
    id: 'explore.map.page.side.panel.indicator.title.work.dev',
    defaultMessage: 'Workforce development',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Workforce development title
`,
  },
  TEST: {
    id: 'explore.map.page.side.panel.indicator.title.testing',
    defaultMessage: 'Testing',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Testing title
`,
  },
});

export const SIDE_PANEL_INDICATORS = defineMessages({
  // Climate Change
  EXP_AG_LOSS: {
    id: 'explore.map.page.side.panel.indicator.exp.ag.loss',
    defaultMessage: 'Expected agriculture loss rate',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show agriculture loss rate`,
  },
  EXP_BLD_LOSS: {
    id: 'explore.map.page.side.panel.indicator.exp.bld.loss',
    defaultMessage: 'Expected building loss rate',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show building loss rate`,
  },
  EXP_POP_LOSS: {
    id: 'explore.map.page.side.panel.indicator.exp.pop.loss',
    defaultMessage: 'Expected population loss rate',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show population loss rate`,
  },
  FLOODING: {
    id: 'explore.map.page.side.panel.indicator.flooding',
    defaultMessage: 'Projected flood risk',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show flood risk`,
  },
  WILDFIRE: {
    id: 'explore.map.page.side.panel.indicator.wildfire',
    defaultMessage: 'Projected wildfire risk',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show wildfire risk`,
  },
  LOW_INCOME: {
    id: 'explore.map.page.side.panel.indicator.low.income',
    defaultMessage: 'Low income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show low income`},
  HIGH_ED: {
    id: 'explore.map.page.side.panel.indicator.high.ed',
    defaultMessage: 'Higher education non-enrollment',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Higher ed degree achievement rate`,
  },

  // Energy
  ENERGY_COST: {
    id: 'explore.map.page.side.panel.indicator.energyBurden',
    defaultMessage: 'Energy cost',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Energy cost`,
  },
  PM_2_5: {
    id: 'explore.map.page.side.panel.indicator.pm25',
    defaultMessage: 'PM2.5 in the air',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show PM2.5 in the air`,
  },

  // Health
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

  // Housing
  HIST_UNDERINVEST: {
    id: 'explore.map.page.side.panel.indicator.historic.underinvest',
    defaultMessage: 'Historic underinvestment',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Historic underinvestment`,
  },
  HOUSE_COST: {
    id: 'explore.map.page.side.panel.indicator.house.cost',
    defaultMessage: 'Housing cost',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Housing cost`,
  },
  LACK_GREEN_SPACE: {
    id: 'explore.map.page.side.panel.indicator.lack.green.space',
    defaultMessage: 'Lack of green space',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Lack of green space`,
  },
  LACK_PLUMBING: {
    id: 'explore.map.page.side.panel.indicator.lack.plumbing',
    defaultMessage: 'Lack of indoor plumbing',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Lack of indoor plumbing`,
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

  // Legacy Pollution
  ABANDON_MINES: {
    id: 'explore.map.page.side.panel.indicator.abandon.mines',
    defaultMessage: 'Abandoned mine land',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Abandoned land mines`,
  },
  FORMER_DEF_SITES: {
    id: 'explore.map.page.side.panel.indicator.former.def.sites',
    defaultMessage: 'Formerly Used Defense Sites',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Formerly Used Defense Sites`,
  },
  PROX_HAZ: {
    id: 'explore.map.page.side.panel.indicator.prox.haz',
    defaultMessage: 'Proximity to hazardous waste facilities',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Proximity to hazardous waste facilities`,
  },
  PROX_RMP: {
    id: 'explore.map.page.side.panel.indicator.prox.rmp',
    defaultMessage: 'Proximity to Risk Management Plan facilities',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Count of proposed or listed RMP`,
  },
  PROX_NPL: {
    id: 'explore.map.page.side.panel.indicator.prox.npl',
    defaultMessage: 'Proximity to Superfund sites',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Count of proposed or listed NPL `,
  },

  // Transportation
  DIESEL_PARTICULATE_MATTER: {
    id: 'explore.map.page.side.panel.indicator.dieselPartMatter',
    defaultMessage: 'Diesel particulate matter exposure',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Diesel particulate matter exposure`,
  },
  BARRIER_TRANS: {
    id: 'explore.map.page.side.panel.indicator.barrier.transport',
    defaultMessage: 'Transportation barriers',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show transportation barriers`,
  },
  TRAFFIC_VOLUME: {
    id: 'explore.map.page.side.panel.indicator.trafficVolume',
    defaultMessage: 'Traffic proximity and volume',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Traffic proximity and volume`,
  },

  // Water
  LEAKY_TANKS: {
    id: 'explore.map.page.side.panel.indicator.leaky.tanks',
    defaultMessage: 'Underground storage tanks and releases',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Underground storage tanks and releases`,
  },
  WASTE_WATER: {
    id: 'explore.map.page.side.panel.indicator.wasteWater',
    defaultMessage: 'Wastewater discharge',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Wastewater discharge`,
  },

  // Workforce development
  LING_ISO: {
    id: 'explore.map.page.side.panel.indicator.ling.iso',
    defaultMessage: 'Linguistic isolation',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Linguistic isolation`,
  },
  LOW_MED_INC: {
    id: 'explore.map.page.side.panel.indicator.low.med.income',
    defaultMessage: 'Low median income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Low median income`,
  },
  POVERTY: {
    id: 'explore.map.page.side.panel.indicator.poverty',
    defaultMessage: 'Poverty',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Unemployment`,
  },
  UNEMPLOY: {
    id: 'explore.map.page.side.panel.indicator.unemploy',
    defaultMessage: 'Unemployment',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Unemployment`,
  },
  HIGH_SCL: {
    id: 'explore.map.page.side.panel.indicator.high.school',
    defaultMessage: 'High school education',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show High school diploma achievement rate`,
  },

  // Testing
  ADJ: {
    id: 'explore.map.page.side.panel.indicator.adjacency',
    defaultMessage: 'Adjacency',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Adjancency`,
  },
  IMP_FLG: {
    id: 'explore.map.page.side.panel.indicator.imp.flg',
    defaultMessage: 'Impute flag',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show Impute flag`,
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
    INFO: {
      id: 'explore.map.page.side.panel.indicator.value.unavailable.alt.text',
      description: 'image alt text when low income is imputed',
      defaultMessage: `an icon to represent data is unavailable`,
    },
  }),
  UNAVAILBLE_MSG: <FormattedMessage
    id={'explore.map.page.side.panel.indicator.value.subtext.unavailable'}
    description={'subtext for indicator when data is N/A'}
    defaultMessage={`missing data`}
  />,
};

export const SIDE_PANEL_INDICATOR_DESCRIPTION = defineMessages({
  // Climate change
  EXP_AG_LOSS: {
    id: 'explore.map.page.side.panel.indicator.description.exp.ag.loss',
    defaultMessage: 'Economic loss to agricultural value resulting from natural hazards each year',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Economic loss rate to agriculture resulting from natural hazards
    `,
  },
  EXP_BLD_LOSS: {
    id: 'explore.map.page.side.panel.indicator.description.exp.bld.loss',
    defaultMessage: 'Economic loss to building value resulting from natural hazards each year',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side 
    panel will show an indicator description of Economic loss rate to buildings resulting from natural hazards`,
  },
  EXP_POP_LOSS: {
    id: 'explore.map.page.side.panel.indicator.description.exp.pop.loss',
    defaultMessage: `
      Fatalities and injuries resulting from natural hazards each year
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Economic loss rate to the population in fatalities and 
      injuries resulting from natural hazards`,
  },
  FLOODING: {
    id: 'explore.map.page.side.panel.indicator.description.flooding',
    defaultMessage: `
    Projected risk to properties from projected floods, from tides, rain, riverine and storm surges within 30 years
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of flooding risk`,
  },
  WILDFIRE: {
    id: 'explore.map.page.side.panel.indicator.description.wildfire',
    defaultMessage: `
      Projected risk to properties from wildfire from fire fuels, weather, humans, and fire movement in 30 years
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of wildfire risk`,
  },
  LOW_INCOME: {
    id: 'explore.map.page.side.panel.indicator.description.low.income',
    defaultMessage: `
     People in households where income is less than or equal to twice the federal poverty level, not including students enrolled in higher ed 
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description ofPeople in households where income is less than or equal to twice the federal poverty level, not including students enrolled in higher ed`,
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

  // Energy
  ENERGY_COST: {
    id: 'explore.map.page.side.panel.indicator.description.energy.cost',
    defaultMessage: 'Average annual energy costs divided by household income',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Energy costs divided by household income`,
  },
  PM_2_5: {
    id: 'explore.map.page.side.panel.indicator.description.pm25',
    defaultMessage: 'Level of inhalable particles, 2.5 micrometers or smaller',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Fine inhalable particles, 2.5 micrometers and smaller`,
  },

  // Health
  ASTHMA: {
    id: 'explore.map.page.side.panel.indicator.description.asthma',
    defaultMessage: 'Share of people who have been told they have asthma',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of people who have been told they have asthma`,
  },
  DIABETES: {
    id: 'explore.map.page.side.panel.indicator.description.diabetes',
    defaultMessage: `
      Share of people ages 18 years and older who have diabetes other than diabetes during pregnancy
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of people ages 18 years and older who have diabetes`,
  },
  HEART_DISEASE: {
    id: 'explore.map.page.side.panel.indicator.description.heartDisease',
    defaultMessage: `Share of people ages 18 years and older who have been told they have heart disease`,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of people ages 18 years and older who have been told they have heart disease`,
  },
  LOW_LIFE_EXPECT: {
    id: 'explore.map.page.side.panel.indicator.description.lifeExpect',
    defaultMessage: 'Average number of years a person can expect to live',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Average number of years of life a person can expect to live`,
  },

  // Housing
  HIST_UNDERINVEST: {
    id: 'explore.map.page.side.panel.indicator.description.historic.underinvestment',
    defaultMessage: 'Census tracts with historically high barriers to accessing home loans',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Census tracts with historically high barriers to accessing home loans`,
  },
  HOUSE_COST: {
    id: 'explore.map.page.side.panel.indicator.description.house.cost',
    defaultMessage: `Share of households making less than 80% of the area median family income and spending more than 30% of income on housing
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of households making less than 80% of the area median family income and spending more than 30% of income on housing`,
  },
  LACK_GREEN_SPACE: {
    id: 'explore.map.page.side.panel.indicator.description.lack.green.space',
    defaultMessage: 'Amount of land, not including crop land, that is covered with artificial materials like concrete or pavement',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description Share of non-crop land covered with artificial materials like concrete or pavement`,
  },
  LACK_PLUMBING: {
    id: 'explore.map.page.side.panel.indicator.description.lack.plumbing',
    defaultMessage: 'Share of homes without indoor kitchens or plumbing',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of homes without indoor kitchens or plumbing`,
  },
  LEAD_PAINT: {
    id: 'explore.map.page.side.panel.indicator.description.leadPaint',
    defaultMessage: `
      Share of homes that are likely to have lead paint
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of homes that are likely to have lead paint   
    `,
  },

  // Legacy Pollution
  ABANDON_MINES: {
    id: 'explore.map.page.side.panel.indicator.description.abandon.mines',
    defaultMessage: 'Presence of one or more abandoned mine land within the tract',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Presence of an abandoned mine lands within the tract`,
  },
  FORMER_DEF_SITES: {
    id: 'explore.map.page.side.panel.indicator.description.former.def.sites',
    defaultMessage: 'Presence of one or more Formerly Used Defense Site within the tract',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Presence of a Formerly Used Defense Site within the tract`,
  },
  PROX_HAZ: {
    id: 'explore.map.page.side.panel.indicator.description.prox.haz',
    defaultMessage: 'Count of hazardous waste facilities within 5 kilometers',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Count of hazardous waste facilities within 5 kilometers`,
  },
  PROX_RMP: {
    id: 'explore.map.page.side.panel.indicator.description.prox.rmp',
    defaultMessage: 'Count of Risk Management Plan (RMP) facilities within 5 kilometers',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Count of Risk Management Plan facilities within 5 kilometers`,
  },
  PROX_NPL: {
    id: 'explore.map.page.side.panel.indicator.description.prox.npl',
    defaultMessage: `Count of proposed or listed Superfund (or National Priorities List (NPL)) sites within 5 kilometers`,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Count of proposed or listed Superfund (or National Priorities List) sites within 5 kilometers`,
  },

  // Transportation
  DIESEL_PARTICULATE_MATTER: {
    id: 'explore.map.page.side.panel.indicator.description.dieselPartMatter',
    defaultMessage: 'Amount of diesel exhaust in the air',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Diesel exhaust in the air`,
  },
  BARRIER_TRANS: {
    id: 'explore.map.page.side.panel.indicator.description.barrierTrans',
    defaultMessage: 'Average of relative cost and time spent on transportation',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Cost and time spent on transportation`,
  },
  TRAFFIC_VOLUME: {
    id: 'explore.map.page.side.panel.indicator.description.trafficVolume',
    defaultMessage: 'Count of vehicles at major roads within 500 meters',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Count of vehicles at major roads within 500 meters`,
  },

  // Water
  LEAKY_TANKS: {
    id: 'explore.map.page.side.panel.indicator.description.leaky.tanks',
    defaultMessage: `Formula of the density of leaking underground storage tanks and number of all active underground storage tanks within 1500 feet of the census tract boundaries
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of leaky storage tanks`,
  },
  WASTE_WATER: {
    id: 'explore.map.page.side.panel.indicator.description.wasteWater',
    defaultMessage: 'Modeled toxic concentrations at parts of streams within 500 meters',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Modeled toxic concentrations at parts of streams within 500 meters`,
  },


  // Workforce development
  LING_ISO: {
    id: 'explore.map.page.side.panel.indicator.description.ling.iso',
    defaultMessage: `
    Share of households where no one over age 14 speaks English very well
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of households where no one over the age 14 speaks English well`,
  },
  LOW_MED_INCOME: {
    id: 'explore.map.page.side.panel.indicator.description.low.med.income',
    defaultMessage: 'Comparison of median income in the tract to median incomes in the area',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Comparison of median income in the tract to median incomes in the area`,
  },
  POVERTY: {
    id: 'explore.map.page.side.panel.indicator.description.poverty',
    defaultMessage: `
      Share of people in households where income is at or below 100% of the Federal poverty level 
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Share of people in households where the income is at or below 100% of the Federal poverty level`,
  },
  UNEMPLOY: {
    id: 'explore.map.page.side.panel.indicator.description.unemploy',
    defaultMessage: 'Number of unemployed people as a part of the labor force',
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side 
    panel will show an indicator description of Number of unemployed people as a part of the labor force`,
  },
  HIGH_SKL: {
    id: 'explore.map.page.side.panel.indicator.description.high.school',
    defaultMessage: `
      Percent of people ages 25 years or older whose high school education is less than a high school diploma
    `,
    description: `Navigate to the explore the map page. When the map is in view, click on the map. The side panel will show an indicator description of Percent of people ages 25 years or older who did not graduate high school`,
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

export const LOW_INCOME_TOOLTIP = defineMessages({
  IMP_YES_POP_NULL: {
    id: 'explore.map.page.side.panel.indicator.low.income.tooltip.IMP_YES_POP_NULL',
    defaultMessage: `Income is not estimated for<br /> tracts with unknown populations.`,
    description: 'Hover over the low income icon and it will show Income is not estimated for<br /> tracts with unknown populations.',
  },
  IMP_YES_POP_NOT_NULL: {
    id: 'explore.map.page.side.panel.indicator.low.income.tooltip.IMP_YES_POP_NOT_NULL',
    defaultMessage: `Tracts with missing income data<br />are given estimated incomes<br />based on an average of the<br />incomes of the surrounding tracts.`,
    description: 'Hover over the low income icon and it will show Tracts with missing income data are given estimated incomes based on an average of the incomes of the surrounding tracts.',
  },
});


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
      link1: downloadLink(DOWNLOAD_FILES.NARWAL.SHAPE_FILE.URL),
      downloadFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.SHAPE_FILE.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
      dateUpdated: <FormattedDate
        value={DOWNLOAD_FILES.NARWAL.SHAPE_FILE.LAST_UPDATED}
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
    defaultMessage={`U.S. territories note`}
    description={`Navigate to the explore the map page. Under the map, you will see territories intro text`}
  />,
  PARA_0: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.0'}
    defaultMessage={`
      Not all the data used in the tool are available or used for all U.S. territories.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 0`}
  />,
  PARA_1: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.1'}
    defaultMessage={`
      <bold>Puerto Rico:</bold> The data used for Puerto Rico are from all relevant and available fields in the energy, housing, legacy pollution, transportation, and workforce development categories. The following data are used: low income, projected flood risk, energy cost, lack of indoor plumbing, lead paint, housing cost, proximity to hazardous waste facilities, proximity to Superfund or National Priorities List (NPL) sites, proximity to Risk Management Plan (RMP) facilities, diesel particulate matter exposure, traffic proximity and volume, underground storage tanks and releases, wastewater discharge, low median income, poverty, unemployment, and high school education. Linguistic isolation was removed for Puerto Rico based on feedback received during the beta period.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 1`}
    values={{
      bold: boldFn,
    }}
  />,

  PARA_2: <FormattedMessage
    id={'explore.map.page.under.map.note.on.territories.para.2'}
    defaultMessage={`
    <bold>American Samoa, Guam, the Northern Mariana Islands, and the U.S. Virgin Islands:</bold> For these U.S. territories, the tool uses the following data: unemployment, poverty, low median income, and high school education. These burdens are in the workforce development category.
  `}
    description={`Navigate to the explore the map page. Under the map, you will see territories paragraph 2`}
    values={{
      bold: boldFn,
    }}
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
      To respect Tribal sovereignty and self-government and to fulfill Federal trust and treaty responsibilities to Tribal Nations, land within the boundaries of Federally Recognized Tribes are designated as disadvantaged on the map. Alaska Native Villages are included as point locations that are smaller than a census tract. The boundaries of census tracts and the lands of Federally Recognized Tribes are different.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see tribal nations paragraph 1`}
  />,
  PARA_2: <FormattedMessage
    id={'explore.map.page.under.map.note.on.tribal.nations.para.2'}
    defaultMessage={`
      This decision was made after meaningful and robust consultation with Tribal Nations. This is consistent with CEQ’s <link1>Action Plan</link1> for Consultation and Coordination with Tribal Nations, President Biden’s <link3>Memorandum</link3> on Tribal Consultation and Strengthening Nation-to-Nation Consultation, and <link2>Executive Order 13175</link2> on Consultation and Coordination With Indian Tribal Governments.
    `}
    description={`Navigate to the explore the map page. Under the map, you will see tribal nations paragraph 2`}
    values={{
      link1: linkFn(EXPLORE_PAGE_LINKS.WH_GOV_TRIBAL_ACTION_PLAN_4_26_21, false, true),
      link2: linkFn(EXPLORE_PAGE_LINKS.FED_REGISTER_CONSULT_TRIBE_GOV_2000, false, true),
      link3: linkFn(EXPLORE_PAGE_LINKS.WH_GOV_TRIBAL_CONSULT_NATION_NATION_01_25_21, false, true),
    }}
  />,
};
