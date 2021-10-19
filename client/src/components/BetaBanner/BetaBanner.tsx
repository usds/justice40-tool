import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as COMMON_COPY from '../../data/copy/common';

const BetaBanner = () => {
  const intl = useIntl();

  return (
    <div className='j40-beta-banner-container'>
      <div className='j40-beta-banner'>
        <div className='j40-beta-pill-icon'></div>
        <div className='j40-beta-text'>
          <span className='j40-beta-heading'>
            {intl.formatMessage(COMMON_COPY.BETA_BANNER.TITLE)}{' '}
          </span>
          <span className='j40-beta-info'>
            {intl.formatMessage(COMMON_COPY.BETA_BANNER.INFO)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetaBanner;
