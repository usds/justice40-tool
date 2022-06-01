import React from 'react';
import {useIntl, Link} from 'gatsby-plugin-intl';
import {
  Button,
  // Tag
} from '@trussworks/react-uswds';

import * as styles from './PublicEngageButton.module.scss';
import * as PUBLIC_ENG_COPY from '../../data/copy/publicEngage';

// @ts-ignore
import eventIcon from '/node_modules/uswds/dist/img/usa-icons/event.svg';

const PublicEngageButton = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      {/* Remove Updated Tag for now */}
      {/* <div className={styles.tagContainer}>
        <Tag className={styles.tag}>
          {intl.formatMessage(PUBLIC_ENG_COPY.PUBLIC_ENG_BUTTON.TAG_LABEL)}
        </Tag>
      </div> */}
      <Link className={styles.link} to={'/public-engagement'}>
        <Button
          type="button"
          className={styles.engagementButton}
        >
          <div className={styles.buttonContainer}>
            <img
              className={styles.buttonImage}
              src={eventIcon}
              alt={intl.formatMessage(PUBLIC_ENG_COPY.PUBLIC_ENG_BUTTON.IMG_ICON_ALT_TAG)}
            />
            <div>
              {intl.formatMessage(PUBLIC_ENG_COPY.PUBLIC_ENG_BUTTON.LABEL)}
            </div>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default PublicEngageButton;
