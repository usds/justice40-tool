/* eslint-disable max-len */
import React from 'react';
import {defineMessages, FormattedMessage} from 'gatsby-plugin-intl';

import {EXEC_ORDER_LINK, FED_RECOGNIZED_INDIAN_ENTITIES} from './about';
import {boldFn, linkFn} from './common';

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
    defaultMessage={ 'Q: How is the Climate and Economic Justice Screening Tool (CEJST) different from the Environmental Protection Agency’s (EPA) EJScreen?'}
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
  <FormattedMessage
    id={ 'faqs.page.Q16'}
    key={ 'faqs.page.Q16'}
    defaultMessage={ 'Q: Will CEQ issue another Request for Information about the tool?'}
    description={ 'Navigate to the FAQs page, this will be Q16'}
  />,
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
    id={ 'faqs.page.Q1_P1'}
    defaultMessage={ 'The CEJST is a critical component of the Biden-Harris Administration’s historic commitment to advancing environmental justice. In <link1>Executive Order 14008</link1> on Tackling the Climate Crisis at Home and Abroad, President Biden directed the White House Council on Environmental Quality (CEQ) to develop a geospatial mapping tool to identify disadvantaged communities that face burdens. The tool has an interactive map and uses datasets that are indicators of burdens.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P1'}
    values={{
      link1: linkFn(EXEC_ORDER_LINK, false, true),
    }}
  />,
  Q1_P2: <FormattedMessage
    id={ 'faqs.page.Q1_P2'}
    defaultMessage={ 'Federal agencies will use the tool for the Justice40 Initiative. It will help them identify disadvantaged communities that should receive 40% of the overall benefits of programs included in the Justice40 Initiative. The Justice40 Initiative seeks to deliver 40% of the overall benefits in climate, clean energy, and other related areas to disadvantaged communities.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P2'}
  />,
  Q1_P3: <FormattedMessage
    id={ 'faqs.page.Q1_P3'}
    defaultMessage={ 'Other useful links for Federal agencies:'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P3'}
  />,
  Q1_P3_1: <FormattedMessage
    id={ 'faqs.page.Q1_P3_1'}
    defaultMessage={ 'Addendum to the Justice40 Interim Guidance'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P3_1'}
  />,
  Q1_P3_2: <FormattedMessage
    id={ 'faqs.page.Q1_P3_2'}
    defaultMessage={ 'Instructions to Federal Agencies on Using the CEJST'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P3_2'}
  />,
  Q1_P4: <FormattedMessage
    id={ 'faqs.page.Q1_P4'}
    defaultMessage={ 'The public can find communities of interest and provide feedback. This feedback will be used to improve the tool.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q1_P4'}
  />,
  Q2_P1: <FormattedMessage
    id={ 'faqs.page.Q2_P1'}
    defaultMessage={ 'Executive Order 14008 recognizes that some communities are disadvantaged because they face burdens. The CEJST uses datasets that are indicators of burden. These burdens are related to climate change and the environment. They are also related to health and lack of economic opportunity.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P1'}
  />,
  Q2_P2: <FormattedMessage
    id={ 'faqs.page.Q2_P2'}
    defaultMessage={ 'The tool highlights disadvantaged communities across all 50 states, the District of Columbia, and the U.S. territories. A community is considered disadvantaged:'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P2'}
  />,
  Q2_P2_1: <FormattedMessage
    id={ 'faqs.page.Q2_P2_1'}
    defaultMessage={ 'If they are in a census tract that meets the thresholds for at least one of the tool’s categories of burden, or'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P2_1'}
  />,
  Q2_P2_2: <FormattedMessage
    id={ 'faqs.page.Q2_P2_2'}
    defaultMessage={ 'If they are on Federally Recognized Tribal land'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P2_2'}
  />,
  Q2_P3: <FormattedMessage
    id={ 'faqs.page.Q2_P3'}
    defaultMessage={ 'Not all disadvantaged communities can be shown on the map. Some communities, such as migrant workers, do not live in just one place. The Interim Implementation Guidance on the Justice40 Initiative also directs Federal agencies to consider geographically dispersed communities when implementing programs included in the Justice40 Initiative.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q2_P3'}
  />,
  Q3_P1: <FormattedMessage
    id={ 'faqs.page.Q3_P1'}
    defaultMessage={ 'No. The Climate and Economic Justice Screening Tool (CEJST) does not use racial demographics in its methodology. The current version of the tool offers data about race and age only as information when a specific census tract is selected. It is well-documented that communities of color suffer disproportionately from environmental and health burdens. Due to decades of underinvestment, they also face greater risks from climate change.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q3_P1'}
  />,
  Q3_P2: <FormattedMessage
    id={ 'faqs.page.Q3_P2'}
    defaultMessage={ 'Although the CEJST does not use race in the methodology, it seeks to create a map that reflects the on-the-ground burdens and realities that disadvantaged communities face. The tool shows communities that have environmental burdens and face injustice.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q3_P2'}
  />,
  Q4_P1: <FormattedMessage
    id={ 'faqs.page.Q4_P1'}
    defaultMessage={ 'Yes, the version 1.0 of the CEJST has some data for all the territories but not all the CEJST data are available or used for all U.S. territories. '}
    description={ 'Navigate to the FAQs page, this will be an answer, Q4_P1'}
  />,
  Q4_P2: <FormattedMessage
    id={ 'faqs.page.Q4_P2'}
    defaultMessage={ `<boldtag>Puerto Rico:</boldtag> The data used for Puerto Rico are from all relevant and available fields in the energy, housing, legacy pollution, transportation, and workforce development categories. The following data are used: projected flood risk, energy cost, lack of plumbing, lead paint, housing cost, proximity to hazardous waste facilities, proximity to Superfund or National Priorities List (NPL) sites, proximity to Risk Management Plan (RMP) facilities, diesel particulate matter exposure, traffic proximity and volume, leaking underground storage tanks, wastewater discharge, poverty, unemployment, and high school education. Linguistic isolation was removed for Puerto Rico based on feedback received during the beta period. `}
    description={ 'Navigate to the FAQs page, this will be an answer, Q4_P2'}
    values={{
      boldtag: boldFn,
    }}
  />,
  Q4_P3: <FormattedMessage
    id={ 'faqs.page.Q4_P3'}
    defaultMessage={ '<boldtag>American Samoa, Guam, the Northern Mariana Islands, and the U.S. Virgin Islands:</boldtag> The data used for Puerto Rico are from all relevant and available fields in the energy, housing, legacy pollution, transportation, and workforce development categories. The following data are used: projected flood risk, energy cost, lack of plumbing, lead paint, housing cost, proximity to hazardous waste facilities, proximity to Superfund or National Priorities List (NPL) sites, proximity to Risk Management Plan (RMP) facilities, diesel particulate matter exposure, traffic proximity and volume, leaking underground storage tanks, wastewater discharge, poverty, unemployment, and high school education. Linguistic isolation was removed for Puerto Rico based on feedback received during the beta period. '}
    description={ 'Navigate to the FAQs page, this will be an answer, Q4_P3'}
    values={{
      boldtag: boldFn,
    }}
  />,
  Q5_P1: <FormattedMessage
    id={ 'faqs.page.Q5_P1'}
    defaultMessage={ 'To respect Tribal sovereignty and self-government and to fulfill Federal trust and treaty responsibilities to Tribal Nations, Federally Recognized Tribal lands are highlighted as disadvantaged on the map. Alaska Native Villages are included as point locations that are smaller than census tracts. The tool’s census tracts and Tribal lands have different boundaries.'}
    description={ 'Navigate to the FAQs page, this will be an answer, Q5_P1'}
  />,
  Q5_P2: <FormattedMessage
    id={ 'faqs.page.Q5_P2'}
    defaultMessage={ `Federally Recognized Tribes are those that are recognized by the U.S. Bureau of Indian Affairs in the <link1>annual notice</link1> it publishes in the Federal Register:`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q5_P2'}
    values={{
      link1: linkFn(FED_RECOGNIZED_INDIAN_ENTITIES, false, true),
    }}
  />,
  Q5_P2_1: <FormattedMessage
    id={ 'faqs.page.Q5_P2_1'}
    defaultMessage={ `The decision to highlight Federally-recognized Tribal lands on the CEJST map and to designate them as disadvantaged communities was made after meaningful and robust consultation with Tribal Nations. This approach is consistent with CEQ’s Action Plan for Consultation and Coordination with Tribal Nations, President Biden’s Memorandum on Tribal Consultation and Strengthening Nation-to-Nation Consultation, and Executive Order 13175 on Consultation and Coordination With Indian Tribal Governments.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q5_P2_1'}
  />,
  Q6_P1: <FormattedMessage
    id={ 'faqs.page.Q6_P1'}
    defaultMessage={ `Some census tracts that contain lands of Federally-recognized Tribes that are also considered disadvantaged because they meet the burden thresholds for at least one of the categories on the tool. When this happens, the areas appear darker on the tool’s map.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P1'}
  />,
  Q6_P2: <FormattedMessage
    id={ 'faqs.page.Q6_P2'}
    defaultMessage={ ` : Disadvantaged census tracts`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P2'}
  />,
  Q6_P3: <FormattedMessage
    id={ 'faqs.page.Q6_P3'}
    defaultMessage={ ` : Disadvantaged census tracts and Federally-Recognized Tribal lands`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P3'}
  />,
  Q6_P4: <FormattedMessage
    id={ 'faqs.page.Q6_P4'}
    defaultMessage={ `Any area that is highlighted is considered disadvantaged, regardless of whether it is a light shade or dark shade. The tool will show if a whole census tract is considered disadvantaged or just the parts that are Federally Recognized Tribal lands.`}
    description={ 'Navigate to the FAQs page, this will be an answer, Q6_P4'}
  />,
};
