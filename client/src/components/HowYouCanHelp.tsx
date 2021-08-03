import React from 'react';
import * as styles from './HowYouCanHelp.module.scss';

const HowYouCanHelp = () => {
  return (
    <div className={styles.howYouCanHelpContainer}>
      <h2>How You Can Help Improve the Tool</h2>
      <ul>
        <li>
          <div className={styles.listWrapper}>
            <div className={styles.howYouCanHelpBullet}></div>
            <div>If you have helpful information, we’d love to
              <a href={'mailto:vimusds@gmail.com'}>get an email from you</a>
              .</div>
          </div>
        </li>
        <li>
          <div className={styles.listWrapper}>
            <div className={styles.howYouCanHelpBullet}></div>
            <div>View our data and methodology and send us feedback.</div>
          </div>
        </li>
        <li>
          <div className={styles.listWrapper}>
            <div className={styles.howYouCanHelpBullet}></div>
            <div>Find your community and share your feedback.</div>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default HowYouCanHelp;
