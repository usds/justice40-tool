/* eslint-disable max-len */
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage} from 'gatsby-plugin-intl';
import {boldFn, linkFn, simpleLink} from './common';

export const VERSION_NUMBER = (1.0).toFixed(1);

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
  PARA1: {
    id: 'methodology.page.paragraph.1',
    defaultMessage: `
      The tool highlights disadvantaged census tracts across all 50 states, the District of Columbia, and the U.S. territories. Communities are considered disadvantaged:
    `,
    description: 'Navigate to the methodology page. This is the methodology paragraph 1',
  },
  PARA1_BULLET1: {
    id: 'methodology.page.paragraph.1.bullet.1',
    defaultMessage: `
      If they are in census tracts that meet the thresholds for at least one of the tool’s categories of burden, or
    `,
    description: 'Navigate to the methodology page. This is the methodology paragraph 1, bullet 1',
  },
  PARA1_BULLET2: {
    id: 'methodology.page.paragraph.1.bullet.2',
    defaultMessage: `
      If they are on land within the boundaries of Federally Recognized Tribes
    `,
    description: 'Navigate to the methodology page. This is the methodology paragraph 1, bullet 2',
  },
  SUB_HEADING_1: {
    id: 'methodology.page.sub.heading.1',
    defaultMessage: `
      Categories of Burdens
    `,
    description: 'Navigate to the methodology page. This is sub-heading 1',
  },
  SUB_HEADING_2: {
    id: 'methodology.page.sub.heading.2',
    defaultMessage: `
      Tribes
    `,
    description: 'Navigate to the methodology page. This is sub-heading 2',
  },
  PARA3: {
    id: 'methodology.page.paragraph.3',
    defaultMessage: `
      The tool uses datasets as indicators of burdens. The burdens are organized into categories. A community is highlighted as disadvantaged on the CEJST map if it is in a census tract that is (1) at or above the threshold for one or more environmental, climate, or other burdens, and (2) at or
      above the threshold for an associated socioeconomic burden.
    `,
    description: 'Navigate to the methodology page. This is the methodology paragraph 3',
  },
  PARA4: {
    id: 'methodology.page.paragraph.4',
    defaultMessage: `
      In addition, a census tract that is completely surrounded by disadvantaged communities and is at or above the 50% percentile for low income is also considered disadvantaged.
    `,
    description: 'Navigate to the methodology page. This is the methodology paragraph 3',
  },
  PARA5: {
    id: 'methodology.page.paragraph.5',
    defaultMessage: `
      Federally Recognized Tribes, including Alaska Native Villages, are also considered disadvantaged communities.
    `,
    description: 'Navigate to the methodology page. This is the methodology paragraph 5',
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
    defaultMessage={`
      <boldtag>IF</boldtag> the census tract is above the threshold for one or more environmental or climate indicators
      `}
    description={'Navigate to the methodology page. This is the first part of the formula used in the methodology'}
    values={{
      boldtag: boldFn,
    }}
  />,
  PARA6: <FormattedMessage
    id={'methodology.page.paragraph.6'}
    defaultMessage={`
      Census tracts are small units of geography. Census tract boundaries for <link1>statistical areas</link1> are determined by the U.S. Census Bureau once every ten years. The tool utilizes the census tract boundaries from 2010. This was chosen because many of the data sources in the tool currently use the 2010 
      census boundaries.    
    `}
    description={'Navigate to the methodology page. This is the methodology paragraph 4'}
    values={{
      link1: linkFn('https://www.census.gov/programs-surveys/geography/about/glossary.html#par_textimage_6', false, true),
    }}
  />,
};

export const CATEGORY = {
  HEADING: <FormattedMessage
    id={'methodology.page.indicator.categories.heading'}
    defaultMessage={'Categories of Burdens'}
    description={'Navigate to the methodology page. Navigate to the category section. This is category heading'}
  />,
  ID_AS_DISADV_TEXT: <FormattedMessage
    id={'methodology.page.category.card.title'}
    defaultMessage={`
      Communities are <boldtag>identified as disadvantaged</boldtag> if they are in census tracts that:
    `}
    description={'Navigate to the methodology page. Navigate to the category section. This is category heading'}
    values={{
      boldtag: boldFn,
    }}
  />,
};

// Category AND Clause:
export const CATEGORY_AND_CLAUSE = {
  LOW_INC_65: <FormattedMessage
    id={'methodology.page.category.and.clause.low.inc'}
    defaultMessage={`
      <boldtag>AND</boldtag> are at or above the 65th percentile for <link1>low income</link1>
    `}
    description={'Navigate to the methodology page. Navigate to the category section. This is category portion of the formula dealing with lower income'}
    values={{
      boldtag: boldFn,
      link1: simpleLink('#low-income'),
    }}
  />,
  HS_DEG_GTE_10: <FormattedMessage
    id={'methodology.page.category.and.clause.hs.ed.higher.ed'}
    defaultMessage={`<boldtag>AND</boldtag> fewer than 10% of people ages 25 or older have a <link1>high school education</link1> (i.e. graduated with a high school diploma)
  `}
    description={'Navigate to the methodology page. Navigate to the category section. This is the portion of the formula dealing with higher ed enrollment and high school diploma rate'}
    values={{
      boldtag: boldFn,
      link1: simpleLink('#high-school'),
      link2: simpleLink('#high-ed-enroll-rate'),
    }}
  />,
};

