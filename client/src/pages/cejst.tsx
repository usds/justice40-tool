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
                Zoom into the map to see a draft list of communities of focus,
                based on currently available datasets. The methodology for identifying
                these communities of focus is draft and will be refined and updated
                based on feedback.

                </p>

                <p>
                  {` `}
                  <Link to={'/methodology'}>
                    Learn more about the existing formula and datasets used to
                    identify this draft list of communities of focus.
                  </Link>
                  {` `}
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
