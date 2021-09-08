import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

import AlertWrapper from '../components/AlertWrapper';
import DatasetContainer from '../components/DatasetContainer';
import DownloadPacket from '../components/DownloadPacket';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import ScoreStepsList from '../components/scoreStepsList';

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
      defaultMessage: 'The cumulative index score is a metric that is intended to assist Federal agencies'+
      ' in identifying disadvantaged communities for the purposes of the Justice 40'+
      ' Initiative. The score methodology and included data sets are currently in beta and'+
      ' may change over time.',
      description: 'methodology page paragraph 1',
    },
    methodologyPagep2: {
      id: 'methodology.page.paragraph.second',
      defaultMessage: 'Learn about the datasets used in the cumulative score and read about'+
       ' how the score is calculated. Download the list of prioritized communities along with the datasets'+
       ' used in the score.',
      description: 'methodology page paragraph 2',
    },
  });

  return (
    <Layout location={location}>

      <J40MainGridContainer>
        <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
      </J40MainGridContainer>

      <J40MainGridContainer className={'j40-main-content'}>
        <h1>{intl.formatMessage(messages.methodologyPageHeader)}</h1>
        <Grid row gap>
          <Grid col={12} tablet={{col: 6}}>
            <section>
              <p>
                {intl.formatMessage(messages.methodologyPagep1)}
              </p>
              <p>
                {intl.formatMessage(messages.methodologyPagep2)}
              </p>
            </section>
          </Grid>
          <Grid col={12} tablet={{col: 6}}>
            <DownloadPacket />
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth={true}>
        <Grid row>
          <Grid col>
            <DatasetContainer/>
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <Grid row><Grid col>
          <ScoreStepsList/>
        </Grid></Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default IndexPage;
