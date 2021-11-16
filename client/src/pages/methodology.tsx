import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import DatasetContainer from '../components/DatasetContainer';
import DownloadPacket from '../components/DownloadPacket';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import ScoreStepsList from '../components/scoreStepsList';
import SurveyButton from '../components/SurveyButton';

import * as METHODOLOGY_COPY from '../data/copy/methodology';
import * as styles from './pageStyles.module.scss';

interface MethodPageProps {
  location: Location;
}

// markup
const IndexPage = ({location}: MethodPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(METHODOLOGY_COPY.PAGE.TILE)}>

      <J40MainGridContainer>

        {/* Primary Heading row */}
        <Grid row className={styles.pageHeading1}>
          <Grid col={10}>
            <h1>{intl.formatMessage(METHODOLOGY_COPY.PAGE.HEADING)}</h1>
          </Grid>
          <Grid col={2} className={styles.surveyButtonContainer}>
            <SurveyButton />
          </Grid>
        </Grid>


        <Grid row gap className={'j40-mb-5'}>
          <Grid col={12} tablet={{col: 6}}>
            <section>
              <p>
                {intl.formatMessage(METHODOLOGY_COPY.PAGE.DESCRIPTION)}
              </p>
            </section>
          </Grid>
          <Grid col={12} tablet={{col: 6}}>
            <DownloadPacket />
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <DatasetContainer/>

      <J40MainGridContainer>
        <Grid row>
          <Grid col>
            <ScoreStepsList/>
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default IndexPage;
