import * as React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, useIntl} from 'gatsby-plugin-intl';

import AlertWrapper from '../components/AlertWrapper';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import AboutCard from '../components/AboutCard/AboutCard';

// @ts-ignore
import aboutUSMapImg from '../images/about-usmap.svg';
// @ts-ignore
import aboutJ40Img from '../images/about-j40.svg';
import accountBalanceIcon // @ts-ignore
  from '/node_modules/uswds/dist/img/usa-icons/account_balance.svg';

import groupsIcon from // @ts-ignore
  '/node_modules/uswds/dist/img/usa-icons/groups.svg';

import commentIcon from // @ts-ignore
  '/node_modules/uswds/dist/img/usa-icons/comment.svg';

import githubIcon from // @ts-ignore
  '/node_modules/uswds/dist/img/usa-icons/github.svg';
import AboutCardsContainer from '../components/AboutCard/AboutCardsContainer';


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
      defaultMessage: 'Executive Order on Tackling the Climate Crisis at Home and Abroad.',
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
      defaultMessage: 'About the screening tool',
      description: 'heading for about screening tool',
    },
    aboutJustice40Heading: {
      id: 'index.heading.justice40',
      defaultMessage: 'About the Justice40 Initiative',
      description: 'heading for about justice 40',
    },
  });

  return (
    <Layout location={location}>
      <J40MainGridContainer>
        <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
      </J40MainGridContainer>

      <J40MainGridContainer>

        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            imgSrc={aboutUSMapImg}
            header={intl.formatMessage(messages.aboutScreenToolHeading)}>

            <FormattedMessage
              id={'index.aboutContent.p1'}
              description={'paragraph 1 of main content on index page'}
              defaultMessage={`
              On January 27, 2021, President Biden directed the Council on
              Environmental Quality (CEQ) to create a climate and economic
              justice screening tool. The purpose of the tool is to provide
              socioeconomic, environmental, and climate information and data to
              help inform decisions that may affect disadvantaged communities.
              The tool is designed to assist Federal agencies in identifying
              disadvantaged communities for the purposes of the Justice40
              Initiative.                     
                  `}/>

          </AboutCard>
        </AboutCardsContainer>

        <AboutCardsContainer>
          <AboutCard
            size={'large'}
            imgSrc={aboutJ40Img}
            header={intl.formatMessage(messages.aboutJustice40Heading)}>

            <FormattedMessage
              id="index.aboutContent.p2"
              description={'paragraph 2 of main content on index page'}
              defaultMessage={`
                The goal of the Justice40 Initiative is for 40 percent of
                benefits of Federal programs in seven key areas to flow to
                disadvantaged communities. These seven key areas are: climate
                change, clean energy and energy efficiency, clean transit,
                affordable and sustainable housing, training and workforce
                development, remediation of legacy pollution, and clean water
                infrastructure.
                  `}/>

            <p><FormattedMessage
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
        <J40MainGridContainer
        >
          <AboutCardsContainer>
            <AboutCard
              size={'small'}
              imgSrc={accountBalanceIcon}
              header={'Federal program managers'}
              actionText={'Go to data & methodology'}
              actionUrl={'./methodology'}>
              Download the screening tool’s draft list of prioritized
              communities and information on how to use it for your program in
              the future on the data and methodology page.
            </AboutCard>

            <AboutCard
              size={'small'}
              imgSrc={groupsIcon}
              header={'Community members'}
              actionText={'Explore the tool'}
              actionUrl={'./cejst'}>
              Find your community or communities that you may be familiar with
              and check their prioritization information on the map.
            </AboutCard>
          </AboutCardsContainer>
        </J40MainGridContainer>
      </J40MainGridContainer>

      <J40MainGridContainer
      >
        <AboutCardsContainer>
          <AboutCard
            size={'small'}
            imgSrc={commentIcon}
            header={'Send Feedback'}
            actionText={'Email: screeningtool.feedback@usds.gov'}
            actionUrl={'mailto:screeningtool.feedback@usds.gov'}>
            Have ideas about how to acknowledge the on-the-ground experiences
            of your community?
          </AboutCard>

          <AboutCard
            size={'small'}
            imgSrc={githubIcon}
            header={'Join the open source community'}
            actionText={'Check it out on GitHub'}
            actionUrl={'https://github.com/usds/justice40-tool'}
            actionOpenInNewTab={true}>
            The screening tool’s code is open source, which means it is
            available for the public to view and contribute to. Anyone can
            view and contribute on GitHub.
          </AboutCard>
        </AboutCardsContainer>
      </J40MainGridContainer>
    </Layout>);
};

export default IndexPage;
