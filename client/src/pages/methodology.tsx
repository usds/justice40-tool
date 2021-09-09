import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

import AlertWrapper from '../components/AlertWrapper';
// import DatasetContainer from '../components/DatasetContainer';
import DownloadPacket from '../components/DownloadPacket';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
// import ScoreStepsList from '../components/scoreStepsList';

interface MethodPageProps {
  location: Location;
}

// markup
const IndexPage = ({location}: MethodPageProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    methodologyPageHeader: {
      id: 'methodology.page.header.text',
      defaultMessage: 'Methodology',
      description: 'methodology page header text',
    },
    methodologyPagep1: {
      id: 'methodology.page.paragraph.first',
      defaultMessage: 'The methodology for determining disadvantaged communities for the purposes of '+
      ' Justice40 initiative is currently in progress.',
      description: 'methodology page paragraph 1',
    },
  });

  return (
    <Layout location={location}>

      <J40MainGridContainer>
        <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <h1>{intl.formatMessage(messages.methodologyPageHeader)}</h1>
        <Grid row gap>
          <Grid col={12} tablet={{col: 6}}>
            <section>
              <p>
                {intl.formatMessage(messages.methodologyPagep1)}
              </p>
            </section>
          </Grid>
          <Grid col={12} tablet={{col: 6}}>
            <DownloadPacket />
          </Grid>
        </Grid>
      </J40MainGridContainer>

      {/* // Temporarily removed while the app is demo'd to stakeholders
      <J40MainGridContainer fullWidth={true}>
        <Grid row>
          <Grid col>
            <DatasetContainer/>
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <J40MainGridContainer>
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
