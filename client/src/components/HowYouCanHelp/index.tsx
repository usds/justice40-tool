import React from 'react';
import {Link} from 'gatsby-plugin-intl';
import * as styles from './howYouCanHelp.module.scss';

const HowYouCanHelp = () => {
  return (
    <div className={styles.howYouCanHelpContainer}>
      <h2 className={styles.howYouCanHelpHeader}>How You Can Help Improve the Tool</h2>
      <ul className={styles.howYouCanHelpListWrapper}>
        <li className={styles.howYouCanHelpList}>
          <div className={styles.howYouCanHelpText}>If you have helpful information, we’d love to
            {` `}
            <a href={'mailto:screeningtool.feedback@usds.gov'}>get an email from you</a>
            {` `}
            .</div>
        </li>
        <li className={styles.howYouCanHelpList}>
          <div className={styles.howYouCanHelpText}>View our
            {` `}
            <Link to={'/methodology'}>Data & methodology</Link>
            {` `}
            and send us feedback.</div>
        </li>
        <li className={styles.howYouCanHelpList}>
          <div className={styles.howYouCanHelpText}>Find your community and
            {` `}
            <a href={'mailto:screeningtool.feedback@usds.gov'}>share your feedback</a>
            {` `}
            .</div>
        </li>
      </ul>
    </div>
  );
};

export default HowYouCanHelp;
