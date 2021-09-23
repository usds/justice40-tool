import React from 'react';
import {Alert} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './alertWrapper.module.scss';
import * as COMMON_COPY from '../../data/copy/common';

interface IAlertWrapperProps {
  showBetaAlert?: boolean, // defaults to false
  showLimitedDataAlert?: boolean, // defaults to false
}

const AlertWrapper = ({
  showBetaAlert = false,
  showLimitedDataAlert = false,
}: IAlertWrapperProps) => {
  const intl = useIntl();


  return (
    <div className={styles.alertWrapper}>
      {showBetaAlert && (
        <Alert className={'j40-sitealert'} type="info">
          <span className={'j40-sitealert-title'}>{intl.formatMessage(COMMON_COPY.ALERTS.BETA_TITLE)}</span>
          <span className={'j40-sitealert-body'}> — {intl.formatMessage(COMMON_COPY.ALERTS.BETA_BODY)}</span>
          <br/>
        </Alert>
      )}

      {showLimitedDataAlert && (
        <Alert className={'j40-sitealert'} type="warning">
          <span className={'j40-sitealert-title'}>{intl.formatMessage(COMMON_COPY.ALERTS.LIMITED_TITLE)}</span>
          <span className={'j40-sitealert-body'}> — {intl.formatMessage(COMMON_COPY.ALERTS.LIMITED_BODY)}</span>
          <br/>
        </Alert>
      )}
    </div>
  );
};

export default AlertWrapper;
