import React from 'react';
import * as styles from './HowYouCanHelp.module.scss';

const HowYouCanHelp = () => {
  return (
    <div className={styles.howYouCanHelpContainer}>
      <h2>How You Can Help Improve the Tool</h2>
      <ul className={'usa-list'}>
        <li>If you have information that could help, we’d love to hear from you.</li>
        <li>View our full set of data sources and methodology
            where you can add or download sources and check statuses on our data roadmap.</li>
        <li>Check out our timeline and send feedback or attend relevant events.</li>
        <li>Contact us and share the stories of your community.</li>
      </ul>
    </div>
  );
};

export default HowYouCanHelp;
