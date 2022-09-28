import React from 'react';

import * as styles from './PrioritizationCopy.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

interface IPrioritizationCopy {
  totalCategoriesPrioritized: number
  isDonut: boolean,
  percentTractTribal: number,
  totalIndicatorsPrioritized: number
};

/**
 * This component returns the prioritzation copy
 *
 * @param {number} totalCategoriesPrioritized
 * @param {boolean} isDonut
 * @param {number} percentTractTribal
 * @param {number} totalIndicatorsPrioritized
 * @return {JSX}
 */
const PrioritizationCopy =
   ({
     totalCategoriesPrioritized,
     isDonut,
     percentTractTribal,
     totalIndicatorsPrioritized}:IPrioritizationCopy) => {
     if (isDonut) {
       if (percentTractTribal === null) {
         return (
           <div>
             <div>{EXPLORE_COPY.PRIORITIZATION_COPY.DONUT}</div>
           </div>
         );
       } else if (percentTractTribal !== null && percentTractTribal === 0) {
         return (
           <div>
             <div>{EXPLORE_COPY.PRIORITIZATION_COPY.DONUT}</div>
             <div className={styles.prioCopyPara2}>
               {EXPLORE_COPY.getPrioFRTLessThan1Perc(true)}
             </div>
           </div>
         );
       } else if (percentTractTribal !== null && percentTractTribal > 0) {
         // map location for this case: #9.56/48.1013/-108.7722
         return (
           <div>
             <div>{EXPLORE_COPY.PRIORITIZATION_COPY.DONUT}</div>
             <div className={styles.prioCopyPara2}>
               {EXPLORE_COPY.getPrioFRTNPerc(percentTractTribal, true)}
             </div>
           </div>
         );
       } else {
         return <></>;
       }
     } else if (!isDonut) {
       if (percentTractTribal !== null && percentTractTribal >= 0) {
         // map location for this case: #8.66/48.3496/-106.2982
         return (
           <div>
             <div>{EXPLORE_COPY.getPrioFRTNPerc(percentTractTribal, true)}</div>
           </div>
         );
       } else if (percentTractTribal !== null && percentTractTribal === 0) {
         return (
           <div>
             <div>{EXPLORE_COPY.getPrioFRTLessThan1Perc(true)}</div>
           </div>
         );
       } else if (percentTractTribal === null) {
         if (totalCategoriesPrioritized >= 1) {
           if (totalIndicatorsPrioritized === 0) {
             return <></>;
           } else if (totalIndicatorsPrioritized === 1) {
             return (
               <div>
                 <div>{EXPLORE_COPY.PRIORITIZATION_COPY.PRIO_1_BURD}</div>
               </div>
             );
           } else if (totalIndicatorsPrioritized >=1) {
             return (
               <div>
                 <div>{EXPLORE_COPY.getPrioNBurden(totalIndicatorsPrioritized)}</div>
               </div>
             );
           } else {
             return <></>;
           }
         } else if (totalCategoriesPrioritized === 0) {
           if (totalIndicatorsPrioritized === 0) {
             return (
               <div>
                 <div>{EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO}</div>
               </div>
             );
           } else if (totalIndicatorsPrioritized === 1) {
             return (
               <div>
                 <div>{EXPLORE_COPY.PRIORITIZATION_COPY.NOT_PRIO_1_BURD}</div>
               </div>
             );
           } else if (totalIndicatorsPrioritized >= 1) {
             return (
               <div>
                 <div>{EXPLORE_COPY.getNotPrioNBurden(totalIndicatorsPrioritized)}</div>
               </div>
             );
           } else {
             return <></>;
           }
         } else {
           return <></>;
         }
       } else {
         return <></>;
       }
     } else {
       return <></>;
     }
   };

export default PrioritizationCopy;
