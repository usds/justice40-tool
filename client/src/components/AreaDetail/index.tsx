/* eslint-disable quotes */
// External Libs:
import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

// Components:
// import {Accordion} from '@trussworks/react-uswds';

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';

export const readablePercentile = (percentile: number) => {
  return Math.round(percentile * 100);
};

// Todo: Add internationalization to superscript ticket #582
const getSuperscriptOrdinal = (percentile: number) => {
  const englishOrdinalRules = new Intl.PluralRules('en', {
    type: 'ordinal',
  });
  const suffixes = {
    zero: 'th',
    one: 'st',
    two: 'nd',
    few: 'rd',
    many: 'th',
    other: 'th',
  };
  return suffixes[englishOrdinalRules.select(percentile)];
};

// Todo VS: remove threshold data
export const getCategorization = (percentile: number) => {
  let categorization;
  let categoryCircleStyle;

  if (percentile >= constants.SCORE_BOUNDARY_PRIORITIZED ) {
    categorization = 'Community of focus';
    categoryCircleStyle = styles.prioritized;
  } else if (constants.SCORE_BOUNDARY_THRESHOLD <= percentile && percentile < constants.SCORE_BOUNDARY_PRIORITIZED) {
    categorization = 'Not a community of focus';
    categoryCircleStyle = styles.threshold;
  } else {
    categorization = 'Not a community of focus';
    categoryCircleStyle = styles.nonPrioritized;
  }
  return [categorization, categoryCircleStyle];
};

interface IAreaDetailProps {
  properties: constants.J40Properties,
}

