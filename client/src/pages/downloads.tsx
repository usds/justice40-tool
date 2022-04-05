import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as DOWNLOADS_COPY from '../data/copy/downloads';

interface IDownloadsPageProps {
  location: Location;
}

const DownloadsPage = ({location}: IDownloadsPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_HEADING1)}</h1>

        <Grid desktop={{col: 8}}>
          <h2>{intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_HEADING2)}</h2>
          <p>
            {intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_DESCRIPTION1)}
          </p>
          <p>
            {DOWNLOADS_COPY.DOWNLOAD_LINKS.EXCEL}
          </p>
          <p>
            {DOWNLOADS_COPY.DOWNLOAD_LINKS.CSV}
          </p>
          <p>
            {DOWNLOADS_COPY.DOWNLOAD_LINKS.SHAPE}
          </p>
        </Grid>

      </J40MainGridContainer>
    </Layout>
  );
};

export default DownloadsPage;
