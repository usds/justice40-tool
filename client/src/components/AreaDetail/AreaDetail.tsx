/* eslint-disable quotes */
// External Libs:
import React from 'react';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';
import {Accordion, Button} from '@trussworks/react-uswds';

// Components:
import Category from '../Category';
import DisadvantageDot from '../DisadvantageDot';
import ExceedBurden from '../ExceedBurden';
import Indicator from '../Indicator';

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';
import * as CONTACT_COPY from '../../data/copy/contact';
// @ts-ignore
// import mailIcon from '/node_modules/uswds/dist/img/usa-icons/mail.svg';

interface IAreaDetailProps {
  properties: constants.J40Properties,
}

/**
 * This interface is used as define the various fields for each indicator in the side panel
 *  label: the indicator label or title
 *  description: the description of the indicator used in the side panel
 *  value: the number from the geoJSON tile
 *  isDisadvagtaged: the flag from the geoJSON tile
 *  isPercent: is the value a percent or percentile
 *  */
export interface indicatorInfo {
  label: string,
  description: string,
  value: number,
  isDisadvagtaged: boolean,
  isPercent?: boolean,
  threshold?: number,
}

const AreaDetail = ({properties}:IAreaDetailProps) => {
  const intl = useIntl();

  // console.log the properties of the census that is selected:
  console.log("Area Detail properies: ", properties);

  const score = properties[constants.SCORE_PROPERTY_HIGH] ? properties[constants.SCORE_PROPERTY_HIGH] as number : 0;
  const blockGroup = properties[constants.GEOID_PROPERTY] ? properties[constants.GEOID_PROPERTY] : "N/A";
  const population = properties[constants.TOTAL_POPULATION] ? properties[constants.TOTAL_POPULATION] : "N/A";
  const countyName = properties[constants.COUNTY_NAME] ? properties[constants.COUNTY_NAME] : "N/A";
  const stateName = properties[constants.STATE_NAME] ? properties[constants.STATE_NAME] : "N/A";
  const sidePanelState = properties[constants.SIDE_PANEL_STATE];

  const isCommunityFocus = score >= constants.SCORE_BOUNDARY_THRESHOLD;

  const feedbackEmailSubject = `Census tract ID ${blockGroup}, ${countyName}, ${stateName}`;
  const feedbackEmailBody = intl.formatMessage(EXPLORE_COPY.SEND_FEEDBACK.EMAIL_BODY);

  /**
   * The workforce development category has some indicators who's source will vary depending on which
   * territory is selected. This function allows us to change the source of workforce development indicators
   * depending on which territory was selected
   */

  const getWorkForceIndicatorValue = (indicatorName:string) => {
    if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS) {
      if (indicatorName === 'lowMedInc') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDU_PERCENTILE_FIELD) ?
        properties[constants.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDU_PERCENTILE_FIELD] : null;
      }
      if (indicatorName === 'unemploy') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDU_PERCENTILE_FIELD) ?
        properties[constants.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDU_PERCENTILE_FIELD] : null;
      }
      if (indicatorName === 'poverty') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD) ?
        properties[constants.ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD] : null;
      }
      if (indicatorName === 'highSchool') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_HS_EDU_PERCENTAGE_FIELD) ?
        properties[constants.ISLAND_AREAS_HS_EDU_PERCENTAGE_FIELD] : null;
      }
    }

    if (indicatorName === 'lowMedInc') {
      return properties.hasOwnProperty(constants
          .LOW_MEDIAN_INCOME_PERCENTILE) ?
      properties[constants.LOW_MEDIAN_INCOME_PERCENTILE] : null;
    }
    if (indicatorName === 'unemploy') {
      return properties.hasOwnProperty(constants
          .UNEMPLOYMENT_PROPERTY_PERCENTILE) ?
      properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE] : null;
    }
    if (indicatorName === 'poverty') {
      return properties.hasOwnProperty(constants
          .POVERTY_PROPERTY_PERCENTILE) ?
     properties[constants.POVERTY_PROPERTY_PERCENTILE] : null;
    }
    if (indicatorName === 'highSchool') {
      return properties.hasOwnProperty(constants
          .HIGH_SCHOOL_PROPERTY_PERCENTILE) ?
      properties[constants.HIGH_SCHOOL_PROPERTY_PERCENTILE] : null;
    }
  };

  /**
   * The workforce development category has some indicators who's disadvantaged boolean
   * will vary depending on which territory is selected. This function allows us to change
   * the boolean of workforce development indicators depending on which territory was selected
   */

  const getWorkForceIndicatorIsDisadv = (indicatorName:string) => {
    if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS) {
      if (indicatorName === 'lowMedInc') {
        return properties.hasOwnProperty(constants
            .IS_GTE_90_ISLAND_AREA_LOW_MEDIAN_INCOME_AND_IS_LOW_HS_EDU_2009) ?
        properties[constants.IS_GTE_90_ISLAND_AREA_LOW_MEDIAN_INCOME_AND_IS_LOW_HS_EDU_2009] : null;
      }
      if (indicatorName === 'unemploy') {
        return properties.hasOwnProperty(constants
            .IS_GTE_90_ISLAND_AREA_UNEMPLOYMENT_AND_IS_LOW_HS_EDU_2009) ?
        properties[constants.IS_GTE_90_ISLAND_AREA_UNEMPLOYMENT_AND_IS_LOW_HS_EDU_2009] : null;
      }
      if (indicatorName === 'poverty') {
        return properties.hasOwnProperty(constants
            .IS_GTE_90_ISLAND_AREA_BELOW_100_POVERTY_AND_IS_LOW_HS_EDU_2009) ?
        properties[constants.IS_GTE_90_ISLAND_AREA_BELOW_100_POVERTY_AND_IS_LOW_HS_EDU_2009] : null;
      }
      if (indicatorName === 'highSchool') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREA_LOW_HS_EDU) ?
        properties[constants.ISLAND_AREA_LOW_HS_EDU] : null;
      }
    }

    if (indicatorName === 'lowMedInc') {
      return properties.hasOwnProperty(constants
          .IS_GTE_90_LOW_MEDIAN_INCOME_AND_LOW_HIGH_SCHOOL_EDU) ?
      properties[constants.IS_GTE_90_LOW_MEDIAN_INCOME_AND_LOW_HIGH_SCHOOL_EDU] : null;
    }
    if (indicatorName === 'unemploy') {
      return properties.hasOwnProperty(constants
          .IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU) ?
      properties[constants.IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU] : null;
    }
    if (indicatorName === 'poverty') {
      return properties.hasOwnProperty(constants
          .IS_GTE_90_BELOW_100_POVERTY_AND_LOW_HIGH_SCHOOL_EDU) ?
      properties[constants.IS_GTE_90_BELOW_100_POVERTY_AND_LOW_HIGH_SCHOOL_EDU] : null;
    }
    if (indicatorName === 'highSchool') {
      return properties.hasOwnProperty(constants
          .IS_LOW_HS_EDUCATION_LOW_HIGHER_ED_PRIORITIZED) &&
      properties[constants.IS_LOW_HS_EDUCATION_LOW_HIGHER_ED_PRIORITIZED] == 1 ?
       true : false;
    }
  };
  // Define each indicator in the side panel with constants from copy file (for intl)
  // Indicators are grouped by category
  const expAgLoss:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_AG_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_AG_LOSS),
    value: properties.hasOwnProperty(constants.EXP_AGRICULTURE_LOSS_PERCENTILE) ?
      properties[constants.EXP_AGRICULTURE_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_EXP_AGR_LOSS_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_EXP_AGR_LOSS_AND_IS_LOW_INCOME] : null,
  };
  const expBldLoss:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_BLD_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_BLD_LOSS),
    value: properties.hasOwnProperty(constants.EXP_BUILDING_LOSS_PERCENTILE) ?
      properties[constants.EXP_BUILDING_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_EXP_BLD_LOSS_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_EXP_BLD_LOSS_AND_IS_LOW_INCOME] : null,
  };
  const expPopLoss:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_POP_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_POP_LOSS),
    value: properties.hasOwnProperty(constants.EXP_POPULATION_LOSS_PERCENTILE) ?
      properties[constants.EXP_POPULATION_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_EXP_POP_LOSS_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_EXP_POP_LOSS_AND_IS_LOW_INCOME] : null,
  };
  const lowInc:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LOW_INCOME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_INCOME),
    value: properties.hasOwnProperty(constants.POVERTY_BELOW_200_PERCENTILE) ?
      properties[constants.POVERTY_BELOW_200_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_FEDERAL_POVERTY_LEVEL_200] ?
      properties[constants.IS_FEDERAL_POVERTY_LEVEL_200] : null,
  };
  const higherEd:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIGH_ED),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HIGH_ED),
    value: properties.hasOwnProperty(constants.HIGHER_ED_PERCENTILE) ?
      properties[constants.HIGHER_ED_PERCENTILE] : null,
    isDisadvagtaged: true,
    isPercent: true,
    threshold: 20,
  };

  const energyBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ENERGY_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ENERGY_BURDEN),
    value: properties.hasOwnProperty(constants.ENERGY_PERCENTILE) ?
      properties[constants.ENERGY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_ENERGY_BURDEN_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_ENERGY_BURDEN_AND_IS_LOW_INCOME] : null,
  };
  const pm25:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PM_2_5),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PM_2_5),
    value: properties.hasOwnProperty(constants.PM25_PERCENTILE) ?
      properties[constants.PM25_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_PM25_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_PM25_AND_IS_LOW_INCOME] : null,
  };

  const dieselPartMatter:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIESEL_PARTICULATE_MATTER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIESEL_PARTICULATE_MATTER),
    value: properties.hasOwnProperty(constants.DIESEL_MATTER_PERCENTILE) ?
      properties[constants.DIESEL_MATTER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_DIESEL_PM_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_DIESEL_PM_AND_IS_LOW_INCOME] : null,
  };
  const trafficVolume:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.TRAFFIC_VOLUME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.TRAFFIC_VOLUME),
    value: properties.hasOwnProperty(constants.TRAFFIC_PERCENTILE) ?
      properties[constants.TRAFFIC_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_TRAFFIC_PROX_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_TRAFFIC_PROX_AND_IS_LOW_INCOME] : null,
  };

  const houseBurden:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HOUSE_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HOUSE_BURDEN),
    value: properties.hasOwnProperty(constants.HOUSING_BURDEN_PROPERTY_PERCENTILE) ?
      properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_HOUSE_BURDEN_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_HOUSE_BURDEN_AND_IS_LOW_INCOME] : null,
  };
  const leadPaint:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LEAD_PAINT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LEAD_PAINT),
    value: properties.hasOwnProperty(constants.LEAD_PAINT_PERCENTILE) ?
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
    value: properties.hasOwnProperty(constants.PROXIMITY_TSDF_SITES_PERCENTILE) ?
      properties[constants.PROXIMITY_TSDF_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_HAZARD_WASTE_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_HAZARD_WASTE_AND_IS_LOW_INCOME] : null,
  };
  const proxNPL:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_NPL),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_NPL),
    value: properties.hasOwnProperty(constants.PROXIMITY_NPL_SITES_PERCENTILE) ?
      properties[constants.PROXIMITY_NPL_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_SUPERFUND_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_SUPERFUND_AND_IS_LOW_INCOME] : null,
  };
  const proxRMP:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_RMP),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_RMP),
    value: properties.hasOwnProperty(constants.PROXIMITY_RMP_SITES_PERCENTILE) ?
      properties[constants.PROXIMITY_RMP_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_RMP_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_RMP_AND_IS_LOW_INCOME] : null,
  };

  const wasteWater:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.WASTE_WATER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.WASTE_WATER),
    value: properties.hasOwnProperty(constants.WASTEWATER_PERCENTILE) ?
      properties[constants.WASTEWATER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_WASTEWATER_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_WASTEWATER_AND_IS_LOW_INCOME] : null,
  };

  const asthma:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ASTHMA),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ASTHMA),
    value: properties.hasOwnProperty(constants.ASTHMA_PERCENTILE) ?
      properties[constants.ASTHMA_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_ASTHMA_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_ASTHMA_AND_IS_LOW_INCOME] : null,
  };
  const diabetes:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIABETES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIABETES),
    value: properties.hasOwnProperty(constants.DIABETES_PERCENTILE) ?
      properties[constants.DIABETES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_DIABETES_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_DIABETES_AND_IS_LOW_INCOME] : null,
  };
  const heartDisease:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HEART_DISEASE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HEART_DISEASE),
    value: properties.hasOwnProperty(constants.HEART_PERCENTILE) ?
      properties[constants.HEART_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_HEART_DISEASE_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_HEART_DISEASE_AND_IS_LOW_INCOME] : null,
  };
  const lifeExpect:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LIFE_EXPECT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_LIFE_EXPECT),
    value: properties.hasOwnProperty(constants.LIFE_PERCENTILE) ?
      properties[constants.LIFE_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_LOW_LIFE_EXP_AND_IS_LOW_INCOME] ?
      properties[constants.IS_GTE_90_LOW_LIFE_EXP_AND_IS_LOW_INCOME] : null,
  };

  const lingIso:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LING_ISO),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LING_ISO),
    value: properties.hasOwnProperty(constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE) ?
    properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_GTE_90_LINGUISITIC_ISO_AND_IS_LOW_INCOME] ?
    properties[constants.IS_GTE_90_LINGUISITIC_ISO_AND_IS_LOW_INCOME] : null,
  };
  const lowMedInc:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LOW_MED_INC),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_MED_INCOME),
    value: getWorkForceIndicatorValue('lowMedInc'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('lowMedInc'),
  };
  const unemploy:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.UNEMPLOY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.UNEMPLOY),
    value: getWorkForceIndicatorValue('unemploy'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('unemploy'),
  };
  const poverty:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.POVERTY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.POVERTY),
    value: getWorkForceIndicatorValue('poverty'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('poverty'),
  };
  const highSchool:indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIGH_SCL),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HIGH_SKL),
    value: getWorkForceIndicatorValue('highSchool'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('highSchool'),
    isPercent: true,
    threshold: 90,
  };

  /**
   * Aggregate indicators based on categories
   *
   * The indicators property must be an array with last two elements being the
   * socioeconomic burdens.
   */
  let categories = [
    {
      id: 'climate-change',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLIMATE),
      indicators: [expAgLoss, expBldLoss, expPopLoss],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_CLIMATE_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_CLIMATE_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_CLIMATE_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_CLIMATE_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_CLIMATE_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_CLIMATE_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'clean-energy',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_ENERGY),
      indicators: [energyBurden, pm25],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_ENERGY_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_ENERGY_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_ENERGY_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_ENERGY_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_ENERGY_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_ENERGY_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'clean-transport',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_TRANSPORT),
      indicators: [dieselPartMatter, trafficVolume],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_TRANSPORT_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_TRANSPORT_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_TRANSPORT_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_TRANSPORT_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_TRANSPORT_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_TRANSPORT_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'sustain-house',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.SUSTAIN_HOUSE),
      indicators: [houseBurden, leadPaint],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_HOUSING_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_HOUSING_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_HOUSING_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_HOUSING_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_HOUSING_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_HOUSING_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'leg-pollute',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.LEG_POLLUTE),
      indicators: [proxHaz, proxNPL, proxRMP],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_POLLUTION_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_POLLUTION_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_POLLUTION_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_POLLUTION_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_POLLUTION_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_POLLUTION_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'clean-water',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_WATER),
      indicators: [wasteWater],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_WATER_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_WATER_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_WATER_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_WATER_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_WATER_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_WATER_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'health-burdens',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.HEALTH_BURDEN),
      indicators: [asthma, diabetes, heartDisease, lifeExpect],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_HEALTH_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_HEALTH_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_HEALTH_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_HEALTH_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_HEALTH_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_HEALTH_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'work-dev',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.WORK_DEV),
      indicators: [lingIso, lowMedInc, , unemploy, poverty],
      socioEcIndicators: [highSchool, higherEd],
      isDisadvagtaged: properties[constants.IS_WORKFORCE_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_WORKFORCE_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_WORKFORCE_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
      properties[constants.IS_WORKFORCE_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_WORKFORCE_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
      properties[constants.IS_WORKFORCE_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
  ];

  /**
   * Modify the category array depending on the sidePanelState field. This field comes from the backend
   * and is called UI_EXP.
   *
   * This sidePanelState has 3 values; namely, Nation, Puerto Rico and Island Areas.
   */
  if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.PUERTO_RICO) {
    // For Puerto Rico - only show the workforce development category
    categories = categories.filter((category) => category.id === 'work-dev');
  };
  if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS) {
    // For Island Areas - only show workforce dev category
    categories = categories.filter((category) => category.id === 'work-dev');
    // For Island Areas - remove the linguistic Isolation
    categories[0].indicators = [lowMedInc, unemploy, poverty, highSchool];
  }


  // Create the AccoridionItems by mapping over the categories array. In this array we define the
  // various indicators for a specific category. This is an array which then maps over the <Indicator />
  // component to render the actual Indicator
  const categoryItems = categories.map((category) => ({
    id: category.id,
    title: <Category name={category.titleText} isDisadvantaged={category.isDisadvagtaged}/>,
    content: (
      <>
        {/* Exceeds one or more burdens */}
        <ExceedBurden text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_ONE_OR_MORE} isBurdened={true}/>

        {/* indicators */}
        {category.indicators.map((indicator:any, index:number) => {
          return <Indicator key={`ind${index}`} indicator={indicator}/>;
        })}

        {/* AND */}
        <div className={styles.categorySpacer}>AND</div>

        {/* Exceeds both socioeconomic burdens */}
        <ExceedBurden text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_BOTH_SOCIO} isBurdened={true}/>

        {/* socio-economic indicators */}
        {category.socioEcIndicators.map((indicator:any, index:number) => {
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
            {properties[constants.SIDE_PANEL_STATE] !== constants.SIDE_PANEL_STATE_VALUES.NATION ?
             intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.TERRITORY) :
             intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.STATE)
            }
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

        {/* Questions asking if disadvantaged? */}
        <div className={styles.isInFocus}>
          {EXPLORE_COPY.COMMUNITY.IS_FOCUS}
        </div>

        {/* YES with Dot or NO with no Dot  */}
        <div className={styles.communityOfFocus}>
          {isCommunityFocus ?
            <>
              <h3>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>
              <DisadvantageDot isDisadvantaged={isCommunityFocus}/>
            </> :
          <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>
          }
        </div>

        {/* Number of thresholds exceeded */}
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
              totalCount: properties[constants.TOTAL_NUMBER_OF_INDICATORS],
            }}/>
        </div>

        {/* Send Feedback button */}
        <a
          className={styles.sendFeedbackBtn}
          // The mailto string must be on a single line otherwise the email does not display subject and body
          href={`
            mailto:${CONTACT_COPY.FEEDBACK_EMAIL}?subject=${feedbackEmailSubject}&body=${feedbackEmailBody}
          `}
          target={"_blank"}
          rel="noreferrer"
        >
          <Button
            type="button">
            <div>
              {EXPLORE_COPY.COMMUNITY.SEND_FEEDBACK.TITLE}
            </div>
            {/* <div>
                <img src={mailIcon} alt={'mail icon for email'}/>
              </div> */}
          </Button>
        </a>

      </div>

      {/* All category accordions in this component */}
      <Accordion multiselectable={true} items={categoryItems}/>

    </aside>
  );
};

export default AreaDetail;
