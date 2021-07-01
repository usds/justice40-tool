import React from 'react';
import Layout from '../components/layout';
// import MapWrapper from '../components/map';
import MapWrapper from '../components/mapWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import Legend from '../components/legend';
import {Alert} from '@trussworks/react-uswds';
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
        <p className={styles.disclaimer}>
          The Climate and Economic Justice Screening Tool helps
          identify and prioritize communities across the United
          States and US territories that have been historically
          overburdened and underserved so that they may receive
          40% of the benefits from investments in six key areas as
          outlined in the <a
            href={'https://www.whitehouse.gov/briefing-room/' +
                    'presidential-actions/2021/01/27/' +
                    'executive-order-on-tackling-the-climate-' +
                    'crisis-at-home-and-abroad/'}
            target={'_blank'}
            rel={'noreferrer'}>
                    Executive Order on Tackling the Climate Crisis at Home and
                    Abroad</a>.
          Explore the map below or learn
          more about the methodology and data indicators used to
          prioritize Justice40 communities.
        </p>
        <Alert
          type="warning"
          heading="Limited Data Sources">
          <p>
            In this tool, we are using data sources that our
            combined by our cumulative impact methodology.
            Our sources were selected because sit amet,
            consectetur adipiscing. See all the sources we
            are investigating on our data roadmap.
          </p>
        </Alert>
        <h2>Explore the Tool</h2>
        <MapWrapper/>
        <Legend />
        <HowYouCanHelp />
      </main>
    </Layout>
  );
};

export default CEJSTPage;
