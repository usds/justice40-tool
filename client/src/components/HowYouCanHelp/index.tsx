import React from 'react';

import * as styles from './howYouCanHelp.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

const HowYouCanHelp = () => {
  return (
    <div className={styles.howYouCanHelpContainer}>
      <h2>
        {EXPLORE_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.HEADING}
      </h2>
      <ul className={styles.howYouCanHelpListWrapper}>
        <li className={styles.howYouCanHelpList}>
          {EXPLORE_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_1}
        </li>
        <li className={styles.howYouCanHelpList}>
          {EXPLORE_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_2}
        </li>
        <li className={styles.howYouCanHelpList}>
          {EXPLORE_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_3}
        </li>
      </ul>
    </div>
  );
};

export default HowYouCanHelp;
