import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import Categories from '../components/Categories';
import DatasetContainer from '../components/DatasetContainer';
import DownloadPacket from '../components/DownloadPacket';
import J40MainGridContainer from '../components/J40MainGridContainer';
import MethodologyFormula from '../components/MethodologyFormula';
import Layout from '../components/layout';
import PublicEngageButton from '../components/PublicEngageButton';

import * as METHODOLOGY_COPY from '../data/copy/methodology';

interface MethodPageProps {
  location: Location;
}

const IndexPage = ({location}: MethodPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(METHODOLOGY_COPY.PAGE.TILE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1>{intl.formatMessage(METHODOLOGY_COPY.PAGE.HEADING)}</h1>
          <PublicEngageButton />
        </section>

        <Grid row gap className={'j40-mb5-mt3'}>

          {/* First column */}
          <Grid col={12} tablet={{col: 8}}>
            <section>
              <p>
                {intl.formatMessage(METHODOLOGY_COPY.PAGE.DESCRIPTION)}
              </p>
            </section>

            {/* Formula section */}
            <MethodologyFormula />

            {/* Category description */}
            <section>
              <p>
                {intl.formatMessage(METHODOLOGY_COPY.PAGE.CATEGORY_TEXT)}
              </p>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 4}}>
            <DownloadPacket />
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <Categories />
      <DatasetContainer/>

    </Layout>
  );
};

export default IndexPage;
