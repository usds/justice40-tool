import React, {useRef, useEffect, useState} from 'react';
import * as styles from './openlayersPopup.module.scss';
import Overlay from 'ol/Overlay';
import {Coordinate} from 'ol/Coordinate';
import Map from 'ol/Map';
import {FeatureLike} from 'ol/Feature';
import PopupContent from './popupContent';

interface IOpenlayersPopupProps {
    map: Map,
    selectedFeature: FeatureLike;
    position: Coordinate;
}

const OpenlayersPopup = ({map, selectedFeature, position}: IOpenlayersPopupProps) => {
  const popupContainerElement = useRef<HTMLDivElement>(null);
  const popupCloserElement = useRef<HTMLAnchorElement>(null);
  const popupContentElement = useRef<HTMLDivElement>(null);
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>();

  useEffect(() => {
    popupCloserElement.current!.onclick = function() {
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

  return (
    <>
      <div ref={popupContainerElement}
        className={styles.popupContainer}>
        <a href="#" ref={popupCloserElement} className={styles.popupCloser}></a>
        <div ref={popupContentElement} className={styles.popupContent}>
          <PopupContent properties={selectedFeature?.getProperties()} />
        </div>
      </div>
    </>
  );
};

export default OpenlayersPopup;
