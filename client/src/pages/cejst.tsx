import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import AlertWrapper from '../components/AlertWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import MapWrapper from '../components/MapWrapper';
import MapLegend from '../components/MapLegend';

import * as EXPLORE_COPY from '../data/copy/explore';

interface IMapPageProps {
  location: Location;
}

const CEJSTPage = ({location}: IMapPageProps) => {
  // We temporarily removed MapControls, which would enable you to `setFeatures` also, for now
  //   We will bring back later when we have interactive controls.
  const intl = useIntl();


  return (<Layout location={location} title={intl.formatMessage(EXPLORE_COPY.PAGE_INTRO.PAGE_TILE)}>
    <J40MainGridContainer>
      <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
    </J40MainGridContainer>

    <J40MainGridContainer>
      <h1>{intl.formatMessage(EXPLORE_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>
      <Grid row className={'j40-mb-5'}>
        <Grid col={12} tablet={{col: 6}}>
          <section>
            <p>
              {EXPLORE_COPY.PAGE_DESCRIPTION}
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
