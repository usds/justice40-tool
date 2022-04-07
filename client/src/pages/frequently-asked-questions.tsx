import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as FAQS_COPY from '../data/copy/faqs';

interface IFAQPageProps {
  location: Location;
}

const FAQPage = ({location}: IFAQPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(FAQS_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(FAQS_COPY.PAGE_INTRO.PAGE_TILE)}</h1>

        <Grid row>
          {intl.formatMessage(FAQS_COPY.PAGE_INTRO.COMING_SOON)}
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default FAQPage;
