import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import HowYouCanHelp from '../components/HowYouCanHelp';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import MapWrapper from '../components/MapWrapper';
import PublicEngageButton from '../components/PublicEngageButton';

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

      <section className={'page-heading'}>
        <h1>{intl.formatMessage(EXPLORE_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>
        <PublicEngageButton />
      </section>

      <Grid row gap className={'j40-mb5-mt3'}>

        {/* Gradually increase width of description section (desktop = 8 columns, tablet = 20 columns and
            mobile = 12 columns) */}
        <Grid desktop={{col: 8}} tablet={{col: 10}} col={12}>
          <section>
            <p>
              {EXPLORE_COPY.PAGE_DESCRIPTION}
            </p>
          </section>
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
