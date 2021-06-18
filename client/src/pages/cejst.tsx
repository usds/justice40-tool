import React, {useState} from 'react';
import Layout from '../components/layout';
import MapWrapper from '../components/map';
import MapControls from '../components/mapControls';
import HowYouCanHelp from '../components/HowYouCanHelp';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import {Alert} from '@trussworks/react-uswds';
import * as styles from './cejst.module.scss';

interface IMapPageProps {
  location: Location;
}

const CEJSTPage = ({location}: IMapPageProps) => {
  const [features, setFeatures] = useState<Feature<Geometry>[]>([]);

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
        <MapControls setFeatures={setFeatures}/>
        <MapWrapper features={features} />
        <HowYouCanHelp />
      </main>
    </Layout>
  );
};

export default CEJSTPage;
