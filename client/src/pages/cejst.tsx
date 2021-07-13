import React from 'react';
import Layout from '../components/layout';
import MapWrapper from '../components/mapWrapper';
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
      <main id="main-content" role="main">
        <h2>Just Progress communities</h2>
        <p className={styles.disclaimer}>
          Just Progress helps identify and prioritize communities across the
          United States and U.S. territories that have been historically
          overburdened and underserved. These communities will receive 40% of
          the benefits from investments in key areas outlined by the
          <a
            href={'https://www.whitehouse.gov/briefing-room/' +
            'presidential-actions/2021/01/27/' +
            'executive-order-on-tackling-the-climate-' +
            'crisis-at-home-and-abroad/'}
            target={'_blank'}
            rel={'noreferrer'}>
            Executive Order on Tackling the Climate Crisis at Home and
            Abroad</a>.
        </p>
        <h2>Explore the Tool</h2>
        <MapWrapper/>
        <MapLegend />
        <HowYouCanHelp />
      </main>
    </Layout>
  );
};

export default CEJSTPage;
