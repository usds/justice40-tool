import React from 'react';
import {useIntl, Link} from 'gatsby-plugin-intl';
import {Button, Tag} from '@trussworks/react-uswds';

import * as styles from './PublicEngageButton.module.scss';
import * as PUBLIC_ENG_COPY from '../../data/copy/publicEngage';

const PublicEngageButton = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.tagContainer}>
        <Tag className={styles.tag}>
          {intl.formatMessage(PUBLIC_ENG_COPY.PUBLIC_ENG_BUTTON.TAG_LABEL)}
        </Tag>
      </div>
      <Link className={styles.link} to={'/public-engagement'}>
        <Button type={'button'} icon={true}>
          {intl.formatMessage(PUBLIC_ENG_COPY.PUBLIC_ENG_BUTTON.LABEL)}
        </Button>
      </Link>
    </div>
  );
};

export default PublicEngageButton;
