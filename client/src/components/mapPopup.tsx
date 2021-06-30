import React, {useRef, useEffect, useState} from 'react';
import * as styles from './mapPopup.module.scss';
import Overlay from 'ol/Overlay';
import {Table} from '@trussworks/react-uswds';
import {Coordinate} from 'ol/Coordinate';
import Map from 'ol/Map';
import {FeatureLike} from 'ol/Feature';
import * as constants from '../data/constants';

interface IMapPopupProps {
    map: Map,
    selectedFeature: FeatureLike;
    position: Coordinate;
}

const MapPopup = ({map, selectedFeature, position}: IMapPopupProps) => {
  const popupContainerElement = useRef<HTMLDivElement>(null);
  const popupCloserElement = useRef<HTMLAnchorElement>(null);
  const popupContentElement = useRef<HTMLDivElement>(null);
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>();

  const readablePercent = (percent: number) => {
    return `${(percent * 100).toFixed(2)}%`;
  };

  useEffect(() => {
    popupCloserElement.current.onclick = function() {
      overlay.setPosition(undefined);
      popupCloserElement.current!.blur();
      return false;
    };

    const overlay = new Overlay({
      element: popupContainerElement.current!,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    setCurrentOverlay(overlay);
    map.addOverlay(overlay);
  }, []);

  useEffect( () => {
    if (position && currentOverlay && selectedFeature) { // may be empty on first render
      currentOverlay.setPosition(position);
    }
  }, [position]);

  const getCategorization = (percentile: number) => {
    let categorization;
    if (percentile >= 0.75 ) {
      categorization = 'Prioritized';
    } else if (0.60 <= percentile && percentile < 0.75) {
      categorization = 'Threshold';
    } else {
      categorization = 'Non-prioritized';
    }
    return categorization;
  };

  const getTitleContent = () => {
    const properties = selectedFeature.getProperties();
    const blockGroup = properties['GEOID10'];
    const score = properties[constants.SCORE_PROPERTY];
    return (
      <table>
        <tbody>
          <tr>
            <td><strong>Census Block Group:</strong></td>
            <td>{blockGroup}</td>
          </tr>
          <tr>
            <td><strong>Just Progress Categorization:</strong></td>
            <td>{getCategorization(score)}</td>
          </tr>
          <tr>
            <td><strong>Cumulative Index Score:</strong></td>
            <td>{readablePercent(score)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const getBodyContent = () => {
    const properties = selectedFeature.getProperties();
    const rows = [];
    for (const [key, value] of Object.entries(properties)) {
      // Filter out all caps
      if (!key.match(/^[A-Z0-9]+$/)) {
        rows.push(<tr key={key} >
          <td>{key}</td>
          <td>{value}</td>
        </tr>);
      }
    }
    return rows;
  };

  const popupContent = (selectedFeature) ? (
    <div>
      {getTitleContent()}
      <Table bordered={false}>
        <thead>
          <tr>
            <th scope="col">Indicator</th>
            <th scope="col">Percentile(0-100)</th>
          </tr>
        </thead>
        <tbody>
          {getBodyContent()}
        </tbody>
      </Table>
    </div>
  ) : null;

  return (
    <>
      <div ref={popupContainerElement}
        className={styles.popupContainer}>
        <a href="#" ref={popupCloserElement} className={styles.popupCloser}></a>
        <div ref={popupContentElement} className={styles.popupContent}>
          {popupContent}
        </div>
      </div>
    </>
  );
};

export default MapPopup;
