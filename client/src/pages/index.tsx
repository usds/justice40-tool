import * as React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, useIntl} from 'gatsby-plugin-intl';

import AboutCard from '../components/AboutCard/AboutCard';
import AboutCardsContainer from '../components/AboutCard/AboutCardsContainer';
import AlertWrapper from '../components/AlertWrapper';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

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


interface IndexPageProps {
  location: Location;
}

// markup
const IndexPage = ({location}: IndexPageProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    presidentalLinkUri: {
      id: 'index.presidentalLinkUri',
      defaultMessage: 'https://www.whitehouse.gov/briefing-room/' +
        'presidential-actions/2021/01/27/' +
        'executive-order-on-tackling-the-climate-' +
        'crisis-at-home-and-abroad/',
      description: 'Link url to presidential actions executive order. Part of paragraph 3',
    },
    presidentalLinkLabel: {
      id: 'index.presidentalLinkLabel',
      defaultMessage: 'Executive Order 14008 on Tackling the Climate Crisis at Home and Abroad',
      description: 'Link url to presidential actions executive order. Part of paragraph 3',
    },
    transparentLabel: {
      id: 'index.section3.transparentLabel',
      defaultMessage: 'Transparent:',
      description: 'Italic label for 1st paragraph of section 3 on index page',
    },
    inclusiveLabel: {
      id: 'index.section3.inclusiveLabel',
      defaultMessage: 'Inclusive:',
      description: 'Italic label for 2nd paragraph of section 3 on index page',
    },
    iterativeLabel: {
      id: 'index.section3.iterativeLabel',
      defaultMessage: 'Iterative:',
      description: 'Italic label for 3rd paragraph of section 3 on index page',
    },
    aboutScreenToolHeading: {
      id: 'index.heading.screentool',
      defaultMessage: 'The screening tool',
      description: 'heading for about screening tool',
    },
    aboutJustice40Heading: {
      id: 'index.heading.justice40',
      defaultMessage: 'The Justice40 Initiative',
      description: 'heading for about justice 40',
    },
  });

  return (
    <Layout location={location} title={'About'}>
      <J40MainGridContainer>
        <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
      </J40MainGridContainer>

      <J40MainGridContainer>

        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            imgSrc={aboutUSMapImg}
            header={intl.formatMessage(messages.aboutScreenToolHeading)}>

            <p>
              <FormattedMessage
                id={'index.aboutContent.p1'}
                description={'paragraph 1 of main content on index page'}
                defaultMessage=
                  {`On January 27, 2021, President Biden directed the Council on
                    Environmental Quality (CEQ) to create a climate and economic
                    justice screening tool. The purpose of the tool is to help
                    Federal agencies identify disadvantaged communities and provide
                    socioeconomic, environmental, and climate information and data
                    to inform decisions that may affect these communities. The tool
                    identifies disadvantaged communities as communities of focus
                    through publicly available, nationally consistent, high-quality
                    data.
                  `}/>
            </p>

            <p>
              <FormattedMessage
                id={'index.aboutContent.p1b'}
                description={'paragraph 1b of main content on index page'}
                defaultMessage={`
                The current version of the tool is in a public beta form and
                will be updated based on feedback from the public.
                  `}/>
            </p>
          </AboutCard>
        </AboutCardsContainer>

        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            imgSrc={aboutJ40Img}
            header={intl.formatMessage(messages.aboutJustice40Heading)}>

            <p>
              <FormattedMessage
                id="index.aboutContent.p2"
                description={'paragraph 2 of main content on index page'}
                defaultMessage={`
                The tool will provide important information for the Justice40
                Initiative. The goal of the Justice40 Initiative is to provide
                40-percent of the overall benefits of certain federal
                programs in seven key areas to disadvantaged communities.
                These seven key areas are: climate change, clean energy and
                energy efficiency, clean transit, affordable and sustainable
                housing, training and workforce development, the remediation
                and reduction of legacy pollution, and the development of
                critical clean water infrastructure.
                    `}/>
            </p>

            <p>
              <FormattedMessage
                id={'index.aboutContent.p3'}
                description={'paragraph 3 of main content on index page'}
                defaultMessage={`
                  Read more about the Justice40 Initiative in President Biden’s 
                  {presidentLink}
                  `}
                values={{
                  presidentLink:
                  <a
                    href={intl.formatMessage(messages.presidentalLinkUri)}
                    target="_blank"
                    rel="noreferrer">{intl.formatMessage(messages.presidentalLinkLabel)}
                  </a>,
                }}/>
            </p>

          </AboutCard>
        </AboutCardsContainer>
      </J40MainGridContainer>

      <J40MainGridContainer
        fullWidth={true}
        blueBackground={true}>
        <J40MainGridContainer>
          <h2>How to get started</h2>
          <AboutCardsContainer>
            <AboutCard
              size={'small'}
              imgSrc={accountBalanceIcon}
              header={'Federal program managers'}
              actionText={'Go to data & methodology'}
              actionUrl={'./methodology'}>
              Download the screening tool’s draft list of communities of focus.
              Explore data that may be useful to your program, and provide
              feedback on the tool.
            </AboutCard>

            <AboutCard
              size={'small'}
              imgSrc={groupsIcon}
              header={'Community members'}
              actionText={'Explore the tool'}
              actionUrl={'./cejst'}>
              Explore data about communities of focus in your area, and help
              provide feedback on the tool.
            </AboutCard>
          </AboutCardsContainer>
        </J40MainGridContainer>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <h2>Get involved</h2>
        <AboutCardsContainer>
          <AboutCard
            size={'small'}
            imgSrc={commentIcon}
            header={'Send feedback'}
            actionText={'Email: screeningtool.feedback@usds.gov'}
            actionUrl={'mailto:screeningtool.feedback@usds.gov'}>
            Have ideas about how this tool can be improved to better
            reflect the on-the-ground experiences of your community?
          </AboutCard>

          <AboutCard
            size={'small'}
            imgSrc={githubIcon}
            header={'Join the open source community'}
            actionText={'Check it out on GitHub'}
            actionUrl={'https://github.com/usds/justice40-tool'}
            actionOpenInNewTab={true}>
            The screening tool’s code is open source, which means it is
            available for the public to view and contribute to. Anyone
            can view and contribute on GitHub.
          </AboutCard>
        </AboutCardsContainer>
      </J40MainGridContainer>
    </Layout>);
};

export default IndexPage;
