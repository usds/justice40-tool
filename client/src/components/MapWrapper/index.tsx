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
      defaultMessage: 'Download the draft list of prioritized communities (pre-decisional) and datasets used',
      description: 'download link for datasets',
    },
    downloadContents: {
      id: 'mapwrapper.download.contents',
      defaultMessage: 'ZIP file will contain one .xlsx, one .csv and one .pdf (30 MB).',
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
        <Grid col={6}>
          <div className={styles.mapCaptionTextLink}>
            <a href={constants.DOWNLOAD_ZIP_URL}>
              {intl.formatMessage(messages.downloadLinkText)}
            </a>
          </div>
          <div>{intl.formatMessage(messages.downloadContents)}</div>
        </Grid>
      </Grid>
    </>
  );
};


export default MapWrapper;
