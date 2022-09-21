import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import AboutCard from '../components/AboutCard/AboutCard';
import AboutCardsContainer from '../components/AboutCard/AboutCardsContainer';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as ABOUT_COPY from '../data/copy/about';
import * as COMMON_COPY from '../data/copy/common';
import {PAGES_ENDPOINTS} from '../data/constants';

// @ts-ignore
import aboutUSMapImg from '../images/about-usmap-1.svg';
// @ts-ignore
import aboutJ40Img from '../images/about-j40-1.svg';
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

  return (
    <Layout location={location} title={intl.formatMessage(ABOUT_COPY.PAGE.TILE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1 data-cy={'about-page-heading'}>{intl.formatMessage(ABOUT_COPY.PAGE.HEADING)}</h1>
        </section>

        {/* Section 1 */}
        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            imgSrc={aboutUSMapImg}
            header={intl.formatMessage(ABOUT_COPY.PAGE.HEADING_1)}>
            <>
              <p>
                {ABOUT_COPY.HEADING_1.DESCRIPTION_1}
              </p>
              <p>
                {intl.formatMessage(ABOUT_COPY.PAGE.HEADING1_DESCRIPTION2)}
              </p>
            </>
          </AboutCard>
        </AboutCardsContainer>


        {/* Section 2 */}
        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            imgSrc={aboutJ40Img}
            header={intl.formatMessage(ABOUT_COPY.PAGE.HEADING_2)}>
            <>
              <p>
                {intl.formatMessage(ABOUT_COPY.PAGE.HEADING2_DESCRIPTION1)}
              </p>
              <p>
                {ABOUT_COPY.HEADING_2.DESCRIPTION_2}
              </p>
            </>
          </AboutCard>
        </AboutCardsContainer>

        {/* Section 3 */}
        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            header={intl.formatMessage(ABOUT_COPY.PAGE.HEADING_3)}>
            <>
              <p>
                {ABOUT_COPY.HEADING_3.DESCRIPTION_1}
              </p>
            </>
          </AboutCard>
        </AboutCardsContainer>

      </J40MainGridContainer>

      <J40MainGridContainer
        fullWidth={true}
        blueBackground={true}>
        <J40MainGridContainer>
          <h2>
            {intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.TITLE)}
          </h2>
          <AboutCardsContainer>
            <AboutCard
              size={'small'}
              imgSrc={accountBalanceIcon}
              header={intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.FEDERAL_PM_HEADING)}
              linkText={intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.FEDERAL_PM_LINK_TEXT)}
              url={PAGES_ENDPOINTS.METHODOLOGY}
              internal={true}>
              <p>
                {intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.FEDERAL_PM_INFO)}
              </p>
            </AboutCard>

            <AboutCard
              size={'small'}
              imgSrc={groupsIcon}
              header={intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.COMMUNITY_MEMBERS_HEADING)}
              linkText={intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.COMMUNITY_MEMBERS_LINK_TEXT)}
              url={PAGES_ENDPOINTS.EXPLORE}
              internal={true}>
              <p>
                {intl.formatMessage(ABOUT_COPY.HOW_TO_GET_STARTED.COMMUNITY_MEMBERS_INFO)}
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
            url={`mailto:${COMMON_COPY.FEEDBACK_EMAIL}`}
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
      </J40MainGridContainer>
    </Layout>);
};

export default AboutPage;
