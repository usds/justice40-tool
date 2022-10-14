import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import SubPageNav from '../components/SubPageNav';

import * as FAQS_COPY from '../data/copy/faqs';

import * as CONSTANTS from '../data/constants';
import {PAGES_ENDPOINTS} from '../data/constants';
interface IFAQPageProps {
  location: Location;
}

const FAQPage = ({location}: IFAQPageProps) => {
  const intl = useIntl();
  const {width} = useWindowSize();

  return (
    <Layout location={location} title={intl.formatMessage(FAQS_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>
        <h1>{intl.formatMessage(FAQS_COPY.PAGE_INTRO.PAGE_TILE)}</h1>

        <Grid row gap className={'j40-mb5-mt3'}>

          {/* First column */}
          <Grid col={12} tablet={{col: 8}}>
            <section>
              <p>
              testing
              </p>
              <p>
              testins
              </p>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 1}}>
            {/* Spacer column */}
          </Grid>

          {/* Third column */}
          {width > CONSTANTS.USWDS_BREAKPOINTS.DESKTOP ?
          <Grid col={12} tablet={{col: 3}}>
            <SubPageNav
              endPoints={[
                PAGES_ENDPOINTS.ABOUT,
                PAGES_ENDPOINTS.PUBLIC_ENG,
                PAGES_ENDPOINTS.FAQS,
              ]}
            />
          </Grid> : ''}
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default FAQPage;