// Indicator Categories copy constants:
export const CATEGORIES = {
  ALL: <FormattedMessage
    id={'methodology.page.datasets.all.used.in.text'}
    defaultMessage={`All categories`}
    description={'Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card Used In text for all methodologies'}
  />,
  ALL_EXCEPT_WORKFORCE: <FormattedMessage
    id={'methodology.page.datasets.all.except.workforce.used.in.text'}
    defaultMessage={`All categories except for the workforce development category`}
    description={'Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card Used In text for all methodologies except the workforce development'}
  />,
  CLIMATE_CHANGE: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.climate.change.methodology'}
      defaultMessage={`Climate change category`}
      description={'Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the climate change methodology'}
    />,
    TITLE: <FormattedMessage
      id={'methodology.page.indicator.categories.climate.change.title'}
      defaultMessage={'Climate change'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.climate.change.if'}
      defaultMessage={`<boldtag>ARE</boldtag> at or above the 90th percentile for <link1>expected agriculture loss rate</link1> OR <link2>expected building loss rate</link2> OR <link3>expected population loss rate</link3>  OR <link4>projected flood risk</link4> OR <link5>projected wildfire risk</link5>`}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        boldtag: boldFn,
        link1: simpleLink('#exp-agr-loss-rate'),
        link2: simpleLink('#exp-bld-loss-rate'),
        link3: simpleLink('#exp-pop-loss-rate'),
        link4: simpleLink('#flood-risk'),
        link5: simpleLink('#wildfire-risk'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  CLEAN_ENERGY: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.clean.energy.methodology'}
      defaultMessage={`Energy category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Clean energy and energy efficiency methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.energy.title'}
      defaultMessage={'Energy'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.clean.energy.if'}
      defaultMessage={`<boldtag>ARE</boldtag> at or above the 90th percentile for <link1>energy cost</link1> OR <link2>PM2.5 in the air</link2>`}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if if portion of the formula'}
      values={{
        boldtag: boldFn,
        link1: simpleLink('#energy-burden'),
        link2: simpleLink('#pm-25'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  HEALTH_BURDENS: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.health.burdens.methodology'}
      defaultMessage={`Health category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Health burdens methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.health.burdens.title'}
      defaultMessage={'Health'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.health.burdens.if'}
      defaultMessage={`<boldtag>ARE</boldtag> at or above the 90th percentile for <link1>asthma</link1> OR <link2>diabetes</link2> OR <link3>heart disease</link3> OR <link4>low life expectancy</link4>`}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        boldtag: boldFn,
        link1: simpleLink('#asthma'),
        link2: simpleLink('#diabetes'),
        link3: simpleLink('#heart-disease'),
        link4: simpleLink('#life-exp'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  AFFORDABLE_HOUSING: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.afford.housing.methodology'}
      defaultMessage={`Housing category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Affordable and sustainable housing methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.afford.house.title'}
      defaultMessage={'Housing'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.afford.house.if'}
      defaultMessage={`Experienced <link0>historic underinvestment</link0> OR are at or above the 90th percentile for the <link1>housing cost</link1> OR <link2>lack of green space</link2> OR <link3>lack of indoor plumbing</link3> OR <link4>lead paint</link4>`}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        link0: simpleLink('#hist-underinv'),
        link1: simpleLink('#house-burden'),
        link2: simpleLink('#green-space'),
        link3: simpleLink('#indoor-plumb'),
        link4: simpleLink('#lead-paint'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  LEGACY_POLLUTION: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.legacy.pollute.methodology'}
      defaultMessage={`Legacy pollution category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Reduction and remediation of legacy pollution methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.legacy.pollution.title'}
      defaultMessage={'Legacy pollution'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.legacy.pollution.if'}
      defaultMessage={`Have at least one <link0>abandoned mine land</link0> OR <link1>Formerly Used Defense Sites</link1> OR are at or above the 90th percentile for <link2>proximity to hazardous waste facilities</link2> OR <link3>proximity to Superfund sites (National Priorities List (NPL))</link3> OR <link4>proximity to Risk Management Plan (RMP) facilities</link4>`}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        link0: simpleLink('#mine-land'),
        link1: simpleLink('#fuds'),
        link2: simpleLink('#prox-haz'),
        link3: simpleLink('#prox-npl'),
        link4: simpleLink('#prox-rmp'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  CLEAN_TRANSPORT: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.clean.transport.methodology'}
      defaultMessage={`Transportation category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Clean transportation methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.transport.title'}
      defaultMessage={'Transportation'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.clean.transport.if'}
      defaultMessage={`
        <boldtag>ARE</boldtag> at or above the 90th percentile for <link1>diesel particulate matter exposure</link1> OR <link3>transportation barriers</link3> OR <link2>traffic proximity and volume</link2>
      `}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        boldtag: boldFn,
        link1: simpleLink('#diesel-pm'),
        link2: simpleLink('#traffic-vol'),
        link3: simpleLink('#trans-barrier'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  CLEAN_WATER: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.clean.water.methodology'}
      defaultMessage={`Water and wastewater category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Water and wastewater methodology`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.clean.water.title'}
      defaultMessage={'Water and wastewater'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.clean.water.if'}
      defaultMessage={`<boldtag>ARE</boldtag> at or above the 90th percentile for <link0>underground storage tanks and releases</link0> OR <link1>wastewater discharge</link1>`}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        boldtag: boldFn,
        link0: simpleLink('#leaky-uwt'),
        link1: simpleLink('#waste-water'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.LOW_INC_65,
  },
  WORKFORCE_DEV: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.workforce.dev.methodology'}
      defaultMessage={`Workforce development category`}
      description={`Navigate to the methodology page. Navigate to the dataset section. This is the portion of the dataset card that populates the Used in section for the Training and workforce development`}
    />,
    TITLE: <FormattedMessage
      id={'indicator.categories.work.dev.title'}
      defaultMessage={'Workforce development'}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the category title'}

    />,
    IF: <FormattedMessage
      id={'methodology.page.indicator.categories.work.dev.if'}
      defaultMessage={`
        <boldtag>ARE</boldtag> at or above the 90th percentile for <link2>linguistic isolation</link2> OR <link1>low median income</link1> OR <link4>poverty</link4> OR <link3>unemployment</link3>
      `}
      description={'Navigate to the methodology page. Navigate to the category section. This will set the if portion of the formula'}
      values={{
        boldtag: boldFn,
        link1: simpleLink('#low-med-inc'),
        link2: simpleLink('#ling-iso'),
        link3: simpleLink('#unemploy'),
        link4: simpleLink('#poverty'),
      }}
    />,
    AND: CATEGORY_AND_CLAUSE.HS_DEG_GTE_10,
  },
  TRIBAL_LANDS: {
    METHODOLOGY: <FormattedMessage
      id={'methodology.page.indicator.categories.tribal.lands.methodology'}
      defaultMessage={`
        Displaying land within the boundaries of Federally Recognized Tribes and point locations of Alaska Native Villages on the map
      `}
      description={`Displaying Federally recognized tribal boundaries and Alaska Native Villages on the map`}
    />,

  },
};

// Dataset section
export const DATASETS = defineMessages({
  HEADING: {
    id: 'methodology.page.datasetContainer.heading',
    defaultMessage: 'Datasets used in beta methodology',
    description: 'Navigate to the Methodology page. This is the section heading of which datasets are used in cumulative score',
  },
  BUTTON_TEXT: {
    id: 'methodology.page.datasetContainer.button.text',
    defaultMessage: 'Share data sources with CEQ',
    description: 'Navigate to the Methodology page. This is the section heading of which datasets are used in cumulative score with a button labeled: Share data sources with CEQ',
  },
  INFO: {
    id: 'methodology.page.datasetContainer.info',
    defaultMessage: `
      The tool's datasets are public and consistent nationwide. They come from different sources and are high quality. The Council on Environmental Quality (CEQ) chose them based on relevance,  availability, and quality. They identify climate, environmental, and other burdens on communities.
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

export const DATASETS_RICH_TEXT = {
  HEADING: <FormattedMessage
    id= {'methodology.page.datasetContainer.heading.rich.text'}
    defaultMessage= {'Datasets used in v{version} methodology'}
    description={ 'Navigate to the Methodology page. This is the section heading of which datasets are used in cumulative score'}
    values={{
      version: VERSION_NUMBER,
    }}
  />,
};

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
  NEW: {
    id: 'methodology.page.datasetCard.new',
    defaultMessage: 'NEW',
    description: 'Navigate to the Methodology page. This is the label associated with a NEW card',
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
  NINETEEN: '2019',
  TWENTY: '2020',
  TWENTYONE: '2021',
  TWENTYTWO: '2022',
};

export const RESPONSIBLE_PARTIES = {
  BIA: <FormattedMessage
    id={'methodology.page.cat.res.part.BIA'}
    defaultMessage={'Bureau of Indian Affairs (BIA)'}
    description={'responsible party text'}
  />,
  CDC: <FormattedMessage
    id={'methodology.page.cat.res.part.CDC'}
    defaultMessage={'Centers for Disease Control and Prevention (CDC)'}
    description={'responsible party text'}
  />,
  CEN: <FormattedMessage
    id={'methodology.page.cat.res.part.CEN'}
    defaultMessage={'Census'}
    description={'responsible party text'}
  />,
  CENSUS: <FormattedMessage
    id={'methodology.page.cat.res.part.CENSUS'}
    defaultMessage={'U.S. Census'}
    description={'responsible party text'}
  />,
  DOE: <FormattedMessage
    id={'methodology.page.cat.res.part.DOE'}
    defaultMessage={'Department of Energy (DOE)'}
    description={'responsible party text'}
  />,
  DOI: <FormattedMessage
    id={'methodology.page.cat.res.part.DOI'}
    defaultMessage={'Department of the Interior (DOI)'}
    description={'responsible party text'}
  />,
  DOT: <FormattedMessage
    id={'methodology.page.cat.res.part.DOT'}
    defaultMessage={'Department of Transportation (DOT)'}
    description={'responsible party text'}
  />,
  EPA: <FormattedMessage
    id={'methodology.page.cat.res.part.EPA'}
    defaultMessage={'Environmental Protection Agency (EPA)'}
    description={'responsible party text'}
  />,
  EPA_OAR: <FormattedMessage
    id={'methodology.page.cat.res.part.EPA_OAR'}
    defaultMessage={'Environmental Protection Agency (EPA) Office of Air and Radiation (OAR)'}
    description={'responsible party text'}
  />,
  FIRST: <FormattedMessage
    id={'methodology.page.cat.res.part.FIRST'}
    defaultMessage={'First Street Foundation'}
    description={'responsible party text'}
  />,
  FEMA: <FormattedMessage
    id={'methodology.page.cat.res.part.FEMA'}
    defaultMessage={'Federal Emergency Management Agency (FEMA)'}
    description={'responsible party text'}
  />,
  HUD: <FormattedMessage
    id={'methodology.page.cat.res.part.HUD'}
    defaultMessage={'Department of Housing and Urban Development (HUD)'}
    description={'responsible party text'}
  />,
  NCRC: <FormattedMessage
    id={'methodology.page.cat.res.part.NCRC'}
    defaultMessage={'National Community Reinvestment Coalition (NCRC)'}
    description={'responsible party text'}
  />,
  GREEN_SPACE: <FormattedMessage
    id={'methodology.page.cat.res.part.GREEN_SPACE'}
    defaultMessage={`
      Data from <link1>Multi-Resolution Land Characteristics</link1> (MRLC) consortium; data analysis provided by <link2>The Trust for Public Lands</link2> and <link3>American Forests</link3>
    `}
    description={'responsible party text'}
    values={{
      link1: linkFn('https://www.mrlc.gov/about', false, true),
      link2: linkFn('https://www.tpl.org/', false, true),
      link3: linkFn('https://www.americanforests.org/', false, true),
    }}
  />,
  USACE: <FormattedMessage
    id={'methodology.page.cat.res.part.USACE'}
    defaultMessage={'U.S. Army Corps of Engineers'}
    description={'responsible party text'}
  />,
};

export const SOURCE_LINKS = {
  CENSUS_ACS_15_19: <FormattedMessage
    id={'methodology.page.category.source.census.link.15'}
    defaultMessage={'<link1>American Community Survey</link1> from {date15_19}'}
    description={'Navigate to the Methodology page. This is the source link for Census ACS'}
    values={{
      link1: linkFn('https://www.census.gov/programs-surveys/acs', false, true),
      date15_19: DATE_RANGE.FIFETEEN_PLUS_4,
    }}
  />,
  CENSUS_ACS_10: <FormattedMessage
    id={'methodology.page.category.source.census.link.10'}
    defaultMessage={'<link1>American Community Survey</link1> from {date10}'}
    description={'Navigate to the Methodology page. This is the source link for Census ACS'}
    values={{
      link1: linkFn('https://www.census.gov/data/developers/data-sets/acs-5year/2010.html', false, true),
      date10: DATE_RANGE.TEN,
    }}
  />,
  FEMA_NRI: <FormattedMessage
    id={'methodology.page.category.source.fema.link'}
    defaultMessage={`<link1>National Risk Index</link1> from {date14_21}`}
    description={'Navigate to the Methodology page. This is the source link for FEMA'}
    values={{
      link1: linkFn('https://hazards.fema.gov/nri/expected-annual-loss', false, true),
      date14_21: DATE_RANGE.FOURTEEN_PLUS_7,
    }}
  />,
  DOE_LEAD: <FormattedMessage
    id={'methodology.page.category.source.doe.lead.link'}
    defaultMessage={`<link1>LEAD Tool</link1> from {date18}`}
    description={'Navigate to the Methodology page. This is the source link for DOE FEMA'}
    values={{
      link1: linkFn('https://www.energy.gov/eere/slsc/low-income-energy-affordability-data-lead-tool', false, true),
      date18: DATE_RANGE.EIGHTEEN,
    }}
  />,
  EPA_OAR: <FormattedMessage
    id={'methodology.page.category.source.epa.oar.link'}
    defaultMessage={`<link1>Fusion of model and monitor data</link1> from {date17} as compiled by EPA’s EJScreen, sourced from EPA National Air Toxics Assessment (NATA) and the U.S. Department of Transportation (DOT) traffic data
    `}
    description={'Navigate to the Methodology page. This is the source link for EPA OAR'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  EPA_NATA: <FormattedMessage
    id={'methodology.page.category.source.epa.nata.link'}
    defaultMessage={`<link1>National Air Toxics Assessment (NATA)</link1> from {date14} as compiled by EPA's EJScreen`}
    description={'Navigate to the Methodology page. This is the source link for EPA NATA'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date14: DATE_RANGE.FOURTEEN,
    }}
  />,
  DOT_EPA: <FormattedMessage
    id={'methodology.page.category.source.dot.epa.link'}
    defaultMessage={`<link1>Traffic data</link1> from {date17} as compiled by EPA's EJScreen`}
    description={'Navigate to the Methodology page. This is the source link for DOT EPA'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  HUD: <FormattedMessage
    id={'methodology.page.category.source.hud.link'}
    defaultMessage={`<link1>Comprehensive Housing Affordability Strategy dataset</link1> from {date14_18}`}
    description={'Navigate to the Methodology page. This is the source link for HUD'}
    values={{
      link1: linkFn('https://www.huduser.gov/portal/datasets/cp.html', false, true),
      date14_18: DATE_RANGE.FOURTEEN_PLUS_4,
    }}
  />,
  EPA_TSDF: <FormattedMessage
    id={'methodology.page.category.source.epa.tsdf.link'}
    defaultMessage={`
      <link1>Treatment, Storage, and Disposal Facilities (TSDF) data</link1> from {date20} calculated from EPA's RCRA database as compiled 
      by EPA's EJScreen
    `}
    description={'Navigate to the Methodology page. This is the source link for EPA TSDF'}
    values={{
      link1: linkFn('https://enviro.epa.gov/facts/rcrainfo/search.html', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_CERCLIS: <FormattedMessage
    id={'methodology.page.category.source.epa.cerclis.link'}
    defaultMessage={`<link1>CERCLIS database</link1> from {date20} as compiled by EPA’s EJScreen`}
    description={'Navigate to the Methodology page. This is the source link for EPA CERCLIS'}
    values={{
      link1: linkFn('https://cumulis.epa.gov/supercpad/cursites/srchsites.cfm', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_RMP: <FormattedMessage
    id={'methodology.page.category.source.epa.rmp.link'}
    defaultMessage={`<link1>RMP database</link1> from {date20} as compiled by EPA’s EJScreen`}
    description={'Navigate to the Methodology page. This is the source link for EPA RMP'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  EPA_RSEI: <FormattedMessage
    id={'methodology.page.category.source.epa.rsei.link'}
    defaultMessage={`<link1>Risk-Screening Environmental Indicators (RSEI) model</link1> from {date20} as compiled by EPA’s EJScreen`}
    description={'Navigate to the Methodology page. This is the source link for EPA RSEI'}
    values={{
      link1: linkFn('https://www.epa.gov/ejscreen/technical-documentation-ejscreen', false, true),
      date20: DATE_RANGE.TWENTY,
    }}
  />,
  CDC_PLACES: <FormattedMessage
    id={'methodology.page.category.source.cdc.places.link'}
    defaultMessage={`<link1>PLACES data</link1> from {date16_19}`}
    description={'Navigate to the Methodology page. This is the source link for CDC Places'}
    values={{
      link1: linkFn('https://www.cdc.gov/places/index.html', false, true),
      date16_19: DATE_RANGE.SIXTEEN_PLUS_3,
    }}
  />,
  CDC_SLEEP: <FormattedMessage
    id={'methodology.page.category.source.cdc.sleep.link'}
    defaultMessage={`<link1>U.S. Small-Area Life Expectancy Estimates Project</link1> (USALEEP) from {date10_15}`}
    description={'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html#data', false, true),
      date10_15: DATE_RANGE.TEN_PLUS_5,
    }}
  />,
  FIRST_ST: <FormattedMessage
    id={'methodology.page.category.source.first.street.link'}
    defaultMessage={`<link1>Climate Risk Data Access</link1> from {date22}`}
    description={'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://firststreet.org/data-access/', false, true),
      date22: DATE_RANGE.TWENTYTWO,
    }}
  />,
  HOLC: <FormattedMessage
    id={'methodology.page.category.source.holc.link'}
    defaultMessage={`<link1>Dataset of formerly redlined areas</link1> using digitized maps from the Home Owners Loan Corporation (HOLC), using {date10} census boundaries`}
    description={'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://www.openicpsr.org/openicpsr/project/141121/version/V2/view', false, true),
      date10: DATE_RANGE.TEN,
    }}
  />,
  PDI: <FormattedMessage
    id={'methodology.page.category.source.pdi.link'}
    defaultMessage={`<link1>Percent Developed Imperviousness</link1> (CONUS)  from {date19}`}
    description={'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://www.mrlc.gov/data/nlcd-2019-percent-developed-imperviousness-conus', false, true),
      date19: DATE_RANGE.NINETEEN,
    }}
  />,
  AML: <FormattedMessage
    id={'methodology.page.category.source.aml.link'}
    defaultMessage={`<link1>Abandoned Mine Land Inventory System (e-AMLIS)</link1> from {date17}`}
    description={'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://www.osmre.gov/programs/e-amlis', false, true),
      date17: DATE_RANGE.SEVENTEEN,
    }}
  />,
  FUDS: <FormattedMessage
    id={'methodology.page.category.source.fuds.link'}
    defaultMessage={`<link1>Formerly Used Defense Sites</link1> (FUDS) from {date19}`}
    description={'Navigate to the Methodology page. This is the source link for CDC Sleep'}
    values={{
      link1: linkFn('https://www.usace.army.mil/Missions/Environmental/Formerly-Used-Defense-Sites/', false, true),
      date19: DATE_RANGE.NINETEEN,
    }}
  />,
  TRANS_BUR: <FormattedMessage
    id={'methodology.page.category.source.trans.bur.link'}
    defaultMessage={`<link1>Transportation access disadvantage</link1> from {date22}`}
    description={'Navigate to the Methodology page. This is the source link for Transportation burdens'}
    values={{
      link1: linkFn('https://www.transportation.gov/equity-Justice40#:~:text=Transportation%20access%20disadvantage%20identifies%20communities%20and%20places%20that%20spend%20more%2C%20and%20take%20longer%2C%20to%20get%20where%20they%20need%20to%20go.%20(4)', false, true),
      date22: DATE_RANGE.TWENTYTWO,
    }}
  />,
  UST_FIND: <FormattedMessage
    id={'methodology.page.category.source.ust.find.link'}
    defaultMessage={`Calculated from EPA’s <link1>UST Finder</link1> from {date21} as compiled by EPA's EJScreen
    `}
    description={'Navigate to the Methodology page. This is the source link for UST Find'}
    values={{
      link1: linkFn('https://www.epa.gov/ust/ust-finder', false, true),
      date21: DATE_RANGE.TWENTYONE,
    }}
  />,
  BIA_LAR: <FormattedMessage
    id={'methodology.page.category.source.bia.lar.link'}
    defaultMessage={`<link1>Land Area Representation (LAR) dataset</link1> from {date18}`}
    description={'Navigate to the Methodology page. This is the source link for BIA data'}
    values={{
      link1: linkFn('https://www.bia.gov/bia/ots/dpmc/bogs', false, true),
      date18: DATE_RANGE.EIGHTEEN,
    }}
  />,
};

export const AVAILABLE_FOR = defineMessages({
  ALL_US_DC: {
    id: 'methodology.page.dataset.card.availableFor.US_DC',
    defaultMessage: `All U.S. states and the District of Columbia`,
    description: 'Methodology page dataset card available for US and DC type',
  },
  ALL_US_DC_TERR: {
    id: 'methodology.page.dataset.card.availableFor.US_DC_TERR',
    defaultMessage: `All U.S. states, the District of Columbia, and U.S. territories`,
    description: 'Methodology page dataset card available for US and DC type',
  },
  ALL_US_DC_PR: {
    id: 'methodology.page.dataset.card.availableFor.US_DC_PR',
    defaultMessage: `All U.S. states, the District of Columbia, and Puerto Rico`,
    description: 'Methodology page dataset card available for US, DC and Puerto Rico type',
  },
  AS_NMI: {
    id: 'methodology.page.dataset.card.availableFor.AS_NMI',
    defaultMessage: `American Samoa and the Northern Mariana Islands`,
    description: 'Methodology page dataset card available for AS_NMI',
  },
  ALL_ISLDS: {
    id: 'methodology.page.dataset.card.availableFor.ALL_ISLDS',
    defaultMessage: `American Samoa, Guam, the Northern Mariana Islands, and the U.S. Virgin Islands
    `,
    description: 'Methodology page dataset card available for ALL_ISLDS',
  },
  CONUS_DC: {
    id: 'methodology.page.dataset.card.availableFor.CONUS_DC',
    defaultMessage: `All contiguous U.S. states and the District of Columbia `,
    description: 'Methodology page dataset card available for CONUS and DC',
  },
  METRO_US_HOLC: {
    id: 'methodology.page.dataset.card.availableFor.METRO_US_HOLC',
    defaultMessage: `Metro areas of U.S. that were graded by the Home Owners’ Loan Corporation`,
    description: 'Methodology page dataset card available for METRO_US_HOLC',
  },
  FRT: {
    id: 'methodology.page.dataset.card.availableFor.FRT',
    defaultMessage: `Federally Recognized Tribes, including Alaska Native villages `,
    description: 'Methodology page dataset card available for FRT',
  },
});

export interface IIndicators {
  domID: string,
  indicator: JSX.Element,
  isNew?: boolean,
  description: JSX.Element,
  note?: JSX.Element,
  usedIn: JSX.Element,
  responsibleParty: JSX.Element,
  sources: {
    source: JSX.Element,
    availableFor: { // Todo remove this and replace with MessageDescriptor when ticket #2000 is fixed
      id: string,
      description: string,
      defaultMessage: string,
    },
  }[]
};

export const INDICATORS = [
  // All categories:
  {
    domID: 'census-tract-info',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.census.tract.title.text'}
      defaultMessage={`Census tract information and demographics`}
      description={'Navigate to the Methodology page. This is the title text for the census tract dataset'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.census.tract.description.text'}
      defaultMessage={`
        Used to identify and locate each tract in a state and county. The demographic information, race/ethnicity and age, are included to better characterize the people living in the tract.
      `}
      description={'Navigate to the Methodology page. This is the description text for low income'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.census.tract.note.text'}
      defaultMessage={`
      <boldtag>Note: </boldtag>The demographics are included as information only and are not considered as a part of the tool's methodology.
    `}
      description={'Navigate to the Methodology page. This is the note text for low life expectancy'}
      values={{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.ALL,
    responsibleParty: RESPONSIBLE_PARTIES.CEN,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_TERR,
      },
    ],
  },
  {
    domID: 'low-income',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.low.income.title.text'}
      defaultMessage={`Low income`}
      description={'Navigate to the Methodology page. This is the title text for the low income dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.low.income.description.text'}
      defaultMessage={`
        Percent of a census tract's population in households where household income is at or below
        200% of the Federal poverty level, not including students enrolled in higher education.
      `}
      description={'Navigate to the Methodology page. This is the description text for low income'}
    />,
    usedIn: CATEGORIES.ALL_EXCEPT_WORKFORCE,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },

  // Climate change category:
  {
    domID: 'exp-agr-loss-rate',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.expected.ag.loss.title.text'}
      defaultMessage={`Expected agriculture loss rate`}
      description={'Navigate to the Methodology page. This is the title text for the expected agr loss rate income dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.exp.agr.loss.rate.description.text'}
      defaultMessage={`
        Expected agricultural value at risk from losses due to fourteen types of natural hazards. These hazards have some link to climate change. They are: avalanche, coastal flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong wind, tornado, wildfire, and winter weather. The rate is calculated by dividing the agricultural value at risk by the total agricultural value. 
      `}
      description={'Navigate to the Methodology page. This is the description text for exp agr loss rate'}
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
      id={'methodology.page.dataset.indicator.exp.bld.loss.title.text'}
      defaultMessage={`Expected building loss rate`}
      description={'Navigate to the Methodology page. This is the title text for the exp bld loss income dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.exp.bld.loss.rate.description.text'}
      defaultMessage={`
        Expected building value at risk from losses due to fourteen types of natural hazards. These hazards have some link to climate change. They are: avalanche, coastal flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong wind, tornado, wildfire, and winter weather. The rate is calculated by dividing the building value at risk by the total building value.
      `}
      description={'Navigate to the Methodology page. This is the description text for exp bld loss rate'}
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
      id={'methodology.page.dataset.indicator.exp.pop.loss.title.text'}
      defaultMessage={`Expected population loss rate`}
      description={'Navigate to the Methodology page. This is the title text for the exp pop loss income dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.exp.pop.loss.rate.description.text'}
      defaultMessage={`
        Expected fatalities and injuries due to fourteen types of natural hazards each year. These hazards have some link to climate change. They are: avalanche, coastal flooding, cold wave, drought, hail, heat wave, hurricane, ice storm, landslide, riverine flooding, strong wind, tornado, wildfire, and winter weather. Population loss is defined by the Spatial Hazard Events and Losses and National Centers for Environmental Information’s (NCEI). It reports the number of fatalities and injuries caused by the hazard. An injury is counted as one-tenth (1/10) of a fatality. The NCEI Storm Events Database classifies both direct and indirect injuries. Both types are counted as population loss. The total number is divided by the population in the census tract to get the population loss rate.

      `}
      description={'Navigate to the Methodology page. This is the description text for exp pop loss rate'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.exp.pop.loss.rate.note.text'}
      defaultMessage={`
        <boldtag>Note: </boldtag>this burden only applies for census tracts with populations greater than 20 people.
      `}
      description={'Navigate to the Methodology page. This is the note text for low life expectancy'}
      values={{
        boldtag: boldFn,
      }}
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
    domID: 'flood-risk',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.flood.risk.title.text'}
      defaultMessage={`Projected flood risk`}
      description={'Navigate to the Methodology page. This is the title text for the NEW Projected flood risk'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.flood.risk.rate.description.text'}
      defaultMessage={`
        A high precision, climate-adjusted model that projects flood risk for properties in the future. The dataset calculates how many properties are at risk of floods occurring in the next thirty years from tides, rain, riverine and storm surges, or a 26% risk total over the 30-year time horizon. The risk is defined as an annualized 1% chance. The tool calculates tract-level risk as the share of properties meeting the risk threshold. The risk does not consider property value.
      `}
      description={'Navigate to the Methodology page. This is the description text for exp bld loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FIRST,
    sources: [
      {
        source: SOURCE_LINKS.FIRST_ST,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'wildfire-risk',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.wildfire.risk.title.text'}
      defaultMessage={`Projected wildfire risk`}
      description={'Navigate to the Methodology page. This is the title text for the NEW Projected wildfire risk'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.wildfire.risk.rate.description.text'}
      defaultMessage={`
        A 30-meter resolution model projecting the wildfire exposure for any specific location in the contiguous U.S., today and with future climate change. The risk of wildfire is calculated from inputs associated with fire fuels, weather, human influence, and fire movement. The risk does not consider property value.
      `}
      description={'Navigate to the Methodology page. This is the description text for exp bld loss rate'}
    />,
    usedIn: CATEGORIES.CLIMATE_CHANGE.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.FIRST,
    sources: [
      {
        source: SOURCE_LINKS.FIRST_ST,
        availableFor: AVAILABLE_FOR.CONUS_DC,
      },
    ],
  },

  // Energy category:
  {
    domID: 'energy-burden',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.energy.burden.title.text'}
      defaultMessage={`Energy cost`}
      description={'Navigate to the Methodology page. This is the title text for the energy burden dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.energy.burden.description.text'}
      defaultMessage={`
        Average household annual energy cost in dollars divided by the average household income.
      `}
      description={'Navigate to the Methodology page. This is the description text for energy burden'}
    />,
    usedIn: CATEGORIES.CLEAN_ENERGY.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOE,
    sources: [
      {
        source: SOURCE_LINKS.DOE_LEAD,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'pm-25',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.pm25.title.text'}
      defaultMessage={`PM2.5 in the air`}
      description={'Navigate to the Methodology page. This is the title text for the pm25 dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.pm2.5.description.text'}
      defaultMessage={`
        Fine inhalable particles with 2.5 or smaller micrometer diameters. The percentile is the weight of the particles per cubic meter.
      `}
      description={'Navigate to the Methodology page. This is the description text for pm 2.5'}
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

  // Health category:
  {
    domID: 'asthma',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.asthma.title.text'}
      defaultMessage={`Asthma`}
      description={'Navigate to the Methodology page. This is the title text for the asthma dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.asthma.description.text'}
      defaultMessage={`
        Share of people who answer “yes” to both of these questions: “Have you ever been told by a health professional that you have asthma?” and “Do you still have asthma?”.
      `}
      description={'Navigate to the Methodology page. This is the description text for asthma'}
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
      id={'methodology.page.dataset.indicator.diabetes.title.text'}
      defaultMessage={`Diabetes`}
      description={'Navigate to the Methodology page. This is the title text for the diabetes dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.diabetes.description.text'}
      defaultMessage={`
        Share of people ages 18 years and older who have been told by a health professional that they have diabetes other than diabetes during pregnancy.
      `}
      description={'Navigate to the Methodology page. This is the description text for diabetes'}
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
      id={'methodology.page.dataset.indicator.heart.disease.title.text'}
      defaultMessage={`Heart disease`}
      description={'Navigate to the Methodology page. This is the title text for the heart disease dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.heart.disease.description.text'}
      defaultMessage={`
        Share of people ages 18 years and older who have been told by a health professional that they had angina or coronary heart disease.
      `}
      description={'Navigate to the Methodology page. This is the description text for heart disease'}
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
      id={'methodology.page.dataset.indicator.life.exp.title.text'}
      defaultMessage={`Low life expectancy`}
      description={'Navigate to the Methodology page. This is the title text for the life exp dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.low.life.expectancy.description.text'}
      defaultMessage={`
        Average number of years people have left in their lives.
      `}
      description={'Navigate to the Methodology page. This is the description text for low life expectancy'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.low.life.expectancy.note.text'}
      defaultMessage={`
        <boldtag>Note: </boldtag>The tool reverses the percentiles for this burden. This means that census tracts with lower numbers have higher life expectancies and that census tracts with higher numbers have lower life expectancies.
      `}
      description={'Navigate to the Methodology page. This is the note text for low life expectancy'}
      values={{
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

  // Housing category:
  {
    domID: 'hist-underinv',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.hist.underinvest.title.text'}
      defaultMessage={`Historic underinvestment`}
      description={'Navigate to the Methodology page. This is the title text for the Historic Underinvestment'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.low.hist.underinvestectancy.description.text'}
      defaultMessage={`
        Census tracts that experienced historic underinvestment based on redlining maps created by the federal government’s Home Owners’ Loan Corporation (HOLC) between 1935 and 1940. The tool uses the National Community Reinvestment Coalition’s <link1>methodology</link1> for converting boundaries in the HOLC maps to census tracts. Census tracts meet the threshold when they have a score of 3.25 or more out of 4.
      `}
      description={'Navigate to the Methodology page. This is the description text for Historic Underinvestment'}
      values={{
        link1: linkFn('https://ncrc.org/explainer-why-we-created-a-new-method-for-measuring-the-impact-of-redlining/', false, true),
      }}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.low.hist.underinvestectancy.note.text'}
      defaultMessage={`
        <boldtag>Note:</boldtag> The historic underinvestment burden is <boldtag>not available</boldtag> for tracts that were not included in the original HOLC maps because there is no underlying data.
      `}
      description={'Navigate to the Methodology page. This is the note text for Historic Underinvestment'}
      values={{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.NCRC,
    sources: [
      {
        source: SOURCE_LINKS.HOLC,
        availableFor: AVAILABLE_FOR.METRO_US_HOLC,
      },
    ],
  },
  {
    domID: 'house-burden',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.house.burden.title.text'}
      defaultMessage={`Housing cost`}
      description={'Navigate to the Methodology page. This is the title text for the house burden dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.house.burden.description.text'}
      defaultMessage={`
        Share of households that are both earning less than 80% of Housing and Urban Development’s Area Median Family Income and are spending more than 30% of their income on housing costs.
      `}
      description={'Navigate to the Methodology page. This is the description text for housing burden'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.HUD,
    sources: [
      {
        source: SOURCE_LINKS.HUD,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'green-space',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.green.space.title.text'}
      defaultMessage={`Lack of green space`}
      description={'Navigate to the Methodology page. This is the title text for the house burden dataset'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.green.space.description.text'}
      defaultMessage={`
        Share of land with developed surfaces covered with artificial materials like concrete or pavement, excluding crop land used for agricultural purposes. Places that lack green space are also known as nature-deprived.

      `}
      description={'Navigate to the Methodology page. This is the description text for housing burden'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.GREEN_SPACE,
    sources: [
      {
        source: SOURCE_LINKS.PDI,
        availableFor: AVAILABLE_FOR.CONUS_DC,
      },
    ],
  },
  {
    domID: 'indoor-plumb',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.indoor.plumb.title.text'}
      defaultMessage={`Lack of indoor plumbing`}
      description={'Navigate to the Methodology page. This is the title text for the indoor plumbing'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.indoor.plumb.description.text'}
      defaultMessage={`
        Housing without indoor kitchen facilities or complete plumbing facilities.
      `}
      description={'Navigate to the Methodology page. This is the description text for housing burden'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.HUD,
    sources: [
      {
        source: SOURCE_LINKS.HUD,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'lead-paint',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.lead.paint.title.text'}
      defaultMessage={`Lead paint`}
      description={'Navigate to the Methodology page. This is the title text for the lead paint dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.lead.paint.description.text'}
      defaultMessage={`
        Share of homes built before 1960, which indicates potential lead paint exposure. Tracts with extremely high home values (i.e. median home values above the 90th percentile) that are less likely to face health risks from lead paint exposure are not included.
      `}
      description={'Navigate to the Methodology page. This is the description text for lead paint'}
    />,
    usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },

  // Legacy pollution category:
  {
    domID: 'mine-land',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.mine.land.title.text'}
      defaultMessage={`Abandoned mine land`}
      description={'Navigate to the Methodology page. This is the title text for the Abandoned mine lands'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.mine.land.description.text'}
      defaultMessage={`
        Presence of an abandoned mine left by legacy coal mining operations.
      `}
      description={'Navigate to the Methodology page. This is the description text for Abandoned mine lands'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOI,
    sources: [
      {
        source: SOURCE_LINKS.AML,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'fuds',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.fuds.title.text'}
      defaultMessage={`Formerly Used Defense Sites`}
      description={'Navigate to the Methodology page. This is the title text for the Formerly Used Defense Sites'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.fuds.description.text'}
      defaultMessage={`
      Properties that were owned, leased, or possessed by the United States, under the jurisdiction of the Secretary of Defense prior to October 1986.
      `}
      description={'Navigate to the Methodology page. This is the description text for Formerly Used Defense Sites'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.USACE,
    sources: [
      {
        source: SOURCE_LINKS.FUDS,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'prox-haz',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.prox.haz.title.text'}
      defaultMessage={`Proximity to hazardous waste facilities`}
      description={'Navigate to the Methodology page. This is the title text for the prox haz dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.prox.haz.description.text'}
      defaultMessage={`
        Number of hazardous waste facilities (Treatment, Storage, and Disposal Facilities and Large Quantity Generators) within 5 kilometers (or nearest beyond 5 kilometers), each divided by distance in kilometers.
      `}
      description={'Navigate to the Methodology page. This is the description text for proximity to hazards'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_TSDF,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'prox-npl',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.prox.npl.title.text'}
      defaultMessage={`Proximity to Superfund sites`}
      description={'Navigate to the Methodology page. This is the title text for the prox npl dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.prox.npl.description.text'}
      defaultMessage={`
        Number of proposed or listed Superfund or National Priorities list (NPL) sites within 5 kilometers (or nearest one beyond 5 kilometers), each divided by distance in kilometers.
        `}
      description={'Navigate to the Methodology page. This is the description text for proximity to npl'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_CERCLIS,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'prox-rmp',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.prox.rpm.title.text'}
      defaultMessage={`Proximity to Risk Management Plan (RMP) facilities`}
      description={'Navigate to the Methodology page. This is the title text for the prox rpm dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.prox.rmp.description.text'}
      defaultMessage={`
        Count of Risk Management Plan (RMP) facilities within 5 kilometers (or nearest one beyond 5 kilometers), each divided by distance in kilometers. These facilities are mandated by the Clean Air Act to file RMPs because they handle substances with significant environmental and public health risks.
      `}
      description={'Navigate to the Methodology page. This is the description text for proximity to rmp'}
    />,
    usedIn: CATEGORIES.LEGACY_POLLUTION.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_RMP,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },

  // Transportation category:
  {
    domID: 'diesel-pm',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.diesel.pm.title.text'}
      defaultMessage={`Diesel particulate matter exposure`}
      description={'Navigate to the Methodology page. This is the title text for the diesel pm dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.diesel.pm.description.text'}
      defaultMessage={`
        Mixture of particles in diesel exhaust in the air, measured as micrograms per cubic meter.
      `}
      description={'Navigate to the Methodology page. This is the description text for diesel pm'}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_NATA,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'trans-barrier',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.trans.barrier.title.text'}
      defaultMessage={`Transportation barriers`}
      description={'Navigate to the Methodology page. This is the title text for the Transportation barriers'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.trans.barrier.description.text'}
      defaultMessage={`
        Average relative cost and time spent on transportation relative to all other tracts.
      `}
      description={'Navigate to the Methodology page. This is the description text for Transportation barriers'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.trans.barrier.note.text'}
      defaultMessage={`
      <boldtag>Note: </boldtag> this burden only applies for census tracts with populations greater than 20 people.
    `}
      description={'Navigate to the Methodology page. This is the note text for trans.barrier'}
      values={{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOT,
    sources: [
      {
        source: SOURCE_LINKS.TRANS_BUR,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'traffic-vol',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.traffic.volume.title.text'}
      defaultMessage={`Traffic proximity and volume`}
      description={'Navigate to the Methodology page. This is the title text for the traffic.volume dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.traffic.vol.description.text'}
      defaultMessage={`
        Number of vehicles (average annual daily traffic) at major roads within 500 meters, divided by distance in meters.
      `}
      description={'Navigate to the Methodology page. This is the description text for traffic volume'}
    />,
    usedIn: CATEGORIES.CLEAN_TRANSPORT.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.DOT,
    sources: [
      {
        source: SOURCE_LINKS.DOT_EPA,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },

  // Water and wastewater category:
  {
    domID: 'leaky-uwt',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.leaky.uwt.title.text'}
      defaultMessage={`Underground storage tanks and releases`}
      description={'Navigate to the Methodology page. This is the title text for the Underground storage tanks and releases'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.leaky.uwt.description.text'}
      defaultMessage={`
        Weighted formula of the density of leaking underground storage tanks and the number of all active underground storage tanks within 1,500 feet of the census tract boundaries.
      `}
      description={'Navigate to the Methodology page. This is the description text for Underground storage tanks and releases'}
    />,
    usedIn: CATEGORIES.CLEAN_WATER.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.UST_FIND,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },
  {
    domID: 'waste-water',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.waste.water.title.text'}
      defaultMessage={`Wastewater discharge`}
      description={'Navigate to the Methodology page. This is the title text for the waste water dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.waste.water.description.text'}
      defaultMessage={`
        Risk-Screening Environmental Indicators (RSEI) modeled toxic concentrations at
        stream segments within 500 meters, divided by distance in kilometers.
      `}
      description={'Navigate to the Methodology page. This is the description text for waste water'}
    />,
    usedIn: CATEGORIES.CLEAN_WATER.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.EPA,
    sources: [
      {
        source: SOURCE_LINKS.EPA_RSEI,
        availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
      },
    ],
  },

  // Workforce dev category:
  {
    domID: 'ling-iso',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.ling.iso.title.text'}
      defaultMessage={`Linguistic isolation`}
      description={'Navigate to the Methodology page. This is the title text for the linguistic isolation dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.linguistic.iso.description.text'}
      defaultMessage={`
        Share of households where no one over age 14 speaks English very well.
      `}
      description={'Navigate to the Methodology page. This is the description text for linguistic isolation'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.linguistic.iso.note.text'}
      defaultMessage={`
      <boldtag>Note: </boldtag>Linguistic isolation was removed for Puerto Rico based on feedback during the beta period.
      `}
      description={'Navigate to the Methodology page. This is the note text for linguistic.iso'}
      values={{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.WORKFORCE_DEV.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
    sources: [
      {
        source: SOURCE_LINKS.CENSUS_ACS_15_19,
        availableFor: AVAILABLE_FOR.ALL_US_DC,
      },
    ],
  },
  {
    domID: 'low-med-inc',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.low.median.income.title.text'}
      defaultMessage={`Low median income`}
      description={'Navigate to the Methodology page. This is the title text for the low median income dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.workforce.dev.description.text'}
      defaultMessage={`
        Low median income calculated as a share of the area’s median income.
      `}
      description={'Navigate to the Methodology page. This is the description text for workforce dev'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.low.median.note.text'}
      defaultMessage={`
        <boldtag>Note: </boldtag>The tool reverses the percentiles for this burden. This means that census tracts with lower numbers have higher median incomes and census tracts with the higher numbers have lower median incomes.
      `}
      description={'Navigate to the Methodology page. This is the note text for low median expectancy'}
      values={{
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
        availableFor: AVAILABLE_FOR.ALL_ISLDS,
      },
    ],
  },
  {
    domID: 'poverty',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.poverty.title.text'}
      defaultMessage={`Poverty`}
      description={'Navigate to the Methodology page. This is the title text for the poverty dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.poverty.description.text'}
      defaultMessage={`
        Share of people living at or below 100% of the Federal poverty level.
      `}
      description={'Navigate to the Methodology page. This is the description text for poverty'}
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
        availableFor: AVAILABLE_FOR.ALL_ISLDS,
      },
    ],
  },
  {
    domID: 'unemploy',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.unemploy.title.text'}
      defaultMessage={`Unemployment`}
      description={'Navigate to the Methodology page. This is the title text for the unemployment dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.unemploy.description.text'}
      defaultMessage={`
        Number of unemployed people as a share of the labor force.
      `}
      description={'Navigate to the Methodology page. This is the description text for unemployment'}
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
        availableFor: AVAILABLE_FOR.ALL_ISLDS,
      },
    ],
  },
  {
    domID: 'high-school',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.high.school.title.text'}
      defaultMessage={`High school education`}
      description={'Navigate to the Methodology page. This is the title text for the high school dataset'}
    />,
    description: <FormattedMessage
      id={'methodology.page.category.highschool.description.text'}
      defaultMessage={`
        Share of people aged 25 years or older who didn’t graduate from high school.
      `}
      description={'Navigate to the Methodology page. This is the description text for high school'}
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
        availableFor: AVAILABLE_FOR.ALL_ISLDS,
      },
    ],
    isPercent: true,
  },


  {
    domID: 'tribal-lands',
    indicator: <FormattedMessage
      id={'methodology.page.dataset.indicator.tribal.lands.title.text'}
      defaultMessage={`Tribes`}
      description={'Navigate to the Methodology page. This is the title text for the Tribal lands'}
    />,
    isNew: true,
    description: <FormattedMessage
      id={'methodology.page.category.tribal.lands.description.text'}
      defaultMessage={`
      The Land Area Representation (LAR) dataset depicts American Indian land areas for Federally Recognized Tribes.
      `}
      description={'Navigate to the Methodology page. This is the description text for Tribal lands'}
    />,
    note: <FormattedMessage
      id={'methodology.page.category.tribal.lands.note.text'}
      defaultMessage={`
        <boldtag>Note: </boldtag>The LAR dataset depicts the exterior extent of a Federal Indian land area.  Not all Federally Recognized Tribes have a designated land area; therefore, they may not have an associated land area represented in the land area dataset.
      `}
      description={'Navigate to the Methodology page. This is the note text for low median expectancy'}
      values={{
        boldtag: boldFn,
      }}
    />,
    usedIn: CATEGORIES.TRIBAL_LANDS.METHODOLOGY,
    responsibleParty: RESPONSIBLE_PARTIES.BIA,
    sources: [
      {
        source: SOURCE_LINKS.BIA_LAR,
        availableFor: AVAILABLE_FOR.FRT,
      },
    ],
  },
  // Unused burdens:
  // {
  //   domID: 'high-ed-enroll-rate',
  //   indicator: <FormattedMessage
  //     id={'methodology.page.dataset.indicator.high.ed.enroll.title.text'}
  //     defaultMessage={`Higher education non-enrollment`}
  //     description={'Navigate to the Methodology page. This is the title text for the high ed enrollment dataset'}
  //   />,
  //   description: <FormattedMessage
  //     id={'methodology.page.category.high.ed.enroll.rate.description.text'}
  //     defaultMessage={`
  //       Percent of people 15 or older who are not currently enrolled in college, university, or graduate school.
  //     `}
  //     description={'Navigate to the Methodology page. This is the description text for high ed enrollment'}
  //   />,
  //   usedIn: CATEGORIES.ALL,
  //   responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
  //   sources: [
  //     {
  //       source: SOURCE_LINKS.CENSUS_ACS_15_19,
  //       availableFor: AVAILABLE_FOR.ALL_US_DC_PR,
  //     },
  //   ],
  // },
  // {
  //   domID: 'median-home',
  //   indicator: <FormattedMessage
  //     id={'methodology.page.dataset.indicator.median.home.title.text'}
  //     defaultMessage={`Median home value`}
  //     description={'Navigate to the Methodology page. This is the title text for the median home dataset'}
  //   />,
  //   description: <FormattedMessage
  //     id={'methodology.page.category.median.home.value.description.text'}
  //     defaultMessage={`
  //       Median home value of owner-occupied housing units in the census tract.
  //      `}
  //     description={'Navigate to the Methodology page. This is the description text for lead paint'}
  //   />,
  //   usedIn: CATEGORIES.AFFORDABLE_HOUSING.METHODOLOGY,
  //   responsibleParty: RESPONSIBLE_PARTIES.CENSUS,
  //   sources: [
  //     {
  //       source: SOURCE_LINKS.CENSUS_ACS_15_19,
  //       availableFor: AVAILABLE_FOR.ALL_US_DC,
  //     },
  //   ],
  // },
];

export const RETURN_TO_TOP = {
  LINK: <FormattedMessage
    id={'methodology.page.return.to.top.link'}
    defaultMessage={'Return to top'}
    description={'Navigate to the Methodology page. This is the link text to return to top'}
  />,
};