const AreaDetail = ({properties}:IAreaDetailProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    percentile: {
      id: 'areaDetail.priorityInfo.percentile',
      defaultMessage: 'percentile',
      description: 'the percentil of the feature selected',
    },
    categorization: {
      id: 'areaDetail.priorityInfo.categorization',
      defaultMessage: 'Categorization',
      description: 'the categorization of prioritized, threshold or non-prioritized',
    },
    censusBlockGroup: {
      id: 'areaDetail.geographicInfo.censusBlockGroup',
      defaultMessage: 'Census block group:',
      description: 'the census block group id number of the feature selected',
    },
    county: {
      id: 'areaDetail.geographicInfo.county',
      defaultMessage: 'County:',
      description: 'the county of the feature selected',
    },
    state: {
      id: 'areaDetail.geographicInfo.state',
      defaultMessage: 'State: ',
      description: 'the state of the feature selected',
    },
    population: {
      id: 'areaDetail.geographicInfo.population',
      defaultMessage: 'Population:',
      description: 'the population of the feature selected',
    },
    indicatorColumnHeader: {
      id: 'areaDetail.indicators.indicatorColumnHeader',
      defaultMessage: 'Indicator',
      description: 'the population of the feature selected',
    },
    percentileColumnHeader: {
      id: 'areaDetail.indicators.percentileColumnHeader',
      defaultMessage: 'Percentile (0-100)',
      description: 'the population of the feature selected',
    },
    poverty: {
      id: 'areaDetail.indicator.poverty',
      defaultMessage: 'Poverty',
      description: 'Household income is less than or equal to twice the federal "poverty level"',
    },
    areaMedianIncome: {
      id: 'areaDetail.indicator.areaMedianIncome',
      defaultMessage: 'Area Median Income',
      description: 'calculated as percent of the area median income',
    },
    education: {
      id: 'areaDetail.indicator.education',
      defaultMessage: 'Education, less than high school',
      description: 'Percent of people age 25 or older that didn’t get a high school diploma',
    },
    linguisticIsolation: {
      id: 'areaDetail.indicator.linguisticIsolation',
      defaultMessage: 'Linguistic isolation',
      description: 'Households in which all members speak a non-English language and ' +
      'speak English less than "very well"',
    },
    unemployment: {
      id: 'areaDetail.indicator.unemployment',
      defaultMessage: 'Unemployment rate',
      description: 'Number of unemployed people as a percentage of the labor force',
    },
    asthma: {
      id: 'areaDetail.indicator.asthma',
      defaultMessage: 'Asthma',
      description: 'have asthma or been diagnosed by a doctor to have asthma',
    },
    diabetes: {
      id: 'areaDetail.indicator.diabetes',
      defaultMessage: 'Diabetes',
      description: 'diabetes from dr or nurse',
    },
    dieselPartMatter: {
      id: 'areaDetail.indicator.dieselPartMatter',
      defaultMessage: 'Diesel particulate matter',
      description: 'Diesel particulate matter level in air',
    },
    energyBurden: {
      id: 'areaDetail.indicator.energyBurden',
      defaultMessage: 'Energy burden',
      description: 'Average annual energy cost ($) divided by household income',
    },
    femaRisk: {
      id: 'areaDetail.indicator.femaRisk',
      defaultMessage: 'FEMA Risk index',
      description: 'Risk based on 18 natural hazard types, in addition to a'+
      "community's social vulnerability and community resilience",
    },
    heartDisease: {
      id: 'areaDetail.indicator.heartDisease',
      defaultMessage: 'Heart Disease',
      description: 'People ages 18 and up who report ever having been told by a' +
      'doctor, nurse, or other health professionals that they had angina or coronary heart disease',
    },
    houseBurden: {
      id: 'areaDetail.indicator.houseBurden',
      defaultMessage: 'Housing cost burden',
      description: 'People ages 18 and up who report having been told by a doctor,' +
      ' nurse, or other health professionals that they have diabetes other than diabetes during pregnancy',
    },
    leadPaint: {
      id: 'areaDetail.indicator.leadPaint',
      defaultMessage: 'Lead paint',
      description: 'Housing units built pre-1960, used as an indicator of potential'+
      ' lead paint exposure in homes',
    },
    lifeExpect: {
      id: 'areaDetail.indicator.lifeExpect',
      defaultMessage: 'Life expectancy',
      description: 'Estimated years of life expectancy',
    },
    pm25: {
      id: 'areaDetail.indicator.pm25',
      defaultMessage: 'PM2.5',
      description: 'Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller',
    },
    trafficVolume: {
      id: 'areaDetail.indicator.trafficVolume',
      defaultMessage: 'Traffic proximity and volume',
      description: 'Count of vehicles (average annual daily traffic) at major roads within 500 meters,' +
      ' divided by distance in meters',
    },
    wasteWater: {
      id: 'areaDetail.indicator.wasteWater',
      defaultMessage: 'Wastewater discharge',
      description: 'Toxic concentrations at stream segments within 500 meters divided by distance in' +
      ' kilometers',
    },
  });

  const score = properties[constants.SCORE_PROPERTY_HIGH] as number;
  const blockGroup = properties[constants.GEOID_PROPERTY];
  const population = properties[constants.TOTAL_POPULATION];
  const countyName = properties[constants.COUNTY_NAME];
  const stateName = properties[constants.STATE_NAME];

  interface indicatorInfo {
    label: string,
    description: string,
    value: number,
  }

  // Todo: Ticket #367 will be replacing descriptions with YAML file
  const areaMedianIncome:indicatorInfo = {
    label: intl.formatMessage(messages.areaMedianIncome),
    description: 'Median income of the census block group calculated as a percent of the metropolitan'+
    " area’s or state's median income",
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE],
  };
  const eduInfo:indicatorInfo = {
    label: intl.formatMessage(messages.education),
    description: 'Percent of people age 25 or older that didn’t get a high school diploma',
    value: properties[constants.EDUCATION_PROPERTY_PERCENTILE],
  };
  const poverty:indicatorInfo = {
    label: intl.formatMessage(messages.poverty),
    description: 'Household income is less than or equal to the federal "poverty level"',
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE],
  };
  // const linIsoInfo:indicatorInfo = {
  //   label: intl.formatMessage(messages.linguisticIsolation),
  // eslint-disable-next-line max-len
  //   description: 'Households in which all members speak a non-English language and speak English less than "very well"',
  //   value: properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE],
  // };
  // const umemployInfo:indicatorInfo = {
  //   label: intl.formatMessage(messages.unemployment),
  //   description: 'Number of unemployed people as a percentage of the labor force',
  //   value: properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE],
  // };
  const asthma:indicatorInfo = {
    label: intl.formatMessage(messages.asthma),
    description: 'People who answer “yes” to both of the questions: “Have you ever been told by' +
    ' a doctor nurse, or other health professional that you have asthma?” and “Do you still have asthma?"',
    value: properties[constants.ASTHMA_PERCENTILE],
  };
  const diabetes:indicatorInfo = {
    label: intl.formatMessage(messages.diabetes),
    description: 'People ages 18 and up who report having been told by a doctor, nurse, or other' +
    ' health professionals that they have diabetes other than diabetes during pregnancy',
    value: properties[constants.DIABETES_PERCENTILE],
  };
  const dieselPartMatter:indicatorInfo = {
    label: intl.formatMessage(messages.dieselPartMatter),
    description: 'Mixture of particles that is part of diesel exhaust in the air',
    value: properties[constants.DIESEL_MATTER_PERCENTILE],
  };
  const lifeExpect:indicatorInfo = {
    label: intl.formatMessage(messages.lifeExpect),
    description: 'Estimated years of life expectancy',
    value: properties[constants.LIFE_PERCENTILE],
  };
  const energyBurden:indicatorInfo = {
    label: intl.formatMessage(messages.energyBurden),
    description: 'Average annual energy cost ($) divided by household income',
    value: properties[constants.ENERGY_PERCENTILE],
  };
  const pm25:indicatorInfo = {
    label: intl.formatMessage(messages.pm25),
    description: 'Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller',
    value: properties[constants.PM25_PERCENTILE],
  };
  const leadPaint:indicatorInfo = {
    label: intl.formatMessage(messages.leadPaint),
    description: 'Housing units built pre-1960, used as an indicator of potential'+
    ' lead paint exposure in homes',
    value: properties[constants.LEAD_PAINT_PERCENTILE],
  };
  const trafficVolume:indicatorInfo = {
    label: intl.formatMessage(messages.trafficVolume),
    description: 'Count of vehicles (average annual daily traffic) at major roads within 500 meters,' +
    ' divided by distance in meters',
    value: properties[constants.TRAFFIC_PERCENTILE],
  };
  const wasteWater:indicatorInfo = {
    label: intl.formatMessage(messages.wasteWater),
    description: 'Toxic concentrations at stream segments within 500 meters divided by distance in' +
    ' kilometers',
    value: properties[constants.WASTEWATER_PERCENTILE],
  };
  const femaRisk:indicatorInfo = {
    label: intl.formatMessage(messages.femaRisk),
    description: 'Expected Annual Loss Score, which is the average economic loss in dollars' +
    ' resulting from natural hazards each year.',
    value: properties[constants.FEMA_PERCENTILE],
  };
  const heartDisease:indicatorInfo = {
    label: intl.formatMessage(messages.heartDisease),
    description: 'People ages 18 and up who report ever having been told by a' +
    ' doctor, nurse, or other health professionals that they had angina or coronary heart disease',
    value: properties[constants.HEART_PERCENTILE],
  };
  const houseBurden:indicatorInfo = {
    label: intl.formatMessage(messages.houseBurden),
    description: 'People ages 18 and up who report having been told by a doctor,' +
    ' nurse, or other health professionals that they have diabetes other than diabetes during pregnancy',
    value: properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE],
  };


  const indicators = [areaMedianIncome, eduInfo, poverty];
  const additionalIndicators = [
    asthma, diabetes, dieselPartMatter, energyBurden, femaRisk, heartDisease,
    houseBurden, leadPaint, lifeExpect, pm25, trafficVolume, wasteWater,
  ];

  const [categorization, categoryCircleStyle] = getCategorization(score);

  return (
    <aside className={styles.areaDetailContainer} data-cy={'aside'}>
      <ul className={styles.censusRow}>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.censusBlockGroup)} </span>
          <span className={styles.censusText}>{blockGroup}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.county)} </span>
          <span className={styles.censusText}>{countyName}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.state)}</span>
          <span className={styles.censusText}>{stateName}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>{intl.formatMessage(messages.population)} </span>
          <span className={styles.censusText}>{population.toLocaleString()}</span>
        </li>
      </ul>
      <div className={styles.categorization}>
        <div className={styles.priority}>
          <div className={categoryCircleStyle} />
          <h3>{categorization}</h3>
        </div>
      </div>
      <div className={styles.divider}>
        <h6>{intl.formatMessage(messages.indicatorColumnHeader)}</h6>
        <h6>{intl.formatMessage(messages.percentileColumnHeader)}</h6>
      </div>

      <>
        {
          indicators.map((indicator:any, index:number) => {
            return <li key={`ind${index}`} className={styles.indicatorBoxMain} data-cy={'indicatorBox'}>
              <div className={styles.indicatorRow}>
                <h4 className={styles.indicatorName}>{indicator.label}</h4>
                <div className={styles.indicatorValue}>
                  {readablePercentile(indicator.value)}
                  <sup className={styles.indicatorSuperscript}><span>
                    {getSuperscriptOrdinal(readablePercentile(indicator.value))}
                  </span></sup>
                </div>
              </div>
              <p className={'secondary j40-indicator'}>
                {indicator.description}
              </p>
            </li>;
          })
        }
      </>

      <>
        {
          additionalIndicators.map((indicator:any, index:number) => {
            return <li
              key={`ind${index}`}
              className={styles.indicatorBoxAdditional}
              data-cy={'indicatorBox'}>
              <div className={styles.indicatorRow}>
                <h4 className={styles.indicatorName}>{indicator.label}</h4>
                <div className={styles.indicatorValue}>
                  {readablePercentile(indicator.value)}
                  <sup className={styles.indicatorSuperscript}><span>
                    {getSuperscriptOrdinal(readablePercentile(indicator.value))}
                  </span></sup>
                </div>
              </div>
              <p className={'secondary j40-indicator'}>
                {indicator.description}
              </p>
            </li>;
          })
        }
      </>

      {/* Temporarily remove Accordions and may place back in later, removed unused
      className prop as as styles are based on the id of the Accordion Item */}
      {/* <Accordion
        multiselectable={true}
        items={
          [
            {
              id: 'prioritization-indicators',
              title: 'Indicators',
              content: (
                <>
                  {
                    indicators.map((indicator:any, index:number) => {
                      return <li key={`ind${index}`} className={styles.indicatorBoxMain} data-cy={'indicatorBox'}>
                        <div className={styles.indicatorRow}>
                          <h4 className={styles.indicatorName}>{indicator.label}</h4>
                          <div className={styles.indicatorValue}>
                            {readablePercentile(indicator.value)}
                            <sup className={styles.indicatorSuperscript}><span>
                              {getSuperscriptOrdinal(readablePercentile(indicator.value))}
                            </span></sup>
                          </div>
                        </div>
                        <p className={'secondary j40-indicator'}>
                          {indicator.description}
                        </p>
                      </li>;
                    })
                  }
                </>
              ),
              expanded: true,
            },
            {
              id: 'additional-indicators',
              title: 'Additional indicators (not used in prioritization)',
              content: (
                (
                  <>
                    {
                      additionalIndicators.map((indicator:any, index:number) => {
                        return <li
                          key={`ind${index}`}
                          className={styles.indicatorBoxAdditional}
                          data-cy={'indicatorBox'}>
                          <div className={styles.indicatorRow}>
                            <h4 className={styles.indicatorName}>{indicator.label}</h4>
                            <div className={styles.indicatorValue}>
                              {readablePercentile(indicator.value)}
                              <sup className={styles.indicatorSuperscript}><span>
                                {getSuperscriptOrdinal(readablePercentile(indicator.value))}
                              </span></sup>
                            </div>
                          </div>
                          <p className={'secondary j40-indicator'}>
                            {indicator.description}
                          </p>
                        </li>;
                      })
                    }
                  </>
                )
              ),
              expanded: true,
            },
          ]
        }/> */}

    </aside>
  );
};

export default AreaDetail;
