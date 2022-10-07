import React from 'react';

import * as styles from './howYouCanHelp.module.scss';
import * as ABOUT_COPY from '../../data/copy/about';

const HowYouCanHelp = () => {
  return (
    <div className={styles.howYouCanHelpContainer}>
      <h2>
        {ABOUT_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.HEADING}
      </h2>
      <ul className={styles.howYouCanHelpListWrapper}>
        <li className={styles.howYouCanHelpList}>
          {ABOUT_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_1}
        </li>
        <li className={styles.howYouCanHelpList}>
          {ABOUT_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_2}
        </li>
        {/* <li className={styles.howYouCanHelpList}>
          {ABOUT_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_3}
        </li> */}
        <li className={styles.howYouCanHelpList}>
          {ABOUT_COPY.HOW_YOU_CAN_HELP_LIST_ITEMS.LIST_ITEM_4}
        </li>
      </ul>
    </div>
  );
};

export default HowYouCanHelp;
