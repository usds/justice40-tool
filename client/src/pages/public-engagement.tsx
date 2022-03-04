import * as React from 'react';
import {Grid, Collection} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import PublicEvent from '../components/PublicEvent';

import * as PUBLIC_ENG_COPY from '../data/copy/publicEngage';

interface IPublicEngagementPageProps {
  location: Location;
}

const PublicEngagementPage = ({location}: IPublicEngagementPageProps) => {
  const intl = useIntl();

  // TODO: filter events by date
  const futureEvents = PUBLIC_ENG_COPY.EVENTS;
  // const pastEvents

  return (
    <Layout location={location} title={intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_HEADING1)}</h1>

        <Grid row desktop={{col: 9}}>
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

        <Grid row>
          <h2>
            {intl.formatMessage(PUBLIC_ENG_COPY.PAGE_INTRO.PAGE_HEADING2)}
          </h2>
        </Grid>

        <Collection>
          {futureEvents.map((event, index) => <PublicEvent key={index} event={event} />)}
        </Collection>

        <Grid row>
          {/* Empty Spacer */}
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default PublicEngagementPage;
