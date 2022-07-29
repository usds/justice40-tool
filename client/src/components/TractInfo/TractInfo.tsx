import React from 'react';

import * as styles from './TractInfo.module.scss';

export interface ITractInfoProps {}

const TractInfo = ({}: ITractInfoProps) => {
  return (
    <div className={styles.tractInfoContainer}>
      Hello 👋, I am a TractInfo component.
    </div>
  );
};

export default TractInfo;
