/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {LngLatBoundsLike} from 'maplibre-gl';
import {useIntl} from 'gatsby-plugin-intl';
import {Search} from '@trussworks/react-uswds';
import {useWindowSize} from 'react-use';

import MapSearchMessage from '../MapSearchMessage';

import * as styles from './MapSearch.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IMapSearch {
  goToPlace(bounds: LngLatBoundsLike):void;
}

const MapSearch = ({goToPlace}:IMapSearch) => {
  // State to hold if the search results are empty or not:
  const [isSearchResultsNull, setIsSearchResultsNull] = useState(false);
  const intl = useIntl();

  /**
   * At compile-time, the width/height returned by useWindowSize will be X. When the client requests the
   * app on run-time from CDN, and the app hydrates, reconcilation no longer occurs and the client is forced
   * to use X.
   *
   * To avoid this, we set the placeholder text as a state variable. We also create a useEffect that updates
   * that state whenenver the width changes.
   *
   */
  const {width, height} = useWindowSize();
  const [placeholderText, setPlaceholderText]= useState(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER);

  useEffect( () => {
   width > height ? setPlaceholderText(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER): setPlaceholderText(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER_MOBILE);
  }, [width]);

  /*
    onSearchHandler will
     1. extract the search term from the input field
     2. fetch data from the API and return the results as JSON and results to US only
     3. if data is valid, destructure the boundingBox values from the search results
     4. pan the map to that location
  */
  const onSearchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchTerm = (event.currentTarget.elements.namedItem('search') as HTMLInputElement).value;

    const searchResults = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&countrycodes=us`,
        {
          mode: 'cors',
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          return response.json();
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });


    // If results are valid, set isSearchResultsNull to false and pan map to location:
    if (searchResults && searchResults.length > 0) {
      setIsSearchResultsNull(false);
      console.log('Nominatum search results: ', searchResults);

      const [latMin, latMax, longMin, longMax] = searchResults[0].boundingbox;
      goToPlace([[Number(longMin), Number(latMin)], [Number(longMax), Number(latMax)]]);
    } else {
      setIsSearchResultsNull(true);
    }
  };

  return (
    <div className={styles.mapSearchContainer}>
      <MapSearchMessage isSearchResultsNull={isSearchResultsNull} />
      <Search
        placeholder={intl.formatMessage(placeholderText)}
        size="small"
        onSubmit={(e) => onSearchHandler(e)}
      />
    </div>
  );
};

export default MapSearch;
