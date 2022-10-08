import React from 'react';
import {SummaryBox, SummaryBoxContent, SummaryBoxHeading} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as EXPLORE_COPY from '../../data/copy/explore';

import * as styles from './ExploreDataBox.module.scss';

// @ts-ignore
import fileDownIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';


export interface IExploreDataBoxProps {}

const ExploreDataBox = ({}: IExploreDataBoxProps) => {
  const intl = useIntl();

  return (
    <SummaryBox className={styles.summaryBoxContainer}>

      <SummaryBoxHeading headingLevel='h2'>
        {intl.formatMessage(EXPLORE_COPY.EXPLORE_DATA_BOX.TITLE)}
        <img tabIndex={0} className={styles.fileDownIcon} src={fileDownIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PLUS)}
        />
      </SummaryBoxHeading>

      <SummaryBoxContent>
        {EXPLORE_COPY.EXPLORE_DATA_BOX_BODY}
      </SummaryBoxContent>

    </SummaryBox>
  );
};

export default ExploreDataBox;
