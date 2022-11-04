import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

import {Card, CardBody, CardFooter, CardHeader, Grid} from '@trussworks/react-uswds';
import DownloadButton from '../components/DownloadButton';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import PublicEngageButton from '../components/PublicEngageButton';
import SubPageNav from '../components/SubPageNav';

import * as PREV_VER_COPY from '../data/copy/previousVer';
import {PAGES_ENDPOINTS, USWDS_BREAKPOINTS} from '../data/constants';
import {getDownloadFileUrl} from '../data/copy/downloads';

interface IPreviousVersionsProps {
  location: Location;
}

const containerStyle = {
  marginTop: `1.2rem`,
};

// markup
const PreviousVersions = ({location}: IPreviousVersionsProps) => {
  const intl = useIntl();
  const {width} = useWindowSize();

  return (
    <Layout location={location} title={intl.formatMessage(PREV_VER_COPY.PAGE.TITLE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1 data-cy={'about-page-heading'}>{intl.formatMessage(PREV_VER_COPY.PAGE.TITLE)}</h1>
          <PublicEngageButton />
        </section>

        <Grid row gap className={'j40-mb5-mt3'}>

          {/* First column */}
          <Grid col={12} tablet={{col: 8}}>
            <section style={containerStyle}>
              <ul>
                <Card className={'previous-versions-container'} gridLayout={{tablet: {col: 6}}}>
                  <CardHeader>
                    <h2 className="usa-card__heading">{PREV_VER_COPY.CARD.TITLE}</h2>
                  </CardHeader>
                  <CardBody>
                    <p> {PREV_VER_COPY.CARD.BODY}</p>
                  </CardBody>
                  <CardFooter>
                    <DownloadButton
                      downloadLink={
                        getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_DATA_DOC, true)
                      }
                      buttonText={intl.formatMessage(PREV_VER_COPY.BUTTON.TITLE1)}
                      imageAltTagText={intl.formatMessage(PREV_VER_COPY.BUTTON.BUTTON1_ALT_TAG)}
                      color={'default'}
                    />
                    <DownloadButton
                      downloadLink={
                        getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_SHAPE_FILE_ZIP, true)
                      }
                      buttonText={intl.formatMessage(PREV_VER_COPY.BUTTON.TITLE2)}
                      imageAltTagText={intl.formatMessage(PREV_VER_COPY.BUTTON.BUTTON2_ALT_TAG)}
                      color={'default'}
                    />
                  </CardFooter>
                </Card>
              </ul>
            </section>
          </Grid>

          {/* Second column */}
          <Grid col={12} tablet={{col: 1}}>
            {/* Spacer column */}
          </Grid>

          {/* Third column */}
          {width > USWDS_BREAKPOINTS.DESKTOP ?
          <Grid col={12} tablet={{col: 3}}>
            <SubPageNav
              activeSubPageIndex={2}
              endPoints={[
                PAGES_ENDPOINTS.METHODOLOGY,
                PAGES_ENDPOINTS.DOWNLOADS,
                PAGES_ENDPOINTS.PREVIOUS_VERSIONS,
              ]}
            />
          </Grid> : ''}
        </Grid>

      </J40MainGridContainer>
    </Layout>);
};

export default PreviousVersions;
