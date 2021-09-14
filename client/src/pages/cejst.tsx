import React from 'react';
import {defineMessages} from 'react-intl';
import {Link} from 'gatsby-plugin-intl';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import AlertWrapper from '../components/AlertWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import MapWrapper from '../components/MapWrapper';
import MapLegend from '../components/MapLegend';

interface IMapPageProps {
  location: Location;
}

const CEJSTPage = ({location}: IMapPageProps) => {
  // We temporarily removed MapControls, which would enable you to `setFeatures` also, for now
  //   We will bring back later when we have interactive controls.

  const intl = useIntl();
  const messages = defineMessages({
    exploreToolTitleText: {
      id: 'exploreTool.title.text',
      defaultMessage: 'Explore the tool',
      description: 'explore the tool title text',
    },
    exploreToolHeadingText: {
      id: 'exploreTool.heading.text',
      defaultMessage: 'Explore the tool',
      description: 'explore the tool heading text',
    },
    exploreToolPageText: {
      id: 'exploreTool.page.text',
      defaultMessage: 'Zoom into the map to see which communities the tool has currently'+
      'identified as prioritized (the top 25% of communities) or on the'+
      'threshold. Learn more about the formula and datasets that were'+
      'used to prioritize these communities on the',
      description: 'explore the tool page text',
    },

  });

  return (<Layout location={location} title={intl.formatMessage(messages.exploreToolTitleText)}>
    <J40MainGridContainer>
      <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
    </J40MainGridContainer>

    <J40MainGridContainer>
      <h1>{intl.formatMessage(messages.exploreToolTitleText)}</h1>
      <Grid row className={'j40-mb-5'}>
        <Grid col={12} tablet={{col: 6}}>
          <section>
            <p>
              {intl.formatMessage(messages.exploreToolPageText)}
              {` `}
              <Link to={'/methodology'}>Data & methodology</Link>
              {` `}
                  page.
            </p>
          </section>
        </Grid>
        <Grid col={12} tablet={{col: 6}}>
          <MapLegend />
        </Grid>
      </Grid>
    </J40MainGridContainer>

    <J40MainGridContainer>
      <MapWrapper location={location}/>
    </J40MainGridContainer>

    <J40MainGridContainer>
      <Grid row>
        <Grid col>
          <section>
            <HowYouCanHelp/>
          </section>
        </Grid>
      </Grid>
    </J40MainGridContainer>
  </Layout>);
};

export default CEJSTPage;
