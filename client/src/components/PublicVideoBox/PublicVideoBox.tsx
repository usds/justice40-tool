import React from 'react';
import {Button, SummaryBox, SummaryBoxContent, SummaryBoxHeading} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import DownloadButton from '../DownloadButton';

import * as styles from './PublicVideoBox.module.scss';
import * as PUBLIC_COPY from '../../data/copy/publicEngage';

// @ts-ignore
import launchIcon from '/node_modules/uswds/dist/img/usa-icons/launch.svg';


const PublicVideoBox = () => {
  const intl = useIntl();

  return (
    <SummaryBox
      className={styles.publicVideoContainer}>

      <SummaryBoxHeading headingLevel='h3'>
        {intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.TITLE)}
      </SummaryBoxHeading>

      <SummaryBoxContent>
        {intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BODY)}
        <a
          className={styles.publicVideoLink}
          href={`https://www.youtube.com/watch?v=QwHWcXbhw28`}
          target={'_blank'}
          rel="noreferrer"
        >
          <Button
            type="button"
            className={styles.youTubeBtn}
          >
            <div className={styles.buttonContainer}>
              <div className={styles.buttonText}>
                {intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BUTTON1_TEXT)}
              </div>
              <img
                className={styles.buttonImage}
                src={launchIcon}
                alt={intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.IMG_ALT_TEXT1)}
              />
            </div>
          </Button>
        </a>
        <DownloadButton
          downloadLink={`https://static-data-screeningtool.geoplatform.gov/data-pipeline/data/score/downloadable/technical-training-slides.pptx`}
          buttonText={intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BUTTON2_TEXT)}
          imageAltTagText={intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.IMG_ALT_TEXT2)}
          isYellow={true}
        />
      </SummaryBoxContent>
    </SummaryBox>
  );
};

export default PublicVideoBox;
