import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import * as styles from './j40Alert.module.scss';

interface IJ40AlertProps {
  location: Location;
}

const J40Alert = ({location}:IJ40AlertProps) => {
  const isPadded = location?.pathname.match(/cejst\/?/);
  const intl = useIntl();
  const messages = defineMessages({
    alertMsg: {
      id: 'datasetAlert.header.alertMsg',
      defaultMessage: 'Limited data sources — Datasets may be added, updated, or removed.',
      description: 'an alert message to inform users that datasets may change',
    },
  });
  return (
    <div className={isPadded ? styles.j40AlertLeftPad : styles.j40Alert}>
      {intl.formatMessage(messages.alertMsg)}
    </div>
  );
};

export default J40Alert;
