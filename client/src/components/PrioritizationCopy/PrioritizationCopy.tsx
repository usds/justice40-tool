import React from 'react';

// import * as styles from './PrioritizationCopy.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

interface IPrioritizationCopy {
  totalCategoriesPrioritized: number
  totalBurdensPrioritized: number
  isAdjacencyThreshMet: boolean,
  isAdjacencyLowIncome: boolean,
  tribalCountAK: number | null,
  tribalCountUS: null, // when this signal is supported add number type
  percentTractTribal: number | null
};

/**
 * This component returns the prioritzation copy.
 *
 * The truth table that tracks all the states for this logic is captured in the shared doc
 * called "Indicators for UI and BE Signals". The Sheet is called "Disadv Copy v4 p1". This
 * spreadsheet is a giant truth table with all possible BE signal combinations and what the
 * approppriate copy should be.
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
const PrioritizationCopy =
   ({totalCategoriesPrioritized,
     totalBurdensPrioritized,
     isAdjacencyThreshMet,
     isAdjacencyLowIncome,
     tribalCountAK,
     tribalCountUS,
     percentTractTribal,
   }:IPrioritizationCopy) => {
     let prioCopyRendered;

     // if 1
     if (totalCategoriesPrioritized === 0) {
       // if 1-1
       if (isAdjacencyThreshMet && isAdjacencyLowIncome) {
         prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.PRIO_SURR_LI;
         // if 1-2
       } else if (isAdjacencyThreshMet && !isAdjacencyLowIncome) {
         // if 1-2-1
         if ( tribalCountAK === null && tribalCountUS === null) {
           // if 1-2-1-1
           if (percentTractTribal === null) {
             prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO_SURR_LI;
             // if 1-2-1-2
           } else if (percentTractTribal === 0) {
             prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.PAR_PRIO_SURR_NO_LI;
             // if 1-2-1-3
           } else if (percentTractTribal >= 1) {
             prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.PAR_PRIO_SURR_NO_LI;
           }
           // if 1-2-2
         } else if (tribalCountAK !== null && tribalCountAK >= 1) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.PAR_PRIO_SURR_NO_LI;
         }
         // if 1-3
       } else if (
         !(isAdjacencyThreshMet && isAdjacencyLowIncome) &&
          tribalCountAK === null &&
          tribalCountUS === null &&
          percentTractTribal === null
       ) {
         // if 1-3-1
         if (totalBurdensPrioritized === 0) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO;
           // if 1-3-2
         } else if (totalBurdensPrioritized === 1) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO_1BUR;
           // if 1-3-3
         } else if (totalBurdensPrioritized > 1) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO_NBUR;
         }
         // if 1-4
       } else if (!(isAdjacencyThreshMet && isAdjacencyLowIncome)) {
         // if 1-4-1
         if (
           (tribalCountAK !== null && tribalCountAK >= 1) &&
        (tribalCountUS !== null && tribalCountUS >= 1)
         ) {
           prioCopyRendered = EXPLORE_COPY.getPrioAKUSCopy(tribalCountAK, tribalCountUS);
           // if 1-4-2
         } else if (
           (tribalCountAK !== null && tribalCountAK >= 1) &&
        tribalCountUS === null
         ) {
           prioCopyRendered = EXPLORE_COPY.getPrioANVCopy(tribalCountAK);
           // if 1-4-3
         } else if (
           (tribalCountUS !== null && tribalCountUS >= 1) &&
        tribalCountAK === null
         ) {
           if (percentTractTribal === null) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTPointsCopy(`${tribalCountUS}`);
           } else if (percentTractTribal === 0) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`);
           } else if (percentTractTribal >= 1) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`);
           }
         // 1-4-4
         } else if (tribalCountUS === null && tribalCountAK === null) {
           if (percentTractTribal === 0) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`);
           } else if (percentTractTribal !== null && percentTractTribal >= 1 ) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`);
           }
         }
       }
       // if 2
     } else if (totalCategoriesPrioritized > 0) {
       if (totalBurdensPrioritized === 0) {
         prioCopyRendered = <></>;
       } else if (totalBurdensPrioritized === 1) {
         prioCopyRendered = EXPLORE_COPY.getPrioNBurdenCopy(`1`);
       } else if (totalBurdensPrioritized > 1) {
         prioCopyRendered = EXPLORE_COPY.getPrioNBurdenCopy(`more than 1`);
       }
     } else {
       prioCopyRendered = <></>;
     };

     return (
       <div>
         {prioCopyRendered}
       </div>
     );
   };

export default PrioritizationCopy;
