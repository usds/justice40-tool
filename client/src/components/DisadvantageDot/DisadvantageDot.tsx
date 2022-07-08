import React from 'react';

import * as styles from './DisadvantageDot.module.scss';

interface IDisadvantageDot {
  isDisadvantaged?: boolean | null;
  isBig?: boolean;
}
const DisadvantageDot = ({isDisadvantaged = false, isBig}:IDisadvantageDot) => {
  let computedClass = '';

  if (isBig) {
    computedClass = styles.disadvantagedDotBig;
  } else {
    computedClass = isDisadvantaged ? styles.disadvantagedDotSmall : '';
  }

  return (
    <div className={computedClass} />
  );
};

export default DisadvantageDot;
