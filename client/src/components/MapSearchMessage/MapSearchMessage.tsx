import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as EXPLORE_COPY from '../../data/copy/explore';
import * as styles from './MapSearchMessage.module.scss';

interface ISearchMessage {
    isSearchResultsNull: boolean;
};

const MapSearchMessage = ({isSearchResultsNull}:ISearchMessage) => {
  const intl = useIntl();

  return (
    <div className={isSearchResultsNull ? styles.showMessage : styles.hideMessage}>
      {intl.formatMessage(EXPLORE_COPY.MAP.SEARCH_RESULTS_EMPTY_MESSAGE)}
    </div>
  );
};

export default MapSearchMessage;
