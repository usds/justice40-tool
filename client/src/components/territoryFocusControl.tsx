import {useIntl} from 'gatsby-plugin-intl';
import React from 'react';
import {LngLatBoundsLike} from 'mapbox-gl';

import * as styles from './territoryFocusControl.module.scss';
import * as EXPLORE_COPY from '../data/copy/explore';
import * as constants from '../data/constants';

interface ITerritoryFocusControl {
  goToPlace(bounds: LngLatBoundsLike): void;
}


const TerritoryFocusControl = ({goToPlace}: ITerritoryFocusControl) => {
  const intl = useIntl();

  const onClickTerritoryFocusButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const buttonID = event.target && (event.target as HTMLElement).id;

    switch (buttonID) {
      case '48':
        goToPlace(constants.LOWER_48_BOUNDS);
        break;
      case 'AK':
        goToPlace(constants.ALASKA_BOUNDS);
        break;
      case 'HI':
        goToPlace(constants.HAWAII_BOUNDS);
        break;
      case 'PR':
        goToPlace(constants.PUERTO_RICO_BOUNDS);
        break;
      case 'GU':
        goToPlace(constants.GUAM_BOUNDS);
        break;
      case 'AS':
        goToPlace(constants.AMERICAN_SAMOA_BOUNDS);
        break;
      case 'MP':
        goToPlace(constants.MARIANA_ISLAND_BOUNDS);
        break;
      case 'VI':
        goToPlace(constants.US_VIRGIN_ISLANDS_BOUNDS);
        break;

      default:
        break;
    }
  };

  const territories = [
    {
      short: intl.formatMessage(EXPLORE_COPY.MAP.LOWER48_SHORT),
      long: intl.formatMessage(EXPLORE_COPY.MAP.LOWER48_LONG),
    },
    {
      short: intl.formatMessage(EXPLORE_COPY.MAP.ALASKA_SHORT),
      long: intl.formatMessage(EXPLORE_COPY.MAP.ALASKA_LONG),
    },
    {
      short: intl.formatMessage(EXPLORE_COPY.MAP.HAWAII_SHORT),
      long: intl.formatMessage(EXPLORE_COPY.MAP.HAWAII_LONG),
    },
    {
      short: intl.formatMessage(EXPLORE_COPY.MAP.PR_SHORT),
      long: intl.formatMessage(EXPLORE_COPY.MAP.PR_LONG),
    },
    // {
    //   short: intl.formatMessage(EXPLORE_COPY.MAP.GU_SHORT),
    //   long: intl.formatMessage(EXPLORE_COPY.MAP.GU_LONG),
    // },
    {
      short: intl.formatMessage(EXPLORE_COPY.MAP.AS_SHORT),
      long: intl.formatMessage(EXPLORE_COPY.MAP.AS_LONG),
    },
    {
      short: intl.formatMessage(EXPLORE_COPY.MAP.MP_SHORT),
      long: intl.formatMessage(EXPLORE_COPY.MAP.MP_LONG),
    },
    // {
    //   short: intl.formatMessage(EXPLORE_COPY.MAP.VI_SHORT),
    //   long: intl.formatMessage(EXPLORE_COPY.MAP.VI_LONG),
    // },
  ];
  // the offset for this array should map the territories variable
  const territoriesIconClassName = [
    'mapboxgl-ctrl-zoom-to-48',
    'mapboxgl-ctrl-zoom-to-ak',
    'mapboxgl-ctrl-zoom-to-hi',
    'mapboxgl-ctrl-zoom-to-pr',
    // 'mapboxgl-ctrl-zoom-to-gu',
    'mapboxgl-ctrl-zoom-to-as',
    'mapboxgl-ctrl-zoom-to-mp',
    // 'mapboxgl-ctrl-zoom-to-vi',
  ];

  return (
    <div className={styles.territoryFocusContainer}>
      <div className={'mapboxgl-ctrl mapboxgl-ctrl-group'}>
        {territories.map((territory, index) =>
          <button
            id={territory.short}
            key={territory.short}
            onClick={(e) => onClickTerritoryFocusButton(e)}
            className={'mapboxgl-ctrl-icon ' + territoriesIconClassName[index]}
            aria-label={intl.formatMessage(
                {
                  id: 'map.territoryFocus.focusOn',
                  defaultMessage: 'Focus on {territory}',
                  description: 'Focus on the bounds of a specific territory',
                },
                {
                  territory: territory.long,
                },
            )}>
            <span className={'mapboxgl-ctrl-icon'} aria-hidden={true}/>
          </button>,
        )}
      </div>
    </div>
  );
};

export default TerritoryFocusControl;

