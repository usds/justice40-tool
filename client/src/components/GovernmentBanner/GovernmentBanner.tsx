import React from 'react';
import {GovBanner} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

// Contexts:
import {useFlags} from '../../contexts/FlagContext';

import Language from '../Language';

import * as styles from './GovernmentBanner.module.scss';

const GovernmentBanner = () => {
  const intl = useIntl();
  const flags = useFlags();

  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.bannerContainer}>

        {'sp' in flags ? (
          <>
            <GovBanner language={intl.locale === 'es' ? 'spanish' : 'english'}/>
            <Language isDesktop={true}/>
          </>
        ) : (
          <>
            <GovBanner/>
          </>
      )}

      </div>
    </div>
  );
};

export default GovernmentBanner;
