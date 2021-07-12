import * as React from 'react';
// import * as styles from './areasOfFocusList.module.scss';  // TODO: move styles
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';


// this section seems too verbose? must be a more readable way to do this.
// this inlines the svg as data:image/svg+xml For larger images this
// can cause page bloat, but it should be fine here.
// @ts-ignore
import ecoIcon from '/node_modules/uswds/dist/img/usa-icons/eco.svg';
// @ts-ignore
import busIcon from '/node_modules/uswds/dist/img/usa-icons/directions_bus.svg';
// @ts-ignore
import homeIcon from '/node_modules/uswds/dist/img/usa-icons/home.svg';
// @ts-ignore
import groupsIcon from '/node_modules/uswds/dist/img/usa-icons/groups.svg';
import pollutionIcon // @ts-ignore
  from '/node_modules/uswds/dist/img/usa-icons/severe_weather.svg';
// @ts-ignore
import washIcon from '/node_modules/uswds/dist/img/usa-icons/wash.svg';
// @ts-ignore
import publicIcon from '/node_modules/uswds/dist/img/usa-icons/public.svg';

const AreasOfFocusList = () => {
  const intl = useIntl();
  const messages = defineMessages({
    climate: {
      id: 'areasOfInterest.climate',
      defaultMessage: 'Climate change',
      description: 'item in areasOfInterest list',
    },
    energy: {
      id: 'areasOfInterest.energy',
      defaultMessage: 'Clean energy and energy efficiency',
      description: 'item in areasOfInterest list',
    },
    transit: {
      id: 'areasOfInterest.transit',
      defaultMessage: 'Clean transit',
      description: 'item in areasOfInterest list',
    },
    housing: {
      id: 'areasOfInterest.housing',
      defaultMessage: 'Affordable and sustainable housing',
      description: 'item in areasOfInterest list',
    },
    training: {
      id: 'areasOfInterest.training',
      defaultMessage: 'Training and workforce development',
      description: 'item in areasOfInterest list',
    },
    pollution: {
      id: 'areasOfInterest.pollution',
      defaultMessage: 'Remediation of legacy pollution',
      description: 'item in areasOfInterest list',
    },
    water: {
      id: 'areasOfInterest.water',
      defaultMessage: 'Clean water infrastructure',
      description: 'item in areasOfInterest list',
    },
  });

  const readMoreList: (any | string)[][] = [
    [publicIcon, intl.formatMessage(messages.climate)],
    [ecoIcon, intl.formatMessage(messages.energy)],
    [busIcon, intl.formatMessage(messages.transit)],
    [homeIcon, intl.formatMessage(messages.housing)],
    [groupsIcon, intl.formatMessage(messages.training)],
    [pollutionIcon, intl.formatMessage(messages.pollution)],
    [washIcon, intl.formatMessage(messages.water)],
  ];
  return (
    <div className={'j40-two-column-confine'}>
      <ul className={'j40-two-column'}>
        {readMoreList.map((item, index) => {
          return (
            <li key={`readmore_li_${index}`}>
              <div className={'usa-icon-list__icon'}>
                <img
                  className={'j40-two-column-icons-spacing'}
                  key={`readmore_img_${index}`}
                  src={item[0]} alt={item[1] + ' icon'}/>
              </div>
              <div
                className={'usa-icon-list__content'}> {item[1]} </div>
            </li>
          );
        })
        }
      </ul>
    </div>
  );
};

export default AreasOfFocusList;
