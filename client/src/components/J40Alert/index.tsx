import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import * as styles from './j40Alert.module.scss';

// This prop follows an inversion of control pattern allowing the user of this component to specify
// how it's rendered. See more here: https://kentcdodds.com/blog/inversion-of-control
interface IJ40AlertProps {
  alertStyle?: {[key:string]: string};
}

const J40Alert = ({alertStyle}:IJ40AlertProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    alertMsg: {
      id: 'datasetAlert.header.alertMsg',
      defaultMessage: 'Limited data sources — Datasets may be added, updated, or removed.',
      description: 'an alert message to inform users that datasets may change',
    },
  });
  return (
    <div className={styles.j40Alert} style={alertStyle}>
      {intl.formatMessage(messages.alertMsg)}
    </div>
  );
};

export default J40Alert;
