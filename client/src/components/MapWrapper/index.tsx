import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import {Grid} from '@trussworks/react-uswds';

import J40Map from '../J40Map';

import * as styles from './mapWrapper.module.scss';
import * as constants from '../../data/constants';
import AlertWrapper from '../AlertWrapper';

interface IMapWrapperProps {
  location: Location
}

const MapWrapper = ({location}: IMapWrapperProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    downloadLinkText: {
      id: 'mapwrapper.download.link',
      defaultMessage: 'Download the draft list ',
      description: 'download link for datasets',
    },
    downloadLinkText1: {
      id: 'mapwrapper.download1.link',
      defaultMessage: `of communities of focus and datasets used. Last updated: ${constants.DOWNLOAD_LAST_UPDATED}`,
      description: 'download link for datasets',
    },
    downloadContents: {
      id: 'mapwrapper.download.contents',
      defaultMessage: `ZIP file will contain one .xlsx, one .csv, and one .pdf (${constants.DOWNLOAD_FILE_SIZE}).`,
      description: 'download link contents',
    },
  });
  return (
    <>
      <Grid row>
        <Grid col={12}>
          <AlertWrapper showBetaAlert={false} showLimitedDataAlert={true}/>
        </Grid>
      </Grid>

      <Grid row>
        <J40Map location={location}/>
      </Grid>

      <Grid row>
        <Grid col={7}>
          <div className={styles.mapCaptionTextLink}>
            <a href={constants.DOWNLOAD_ZIP_URL}>
              {intl.formatMessage(messages.downloadLinkText)}
            </a>
            <span>
              {intl.formatMessage(messages.downloadLinkText1)}
            </span>
          </div>
          <div>{intl.formatMessage(messages.downloadContents)}</div>
        </Grid>
      </Grid>
    </>
  );
};


export default MapWrapper;
