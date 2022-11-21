import React, {useState} from 'react';

// @ts-ignore
import expandIcon from '/node_modules/uswds/dist/img/usa-icons/expand_more.svg';
// @ts-ignore
import collapseIcon from '/node_modules/uswds/dist/img/usa-icons/expand_less.svg';

import * as styles from './TractDemographics.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';

export interface ITractDemographicsProps {
  properties: constants.J40Properties
}

interface IDemographicsData {
  race: [React.ReactElement, number][],
  age: [React.ReactElement, number][],
}

interface IJ40AccordionItem {
  id: string,
  title: React.ReactElement,
  children: React.ReactElement
}


/**
 * This function will create the custom Accordion item. This will be used
 * for the race and age demographic UI elements
 *
 * @param {IJ40AccordionItem} props
 * @return {JSX.Element}
 */
const J40AccordionItem = ({id, title, children}:IJ40AccordionItem) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <h6 className={styles.demographicHeading}>
        {title}
        <span>
          {'('}
          <a
            className={styles.showHideText ? `usa-link ${styles.showHideText}` : `usa-link`}
            id={`${id}-header`}
            aria-controls={`${id}-panel`}
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            tabIndex={0}
          >
            {isExpanded ? 'hide' : 'show'}
          </a>
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


/**
 * This function will create each line item on the list of demographics
 *
 * @param {[]} demographicData
 * @return {JSX.Element}
 */
const demographicItemGen = (demographicData: []) => {
  return demographicData.map((el, index) => {
    return (
      <div key={index} className={styles.demographicItem}>
        <span>{ el[0] }</span>
        {typeof el[1] === 'number' ?
        <span>{`${el[1]}%`}</span> :
        <span>{`${el[1]}`}</span> }
      </div>
    );
  });
};


/**
 * This function will return the numeric value of each demographic. Taking into
 * account cases when the data is undefined or is null
 *
 * @param {number} stat
 * @return {number}
 */
const displayStat = (stat: number) => {
  if (stat === undefined || stat === null) {
    return '--';
  } else if (stat === 0) {
    return 0;
  }

  return Number(Math.floor(stat * 100));
};


/**
 * This function will create the data structure for the demographics data
 *
 * @param {constants.J40Properties} properties
 * @return {IDemographicsData}
 */
const getDemographicsData = (properties:constants.J40Properties):IDemographicsData => (
  {
    race: [
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_NON_HISPANIC_WHITE,
        displayStat(properties[constants.DEMO_NON_HISPANIC_WHITE]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_BLACK,
        displayStat(properties[constants.DEMO_BLACK]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_AMERICAN_INDIAN,
        displayStat(properties[constants.DEMO_AMERICAN_INDIAN]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_ASIAN,
        displayStat(properties[constants.DEMO_ASIAN]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_HAWAIIAN,
        displayStat(properties[constants.DEMO_HAWAIIAN]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_OTHER_RACE,
        displayStat(properties[constants.DEMO_OTHER_RACE]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_TWO_OR_MORE_RACES,
        displayStat(properties[constants.DEMO_TWO_OR_MORE_RACES]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_HISPANIC,
        displayStat(properties[constants.DEMO_HISPANIC]),
      ],
    ],
    age: [
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_AGE_UNDER_10,
        displayStat(properties[constants.DEMO_AGE_UNDER_10]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_AGE_MID,
        displayStat(properties[constants.DEMO_AGE_MID]),
      ],
      [
        EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.DEMO_AGE_OVER_65,
        displayStat(properties[constants.DEMO_AGE_OVER_64]),
      ],
    ],
  });


/**
 * This is the main component for this file. It accepts the selected feature
 * as a prop and return the demographics component.
 *
 * @param {ITractDemographicsProps} props
 * @return {JSX.Element}
 */
const TractDemographics = ({properties}: ITractDemographicsProps) => {
  const {race, age} = getDemographicsData(properties);

  return (
    <div className={styles.demographicsContainer}>
      <div className={styles.demographicsTitle}>
        {EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.TITLE}
      </div>
      <>
        <J40AccordionItem id={'race'} title={EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.RACE_TITLE}>
          {demographicItemGen(race)}
        </J40AccordionItem>
        <J40AccordionItem id={'age'} title={EXPLORE_COPY.SIDE_PANEL_DEMOGRAPHICS.AGE_TITLE}>
          {demographicItemGen(age)}
        </J40AccordionItem>
      </>
    </div>
  );
};

export default TractDemographics;
