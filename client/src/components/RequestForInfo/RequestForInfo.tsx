import React from 'react';
import {SummaryBox} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as CONTACT_COPY from '../../data/copy/contact';
import * as styles from './RequestForInfo.module.scss';

const RequestForInfo = () => {
  const intl = useIntl();

  return (
    <SummaryBox className={styles.rfiBox} heading={intl.formatMessage(CONTACT_COPY.RFI_BOX.TITLE)}>
      <p>{CONTACT_COPY.RFI_BOX_BODY}</p>
    </SummaryBox>
  );
};

export default RequestForInfo;
