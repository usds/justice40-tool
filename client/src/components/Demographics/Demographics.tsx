import React, {useState} from 'react';
import {Accordion} from '@trussworks/react-uswds';

import * as styles from './Demographics.module.scss';
import {useFlags} from '../../contexts/FlagContext';

type IDemographicsData = {
  racial: [string, number][],
  age: [string, number][]
}

// Mock backend data
const demographicsData:IDemographicsData = {
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
 * TODO: Update after actual data is created
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
        {' ( '}
        <button
          className={styles.customDemographicItemToggle}
          id={`${id}-header`}
          aria-controls={`${id}-panel`}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          tabIndex={0}
        >
          {isExpanded ? 'hide' : 'show'}
        </button>
        { isExpanded ? <span>&#9650;</span> : <span>&#9660;</span>}
        {' )'}
      </h6>

      <section
        id={`${id}-panel`}
        aria-labelledby={`${id}-header`}
        hidden={!isExpanded}
      >{children}</section>
    </>
  );
};

const Demographics = () => {
  const flags = useFlags();

  const demographicSections = [
    {
      title: `Racial Ethnographic`,
      content: demographicItemGen(demographicsData.racial),
      expanded: false,
      id: '123',
      headingLevel: 'h4',
    },
    {
      title: `Age`,
      content: demographicItemGen(demographicsData.age),
      expanded: false,
      id: 'abc',
      headingLevel: 'h4',
    },
  ];

  return (
    <div className={styles.demographicsContainer}>
      <div>Tract demographics</div>
      {'cdc' in flags ? (
        <>
          <J40AccordionItem id={'race'} title={`Racial Ethnographic`}>
            {demographicItemGen(demographicsData.racial)}
          </J40AccordionItem>
          <J40AccordionItem id={'age'} title={`Age`}>
            {demographicItemGen(demographicsData.age)}
          </J40AccordionItem>
        </>
      ) :
      <Accordion items={demographicSections} multiselectable={true}/>
      }
    </div>
  );
};

export default Demographics;
