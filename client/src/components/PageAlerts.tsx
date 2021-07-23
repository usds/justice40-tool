import * as React from 'react';
import {Alert} from '@trussworks/react-uswds';
import {FormattedMessage} from 'gatsby-plugin-intl';

interface IPageAlertProps {
  betaWarning?: boolean;
  dataSourceWarning?: boolean;
}

export const PageAlerts = ({
  betaWarning = true,
  dataSourceWarning = false}: IPageAlertProps) => {
  return (
    <>
      { betaWarning ?
        <Alert className={'j40-sitealert'} type="info">
          <b><FormattedMessage
            id='header.alertTitleBeta'
            description={'Alerts that appear on every page - title'}
            defaultMessage={`Public beta`}/> - </b>
          <FormattedMessage
            id='header.alertBodyBeta'
            description={'Alerts that appear on every page'}
            defaultMessage={`This website will be continuously updated`}/>
          <br/>
        </Alert> :
        <></>
      }
      { dataSourceWarning ? // default is to not show
        <Alert className={'j40-sitealert'} type="warning">
          <b><FormattedMessage
            id='header.alertTitleLimitedData'
            description={'Alerts that appear on maps page - title'}
            defaultMessage={`Limited data sources`}/> — </b>
          <FormattedMessage
            id='header.alertBodyLimitedData'
            description={'Alerts that appear on maps page'}
            defaultMessage={`Datasets may be added, updated, or removed.`}/>
          <br/>
        </Alert> :
        <></>
      }
    </>
  );
};
