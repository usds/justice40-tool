import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

import AboutCard from '../components/AboutCard/AboutCard';
import AboutCardsContainer from '../components/AboutCard/AboutCardsContainer';
import {Grid} from '@trussworks/react-uswds';
import HowYouCanHelp from '../components/HowYouCanHelp';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import PublicEngageButton from '../components/PublicEngageButton';
import SubPageNav from '../components/SubPageNav';

import * as ABOUT_COPY from '../data/copy/about';
import {FEEDBACK_EMAIL} from '../data/copy/common';
import {PAGES_ENDPOINTS, USWDS_BREAKPOINTS} from '../data/constants';

import accountBalanceIcon // @ts-ignore
  from '/node_modules/uswds/dist/img/usa-icons/account_balance.svg';

import groupsIcon from // @ts-ignore
  '/node_modules/uswds/dist/img/usa-icons/groups.svg';

import commentIcon from // @ts-ignore
  '/node_modules/uswds/dist/img/usa-icons/comment.svg';

import githubIcon from // @ts-ignore
  '/node_modules/uswds/dist/img/usa-icons/github.svg';

interface IAboutPageProps {
  location: Location;
}

// markup
const AboutPage = ({location}: IAboutPageProps) => {
  const intl = useIntl();
  const {width} = useWindowSize();

  return (
    <Layout location={location} title={intl.formatMessage(ABOUT_COPY.PAGE.TITLE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1 data-cy={'about-page-heading'}>{intl.formatMessage(ABOUT_COPY.PAGE.TITLE)}</h1>
          <PublicEngageButton />
        </section>

        <Grid row gap className={'j40-mb5-mt3'}>

          {/* First column */}
          <Grid col={12} tablet={{col: 8}}>
            <section>
              <p>
                {ABOUT_COPY.CONTENT.PARA1}
              </p>
              <p>
                {ABOUT_COPY.CONTENT.PARA2}
              </p>
              {/* <div className={'j40-p-tag'}>
                {ABOUT_COPY.CONTENT.PARA3}
                <ul>
                  <li> {ABOUT_COPY.CONTENT.LI1}</li>
                  <li> {ABOUT_COPY.CONTENT.LI2}</li>
                </ul>
              </div> */}
              <p>
                {ABOUT_COPY.CONTENT.PARA4}
              </p>
              <p>
                {ABOUT_COPY.CONTENT.PARA5}
              </p>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 1}}>
            {/* Spacer column */}
          </Grid>

          {/* Third column */}
          {width > USWDS_BREAKPOINTS.DESKTOP ?
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

      <J40MainGridContainer
        fullWidth={true}
        blueBackground={true}>
        <J40MainGridContainer>

          <Grid col={12} tablet={{col: 8}}>
            <h2>
              {intl.formatMessage(ABOUT_COPY.HOW_TO_USE_TOOL.TITLE)}
            </h2>
            <p>
              {ABOUT_COPY.CONTENT.HOW_TO_USE_PARA1}
            </p>
            <p>
              {intl.formatMessage(ABOUT_COPY.HOW_TO_USE_TOOL.PARA2)}
            </p>
            <p>
              {ABOUT_COPY.CONTENT.HOW_TO_USE_PARA3}
            </p>
          </Grid>

          <AboutCardsContainer>
            <AboutCard
              size={'small'}
              imgSrc={accountBalanceIcon}
              header={intl.formatMessage(ABOUT_COPY.HOW_TO_USE_TOOL.USE_MAP_HEADING)}>
              <p>
                {intl.formatMessage(ABOUT_COPY.HOW_TO_USE_TOOL.USE_MAP_PARA)}
              </p>
            </AboutCard>

            <AboutCard
              size={'small'}
              imgSrc={groupsIcon}
              header={intl.formatMessage(ABOUT_COPY.HOW_TO_USE_TOOL.USE_DATA_HEADING)}>
              <p>
                {ABOUT_COPY.CONTENT.USE_DATA_PARA}
              </p>
            </AboutCard>
          </AboutCardsContainer>
        </J40MainGridContainer>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <h2>{intl.formatMessage(ABOUT_COPY.GET_INVOLVED.TITLE)}</h2>
        <AboutCardsContainer>
          <AboutCard
            size={'small'}
            imgSrc={commentIcon}
            header={intl.formatMessage(ABOUT_COPY.GET_INVOLVED.SEND_FEEDBACK_HEADING)}
            linkText={ABOUT_COPY.GET_INVOLVED_COMMENTS.EMAIL}
            url={`mailto:${FEEDBACK_EMAIL}`}
            openUrlNewTab={true}
            internal={false}>
            <p>
              {intl.formatMessage(ABOUT_COPY.GET_INVOLVED.SEND_FEEDBACK_INFO)}
            </p>
          </AboutCard>

          <AboutCard
            size={'small'}
            imgSrc={githubIcon}
            header={intl.formatMessage(ABOUT_COPY.GET_INVOLVED.JOIN_OSC_HEADING)}
            linkText={intl.formatMessage(ABOUT_COPY.GET_INVOLVED.JOIN_OSC_LINK_TEXT)}
            url={ABOUT_COPY.GITHUB_LINK}
            openUrlNewTab={true}
            internal={false}>
            <p>
              {intl.formatMessage(ABOUT_COPY.GET_INVOLVED.JOIN_OSC_INFO)}
            </p>
          </AboutCard>
        </AboutCardsContainer>

        <Grid col={12} tablet={{col: 8}}>
          <HowYouCanHelp/>
        </Grid>

      </J40MainGridContainer>
    </Layout>);
};

export default AboutPage;
