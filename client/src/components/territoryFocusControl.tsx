import React, {MouseEventHandler} from 'react';
import {_useMapControl as useMapControl} from 'react-map-gl';
import * as styles from './territoryFocusControl.module.scss';

interface ITerritoryFocusControl {
  onClickTerritoryFocusButton : MouseEventHandler<HTMLButtonElement>;
}

const TerritoryFocusControl = ({onClickTerritoryFocusButton} : ITerritoryFocusControl) => {
  const {containerRef} = useMapControl({
    // @ts-ignore // Types have not caught up yet, see https://github.com/visgl/react-map-gl/issues/1492
    onClick: onClickTerritoryFocusButton,
  });

  return (
    <div ref={containerRef} className={styles.territoryFocusContainer}>
      <button id={'48'} onClick={onClickTerritoryFocusButton} className={styles.territoryFocusButton}>48</button>
      <button id={'AK'} onClick={onClickTerritoryFocusButton} className={styles.territoryFocusButton}>AK</button>
      <button id={'HI'} onClick={onClickTerritoryFocusButton} className={styles.territoryFocusButton}>HI</button>
      <button id={'PR'} onClick={onClickTerritoryFocusButton} className={styles.territoryFocusButton}>PR</button>
    </div>
  );
};

export default TerritoryFocusControl;

