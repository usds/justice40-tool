import React from 'react';

import * as styles from './TractDemographics.module.scss';

export interface ITractDemographicsProps {}

const TractDemographics = ({}: ITractDemographicsProps) => {
  return (
    <div className={styles.tractDemographicsContainer}>
      Hello 👋, I am a TractDemographics component.
    </div>
  );
};

export default TractDemographics;
