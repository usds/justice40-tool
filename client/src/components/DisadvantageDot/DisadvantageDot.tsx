import React from 'react';

import * as styles from './DisadvantageDot.module.scss';

interface IDisadvantageDot {
  isDisadvantaged: boolean;
}
const DisadvantageDot = ({isDisadvantaged = false}:IDisadvantageDot) => {
  return (
    <div className={isDisadvantaged ? styles.disadvantagedDot : ''} />
  );
};

export default DisadvantageDot;
