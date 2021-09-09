import React from 'react';
import {Link} from 'gatsby-plugin-intl';

import AlertWrapper from '../components/AlertWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import MapWrapper from '../components/MapWrapper';
import MapLegend from '../components/MapLegend';

import * as styles from './cejst.module.scss';
import {Grid} from '@trussworks/react-uswds';


interface IMapPageProps {
  location: Location;
}

const CEJSTPage = ({location}: IMapPageProps) => {
  // We temporarily removed MapControls, which would enable you to `setFeatures` also, for now
  //   We will bring back later when we have interactive controls.
  return (<Layout location={location}>
    <J40MainGridContainer>
      <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
    </J40MainGridContainer>

    <J40MainGridContainer>
      <Grid row className={'j40-mb-5'}>
        <Grid col>
          <section>
            <h1 className={styles.explorePageHeader}>Explore the tool</h1>
            <div className={styles.explorePageSubHeader}>
              <div className={styles.explorePageHeaderText}>
                <p>
              Zoom into the map to see which communities the tool has currently
              identified as prioritized (the top 25% of communities) or on the
              threshold. Learn more about the formula and datasets that were
              used to prioritize these communities on the
                  {` `}
                  <Link to={'/methodology'}>Data & methodology</Link>
                  {` `}
              page.
                </p>
              </div>
              <MapLegend />
            </div>
          </section>
        </Grid>
      </Grid>

      <Grid row>
        <Grid col>
          <section>
            <MapWrapper location={location}/>
          </section>
        </Grid>
      </Grid>

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
