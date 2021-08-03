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
            <div className={styles.howYouCanHelpText}>If you have helpful information, we’d love to{` `}
              <a href={'mailto:vimusds@gmail.com'}>get an email from you</a>
              .</div>
          </div>
        </li>
        <li>
          <div className={styles.listWrapper}>
            <div className={styles.howYouCanHelpBullet}></div>
            <div className={styles.howYouCanHelpText}>View our{` `}
              <a href={'methodology'}>data and methodology</a>{` `}
              and send us feedback.</div>
          </div>
        </li>
        <li>
          <div className={styles.listWrapper}>
            <div className={styles.howYouCanHelpBullet}></div>
            <div className={styles.howYouCanHelpText}>Find your community and{` `}
              <a href={'contact'}>share your feedback</a>
              .</div>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default HowYouCanHelp;
