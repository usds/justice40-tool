import React, {useEffect, useState, Dispatch} from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Button, ButtonGroup} from '@trussworks/react-uswds';
import {useWindowSize} from 'react-use';


import * as styles from './LayerSelector.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface ILayerSelector {
  censusSelected: boolean,
  setCensusSelected: Dispatch<boolean>,
  setLayerToggled: Dispatch<boolean>,
}

const LayerSelector = ({censusSelected, setCensusSelected, setLayerToggled}:ILayerSelector) => {
  const intl = useIntl();

  /**
     * At compile-time, the width/height returned by useWindowSize will be X. When the client requests the
     * app on run-time from CDN, and the app hydrates, reconcilation no longer occurs and the client is forced
     * to use X.
     *
     * To avoid this, we set the text as a state variable. We also create a useEffect that updates
     * that state whenenver the width changes.
     *
     */
  const {width, height} = useWindowSize();
  const [censusText, setCensusText]= useState(EXPLORE_COPY.MAP.CENSUS_TRACT_LONG);
  const [tribalText, setTribalText]= useState(EXPLORE_COPY.MAP.TRIBAL_LANDS_LONG);

  useEffect( () => {
    if (width > height) {
      setCensusText(EXPLORE_COPY.MAP.CENSUS_TRACT_LONG);
      setTribalText(EXPLORE_COPY.MAP.TRIBAL_LANDS_LONG);
    } else {
      setCensusText(EXPLORE_COPY.MAP.CENSUS_TRACT_SHORT);
      setTribalText(EXPLORE_COPY.MAP.TRIBAL_LANDS_SHORT);
    }
  }, [width]);

  // Anytime the censusSelected state variable changes, set the LayerToggled state
  // variable
  useEffect( () => {
    setLayerToggled(true);
  }, [censusSelected]);


  //   Handles toggle of tracts and tribal layer selection
  const buttonClickHandler = (event) => {
    if (event.target.id === 'census' && !censusSelected) {
      setCensusSelected(true);
    } else if (event.target.id === 'tribal' && censusSelected) {
      setCensusSelected(false);
    }
  };

  return (
    <div className={styles.layerSelectorContainer}>
      {/* // Todo: set i18n here */}
      <label htmlFor="layer-group">Select layer</label>
      <ButtonGroup id="layer-group" type="segmented">
        <Button id="census" type="button" outline={!censusSelected} onClick={(e) => buttonClickHandler(e)}>
          {intl.formatMessage(censusText)}
        </Button>
        <Button id="tribal" type="button" outline={censusSelected} onClick={(e) => buttonClickHandler(e)}>
          {intl.formatMessage(tribalText)}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default LayerSelector;
