import React from 'react';
import {Accordion} from '@trussworks/react-uswds';

import * as styles from './Demographics.module.scss';

// export interface IDemographicsProps {}

type IDemographicsData = {
  racial: [string, number][],
  age: [string, number][]
}

// Temporary while backend is developed
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

const Demographics = () => {
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
      <Accordion items={demographicSections} multiselectable={true}/>
    </div>
  );
};

export default Demographics;
