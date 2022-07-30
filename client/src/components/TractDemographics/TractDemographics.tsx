import React, {useState} from 'react';

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
      <h6 className={styles.customDemographicHeading}>
        {title}
        <button
          id={`${id}-expand-control`}
          type="button"
          className="usa-accordion__button usa-banner__button"
          aria-expanded={isExpanded}
          aria-controls={`${id}-expand-content`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="usa-banner__button-text">{isExpanded ? `hide` : 'show'}</span>
        </button>
      </h6>

      <div
        id={`${id}-expand-content`}
        className="usa-banner__content usa-accordion__content"
        aria-labelledby={`${id}-expand-control`}
        hidden={!isExpanded}
      >
        {children}
      </div>
    </>
  );
};

const TractDemographics = () => {
  return (
    <div className={styles.demographicsContainer}>
      <div className={styles.demographicsLabel}>Tract demographics</div>
      <>
        <J40AccordionItem id={'race'} title={`Racial Ethnographic`}>
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
