/* eslint-disable max-len */
import React from 'react';
import {defineMessages, FormattedMessage} from 'gatsby-plugin-intl';

import LinkTypeWrapper from '../../components/LinkTypeWrapper';

import {EJSCREEN, EXEC_ORDER_LINK, FED_RECOGNIZED_INDIAN_ENTITIES} from './about';
import {boldFn, linkFn, FEEDBACK_EMAIL} from './common';
import {PAGES_ENDPOINTS} from '../constants';
import {EXPLORE_PAGE_LINKS} from './explore';
import {DOWNLOAD_FILES} from './downloads';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'faqs.page.title.text',
    defaultMessage: 'Frequently asked questions',
    description: 'Navigate to the FAQs page, this will be the page title text',
  },
  COMING_SOON: {
    id: 'faqs.page.coming.soon.text',
    defaultMessage: 'Coming Soon!',
    description: 'Navigate to the FAQs page, this will be the page coming soon text',
  },
});

// If for some reason they key prop doesn't work in the array below, this is here:
// export const QUESTIONS = {
//   Q1: <FormattedMessage
//     id={ 'faqs.page.Q1'}
//     defaultMessage={ 'Q: What is the Climate and Economic Justice Screening Tool (CEJST)?'}
//     description={ 'Navigate to the FAQs page, this will be Q1'}
//   />,
//   Q2: <FormattedMessage
//     id={ 'faqs.page.Q2'}
//     defaultMessage={ 'Q: How does the tool identify and define communities?'}
//     description={ 'Navigate to the FAQs page, this will be Q2'}
//   />,
//   Q3: <FormattedMessage
//     id={ 'faqs.page.Q3'}
//     defaultMessage={ 'Q: Is race included in the tool’s methodology?'}
//     description={ 'Navigate to the FAQs page, this will be Q3'}
//   />,
//   Q4: <FormattedMessage
//     id={ 'faqs.page.Q4'}
//     defaultMessage={ 'Q: Does the Climate and Economic Justice Screening Tool (CEJST) include the U.S. territories? '}
//     description={ 'Navigate to the FAQs page, this will be Q4'}
//   />,
//   Q5: <FormattedMessage
//     id={ 'faqs.page.Q5'}
//     defaultMessage={ 'Q: Does the tool include Tribal Nations?'}
//     description={ 'Navigate to the FAQs page, this will be Q5'}
//   />,
//   Q6: <FormattedMessage
//     id={ 'faqs.page.Q6'}
//     defaultMessage={ 'Q: Why do some areas of the map have different shades?'}
//     description={ 'Navigate to the FAQs page, this will be Q6'}
//   />,
//   Q7: <FormattedMessage
//     id={ 'faqs.page.Q7'}
//     defaultMessage={ 'Q: Why does the tool have “partially disadvantaged” census tracts?'}
//     description={ 'Navigate to the FAQs page, this will be Q7'}
//   />,
//   Q8: <FormattedMessage
//     id={ 'faqs.page.Q8'}
//     defaultMessage={ 'Q: How does this tool relate to the Justice40 Initiative?'}
//     description={ 'Navigate to the FAQs page, this will be Q8'}
//   />,
//   Q9: <FormattedMessage
//     id={ 'faqs.page.Q9'}
//     defaultMessage={ 'Q: How will Federal agencies use the Climate and Economic Justice Screening Tool (CEJST) for the Justice40 Initiative? '}
//     description={ 'Navigate to the FAQs page, this will be Q9'}
//   />,
//   Q10: <FormattedMessage
//     id={ 'faqs.page.Q10'}
//     defaultMessage={ 'Q: How will this tool be used to inform decisions relating to new investments made through the Bipartisan Infrastructure Law and the Inflation Reduction Act?'}
//     description={ 'Navigate to the FAQs page, this will be Q10'}
//   />,
//   Q11: <FormattedMessage
//     id={ 'faqs.page.Q11'}
//     defaultMessage={ 'Q: Will agencies use the Climate and Economic Justice Screening Tool (CEJST) if they have already created their own tools or criteria to identify disadvantaged communities?'}
//     description={ 'Navigate to the FAQs page, this will be Q11'}
//   />,
//   Q12: <FormattedMessage
//     id={ 'faqs.page.Q12'}
//     defaultMessage={ 'Q: How is the Climate and Economic Justice Screening Tool (CEJST) different from the Environmental Protection Agency’s (EPA) EJScreen?'}
//     description={ 'Navigate to the FAQs page, this will be Q12'}
//   />,
//   Q13: <FormattedMessage
//     id={ 'faqs.page.Q13'}
//     defaultMessage={ 'Q: How is this tool different from state screening tools?'}
//     description={ 'Navigate to the FAQs page, this will be Q13'}
//   />,
//   Q14: <FormattedMessage
//     id={ 'faqs.page.Q14'}
//     defaultMessage={ 'Q: How were the White House Environmental Justice Advisory Council (WHEJAC) recommendations used for this tool?'}
//     description={ 'Navigate to the FAQs page, this will be Q14'}
//   />,
//   Q15: <FormattedMessage
//     id={ 'faqs.page.Q15'}
//     defaultMessage={ 'Q: Can the public provide feedback on this tool?'}
//     description={ 'Navigate to the FAQs page, this will be Q15'}
//   />,
//   Q16: <FormattedMessage
//     id={ 'faqs.page.Q16'}
//     defaultMessage={ 'Q: Will CEQ issue another Request for Information about the tool?'}
//     description={ 'Navigate to the FAQs page, this will be Q16'}
//   />,
//   Q17: <FormattedMessage
//     id={ 'faqs.page.Q17'}
//     defaultMessage={ 'Q: When did the official version of the tool come out?'}
//     description={ 'Navigate to the FAQs page, this will be Q17'}
//   />,
//   Q18: <FormattedMessage
//     id={ 'faqs.page.Q18'}
//     defaultMessage={ 'Q. How does the Council on Environmental Quality (CEQ) keep people informed about the tool?'}
//     description={ 'Navigate to the FAQs page, this will be Q18'}
//   />,
//   Q19: <FormattedMessage
//     id={ 'faqs.page.Q19'}
//     defaultMessage={ 'Q: What files and documentation are available from the tool?'}
//     description={ 'Navigate to the FAQs page, this will be Q19'}
//   />,
//   Q20: <FormattedMessage
//     id={ 'faqs.page.Q20'}
//     defaultMessage={ 'Q: How does the tool’s shapefile work?'}
//     description={ 'Navigate to the FAQs page, this will be Q20'}
//   />,
// };
export const QUESTIONS = [
  <FormattedMessage
    id={ 'faqs.page.Q1'}
    key={ 'faqs.page.Q1'}
    defaultMessage={ 'Q: What is the Climate and Economic Justice Screening Tool (CEJST)?'}
    description={ 'Navigate to the FAQs page, this will be Q1'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q2'}
    key={ 'faqs.page.Q2'}
    defaultMessage={ 'Q: How does the tool identify and define communities?'}
    description={ 'Navigate to the FAQs page, this will be Q2'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q3'}
    key={ 'faqs.page.Q3'}
    defaultMessage={ 'Q: Is race included in the tool’s methodology?'}
    description={ 'Navigate to the FAQs page, this will be Q3'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q4'}
    key={ 'faqs.page.Q4'}
    defaultMessage={ 'Q: Does the Climate and Economic Justice Screening Tool (CEJST) include the U.S. territories? '}
    description={ 'Navigate to the FAQs page, this will be Q4'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q5'}
    key={ 'faqs.page.Q5'}
    defaultMessage={ 'Q: Does the tool include Tribal Nations?'}
    description={ 'Navigate to the FAQs page, this will be Q5'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q6'}
    key={ 'faqs.page.Q6'}
    defaultMessage={ 'Q: Why do some areas of the map have different shades?'}
    description={ 'Navigate to the FAQs page, this will be Q6'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q7'}
    key={ 'faqs.page.Q7'}
    defaultMessage={ 'Q: Why does the tool have “partially disadvantaged” census tracts?'}
    description={ 'Navigate to the FAQs page, this will be Q7'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q8'}
    key={ 'faqs.page.Q8'}
    defaultMessage={ 'Q: How does this tool relate to the Justice40 Initiative?'}
    description={ 'Navigate to the FAQs page, this will be Q8'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q9'}
    key={ 'faqs.page.Q9'}
    defaultMessage={ 'Q: How will Federal agencies use the Climate and Economic Justice Screening Tool (CEJST) for the Justice40 Initiative? '}
    description={ 'Navigate to the FAQs page, this will be Q9'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q10'}
    key={ 'faqs.page.Q10'}
    defaultMessage={ 'Q: How will this tool be used to inform decisions relating to new investments made through the Bipartisan Infrastructure Law and the Inflation Reduction Act?'}
    description={ 'Navigate to the FAQs page, this will be Q10'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q11'}
    key={ 'faqs.page.Q11'}
    defaultMessage={ 'Q: Will agencies use the Climate and Economic Justice Screening Tool (CEJST) if they have already created their own tools or criteria to identify disadvantaged communities?'}
    description={ 'Navigate to the FAQs page, this will be Q11'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q12'}
    key={ 'faqs.page.Q12'}
    defaultMessage={ 'Q: How is the Climate and Economic Justice Screening Tool (CEJST) different from other Federal environmental screening tools, such as EJScreen?'}
    description={ 'Navigate to the FAQs page, this will be Q12'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q13'}
    key={ 'faqs.page.Q13'}
    defaultMessage={ 'Q: How is this tool different from state screening tools?'}
    description={ 'Navigate to the FAQs page, this will be Q13'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q14'}
    key={ 'faqs.page.Q14'}
    defaultMessage={ 'Q: How were the White House Environmental Justice Advisory Council (WHEJAC) recommendations used for this tool?'}
    description={ 'Navigate to the FAQs page, this will be Q14'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q15'}
    key={ 'faqs.page.Q15'}
    defaultMessage={ 'Q: Can the public provide feedback on this tool?'}
    description={ 'Navigate to the FAQs page, this will be Q15'}
  />,
  // <FormattedMessage
  //   id={ 'faqs.page.Q16'}
  //   key={ 'faqs.page.Q16'}
  //   defaultMessage={ 'Q: Will CEQ issue another Request for Information about the tool?'}
  //   description={ 'Navigate to the FAQs page, this will be Q16'}
  // />,
  <FormattedMessage
    id={ 'faqs.page.Q17'}
    key={ 'faqs.page.Q17'}
    defaultMessage={ 'Q: When did the official version of the tool come out?'}
    description={ 'Navigate to the FAQs page, this will be Q17'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q18'}
    key={ 'faqs.page.Q18'}
    defaultMessage={ 'Q. How does the Council on Environmental Quality (CEQ) keep people informed about the tool?'}
    description={ 'Navigate to the FAQs page, this will be Q18'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q19'}
    key={ 'faqs.page.Q19'}
    defaultMessage={ 'Q: What files and documentation are available from the tool?'}
    description={ 'Navigate to the FAQs page, this will be Q19'}
  />,
  <FormattedMessage
    id={ 'faqs.page.Q20'}
    key={ 'faqs.page.Q20'}
    defaultMessage={ 'Q: How does the tool’s shapefile work?'}
    description={ 'Navigate to the FAQs page, this will be Q20'}
  />,
];

export const FAQ_ANSWERS = {
  Q1_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q1_P1'}
    defaultMessage={ 'The CEJST is a critical component of the Biden-Harris Administration’s historic commitment to advancing environmental justice. In <link1>Executive Order 14008</link1> on Tackling the Climate Crisis at Home and Abroad, President Biden directed the White House Council on Environmental Quality (CEQ) to develop a geospatial mapping tool to identify disadvantaged communities that face burdens. The tool has an interactive map and uses datasets that are indicators of burdens.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P1'}
    values={{
      link1: linkFn(EXEC_ORDER_LINK, false, true),
    }}
  />,
  Q1_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q1_P2'}
    defaultMessage={ 'Federal agencies will use the tool for the Justice40 Initiative. It will help them identify disadvantaged communities that should receive 40% of the overall benefits of programs included in the Justice40 Initiative. The Justice40 Initiative seeks to deliver 40% of the overall benefits in climate, clean energy, and other related areas to disadvantaged communities.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P2'}
  />,
  Q1_P3: <FormattedMessage
    id={ 'faqs.page.answers.Q1_P3'}
    defaultMessage={ 'Other useful links for Federal agencies:'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P3'}
  />,
  Q1_P3_1: <FormattedMessage
    id={ 'faqs.page.answers.Q1_P3_1'}
    defaultMessage={ 'Addendum to the Justice40 Interim Guidance'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P3_1'}
  />,
  Q1_P3_2: <FormattedMessage
    id={ 'faqs.page.answers.Q1_P3_2'}
    defaultMessage={ 'Instructions to Federal Agencies on Using the CEJST'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P3_2'}
  />,
  Q1_P4: <FormattedMessage
    id={ 'faqs.page.answers.Q1_P4'}
    defaultMessage={ 'The public can find communities of interest and provide feedback. This feedback will be used to improve the tool.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P4'}
  />,
  Q2_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q2_P1'}
    defaultMessage={ '<link1>Executive Order 14008</link1> recognizes that some communities are disadvantaged because they face burdens. The CEJST uses datasets that are indicators of burden. These burdens are related to climate change and the environment. They are also related to health and lack of economic opportunity.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P1'}
    values={{
      link1: linkFn(EXEC_ORDER_LINK, false, true),
    }}
  />,
  Q2_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q2_P2'}
    defaultMessage={ 'The tool highlights disadvantaged communities across all 50 states, the District of Columbia, and the U.S. territories. Communities are considered disadvantaged:'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P2'}
  />,
  Q2_P2_1: <FormattedMessage
    id={ 'faqs.page.answers.Q2_P2_1'}
    defaultMessage={ 'If they are in a census tract that meets the thresholds for at least one of the tool’s categories of burden, or'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P2_1'}
  />,
  Q2_P2_2: <FormattedMessage
    id={ 'faqs.page.answers.Q2_P2_2'}
    defaultMessage={ 'If they are on land within the boundaries of Federally Recognized Tribes'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P2_2'}
  />,
  Q2_P3: <FormattedMessage
    id={ 'faqs.page.answers.Q2_P3'}
    defaultMessage={ 'Not all disadvantaged communities can be shown on the map. Some communities do not live in just one place. The Interim Implementation Guidance on the Justice40 Initiative also directs Federal agencies to consider geographically dispersed communities when implementing programs included in the Justice40 Initiative.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P3'}
  />,
  Q2_P4: <FormattedMessage
    id={ 'faqs.page.answers.Q2_P4'}
    defaultMessage={ 'The tool uses census tracts. Census tracts are small units of geography. Census tract boundaries for <link1>statistical areas</link1> are determined by the U.S. Census Bureau once every ten years. The tool utilizes the census tract boundaries from 2010. This was chosen primarily because many of the data sources in the tool currently use the 2010 census boundaries.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P4'}
    values={{
      link1: linkFn(`https://www.census.gov/programs-surveys/acs/geography-acs/geography-boundaries-by-year.html`, false, true),
    }}
  />,
  Q3_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q3_P1'}
    defaultMessage={ 'No. The Climate and Economic Justice Screening Tool (CEJST) does not use racial demographics in its methodology. The current version of the tool displays data about race and age only to provide information when a census tract is selected.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q3_P1'}
  />,
  Q3_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q3_P2'}
    defaultMessage={ 'It is well-documented that communities of color suffer disproportionately from environmental and health burdens. Due to decades of underinvestment, they also face greater risks from climate change.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q3_P2'}
  />,
  Q3_P3: <FormattedMessage
    id={ 'faqs.page.answers.Q3_P3'}
    defaultMessage={ 'Although the CEJST does not use race in its methodology, the tool creates a map that seeks to reflect the on-the-ground burdens and realities that disadvantaged communities face. The tool shows communities that have environmental burdens and face injustice.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q3_P3'}
  />,
  Q4_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q4_P1'}
    defaultMessage={ 'Yes, the version 1.0 of the CEJST has some data for all the territories but not all the CEJST data are available or used for all U.S. territories. '}
    description={ 'Navigate to the FAQs page, this will be an answer, Q4_P1'}
  />,
  Q4_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q4_P2'}
    defaultMessage={ `<boldtag>Puerto Rico:</boldtag> The data used for Puerto Rico are from all relevant and available fields in the energy, housing, legacy pollution, transportation, and workforce development categories. The following data are used: projected flood risk, energy cost, lack of plumbing, lead paint, housing cost, proximity to hazardous waste facilities, proximity to Superfund or National Priorities List (NPL) sites, proximity to Risk Management Plan (RMP) facilities, diesel particulate matter exposure, traffic proximity and volume, underground storage tanks and releases, wastewater discharge, poverty, unemployment, and high school education. Linguistic isolation was removed for Puerto Rico based on feedback received during the beta period. `}
    description={ 'Navigate to the FAQs page, this will be an answer, Q4_P2'}
    values={{
      boldtag: boldFn,
    }}
  />,
  Q4_P3: <FormattedMessage
    id={ 'faqs.page.answers.Q4_P3'}
    defaultMessage={ '<boldtag>American Samoa, Guam, the Northern Mariana Islands, and the U.S. Virgin Islands:</boldtag> For these U.S. territories, the tool uses the following data: unemployment, poverty, low median income, and high school education. These burdens are in the workforce development category. '}
    description={ 'Navigate to the FAQs page, this will be an answer, Q4_P3'}
    values={{
      boldtag: boldFn,
    }}
  />,
  Q5_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q5_P1'}
    defaultMessage={`
      To respect Tribal sovereignty and self-government and to fulfill Federal trust and treaty responsibilities to Tribal Nations, land within the boundaries of Federally Recognized tribes are highlighted as disadvantaged on the map. Alaska Native Villages are included as point locations that are smaller than census tracts. The boundaries of census tracts and the lands of Federally Recognized Tribes are different.
    `}
    description={ 'Navigate to the FAQs page, this will be an answer, Q5_P1'}
  />,
  Q5_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q5_P2'}
    defaultMessage={ `Federally Recognized Tribes are those that are recognized by the U.S. Bureau of Indian Affairs in the <link1>annual notice</link1> it publishes in the Federal Register:`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q5_P2'}
    values={{
      link1: linkFn(FED_RECOGNIZED_INDIAN_ENTITIES, false, true),
    }}
  />,
  Q5_P2_1: <FormattedMessage
    id={ 'faqs.page.answers.Q5_P2_1'}
    defaultMessage={ `This decision was made after meaningful and robust consultation with Tribal Nations. This approach is consistent with CEQ’s <link1>Action Plan for Consultation and Coordination with Tribal Nations</link1>, <link3>President Biden’s Memorandum on Tribal Consultation and Strengthening Nation-to-Nation Consultation</link3>, and <link2>Executive Order 13175 on Consultation and Coordination With Indian Tribal Governments</link2>.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q5_P2_1'}
    values={{
      link1: linkFn(EXPLORE_PAGE_LINKS.WH_GOV_TRIBAL_ACTION_PLAN_4_26_21, false, true),
      link2: linkFn(EXPLORE_PAGE_LINKS.FED_REGISTER_CONSULT_TRIBE_GOV_2000, false, true),
      link3: linkFn(EXPLORE_PAGE_LINKS.WH_GOV_TRIBAL_CONSULT_NATION_NATION_01_25_21, false, true),
    }}
  />,
  Q6_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q6_P1'}
    defaultMessage={ `Some census tracts that contain land within the boundaries of Federally Recognized Tribes are also considered disadvantaged because they meet the burden thresholds for at least one of the categories on the tool. When this happens, the areas appear darker on the tool’s map.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P1'}
  />,
  Q6_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q6_P2'}
    defaultMessage={ ` : Disadvantaged census tracts (meets threshold methodology OR contains lands of Tribes)`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P2'}
  />,
  Q6_P3: <FormattedMessage
    id={ 'faqs.page.answers.Q6_P3'}
    defaultMessage={ ` : Disadvantaged census tracts and land within the boundaries of Federally Recognized Tribes (meets threshold methodology AND contains lands of Tribes)
    `}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P3'}
  />,
  Q6_P4: <FormattedMessage
    id={ 'faqs.page.answers.Q6_P4'}
    defaultMessage={ `Any area that is highlighted is considered disadvantaged, regardless of whether it is a light shade or dark shade. The tool will show if a whole census tract is considered disadvantaged or just the parts that are within the boundaries of Federally Recognized Tribes.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P4'}
  />,
  Q7: <FormattedMessage
    id={ 'faqs.page.answers.Q7'}
    defaultMessage={ `A census tract that does not meet any of the burden thresholds in the tool is usually not considered to be a disadvantaged community. However, if such a census tract contains land within the boundaries of Federally Recognized Tribes, then the parts of the tract that contain the land of Tribes are considered disadvantaged. The tool will display this type of census tract as “partially disadvantaged.”`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q7'}
  />,
  Q8_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q8_P1'}
    defaultMessage={ `The Biden administration is advancing environmental justice across the whole-of-government. The Justice40 Initiative is a critical part of this effort. The Justice40 Initiative seeks to deliver 40% of the overall benefits of climate, clean energy, and related investments to disadvantaged communities.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q8_P1'}
  />,
  Q8_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q8_P2'}
    defaultMessage={ `The CEJST will play an important role in the Justice40 Initiative. It will help to provide a single, consistent definition of disadvantaged communities for programs  included in the Justice40 Initiative.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q8_P2'}
  />,
  Q9_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P1'}
    defaultMessage={ `Federal agencies will use the tool to help identify disadvantaged communities that will benefit from programs included in the Justice40 Initiative. The Justice40 Initiative seeks to deliver 40% of the overall benefits of certain investments to disadvantaged communities.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P1'}
  />,
  Q9_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2'}
    defaultMessage={ `Federal agencies will use this definition to direct Justice40 investment benefits in the following areas:`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2'}
  />,
  Q9_P2_1: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_1'}
    defaultMessage={ `Climate`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_1'}
  />,
  Q9_P2_2: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_2'}
    defaultMessage={ `Clean energy and energy efficiency`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_2'}
  />,
  Q9_P2_3: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_3'}
    defaultMessage={ `Clean transit`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_3'}
  />,
  Q9_P2_4: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_4'}
    defaultMessage={ `Affordable and sustainable housing`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_4'}
  />,
  Q9_P2_5: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_5'}
    defaultMessage={ `Training and workforce development`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_5'}
  />,
  Q9_P2_6: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_6'}
    defaultMessage={ `Remediation and reduction of legacy pollution`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_6'}
  />,
  Q9_P2_7: <FormattedMessage
    id={ 'faqs.page.answers.Q9_P2_7'}
    defaultMessage={ `Development of clean water and wastewater infrastructure`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q9_P2_7'}
  />,
  Q10: <FormattedMessage
    id={ 'faqs.page.answers.Q10'}
    defaultMessage={ `Recent historic legislation, such as the Bipartisan Infrastructure Law and the Inflation Reduction Act, have created new programs or directed funds to existing programs. These investments are included in the Justice40 Initiative if they meet the eligibility criteria. Agencies will use the tool to help identify disadvantaged communities that will receive 40% of the overall benefits of those Justice40 programs.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q10'}
    // values={{
    //   link1: linkFn(`https://www.whitehouse.gov/wp-content/uploads/2021/07/M-21-28.pdf`, false, true),
    // }}
  />,
  Q11: <FormattedMessage
    id={ 'faqs.page.answers.Q11'}
    defaultMessage={ `The Council on Environmental Quality (CEQ), the Office of Management and Budget (OMB), and the Climate Policy Office (CPO) released the Justice40 Interim Implementation Guidance on July 20, 2021. It directed agencies to develop interim definitions of disadvantaged communities. Agencies used their interim definitions during the tool’s beta phase. Agencies will now transition to using version 1.0 of the tool to geographically identify disadvantaged communities.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q11'}
  />,
  Q12_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1'}
    defaultMessage={ `The CEJST uses lessons learned from the EPA's EJScreen. EJScreen is an environmental justice mapping and screening tool. EJScreen shows environmental and demographic information and combines that information together into indices. The EPA, Federal agencies, and state and local governments will continue to use EJScreen to understand and analyze for environmental and EJ issues. For example, EPA uses <link1> EJScreen </link1> to:`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1'}
    values={{
      link1: linkFn(EJSCREEN, false, true),
    }}
  />,
  Q12_P1_1: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_1'}
    defaultMessage={ `Inform outreach and engagement practices`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_1'}
  />,
  Q12_P1_2: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_2'}
    defaultMessage={ `Implement aspects of the following programs:`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_2'}
  />,
  Q12_P1_2_1: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_2_1'}
    defaultMessage={ `Permitting programs`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_2_1'}
  />,
  Q12_P1_2_2: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_2_2'}
    defaultMessage={ `Enforcement programs`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_2_2'}
  />,
  Q12_P1_2_3: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_2_3'}
    defaultMessage={ `Compliance programs`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_2_3'}
  />,
  Q12_P1_2_4: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_2_4'}
    defaultMessage={ `Voluntary programs`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_2_4'}
  />,
  Q12_P1_3: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_3'}
    defaultMessage={ `Develop retrospective reports of EPA work`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_3'}
  />,
  Q12_P1_4: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P1_4'}
    defaultMessage={ `Enhance geographically based initiatives`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P1_4'}
  />,
  Q12_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P2'}
    defaultMessage={ `However, EPA does not use EJScreen to identify or label an area as an "EJ community" or as the sole basis for agency-decision-making.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P2'}
  />,
  Q12_P3: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P3'}
    defaultMessage={ `In contrast, the CEJST will help Federal agencies to identify disadvantaged communities that will benefit from programs included in the Justice40 Initiative.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P3'}
  />,
  Q12_P4: <FormattedMessage
    id={ 'faqs.page.answers.Q12_P4'}
    defaultMessage={ `<link1>This chart</link1> is helpful for understanding how the CEJST differs from some of the other Federal environmental screening tools.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q12_P4'}
    values={{
      link1: linkFn(DOWNLOAD_FILES.NARWAL.COMP_CHART.URL, false, true),
    }}
  />,
  Q13_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q13_P1'}
    defaultMessage={ `Several states that have environmental justice screening tools. CalEnviroScreen is an environmental justice screening tool for California. Other states, like New York and Michigan have screening tools as well. The Climate and Economic Justice Screening Tool (CEJST)  incorporates lessons learned from these efforts.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q13_P1'}
  />,
  Q13_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q13_P2'}
    defaultMessage={ `There is an important difference between state-based tools and the CEJST. State tools use data that may not be available for other states. The CEJST only uses data that are nationally-consistent and publicly-available.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q13_P2'}
  />,
  Q14: <FormattedMessage
    id={ 'faqs.page.answers.Q14'}
    defaultMessage={ `The WHEJAC provided recommendations on the Climate and Economic Justice Screening Tool (CEJST). The CEJST follows many of these recommendations.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q14'}
  />,
  Q15_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q15_P1'}
    defaultMessage={ `Yes. The CEJST website has multiple ways to offer feedback on the tool.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q15_P1'}
  />,
  Q15_P1_1: <FormattedMessage
    id={ 'faqs.page.answers.Q15_P1_1'}
    defaultMessage={ `The public can find census tracts that they are familiar with and send feedback about those tracts. That feedback is used to “ground truth” the tool. This helps the tool to better reflect the realities for communities.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q15_P1_1'}
  />,
  Q15_P1_2: <FormattedMessage
    id={ 'faqs.page.answers.Q15_P1_2'}
    defaultMessage={ `The public can also submit <link1>data sources</link1> or ideas for consideration.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q15_P1_2'}
    values={{
      link1: linkFn('https://www.surveymonkey.com/r/6G9TQJ8', false, true),
    }}
  />,
  Q15_P1_3: <FormattedMessage
    id={ 'faqs.page.answers.Q15_P1_3'}
    defaultMessage={ `The public may also take a <link1>short survey</link1> to help improve the experience of using the tool.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q15_P1_3'}
    values={{
      link1: linkFn('https://www.surveymonkey.com/r/5LZ7MNB', false, true),
    }}
  />,
  Q15_P1_4: <FormattedMessage
    id={ 'faqs.page.answers.Q15_P1_4'}
    defaultMessage={ `The public can also email {general_email_address}`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q15_P1_4'}
    values={{
      general_email_address:
      <LinkTypeWrapper
        linkText={FEEDBACK_EMAIL}
        internal={false}
        url={`mailto:${FEEDBACK_EMAIL}`}
        openUrlNewTab={true}
      />,
    }}
  />,
  Q16: <FormattedMessage
    id={ 'faqs.page.answers.Q16'}
    defaultMessage={ `Yes. CEQ plans to issue a Request for Information (RFI) about version 1.0 of the CEJST in 2023. The feedback received in that RFI will inform version 2.0 of the tool.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q16'}
  />,
  Q17_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q17_P1'}
    defaultMessage={ `The tool is now considered official because Federal agencies can now use version 1.0 of the Climate and Economic Justice Screening Tool (CEJST) to help identify disadvantaged communities. The 1.0 version was released in <link1>November, 2022</link1>. The tool is no longer in beta.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q17_P1'}
    values={{
      link1: linkFn('https://www.whitehouse.gov/ceq/news-updates/2022/11/22/biden-harris-administration-launches-version-1-0-of-climate-and-economic-justice-screening-tool-key-step-in-implementing-president-bidens-justice40-initiative/', false, true),
    }}
  />,
  Q17_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q17_P2'}
    defaultMessage={ `The tool will be improved over time. The Council on Environmental Quality (CEQ) will update the tool each year based on public feedback, research, and the availability of new data.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q17_P2'}
  />,
  Q18: <FormattedMessage
    id={ 'faqs.page.answers.Q18'}
    defaultMessage={ `<link1>Sign-up</link1> to receive updates on the Climate and Economic Justice Screening Tool (CEJST) and other environmental justice news from CEQ.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q18'}
    values={{
      link1: linkFn(`https://lp.constantcontactpages.com/su/Vm8pCFj/spring`, false, true),
    }}
  />,
  Q19: <FormattedMessage
    id={ 'faqs.page.answers.Q19'}
    defaultMessage={ `The Climate and Economic Justice Screening Tool (CEJST) has <link1>downloads</link1> available. Spreadsheets (.xlxs) and (.csv) contain the tool’s definitions and data. This data can be used for analysis. Shapefiles and geojson files can be uploaded into other mapping programs such as Esri. The downloads include information on how to use the files.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q19'}
    values={{
      link1: linkFn(PAGES_ENDPOINTS.DOWNLOADS, true, false),
    }}
  />,
  Q20_P1: <FormattedMessage
    id={ 'faqs.page.answers.Q20_P1'}
    defaultMessage={ `The tool’s shapefile can be uploaded into other mapping programs such as Esri.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q20_P1'}
  />,
  Q20_P2: <FormattedMessage
    id={ 'faqs.page.answers.Q20_P2'}
    defaultMessage={ `The <link1>shapefile</link1> format is <link2>a geospatial vector data format</link2> for geographic information system (GIS) software. It can be loaded into any software that works with Esri, ArcGIS or any other compatible GIS software. You may choose to download the data in this format so that you can load the data from the Climate and Economic Justice Screening Tool (CEJST) into other tools and use those tools to combine the CEJST data with other datasets and sources.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q20_P2'}
    values= {{
      link1: linkFn('https://en.wikipedia.org/wiki/Shapefile', false, true),
      link2: linkFn('https://en.wikipedia.org/wiki/GIS_file_formats', false, true),
    }}
  />,
};
