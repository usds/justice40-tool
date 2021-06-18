import React from 'react';
import {Button, ButtonGroup} from '@trussworks/react-uswds';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import * as styles from './mapControls.module.scss';

interface IMapControlsProps {
  setFeatures: (arg0: Feature<Geometry>[]) => void;
}

const MapControls = ({setFeatures}: IMapControlsProps) => {
  return (
    <>
      <div className={styles.mapControlContainer}>
        <h2>Explore the Tool</h2>
        <ButtonGroup type="segmented">
          <Button type="button">Combined</Button>
          <Button type="button" outline={true}>Poverty</Button>
          <Button type="button" outline={true}>Linguistic Isolation</Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default MapControls;
