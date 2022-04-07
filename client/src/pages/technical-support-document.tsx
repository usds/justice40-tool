import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as TSD_COPY from '../data/copy/tsd';

interface ITSDPageProps {
  location: Location;
}

const TSDPage = ({location}: ITSDPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(TSD_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(TSD_COPY.PAGE_INTRO.PAGE_TILE)}</h1>

        <Grid row>
          {intl.formatMessage(TSD_COPY.PAGE_INTRO.COMING_SOON)}
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default TSDPage;
