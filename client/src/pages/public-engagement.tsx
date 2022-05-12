import * as React from 'react';
import {Collection, Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import PublicEvent from '../components/PublicEvent';
import PublicVideoBox from '../components/PublicVideoBox';

import * as PUBLIC_ENG_COPY from '../data/copy/publicEngage';

interface IPublicEngagementPageProps {
  location: Location;
}

const PublicEngagementPage = ({location}: IPublicEngagementPageProps) => {
  const intl = useIntl();

  // The reverse() is an in-place algorithm and so a temporary variable is needed:
  const events = [...PUBLIC_ENG_COPY.EVENTS];
  events.reverse();

  return (
    <Layout location={location} title={intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_HEADING1)}</h1>

        <Grid row>
          <Grid desktop={{col: 8}}>
            <p>
              {intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_DESCRIPTION1)}
            </p>
            <p>
              {intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_DESCRIPTION2)}
            </p>
            <p>
              {intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_DESCRIPTION3)}
            </p>
          </Grid>
        </Grid>

        <Grid row>
          <h2>
            {intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_HEADING2)}
          </h2>
        </Grid>


        <Grid row gap={6}>
          <Grid desktop={{col: 8}}>
            <Collection>
              {events.map((event, index) => <PublicEvent key={index} event={event} />)}
            </Collection>
          </Grid>
          <Grid desktop={{col: 4}}>
            <PublicVideoBox />
          </Grid>
        </Grid>

      </J40MainGridContainer>
    </Layout>
  );
};

export default PublicEngagementPage;
