import React from 'react';

import * as styles from './PrioritizationCopy2.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

interface IPrioritizationCopy2 {
  totalCategoriesPrioritized: number
  totalBurdensPrioritized?: number
  isAdjacencyThreshMet: boolean,
  isAdjacencyLowIncome: boolean,
  tribalCountAK: number | null,
  tribalCountUS: null, // when this signal is supported add number type
  percentTractTribal: number | null
};

/**
 * This component returns the prioritzation copy
 *
 * @param {number} totalCategoriesPrioritized
 * @param {number} totalBurdensPrioritized
 * @param {boolean} isAdjacencyThreshMet
 * @param {boolean} isAdjacencyLowIncome
 * @param {number | null} tribalCountAK
 * @param {number | null} tribalCountUS
 * @param {number | null} percentTractTribal
 * @return {JSX}
 */
const PrioritizationCopy2 =
   ({totalCategoriesPrioritized,
     isAdjacencyThreshMet,
     isAdjacencyLowIncome,
     tribalCountAK,
     tribalCountUS,
     percentTractTribal,
   }:IPrioritizationCopy2) => {
     let noStyles = false;
     let prioCopy2Rendered;

     if (
       (totalCategoriesPrioritized === 0 && (isAdjacencyThreshMet && isAdjacencyLowIncome)) ||
      (totalCategoriesPrioritized >= 1)
     ) {
       if (
         tribalCountAK === null &&
        (tribalCountUS !== null && tribalCountUS >= 1) &&
        (percentTractTribal !== null && percentTractTribal >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioPercAndNumPointsAlsoCopy(`${percentTractTribal}%`, tribalCountUS);
       } else if (
         tribalCountAK === null &&
        tribalCountUS === null &&
        (percentTractTribal !== null && percentTractTribal >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`, true);
       } else if (
         tribalCountAK === null &&
        (tribalCountUS !== null && tribalCountUS >= 1) &&
        (percentTractTribal !== null && percentTractTribal == 0)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioPercAndNumPointsAlsoCopy(`less than 1%`, tribalCountUS);
       } else if (
         tribalCountAK === null &&
        tribalCountUS !== null &&
        (percentTractTribal !== null && percentTractTribal == 0)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`, true);
       } else if (
         (tribalCountAK !== null && tribalCountAK >= 1) &&
        tribalCountUS === null &&
        percentTractTribal === null
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioANVCopy(tribalCountAK, true);
       } else if (
         (tribalCountAK !== null && tribalCountAK >= 1) &&
        (tribalCountUS !== null && tribalCountUS >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioAKUSCopy(tribalCountAK, tribalCountUS, true);
       } else {
         prioCopy2Rendered = <></>;
         noStyles = true;
       }
     } else {
       prioCopy2Rendered = <></>;
       noStyles = true;
     };

     return (
       <div className={noStyles ? '' : styles.prioritizationCopy2Container}>
         {prioCopy2Rendered}
       </div>
     );
   };

export default PrioritizationCopy2;
