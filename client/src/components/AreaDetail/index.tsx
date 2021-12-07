/* eslint-disable quotes */
// External Libs:
import React, {useEffect} from 'react';
import {useIntl} from 'gatsby-plugin-intl';

// Components:
// import {Accordion} from '@trussworks/react-uswds';

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

export const readablePercentile = (percentile: number | null) => {
  return percentile ? Math.round(percentile * 100) : 'N/A';
};

// Todo: Add internationalization to superscript ticket #582
const getSuperscriptOrdinal = (percentile: number | string) => {
  if (typeof percentile === "number") {
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
  }
};

interface IAreaDetailProps {
  properties: constants.J40Properties,
}

const AreaDetail = ({properties}:IAreaDetailProps) => {
  const intl = useIntl();
  const [isCommunityFocus, setIsCommunityFocus] = React.useState<boolean>(true);

  console.log("Area Detail properies: ", properties);

  const score = properties[constants.SCORE_PROPERTY_HIGH] ? properties[constants.SCORE_PROPERTY_HIGH] as number : 0;
  const blockGroup = properties[constants.GEOID_PROPERTY] ? properties[constants.GEOID_PROPERTY] : "N/A";
  const population = properties[constants.TOTAL_POPULATION] ? properties[constants.TOTAL_POPULATION] : "N/A";
  const countyName = properties[constants.COUNTY_NAME] ? properties[constants.COUNTY_NAME] : "N/A";
  const stateName = properties[constants.STATE_NAME] ? properties[constants.STATE_NAME] : "N/A";

  useEffect(() => {
    if (score >= constants.SCORE_BOUNDARY_PRIORITIZED ) {
      setIsCommunityFocus(true);
    } else {
      setIsCommunityFocus(false);
    }
  }, [score]);


  interface indicatorInfo {
    label: string,
    description: string,
    value: number,
  }

  // Todo: Ticket #367 will be replacing descriptions with YAML file
  const areaMedianIncome:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.AREA_MEDIAN_INCOME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.AREA_MEDIAN_INCOME),
    value: properties[constants.AREA_MEDIAN_INCOME_PERCENTILE] ?
    properties[constants.AREA_MEDIAN_INCOME_PERCENTILE] : null,
  };
  const eduInfo:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EDUCATION),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EDUCATION),
    value: properties[constants.EDUCATION_PROPERTY_PERCENTILE] ?
    properties[constants.EDUCATION_PROPERTY_PERCENTILE] : null,
  };
  const poverty:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.POVERTY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.POVERTY),
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE] ?
    properties[constants.POVERTY_PROPERTY_PERCENTILE] : null,
  };
  const asthma:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ASTHMA),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ASTHMA),
    value: properties[constants.ASTHMA_PERCENTILE] ?
    properties[constants.ASTHMA_PERCENTILE] : null,
  };
  const diabetes:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIABETES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIABETES),
    value: properties[constants.DIABETES_PERCENTILE] ?
    properties[constants.DIABETES_PERCENTILE] : null,
  };
  const dieselPartMatter:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIESEL_PARTICULATE_MATTER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIESEL_PARTICULATE_MATTER),
    value: properties[constants.DIESEL_MATTER_PERCENTILE] ?
    properties[constants.DIESEL_MATTER_PERCENTILE] : null,
  };
  const lifeExpect:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LIFE_EXPECT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LIFE_EXPECT),
    value: properties[constants.LIFE_PERCENTILE] ?
    properties[constants.LIFE_PERCENTILE] : null,
  };
  const energyBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ENERGY_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ENERGY_BURDEN),
    value: properties[constants.ENERGY_PERCENTILE] ?
    properties[constants.ENERGY_PERCENTILE] : null,
  };
  const pm25:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PM_2_5),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PM_2_5),
    value: properties[constants.PM25_PERCENTILE] ?
    properties[constants.PM25_PERCENTILE] : null,
  };
  const leadPaint:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LEAD_PAINT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LEAD_PAINT),
    value: properties[constants.LEAD_PAINT_PERCENTILE] ?
    properties[constants.LEAD_PAINT_PERCENTILE] : null,
  };
  const trafficVolume:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.TRAFFIC_VOLUME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.TRAFFIC_VOLUME),
    value: properties[constants.TRAFFIC_PERCENTILE] ?
    properties[constants.TRAFFIC_PERCENTILE] : null,
  };
  const wasteWater:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.WASTE_WATER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.WASTE_WATER),
    value: properties[constants.WASTEWATER_PERCENTILE] ?
    properties[constants.WASTEWATER_PERCENTILE] : null,
  };
  const femaRisk:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.FEMA_RISK),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.FEMA_RISK),
    value: properties[constants.FEMA_PERCENTILE] ?
    properties[constants.FEMA_PERCENTILE] : null,
  };
  const heartDisease:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HEART_DISEASE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HEART_DISEASE),
    value: properties[constants.HEART_PERCENTILE] ?
    properties[constants.HEART_PERCENTILE] : null,
  };
  const houseBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HOUSE_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HOUSE_BURDEN),
    value: properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] ?
    properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] : null,
  };


  const indicators = [areaMedianIncome, eduInfo, poverty];
  const additionalIndicators = [
    asthma, diabetes, dieselPartMatter, energyBurden, femaRisk, heartDisease,
    houseBurden, leadPaint, lifeExpect, pm25, trafficVolume, wasteWater,
  ];

  return (
    <aside className={styles.areaDetailContainer} data-cy={'aside'}>
      <ul className={styles.censusRow}>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.CENSUS_BLOCK_GROUP)}
          </span>
          <span className={styles.censusText}>{` ${blockGroup}`}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.COUNTY)}
          </span>
          <span className={styles.censusText}>{` ${countyName}`}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.STATE)}
          </span>
          <span className={styles.censusText}>{` ${stateName}`}</span>
        </li>
        <li>
          <span className={styles.censusLabel}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.POPULATION)}
          </span>
          <span className={styles.censusText}>{` ${population.toLocaleString()}`}</span>
        </li>
      </ul>
      <div className={styles.categorization}>
        <div className={styles.communityOfFocus}>
          {isCommunityFocus ?
            <>
              <div className={styles.communityOfFocusCircle} />
              <h3>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>
            </> :
          <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>
          }
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
