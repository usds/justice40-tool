import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

import Categories from '../components/Categories';
import DatasetContainer from '../components/DatasetContainer';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import SubPageNav from '../components/SubPageNav';
import PublicEngageButton from '../components/PublicEngageButton';

import {USWDS_BREAKPOINTS} from '../data/constants';
import * as METHODOLOGY_COPY from '../data/copy/methodology';
import {PAGES_ENDPOINTS} from '../data/constants';

interface MethodPageProps {
  location: Location;
}

const IndexPage = ({location}: MethodPageProps) => {
  const intl = useIntl();
  const {width} = useWindowSize();

  return (
    <Layout location={location} title={intl.formatMessage(METHODOLOGY_COPY.PAGE.TILE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1>{intl.formatMessage(METHODOLOGY_COPY.PAGE.HEADING)}</h1>
          <PublicEngageButton />
        </section>

        <Grid row gap className={'j40-mt3'}>

          {/* First column */}
          <Grid col={12} tablet={{col: 8}}>
            <section>
              <p>
                {intl.formatMessage(METHODOLOGY_COPY.PAGE.PARA1)}
              </p>

              <div>
                <ul>
                  <li>
                    {intl.formatMessage(METHODOLOGY_COPY.PAGE.PARA1_BULLET1)}
                  </li>
                  <li className={'j40-mt3'}>
                    {intl.formatMessage(METHODOLOGY_COPY.PAGE.PARA1_BULLET2)}
                  </li>
                </ul>
              </div>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 1}}>
            {/* Spacer column */}
          </Grid>

          {/* Third column */}
          {width > USWDS_BREAKPOINTS.DESKTOP ?
          <Grid col={12} tablet={{col: 3}}>
            <SubPageNav
              endPoints={[
                PAGES_ENDPOINTS.METHODOLOGY,
                PAGES_ENDPOINTS.DOWNLOADS,
                PAGES_ENDPOINTS.PREVIOUS_VERSIONS,
              ]}
            />
          </Grid> : ''}
        </Grid>
      </J40MainGridContainer>

      <Categories />
      <DatasetContainer/>

    </Layout>
  );
};

export default IndexPage;
