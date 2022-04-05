import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import HowYouCanHelp from '../components/HowYouCanHelp';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import MapWrapper from '../components/MapWrapper';

import * as EXPLORE_COPY from '../data/copy/explore';

interface IMapPageProps {
  location: Location;
}

const ExporeToolPage = ({location}: IMapPageProps) => {
  // We temporarily removed MapControls, which would enable you to `setFeatures` also, for now
  //   We will bring back later when we have interactive controls.
  const intl = useIntl();


  return (<Layout location={location} title={intl.formatMessage(EXPLORE_COPY.PAGE_INTRO.PAGE_TILE)}>

    <J40MainGridContainer>

      <h1>{intl.formatMessage(EXPLORE_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>

      <Grid row gap className={'j40-mb5-mt3'}>

        {/* Gradually increase width of the Grid as the width decreases from desktop to mobile*/}
        {/* desktop = 7 columns, tablet = 10 columns and mobile = 12 columns (full width) */}
        <Grid desktop={{col: 7}} tablet={{col: 10}} col={12}>
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
      <Grid desktop={{col: 7}} tablet={{col: 10}} col={12}>
        <h2>{EXPLORE_COPY.NOTE_ON_TERRITORIES.INTRO}</h2>
        <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_1}</p>
        <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_2}</p>
        <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_3}</p>
        <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_4}</p>
      </Grid>

      <Grid desktop={{col: 7}} tablet={{col: 10}} col={12}>
        <h2>{EXPLORE_COPY.NOTE_ON_TRIBAL_NATIONS.INTRO}</h2>
        <p>{EXPLORE_COPY.NOTE_ON_TRIBAL_NATIONS.PARA_1}</p>
      </Grid>
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

export default ExporeToolPage;
