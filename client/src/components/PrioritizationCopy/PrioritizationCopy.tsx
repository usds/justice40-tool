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

     if (totalCategoriesPrioritized === 0) {
       if (isAdjacencyThreshMet && isAdjacencyLowIncome) {
         prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.PRIO_SURR_LI;
       } else if (
         !(isAdjacencyThreshMet && isAdjacencyLowIncome) &&
      tribalCountAK === null &&
      tribalCountUS === null &&
      percentTractTribal === null
       ) {
         if (totalBurdensPrioritized === 0) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO;
         } else if (totalBurdensPrioritized === 1) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO_1BUR;
         } else if (totalBurdensPrioritized > 1) {
           prioCopyRendered = EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO_NBUR;
         }
       } else if (!(isAdjacencyThreshMet && isAdjacencyLowIncome)) {
         if (
           (tribalCountAK !== null && tribalCountAK >= 1) &&
        (tribalCountUS !== null && tribalCountUS >= 1)
         ) {
           prioCopyRendered = EXPLORE_COPY.getPrioAKUSCopy(tribalCountAK, tribalCountUS);
         } else if (
           (tribalCountAK !== null && tribalCountAK >= 1) &&
        tribalCountUS === null
         ) {
           prioCopyRendered = EXPLORE_COPY.getPrioANVCopy(tribalCountAK);
         } else if (
           (tribalCountUS !== null && tribalCountUS >= 1) &&
        tribalCountAK === null
         ) {
           if (percentTractTribal === null) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`${tribalCountUS}`);
           } else if (percentTractTribal === 0) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`);
           } else if (percentTractTribal >= 1) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`);
           }
         } else if (tribalCountUS === null && tribalCountAK === null) {
           if (percentTractTribal === 0) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`less than 1%`);
           } else if (percentTractTribal !== null && percentTractTribal >= 1 ) {
             prioCopyRendered = EXPLORE_COPY.getPrioFRTCopy(`${percentTractTribal}%`);
           }
         }
       }
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
