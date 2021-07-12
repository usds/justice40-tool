import * as React from 'react';
import Layout from '../components/layout';
import AreasOfFocusList from '../components/areasOfFocusList';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages, FormattedMessage} from 'react-intl';

interface IndexPageProps {
  location: Location;
}

// markup
const IndexPage = ({location}: IndexPageProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    aboutHeader: {
      id: 'index.aboutContent.header',
      defaultMessage: 'About Justice40',
      description: 'h1 header on About page',
    },
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
  });

  return (<Layout location={location}>
    <section className={'usa-prose'}>
      <h1>{intl.formatMessage(messages.aboutHeader)}</h1>

      <p><FormattedMessage
        id={'index.aboutContent.p1'}
        description={'paragraph 1 of main content on index page'}
        defaultMessage={`
            In an effort to address historical environmental injustices,
            President Biden created the Justice40 Initiative on January
            27, 2021. The Justice40 Initiative directs 40% of the
            benefits from federal investments in seven key areas to
            overburdened and underserved communities.
          `}/></p>

      <p><FormattedMessage
        id='index.aboutContent.p2'
        description={'paragraph 2 of main content on index page'}
        defaultMessage={`
            Federal agencies will prioritize benefits using a new
            climate and economic justice screening tool. This screening
            tool will be a map that visualizes data to compare the
            cumulative impacts of environmental, climate, and economic
            factors. It is being developed by the Council on
            Environmental Quality (CEQ) with guidance from environmental
            justice leaders and communities affected by environmental
            injustices. The first version of the screening tool will be
            released in July 2021. However, the screening tool and data
            being used will be continuously updated to better reflect
          the lived experiences of community members.
        `}/></p>

      <p><FormattedMessage
        id={'index.aboutContent.p3'}
        description={'paragraph 3 of main content on index page'}
        defaultMessage={`
          Read more about the Justice40 Initiative in President Biden’s 
          {presidentLink}
          `}
        values={{presidentLink:
              <a href={intl.formatMessage(messages.presidentalLinkUri)}
                target='_blank'
                rel='noreferrer'>{intl.formatMessage(messages.presidentalLinkLabel)}
              </a>}}/>
      </p>

      <h2><FormattedMessage
        id={'index.section2.header'}
        description={'section 2 header'}
        defaultMessage={'Areas of Focus'}/></h2>

      <AreasOfFocusList />

      <h2><FormattedMessage
        id={'index.section3.header'}
        description={'section 3 header'}
        defaultMessage={'A Transparent, Community-First Approach'}/></h2>

      <p><FormattedMessage
        id={'index.section3.intro'}
        description={'section 3 content paragraph 1 intro'}
        defaultMessage={`
            Successful initiatives are guided by direct input from the
            communities they are serving. CEQ commits to transparency,
            inclusivity, and iteration in building this screening tool.`}/>
      </p>

      <p>
        <FormattedMessage
          id={'index.section3.transparent'}
          description={'section 3 content transparent'}
          defaultMessage={`
              {inlineHeader} The code and data behind the screening
              tool are open source, meaning it is available for the public
              to review and contribute to. This tool is being developed
              publicly so that communities, academic experts, and anyone
              who’s interested can be involved in the tool-building
              process.`}
          values={{
            inlineHeader: <i>{intl.formatMessage(messages.transparentLabel)}</i>,
          }}/>
      </p>

      <p>
        <FormattedMessage
          id={'index.section3.inclusive'}
          description={'section 3 content inclusive'}
          defaultMessage={`
              {inlineHeader} Many areas which lack investments also
              lack environmental data and would be overlooked using
              available environmental data. CEQ is actively reaching out
              to groups that have historically been excluded from
              decision-making, such as groups in rural and tribal areas,
              to understand their needs and ask for their input.
          `}
          values={{
            inlineHeader: <i>{intl.formatMessage(messages.inclusiveLabel)}</i>,
          }}/>
      </p>

      <p>
        <FormattedMessage
          id={'index.section3.iterative'}
          description={'section 3 content iterative'}
          defaultMessage={`
              {inlineHeader} The initial community prioritization list
              provided by the screening tool is the beginning of a
              collaborative process in score refinement, rather than a
              final answer. CEQ has received recommendations on data sets
              from community interviews, the White House Environmental
              Justice Advisory Council, and through public comment, but
              establishing a score that is truly representative will be a
              long-term, ongoing process. As communities submit feedback
              and recommendations, CEQ will continue to improve the tools
              being built and the processes for stakeholder and public
              engagement.
          `}
          values={{
            inlineHeader: <i>{intl.formatMessage(messages.iterativeLabel)}</i>,
          }}/>
      </p>
    </section>
  </Layout>
  );
};

export default IndexPage;
