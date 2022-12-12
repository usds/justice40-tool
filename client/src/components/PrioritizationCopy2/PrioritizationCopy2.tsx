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
 * This component returns the prioritzation copy.
 *
 * The truth table for this logic is captured in the shared doc called "Indicators for
 * UI and BE Signals". The Sheet name is "Disadv Copy p2 v5". This sheet is a copy of the
 * the full table in Sheet "Disadv Copy v4 p1", which is the full truth table in logical order.
 * The p2 v4 sheet copies the full truth table and sorts by the column 'second paragraph' to
 * find the appropriate logical grouping for the second paragraph.
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

     // if 1
     if (
       (totalCategoriesPrioritized === 0 && (isAdjacencyThreshMet && isAdjacencyLowIncome)) ||
      (totalCategoriesPrioritized >= 1)
     ) {
       // if 1-1
       if (
         tribalCountAK === null &&
        (tribalCountUS !== null && tribalCountUS >= 1) &&
        (percentTractTribal !== null && percentTractTribal >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioPercAndNumPointsAlsoCopy(`${percentTractTribal}%`, tribalCountUS);
       // if 1-2
       } else if (
         tribalCountAK === null &&
        tribalCountUS === null &&
        (percentTractTribal !== null && percentTractTribal >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`, true);
       // if 1-3
       } else if (
         tribalCountAK === null &&
        (tribalCountUS !== null && tribalCountUS >= 1) &&
        (percentTractTribal !== null && percentTractTribal == 0)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioPercAndNumPointsAlsoCopy(`less than 1%`, tribalCountUS);
       // if 1-4
       } else if (
         tribalCountAK === null &&
        tribalCountUS === null &&
        (percentTractTribal !== null && percentTractTribal == 0)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`, true);
       // if 1-5
       } else if (
         (tribalCountAK !== null && tribalCountAK >= 1) &&
        tribalCountUS === null &&
        percentTractTribal === null
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioANVCopy(tribalCountAK, true);
       // if 1-6
       } else if (
         (tribalCountAK !== null && tribalCountAK >= 1) &&
        (tribalCountUS !== null && tribalCountUS >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioAKUSCopy(tribalCountAK, tribalCountUS, true);
         // if 1-7
       } else if (
         !isAdjacencyThreshMet && isAdjacencyLowIncome &&
       (tribalCountAK !== null && tribalCountAK >= 1) &&
       (percentTractTribal !== null && percentTractTribal >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`, true);
         // if 1-8
       } else if (
         (totalCategoriesPrioritized >= 1) &&
         tribalCountAK == null &&
         (tribalCountUS !== null && tribalCountUS >= 1) &&
         percentTractTribal == null
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTPointsCopy(tribalCountUS, true);
         // if 1-9
       } else if (
         totalCategoriesPrioritized >= 1 &&
       (tribalCountAK !== null && tribalCountAK >= 1) &&
       (percentTractTribal !== null && percentTractTribal == 0)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`, true);
         // if 1-10
       } else if (
         totalCategoriesPrioritized >= 1 &&
       (tribalCountAK !== null && tribalCountAK >= 1) &&
       (percentTractTribal !== null && percentTractTribal >= 1)
       ) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`, true);
       }
       // if 2
     } else if (
       totalCategoriesPrioritized === 0 &&
      isAdjacencyThreshMet && !isAdjacencyLowIncome &&
      tribalCountAK === null && tribalCountUS === null
     ) {
       // if 2-1
       if (percentTractTribal !== null && percentTractTribal == 0) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`, false);
         // if 2-2
       } else if (percentTractTribal !== null && percentTractTribal >= 1) {
         prioCopy2Rendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`, false);
       }
       // if 3-1
     } else if (
       totalCategoriesPrioritized === 0 &&
      (isAdjacencyThreshMet && !isAdjacencyLowIncome) &&
      tribalCountAK === null &&
      (tribalCountUS !== null && tribalCountUS >= 1) &&
      (percentTractTribal !== null && percentTractTribal == 0)
     ) {
       prioCopy2Rendered = EXPLORE_COPY.getPrioFRTPointsCopy(tribalCountUS, false);
       // if 3-2
     } else if (
       totalCategoriesPrioritized === 0 &&
      (isAdjacencyThreshMet && !isAdjacencyLowIncome) &&
      tribalCountAK === null &&
      (tribalCountUS !== null && tribalCountUS >= 1) &&
      (percentTractTribal !== null && percentTractTribal >= 1)
     ) {
       prioCopy2Rendered = EXPLORE_COPY.getPrioFRTPointsCopy(tribalCountUS, false);
       // if 3-3
     } else if (
       (totalCategoriesPrioritized === 0 && !(isAdjacencyThreshMet && isAdjacencyLowIncome)) &&
      tribalCountAK === null &&
      (tribalCountUS !== null && tribalCountUS >= 1) &&
      (percentTractTribal !== null && percentTractTribal >= 0)
     ) {
       prioCopy2Rendered = EXPLORE_COPY.getPrioFRTPointsCopy(tribalCountUS, true);
       // if 4
     } else if (
       totalCategoriesPrioritized === 0 &&
      isAdjacencyThreshMet && !isAdjacencyLowIncome &&
      (tribalCountAK !== null && tribalCountAK >= 1)
     ) {
       prioCopy2Rendered = EXPLORE_COPY.getPrioANVCopy(tribalCountAK, false);
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
