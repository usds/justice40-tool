import React from 'react';
import Layout from '../components/layout';
import MapWrapper from '../components/mapWrapper';
import HowYouCanHelp from '../components/HowYouCanHelp';
import DownloadPacket from '../components/downloadPacket';
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
        <h2>Just Progress communities</h2>
        <div className={styles.disclaimer}>
          <div className={styles.textBox}>
            <p>
              Just Progress helps identify and prioritize communities across the
              United States and U.S. territories
              that have been historically overburdened and underserved. These
              communities will receive 40% of
              the benefits from investments in key areas outlined by the
              &nbsp;
              <a
                href={'https://www.whitehouse.gov/briefing-room/' +
                'presidential-actions/2021/01/27/' +
                'executive-order-on-tackling-the-climate-' +
                'crisis-at-home-and-abroad/'}
                target={'_blank'}
                rel={'noreferrer'}>
                Executive Order on Tackling the Climate Crisis at Home and
                Abroad
              </a>.
            </p>
            <p>
              Download the Just Progress packet or explore the map below to see
              the list of prioritized communites. To
              learn more about how these communities were prioritized check out
              the
              &nbsp;
              <a
                href={'./methodology'}>
                Methodology
              </a>
              &nbsp;
              page.
            </p>
          </div>
          <DownloadPacket/>
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
