import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Button} from '@trussworks/react-uswds';

import * as styles from './DatasetsButton.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

// @ts-ignore
import launchIcon from '/node_modules/uswds/dist/img/usa-icons/launch.svg';

export interface IDatasetsButtonProps {
  href: string,
}

const DatasetsButton = ({href}: IDatasetsButtonProps) => {
  const intl = useIntl();

  return (
    <a href={href} target='_blank' rel="noreferrer">
      <Button
        type="button"
        className={styles.datasetsButtonContainer}>
        {intl.formatMessage(METHODOLOGY_COPY.DATASETS.BUTTON_TEXT)}
        <img
          className={styles.launchIcon}
          src={launchIcon}
          alt={'launch icon'}
        />
      </Button>
    </a>
  );
};

export default DatasetsButton;
