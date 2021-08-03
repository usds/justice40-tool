import React from 'react';
import {Link} from 'gatsby-plugin-intl';

import Layout from '../components/layout';
import MapWrapper from '../components/MapWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import MapLegend from '../components/mapLegend';

import * as styles from './cejst.module.scss';

interface IMapPageProps {
  location: Location;
}


const CEJSTPage = ({location}: IMapPageProps) => {
  // We temporarily removed MapControls, which would enable you to `setFeatures` also, for now
  //   We will bring back later when we have interactive controls.
  return (
    <Layout location={location}>
      <section>
        <h1 className={styles.explorePageHeader}>Explore the tool</h1>
        <div className={styles.explorePageSubHeader}>
          <div className={styles.explorePageHeaderText}>
            <p>
              Zoom into the map to see which communities the tool has currently
              identified as prioritized (the top 25% of communities) or on the
              threshold. Learn more about the formula and datasets that were
              used to prioritize these communities on the&nbsp;
              <Link to={'/methodology'}>Data & methodology</Link>
              &nbsp;page.
            </p>
          </div>
          <MapLegend />
        </div>
      </section>

      <section>
        <MapWrapper location={location} />
        <HowYouCanHelp/>
      </section>
    </Layout>
  );
};

export default CEJSTPage;
