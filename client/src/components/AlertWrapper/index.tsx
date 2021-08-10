import React from 'react';
import {Alert} from '@trussworks/react-uswds';
import {FormattedMessage} from 'gatsby-plugin-intl';

import * as styles from './alertWrapper.module.scss';

interface IAlertWrapperProps {
    hideWarningAlert?: boolean
}

const AlertWrapper = ({hideWarningAlert}:IAlertWrapperProps) => {
  return (
    <div className={styles.alertWrapper}>
      <Alert className={'j40-sitealert'} type="info">
        <span className={'j40-sitealert-title'}><FormattedMessage
          id='header.alertTitleBeta'
          description={'Alerts that appear on every page - title'}
          defaultMessage={`Public beta`}/> - </span>
        <span className={'j40-sitealert-body'}>
          <FormattedMessage
            id='header.alertBodyBeta'
            description={'Alerts that appear on every page'}
            defaultMessage={`This website will be continuously updated`}/>
        </span>
        <br/>
      </Alert>
      <Alert
        className={`j40-sitealert' ${hideWarningAlert ? styles.alertHide : null} ${styles.alertWarning}`}
        type="warning">
        <b>Limited data sources — </b>
        This tool currently includes 16 datasets. Over time, datasets could be
        added, updated, or removed. The datasets come from a variety of sources
        based on availability, quality, and relevance to environmental, energy,
        and climate issues. Each dataset has limitations, such as how recently
        the data was updated.
      </Alert>
    </div>
  );
}; ;

export default AlertWrapper;
