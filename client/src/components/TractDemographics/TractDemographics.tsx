import React, {useState} from 'react';

// @ts-ignore
import expandIcon from '/node_modules/uswds/dist/img/usa-icons/expand_more.svg';
// @ts-ignore
import collapseIcon from '/node_modules/uswds/dist/img/usa-icons/expand_less.svg';

import * as styles from './TractDemographics.module.scss';

// Mock interface
export interface ITractDemographicsProps {
  racial: [string, number][],
  age: [string, number][]
}

// Mock backend data
const demographicsData:ITractDemographicsProps = {
  racial: [
    ['White', 61.4],
    ['Black or African Americon', 10.3],
    ['American Indian and Alaska Native', 10.3],
    ['American Indian and Alaska Native', 0.3],
    ['Asian', 7.2],
    ['Native Hawiian or Pacific Islander', 4.2],
    ['Other', 2.5],
    ['Two or more races', 6.7],
    ['Hispanic or Latino', 10.4],
  ],
  age: [
    ['Children under 10', 1.4],
    ['Ages 10 - 64', 80.3],
    ['Elderly over 65', 7.2],
  ],
};

/*
 * Generate the demographic item based the input
 * // TODO: Update after actual data is created
 *
 */
const demographicItemGen = (demographicData: any[]) => {
  return demographicData.map((el, index) => {
    return (
      <div key={index} className={styles.demographicItem}>
        <span>{ el[0] }</span>
        <span>{`${el[1]}%`}</span>
      </div>
    );
  });
};

interface IJ40AccordionItem {
  id: string,
  title: string,
  children: React.ElementType
}

const J40AccordionItem = ({id, title, children}:IJ40AccordionItem) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <h6 className={styles.demographicHeading}>
        {title}
        <span>
          {'('}
          <button
            className={styles.showHideText}
            id={`${id}-header`}
            aria-controls={`${id}-panel`}
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            tabIndex={0}
          >
            {isExpanded ? 'hide' : 'show'}
          </button>
          { isExpanded ?
          <img
            className={styles.showHideIcon}
            src={collapseIcon}
            alt={'collapse icon'}
            onClick={() => setIsExpanded(!isExpanded)}
          /> :
          <img
            className={styles.showHideIcon}
            src={expandIcon}
            alt={'expand icon'}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          }
          {')'}
        </span>

      </h6>

      <section
        id={`${id}-panel`}
        aria-labelledby={`${id}-header`}
        hidden={!isExpanded}
      >{children}</section>
    </>
  );
};

const TractDemographics = () => {
  return (
    <div className={styles.demographicsContainer}>
      <div className={styles.demographicsTitle}>
        Tract demographics
      </div>
      <>
        <J40AccordionItem id={'race'} title={`Racial / Ethnographic`}>
          {demographicItemGen(demographicsData.racial)}
        </J40AccordionItem>
        <J40AccordionItem id={'age'} title={`Age`}>
          {demographicItemGen(demographicsData.age)}
        </J40AccordionItem>
      </>
    </div>
  );
};

export default TractDemographics;
