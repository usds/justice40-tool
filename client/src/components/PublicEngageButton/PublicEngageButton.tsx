import React from 'react';
import {Link} from 'gatsby';
import {useIntl} from 'gatsby-plugin-intl';
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
      <Button type={'button'} icon={true}>
        <Link className={styles.link} to={'/public-engagement'}>
          {intl.formatMessage(PUBLIC_ENG_COPY.PUBLIC_ENG_BUTTON.LABEL)}
        </Link>
      </Button>
    </div>
  );
};

export default PublicEngageButton;
