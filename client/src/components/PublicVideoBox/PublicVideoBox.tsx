import React from 'react';
import {Button, SummaryBox, SummaryBoxContent, SummaryBoxHeading} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import DownloadButton from '../DownloadButton';

import * as styles from './PublicVideoBox.module.scss';
import * as PUBLIC_COPY from '../../data/copy/publicEngage';

// @ts-ignore
import launchIcon from '/node_modules/uswds/dist/img/usa-icons/launch.svg';

interface IPublicVideoBox {
  isBeta: boolean,
}

const PublicVideoBox = ({isBeta}:IPublicVideoBox) => {
  const intl = useIntl();

  return (
    <SummaryBox
      className={isBeta ? styles.publicVideoContainerBeta : styles.publicVideoContainer}>

      <SummaryBoxHeading headingLevel='h2'>
        {isBeta ?
        intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.TITLE_BETA) :
        intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.TITLE)}
      </SummaryBoxHeading>

      <SummaryBoxContent>
        {isBeta ? PUBLIC_COPY.RICH_COPY.VIDEO_BOX_BODY2 : PUBLIC_COPY.RICH_COPY.VIDEO_BOX_BODY1}
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
                {isBeta ?
                  intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BUTTON1_BETA_TEXT) :
                  intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BUTTON1_TEXT)
                }
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
          buttonText={isBeta ?
            intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BUTTON2_BETA_TEXT) :
            intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.BUTTON2_TEXT)
          }
          imageAltTagText={intl.formatMessage(PUBLIC_COPY.PUBLIC_ENG_VIDEO.IMG_ALT_TEXT2)}
          color={isBeta ? 'gray' : 'yellow'}
        />
      </SummaryBoxContent>
    </SummaryBox>
  );
};

export default PublicVideoBox;
