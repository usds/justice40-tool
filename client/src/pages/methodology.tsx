import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import Categories from '../components/Categories';
import DatasetContainer from '../components/DatasetContainer';
import DownloadPacket from '../components/DownloadPacket';
import J40MainGridContainer from '../components/J40MainGridContainer';
import MethodologyFormula from '../components/MethodologyFormula';
import Layout from '../components/layout';
import LowIncome from '../components/LowIncome';
// import ScoreStepsList from '../components/scoreStepsList';

import * as METHODOLOGY_COPY from '../data/copy/methodology';

interface MethodPageProps {
  location: Location;
}

const IndexPage = ({location}: MethodPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(METHODOLOGY_COPY.PAGE.TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(METHODOLOGY_COPY.PAGE.HEADING)}</h1>

        {/* First column */}
        <Grid row gap className={'j40-mb-5'}>
          <Grid col={12} tablet={{col: 8}}>
            <section>
              <p>
                {intl.formatMessage(METHODOLOGY_COPY.PAGE.DESCRIPTION)}
              </p>
            </section>

            {/* Formula section */}
            <MethodologyFormula />

            {/* Category description */}
            <section className={`j40-mt-7`}>
              <p>
                {intl.formatMessage(METHODOLOGY_COPY.PAGE.CATEGORY_TEXT)}
              </p>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 4}}>
            <DownloadPacket />
            <LowIncome />
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <Categories />
      <DatasetContainer/>

      {/* <J40MainGridContainer>
        <Grid row>
          <Grid col>
            <ScoreStepsList/>
          </Grid>
        </Grid>
      </J40MainGridContainer> */}
    </Layout>
  );
};

export default IndexPage;
