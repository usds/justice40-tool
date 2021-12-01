import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as EXPLORE_COPY from '../../data/copy/explore';
import * as styles from './MapSearchMessage.module.scss';

interface ISearchMessage {
    isSearchEmpty: boolean;
};


const MapSearchMessage = ({isSearchEmpty}:ISearchMessage) => {
  const intl = useIntl();

  return (
    <div className={isSearchEmpty ? styles.showMessage : styles.hideMessage}>
      {intl.formatMessage(EXPLORE_COPY.MAP.SEARCH_RESULTS_EMPTY_MESSAGE)}
    </div>
  );
};

export default MapSearchMessage;
