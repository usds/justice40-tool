import React from 'react';
import {SummaryBox, SummaryBoxContent, SummaryBoxHeading} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as CONTACT_COPY from '../../data/copy/contact';
import * as styles from './RequestForInfo.module.scss';

const RequestForInfo = () => {
  const intl = useIntl();

  return (
    <SummaryBox className={styles.rfiBox}>

      <SummaryBoxHeading headingLevel='h3'>
        {intl.formatMessage(CONTACT_COPY.RFI_BOX.TITLE)}
      </SummaryBoxHeading>

      <SummaryBoxContent>
        <p>{CONTACT_COPY.RFI_BOX_BODY}</p>
      </SummaryBoxContent>

    </SummaryBox>
  );
};

export default RequestForInfo;
