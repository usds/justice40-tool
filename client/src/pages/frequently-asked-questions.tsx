import * as React from 'react';
import {Accordion, Grid} from '@trussworks/react-uswds';
import {AccordionItemProps} from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import SubPageNav from '../components/SubPageNav';

import * as CONSTANTS from '../data/constants';
import * as FAQS_COPY from '../data/copy/faqs';
import {PAGES_ENDPOINTS} from '../data/constants';
import {SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT} from '../data/copy/explore';

// @ts-ignore
import censusDotIcon from '../images/sidePanelIcons/census-tract.svg';
// @ts-ignore
import tribalDotIcon from '../images/sidePanelIcons/tribal-tract.svg';

interface IFAQPageProps {
  location: Location;
}

const dotStyles = {
  display: 'flex',
  p: {
    paddingLeft: '2px',
  },
};

const FAQPage = ({location}: IFAQPageProps) => {
  const intl = useIntl();
  const {width} = useWindowSize();
  const ANSWERS = [
    (
      <>
        <p key={1}>{FAQS_COPY.FAQ_ANSWERS.Q1_P1}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q1_P2}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q1_P3}</p>
        <ul>
          <li>{FAQS_COPY.FAQ_ANSWERS.Q1_P3_1}</li>
          <li>{FAQS_COPY.FAQ_ANSWERS.Q1_P3_2}</li>
        </ul>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q1_P4}</p>
      </>
    ),
    (
      <>
        <p key={2}>{FAQS_COPY.FAQ_ANSWERS.Q2_P1}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q2_P2}</p>
        <ul>
          <li>{FAQS_COPY.FAQ_ANSWERS.Q2_P2_1}</li>
          <li>{FAQS_COPY.FAQ_ANSWERS.Q2_P2_2}</li>
        </ul>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q2_P3}</p>
      </>
    ),
    (
      <>
        <p key={3}>{FAQS_COPY.FAQ_ANSWERS.Q3_P1}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q3_P2}</p>
      </>
    ),
    (
      <>
        <p key={4}>{FAQS_COPY.FAQ_ANSWERS.Q4_P1}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q4_P2}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q4_P3}</p>
      </>
    ),
    (
      <>
        <p key={5}>{FAQS_COPY.FAQ_ANSWERS.Q5_P1}</p>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q5_P2}</p>
        <ul>
          <li>{FAQS_COPY.FAQ_ANSWERS.Q5_P2_1}</li>
        </ul>
      </>
    ),
    (
      <>
        <p key={6}>{FAQS_COPY.FAQ_ANSWERS.Q6_P1}</p>
        <div style={dotStyles}>
          <img src={censusDotIcon}
            alt={intl.formatMessage(SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.DAC_CIRCLE)}
          />
          <div style={dotStyles.p}>{FAQS_COPY.FAQ_ANSWERS.Q6_P2}</div>
        </div>
        <div style={dotStyles}>
          <img src={tribalDotIcon}
            alt={intl.formatMessage(SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.DAC_CIRCLE)}
          />
          <div style={dotStyles.p}>{FAQS_COPY.FAQ_ANSWERS.Q6_P3}</div>
        </div>
        <p>{FAQS_COPY.FAQ_ANSWERS.Q6_P4}</p>
      </>
    ),
  ];

  const numberOfQuestions = Object.keys(FAQS_COPY.QUESTIONS).length;

  const faqItems: AccordionItemProps[] = [...Array(numberOfQuestions).keys()].map((questionNum) => {
    return {
      id: `faq-id-${questionNum}`,
      title: FAQS_COPY.QUESTIONS[questionNum],
      content: ANSWERS[questionNum],
      expanded: false,
      headingLevel: 'h2',
    };
  });

  return (
    <Layout location={location} title={intl.formatMessage(FAQS_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>
        <h1>{intl.formatMessage(FAQS_COPY.PAGE_INTRO.PAGE_TILE)}</h1>

        <Grid row gap className={'j40-mb5-mt3'}>

          {/* First column */}
          <Grid col={12} tablet={{col: 7}}>
            <section>
              {/* Enabling multiselect true fails a11y using axe tool */}
              <Accordion items={faqItems}/>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 2}}>
            {/* Spacer column */}
          </Grid>

          {/* Third column */}
          {width > CONSTANTS.USWDS_BREAKPOINTS.DESKTOP ?
          <Grid col={12} tablet={{col: 3}}>
            <SubPageNav
              endPoints={[
                PAGES_ENDPOINTS.ABOUT,
                PAGES_ENDPOINTS.PUBLIC_ENG,
                PAGES_ENDPOINTS.FAQS,
              ]}
            />
          </Grid> : ''}
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default FAQPage;
