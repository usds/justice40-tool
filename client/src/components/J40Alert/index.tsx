import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import * as styles from './j40Alert.module.scss';

const J40Alert = () => {
  const intl = useIntl();
  const messages = defineMessages({
    alertMsg: {
      id: 'datasetAlert.header.alertMsg',
      defaultMessage: 'Limited data sources — Datasets may be added, updated, or removed.',
      description: 'an alert message to inform users that datasets may change',
    },
  });
  return (
    <div className={styles.j40Alert}>
      {intl.formatMessage(messages.alertMsg)}
    </div>
  );
};

export default J40Alert;
