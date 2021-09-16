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
    methodologyPageTitle: {
      id: 'methodology.page.title.text',
      defaultMessage: 'Data and Methodology',
      description: 'methodology page title text',
    },
    methodologyPageHeader: {
      id: 'methodology.page.header.text',
      defaultMessage: 'Methodology',
      description: 'methodology page header text',
    },
    methodologyPagep1: {
      id: 'methodology.page.paragraph.first',
      defaultMessage: 'The methodology for identifying communities of focus is currently ' +
      'in a draft, pre-decisional form that may change over time as more datasets become available.',
      description: 'methodology page paragraph 1',
    },
  });

  return (
    <Layout location={location} title={intl.formatMessage(messages.methodologyPageTitle)}>

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
      </J40MainGridContainer>
    </Layout>
  );
};

export default IndexPage;
