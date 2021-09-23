/* eslint-disable quotes */
// External Libs:
import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

// Components:
// import {Accordion} from '@trussworks/react-uswds';

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

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
    categorization = EXPLORE_COPY.COMMUNITY.OF_FOCUS;
    categoryCircleStyle = styles.prioritized;
  } else if (constants.SCORE_BOUNDARY_THRESHOLD <= percentile && percentile < constants.SCORE_BOUNDARY_PRIORITIZED) {
    categorization = EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS;
    categoryCircleStyle = styles.threshold;
  } else {
    categorization = EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS;
    categoryCircleStyle = styles.nonPrioritized;
  }
  return [categorization, categoryCircleStyle];
};

interface IAreaDetailProps {
  properties: constants.J40Properties,
}

const AreaDetail = ({properties}:IAreaDetailProps) => {
  const intl = useIntl();

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
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.AREA_MEDIAN_INCOME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.AREA_MEDIAN_INCOME),
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE],
  };
  const eduInfo:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EDUCATION),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EDUCATION),
    value: properties[constants.EDUCATION_PROPERTY_PERCENTILE],
  };
  const poverty:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.POVERTY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.POVERTY),
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE],
  };
  const asthma:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ASTHMA),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ASTHMA),
    value: properties[constants.ASTHMA_PERCENTILE],
  };
  const diabetes:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIABETES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIABETES),
    value: properties[constants.DIABETES_PERCENTILE],
  };
  const dieselPartMatter:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIESEL_PARTICULATE_MATTER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIESEL_PARTICULATE_MATTER),
    value: properties[constants.DIESEL_MATTER_PERCENTILE],
  };
  const lifeExpect:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LIFE_EXPECT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LIFE_EXPECT),
    value: properties[constants.LIFE_PERCENTILE],
  };
  const energyBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ENERGY_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ENERGY_BURDEN),
    value: properties[constants.ENERGY_PERCENTILE],
  };
  const pm25:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PM_2_5),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PM_2_5),
    value: properties[constants.PM25_PERCENTILE],
  };
  const leadPaint:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LEAD_PAINT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LEAD_PAINT),
    value: properties[constants.LEAD_PAINT_PERCENTILE],
  };
  const trafficVolume:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.TRAFFIC_VOLUME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.TRAFFIC_VOLUME),
    value: properties[constants.TRAFFIC_PERCENTILE],
  };
  const wasteWater:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.WASTE_WATER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.WASTE_WATER),
    value: properties[constants.WASTEWATER_PERCENTILE],
  };
  const femaRisk:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.FEMA_RISK),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.FEMA_RISK),
    value: properties[constants.FEMA_PERCENTILE],
  };
  const heartDisease:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HEART_DISEASE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HEART_DISEASE),
    value: properties[constants.HEART_PERCENTILE],
  };
  const houseBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HOUSE_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HOUSE_BURDEN),
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
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.CENSUS_BLOCK_GROUP)}
          </span>
          <span className={styles.censusText}>{blockGroup}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.COUNTY)}
          </span>
          <span className={styles.censusText}>{countyName}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.STATE)}
          </span>
          <span className={styles.censusText}>{stateName}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.POPULATION)}
          </span>
          <span className={styles.censusText}>{population.toLocaleString()}</span>
        </li>
      </ul>
      <div className={styles.categorization}>
        <div className={styles.priority}>
          <div className={categoryCircleStyle} />
          <h3>{categorization}</h3>
        </div>
        <p className={"secondary"}>version {METHODOLOGY_COPY.VERSION_NUMBER}</p>
      </div>
      <div className={styles.divider}>
        <h6>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.INDICATOR_COLUMN_HEADER)}
        </h6>
        <h6>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PERCENTILE_COLUMN_HEADER)}
        </h6>
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
