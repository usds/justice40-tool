import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import PublicEngageButton from '../components/PublicEngageButton';
import SubPageNav from '../components/SubPageNav';
import {useWindowSize} from 'react-use';

import * as DOWNLOADS_COPY from '../data/copy/downloads';
import * as CONSTANTS from '../data/constants';
interface IDownloadsPageProps {
  location: Location;
}

const DownloadsPage = ({location}: IDownloadsPageProps) => {
  const intl = useIntl();
  const {width} = useWindowSize();

  return (
    <Layout location={location} title={intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1>{intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_HEADING1)}</h1>
          <PublicEngageButton />
        </section>

        <Grid row gap className={'j40-mb5-mt3'}>

          <Grid col={12} tablet={{col: 8}}>
            <h2>{intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_HEADING2)}</h2>
            <p>
              {intl.formatMessage(DOWNLOADS_COPY.PAGE_INTRO.PAGE_DESCRIPTION1)}
            </p>
            <p>
              {DOWNLOADS_COPY.DOWNLOAD_LINKS.LINK1}
            </p>
            <p>
              {DOWNLOADS_COPY.DOWNLOAD_LINKS.LINK2}
            </p>
            <p>
              {DOWNLOADS_COPY.DOWNLOAD_LINKS.LINK3}
            </p>
            <p>
              {DOWNLOADS_COPY.DOWNLOAD_LINKS.LINK4}
            </p>
            <p>
              {DOWNLOADS_COPY.DOWNLOAD_LINKS.LINK5}
            </p>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 1}}>
            {/* Spacer column */}
          </Grid>

          {/* Third column - Only show the SubPagNav component on desktop width */}
          {width > CONSTANTS.USWDS_BREAKPOINTS.DESKTOP ?
          <Grid col={12} tablet={{col: 3}}>
            <SubPageNav activeSubPageIndex={2}/>
          </Grid> : ''}
        </Grid>

      </J40MainGridContainer>
    </Layout>
  );
};

export default DownloadsPage;
