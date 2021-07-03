import React from 'react';
import Layout from '../components/layout';
import MapWrapper from '../components/mapWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import MapLegend from '../components/mapLegend';
import * as styles from './cejst.module.scss';
import {Button} from '@trussworks/react-uswds';
// @ts-ignore
import downloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

interface IMapPageProps {
  location: Location;
}

const CEJSTPage = ({location}: IMapPageProps) => {
  // We temporarily removed MapControls, which would enable you to `setFeatures` also, for now
  //   We will bring back later when we have interactive controls.
  return (
    <Layout location={location}>
      <main id="main-content" role="main">

        <section>
          <h2>Just Progress communities</h2>
          <div className={styles.disclaimer}>
            <div className={styles.textBox}>
              <p>
                Just Progress helps identify and prioritize communities across the United States and U.S. territories
                that have been historically overburdened and underserved. These communities will receive 40% of
                the benefits from investments in key areas outlined by the
                &nbsp;
                <a
                  href={'https://www.whitehouse.gov/briefing-room/' +
                    'presidential-actions/2021/01/27/' +
                    'executive-order-on-tackling-the-climate-' +
                    'crisis-at-home-and-abroad/'}
                  target={'_blank'}
                  rel={'noreferrer'}>
                  Executive Order on Tackling the Climate Crisis at Home and Abroad
                </a>.
              </p>
              <p>
                Download the Just Progress packet or explore the map below to see the list of prioritized communites. To
                learn more about how these communities were prioritized check out the
                &nbsp;
                <a
                  href={'./methodology'}>
                  Methodology
                </a>
                &nbsp;
                page.
              </p>
            </div>
            <div className={styles.downloadBoxContainer}>
              <div className={styles.downloadBox}>
                <div className={styles.downloadBoxTextBox}>
                  <div className={styles.downloadBoxTitle}>Just Progress Packet</div>
                  <div className={styles.downloadBoxText}>This downloadable packet includes the list of Just Progress
                  prioritized communities (30,021
                    census block groups) and 18 datasets.
                  </div>
                  <div className={styles.downloadBoxButtonContainer}>
                    <Button className={styles.downloadBoxButton} type="button">
                      <div><img src={downloadIcon} /> </div>
                      <div className={styles.downloadPacketText}>Download packet</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h2>Explore the Tool</h2>
        <MapWrapper />
        <MapLegend />
        <HowYouCanHelp />
      </main>
    </Layout>
  );
};

export default CEJSTPage;
