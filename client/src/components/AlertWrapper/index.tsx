import React from 'react';
import {Alert} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './alertWrapper.module.scss';
import {defineMessages} from 'react-intl';

interface IAlertWrapperProps {
  showBetaAlert?: boolean, // defaults to true
  showLimitedDataAlert?: boolean, // defaults to false
}

// use like this:
// <AlertWrapper showBetaAlert={true} showLimitedDataAlert={true}/>
// <AlertWrapper showBetaAlert={true}/>

const AlertWrapper = ({
  showBetaAlert = false,
  showLimitedDataAlert = false,
}: IAlertWrapperProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    alertBetaTitle: {
      id: 'alert.alertBetaTitle',
      defaultMessage:
        'Public beta',
      description: 'Title for an alert inform users that datasets may change',
    },
    alertBetaBody: {
      id: 'alert.alertBetaBody',
      defaultMessage:
        'This website may be continuously updated',
      description: 'Body for an alert inform users that datasets may change',
    },
    alertDataLimitedTitle: {
      id: 'alert.alertDataLimitedTitle',
      defaultMessage:
        'Limited data sources',
      description: 'Title for an alert inform users that datasets may change',
    },
    alertDataLimitedBody: {
      id: 'alert.alertDataLimitedBody',
      defaultMessage:
        'Datasets may be added, updated, or removed.',
      description: 'Body for an alert inform users that datasets may change',
    },
  });


  return (
    <div className={styles.alertWrapper}>
      {showBetaAlert && (
        <Alert className={'j40-sitealert'} type="info">
          <span className={'j40-sitealert-title'}>{intl.formatMessage(messages.alertBetaTitle)}</span>
          <span className={'j40-sitealert-body'}> — {intl.formatMessage(messages.alertBetaBody)}</span>
          <br/>
        </Alert>
      )}

      {showLimitedDataAlert && (
        <Alert className={'j40-sitealert'} type="warning">
          <span className={'j40-sitealert-title'}>{intl.formatMessage(messages.alertDataLimitedTitle)}</span>
          <span className={'j40-sitealert-body'}> — {intl.formatMessage(messages.alertDataLimitedBody)}</span>
          <br/>
        </Alert>
      )}
    </div>
  );
};

export default AlertWrapper;
