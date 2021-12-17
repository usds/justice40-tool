/* eslint-disable quotes */
// External Libs:
import React from 'react';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';
import {Accordion} from '@trussworks/react-uswds';

// Components:
import Category from '../Category';
import DisadvantageDot from '../DisadvantageDot';
import Indicator from '../Indicator';

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IAreaDetailProps {
  properties: constants.J40Properties,
}

export interface indicatorInfo {
  label: string,
  description: string,
  value: number,
  isDisadvagtaged: boolean,
}

const AreaDetail = ({properties}:IAreaDetailProps) => {
  const intl = useIntl();

  console.log("Area Detail properies: ", properties);

  const score = properties[constants.SCORE_PROPERTY_HIGH] ? properties[constants.SCORE_PROPERTY_HIGH] as number : 0;
  const blockGroup = properties[constants.GEOID_PROPERTY] ? properties[constants.GEOID_PROPERTY] : "N/A";
  const population = properties[constants.TOTAL_POPULATION] ? properties[constants.TOTAL_POPULATION] : "N/A";
  const countyName = properties[constants.COUNTY_NAME] ? properties[constants.COUNTY_NAME] : "N/A";
  const stateName = properties[constants.STATE_NAME] ? properties[constants.STATE_NAME] : "N/A";

  const isCommunityFocus = score >= constants.SCORE_BOUNDARY_PRIORITIZED;

  // const sidePanelFeedbackHref = `
  //   mailto:screeningtool.feedback@usds.gov?subject=Feedback on Census Tract: ${blockGroup}
  // `;

  // Define each indicator in the side panel with constants from copy file (for intl)
  // Indicators are grouped by category
  const expAgLoss:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_AG_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_AG_LOSS),
    value: properties[constants.EXP_AGRICULTURE_LOSS_PERCENTILE] ?
    properties[constants.EXP_AGRICULTURE_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_EXP_AGR_LOSS_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_EXP_AGR_LOSS_AND_IS_LOW_INCOME] : null,
  };
  const expBldLoss:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_BLD_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_BLD_LOSS),
    value: properties[constants.EXP_BUILDING_LOSS_PERCENTILE] ?
    properties[constants.EXP_BUILDING_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_EXP_BLD_LOSS_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_EXP_BLD_LOSS_AND_IS_LOW_INCOME] : null,
  };
  const expPopLoss:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_POP_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_POP_LOSS),
    value: properties[constants.EXP_POPULATION_LOSS_PERCENTILE] ?
    properties[constants.EXP_POPULATION_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_EXP_POP_LOSS_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_EXP_POP_LOSS_AND_IS_LOW_INCOME] : null,
  };
  const lowInc:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LOW_INCOME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_INCOME),
    value: properties[constants.POVERTY_BELOW_200_PERCENTILE] ?
    properties[constants.POVERTY_BELOW_200_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_FEDERAL_POVERTY_LEVEL_200] ?
    properties[constants.IS_FEDERAL_POVERTY_LEVEL_200] : null,
  };

  const energyBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ENERGY_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ENERGY_BURDEN),
    value: properties[constants.ENERGY_PERCENTILE] ?
    properties[constants.ENERGY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_ENERGY_BURDEN_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_ENERGY_BURDEN_AND_IS_LOW_INCOME] : null,
  };
  const pm25:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PM_2_5),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PM_2_5),
    value: properties[constants.PM25_PERCENTILE] ?
    properties[constants.PM25_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_PM25_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_PM25_AND_IS_LOW_INCOME] : null,
  };

  const dieselPartMatter:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIESEL_PARTICULATE_MATTER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIESEL_PARTICULATE_MATTER),
    value: properties[constants.DIESEL_MATTER_PERCENTILE] ?
    properties[constants.DIESEL_MATTER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_DIESEL_PM_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_DIESEL_PM_AND_IS_LOW_INCOME] : null,
  };
  const trafficVolume:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.TRAFFIC_VOLUME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.TRAFFIC_VOLUME),
    value: properties[constants.TRAFFIC_PERCENTILE] ?
    properties[constants.TRAFFIC_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_TRAFFIC_PROX_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_TRAFFIC_PROX_AND_IS_LOW_INCOME] : null,
  };

  const houseBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HOUSE_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HOUSE_BURDEN),
    value: properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] ?
    properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_HOUSE_BURDEN_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_HOUSE_BURDEN_AND_IS_LOW_INCOME] : null,
  };
  const leadPaint:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LEAD_PAINT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LEAD_PAINT),
    value: properties[constants.LEAD_PAINT_PERCENTILE] ?
    properties[constants.LEAD_PAINT_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_LEAD_PAINT_AND_MEDIAN_HOME_VAL_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_LEAD_PAINT_AND_MEDIAN_HOME_VAL_AND_IS_LOW_INCOME] : null,
  };
  // const medHomeVal:indicatorInfo = {
  //   label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.MED_HOME_VAL),
  //   description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.MED_HOME_VAL),
  //   value: properties[constants.MEDIAN_HOME_VALUE_PERCENTILE] ?
  //   properties[constants.MEDIAN_HOME_VALUE_PERCENTILE] : null,
  //   isDisadvagtaged: false, // TODO
  // };

  const proxHaz:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_HAZ),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_HAZ),
    value: properties[constants.PROXIMITY_TSDF_SITES_PERCENTILE] ?
    properties[constants.PROXIMITY_TSDF_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_HAZARD_WASTE_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_HAZARD_WASTE_AND_IS_LOW_INCOME] : null,
  };
  const proxNPL:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_NPL),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_NPL),
    value: properties[constants.PROXIMITY_NPL_SITES_PERCENTILE] ?
    properties[constants.PROXIMITY_NPL_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_SUPERFUND_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_SUPERFUND_AND_IS_LOW_INCOME] : null,
  };
  const proxRMP:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_RMP),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_RMP),
    value: properties[constants.PROXIMITY_RMP_SITES_PERCENTILE] ?
    properties[constants.PROXIMITY_RMP_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_RMP_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_RMP_AND_IS_LOW_INCOME] : null,
  };

  const wasteWater:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.WASTE_WATER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.WASTE_WATER),
    value: properties[constants.WASTEWATER_PERCENTILE] ?
    properties[constants.WASTEWATER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_WASTEWATER_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_WASTEWATER_AND_IS_LOW_INCOME] : null,
  };

  const asthma:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ASTHMA),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ASTHMA),
    value: properties[constants.ASTHMA_PERCENTILE] ?
    properties[constants.ASTHMA_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_ASTHMA_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_ASTHMA_AND_IS_LOW_INCOME] : null,
  };
  const diabetes:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIABETES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIABETES),
    value: properties[constants.DIABETES_PERCENTILE] ?
    properties[constants.DIABETES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_DIABETES_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_DIABETES_AND_IS_LOW_INCOME] : null,
  };
  const heartDisease:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HEART_DISEASE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HEART_DISEASE),
    value: properties[constants.HEART_PERCENTILE] ?
    properties[constants.HEART_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_HEART_DISEASE_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_HEART_DISEASE_AND_IS_LOW_INCOME] : null,
  };
  const lifeExpect:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LIFE_EXPECT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_LIFE_EXPECT),
    value: properties[constants.LIFE_PERCENTILE] ?
    properties[constants.LIFE_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_LOW_LIFE_EXP_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_LOW_LIFE_EXP_AND_IS_LOW_INCOME] : null,
  };

  const lowMedInc:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LOW_MED_INC),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_MED_INCOME),
    value: properties[constants.LOW_MEDIAN_INCOME_PERCENTILE] ?
    properties[constants.LOW_MEDIAN_INCOME_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_LOW_MEDIAN_INCOME_AND_LOW_HIGH_SCHOOL_EDU] ?
    properties[constants.IS_GTE_90_LOW_MEDIAN_INCOME_AND_LOW_HIGH_SCHOOL_EDU] : null,
  };
  const lingIso:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LING_ISO),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LING_ISO),
    value: properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE] ?
    properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_LINGUISITIC_ISO_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_LINGUISITIC_ISO_AND_IS_LOW_INCOME] : null,
  };
  const unemploy:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.UNEMPLOY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.UNEMPLOY),
    value: properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE] ?
    properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU] ?
    properties[constants.IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU] : null,
  };
  const poverty:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.POVERTY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.POVERTY),
    value: properties[constants.POVERTY_PROPERTY_PERCENTILE] ?
    properties[constants.POVERTY_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_BELOW_100_POVERTY_AND_LOW_HIGH_SCHOOL_EDU] ?
    properties[constants.IS_GTE_90_BELOW_100_POVERTY_AND_LOW_HIGH_SCHOOL_EDU] : null,
  };
  const highSchool:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIGH_SCL),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HIGH_SKL),
    value: properties[constants.HIGH_SCHOOL_PROPERTY_PERCENTILE] ?
    properties[constants.HIGH_SCHOOL_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU] ?
    properties[constants.IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU] : null,
  };

  // Aggregate indicators based on categories
  const categories = [
    {
      id: 'climate-change',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLIMATE),
      indicators: [expAgLoss, expBldLoss, expPopLoss, lowInc],
      isDisadvagtaged: properties[constants.IS_CLIMATE_FACTOR_DISADVANTAGED_L] ?
      properties[constants.IS_CLIMATE_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'clean-energy',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_ENERGY),
      indicators: [energyBurden, pm25, lowInc],
      isDisadvagtaged: properties[constants.IS_ENERGY_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_ENERGY_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'clean-transport',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_TRANSPORT),
      indicators: [dieselPartMatter, trafficVolume, lowInc],
      isDisadvagtaged: properties[constants.IS_TRANSPORT_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_TRANSPORT_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'sustain-house',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.SUSTAIN_HOUSE),
      indicators: [houseBurden, leadPaint, lowInc],
      isDisadvagtaged: properties[constants.IS_HOUSING_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_HOUSING_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'leg-pollute',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.LEG_POLLUTE),
      indicators: [proxHaz, proxNPL, proxRMP, lowInc],
      isDisadvagtaged: properties[constants.IS_POLLUTION_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_POLLUTION_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'clean-water',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_WATER),
      indicators: [wasteWater, lowInc],
      isDisadvagtaged: properties[constants.IS_WATER_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_WATER_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'health-burdens',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.HEALTH_BURDEN),
      indicators: [asthma, diabetes, heartDisease, lifeExpect, lowInc],
      isDisadvagtaged: properties[constants.IS_HEALTH_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_HEALTH_FACTOR_DISADVANTAGED_L] : null,
    },
    {
      id: 'work-dev',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.WORK_DEV),
      indicators: [lowMedInc, lingIso, unemploy, poverty, highSchool],
      isDisadvagtaged: properties[constants.IS_WORKFORCE_FACTOR_DISADVANTAGED_L] ?
    properties[constants.IS_WORKFORCE_FACTOR_DISADVANTAGED_L] : null,
    },
  ];

  // Create the AccoridionItems by mapping over the categories array. In this array we define the
  // various indicators for a specific category. This is an array which then maps over the <Indicator />
  // component to render the actual Indicator
  const categoryItems = categories.map((category) => ({
    id: category.id,
    title: <Category name={category.titleText} isDisadvantaged={category.isDisadvagtaged}/>,
    content: (
      <>
        {category.indicators.map((indicator:any, index:number) => {
          return <Indicator key={`ind${index}`} indicator={indicator}/>;
        })}
      </>
    ),
    expanded: false,
  }));

  return (
    <aside className={styles.areaDetailContainer} data-cy={'aside'}>

      {/* Methodology version */}
      <div className={styles.versionInfo}>
        {EXPLORE_COPY.SIDE_PANEL_VERION.TITLE}
      </div>

      {/* Census Info */}
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

      {/* Disadvantaged? */}
      <div className={styles.categorization}>
        <div className={styles.isInFocus}>
          {EXPLORE_COPY.COMMUNITY.IS_FOCUS}
        </div>
        <div className={styles.communityOfFocus}>
          {isCommunityFocus ?
            <>
              <h3>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>
              <DisadvantageDot isDisadvantaged={isCommunityFocus}/>
            </> :
          <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>
          }
        </div>
        <div className={
            properties[constants.TOTAL_NUMBER_OF_DISADVANTAGE_INDICATORS] > 0 ?
            styles.showThresholdExceed : styles.hideThresholdExceed
        }>
          <FormattedMessage
            id={'explore.page.threshold.count.exceed'}
            description={"threshold exceeded count"}
            defaultMessage={'{disadvCount} of {totalCount} thresholds exceeded'}
            values={{
              disadvCount: properties[constants.TOTAL_NUMBER_OF_DISADVANTAGE_INDICATORS],
              totalCount: constants.TOTAL_NUMBER_OF_INDICATORS,
            }}/>
        </div>
        {/* eslint-disable-next-line max-len */}
        {/* <a className={styles.feedbackLink} href={sidePanelFeedbackHref}>{EXPLORE_COPY.COMMUNITY.SEND_FEEDBACK}</a> */}

      </div>

      {/* All category accordions in this component */}
      <Accordion multiselectable={true} items={categoryItems}/>

    </aside>
  );
};

export default AreaDetail;
