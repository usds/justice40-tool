import {useIntl} from 'gatsby-plugin-intl';
import React, {MouseEventHandler} from 'react';
import {_useMapControl as useMapControl} from 'react-map-gl';
import * as styles from './territoryFocusControl.module.scss';

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
      short: intl.formatMessage(
          {
            id: 'map.territoryFocus.lower48.short',
            defaultMessage: '48',
            description: 'The abbreviated name indicating the bounds of the Lower 48 states',
          },
      ),
      long: intl.formatMessage(
          {
            id: 'map.territoryFocus.lower48.long',
            defaultMessage: 'Lower 48',
            description: 'The longer name indicating the bounds of the Lower 48 states',
          },
      ),
    },
    {
      short: intl.formatMessage(
          {
            id: 'map.territoryFocus.alaska.short',
            defaultMessage: 'AK',
            description: 'The abbreviated indicating the bounds of Alaska',
          },
      ),
      long: intl.formatMessage(
          {
            id: 'map.territoryFocus.alaska.long',
            defaultMessage: 'Alaska',
            description: 'The full name indicating the bounds of Alaska',
          },
      ),
    },
    {
      short: intl.formatMessage(
          {
            id: 'map.territoryFocus.hawaii.short',
            defaultMessage: 'HI',
            description: 'The abbreviated name indicating the bounds of Hawaii',
          },
      ),
      long: intl.formatMessage(
          {
            id: 'map.territoryFocus.hawaii.long',
            defaultMessage: 'Hawaii',
            description: 'The longer name indicating the bounds of Hawaii',
          },
      ),
    },
    {
      short: intl.formatMessage(
          {
            id: 'map.territoryFocus.puerto_rico.short',
            defaultMessage: 'PR',
            description: 'The abbreviated name indicating the bounds of Puerto Rico',
          },
      ),
      long: intl.formatMessage(
          {
            id: 'map.territoryFocus.puerto_rico.long',
            defaultMessage: 'Puerto Rico',
            description: 'The full name indicating the bounds of Puerto Rico',
          },
      ),
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

