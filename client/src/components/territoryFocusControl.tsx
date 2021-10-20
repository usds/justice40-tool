import {useIntl} from 'gatsby-plugin-intl';
import React, {MouseEventHandler} from 'react';
import {_useMapControl as useMapControl} from 'react-map-gl';

import * as styles from './territoryFocusControl.module.scss';
import * as EXPLORE_COPY from '../data/copy/explore';

interface ITerritoryFocusControl {
  onClickTerritoryFocusButton: MouseEventHandler<HTMLButtonElement>;
}

const TerritoryFocusControl = ({onClickTerritoryFocusButton}: ITerritoryFocusControl) => {
  const intl = useIntl();

  const {containerRef} = useMapControl({
    // @ts-ignore // Types have not caught up yet, see https://github.com/visgl/react-map-gl/issues/1492
    onClick: onClickTerritoryFocusButton,
  });

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
  ];
  // the offset for this array should map the territories variable
  const territoriesIconClassName = [
    'mapboxgl-ctrl-zoom-to-48',
    'mapboxgl-ctrl-zoom-to-ak',
    'mapboxgl-ctrl-zoom-to-hi',
    'mapboxgl-ctrl-zoom-to-pr',
  ];

  return (
    <div ref={containerRef} className={styles.territoryFocusContainer}>
      <div className={'mapboxgl-ctrl mapboxgl-ctrl-group'}>
        {territories.map((territory, index) =>
          <button
            id={territory.short}
            key={territory.short}
            onClick={onClickTerritoryFocusButton}
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

