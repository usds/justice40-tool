import React from 'react';
import {LngLatBoundsLike} from 'mapbox-gl';
import {Search} from '@trussworks/react-uswds';

import * as styles from './MapSearch.module.scss';

interface IMapSearch {
  goToPlace(bounds: LngLatBoundsLike):void;
}

const MapSearch = ({goToPlace}:IMapSearch) => {
  /*
    onSearchHandler will
     1. extract the search term from the input field
     2. query the API and return the results as JSON
     3. destructure the boundingBox values from the search results
     4. pan the map to that location
  */
  const onSearchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchTerm = (event.currentTarget.elements.namedItem('search') as HTMLInputElement).value;

    const searchResults = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`,
        {
          mode: 'cors',
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
            // TODO: Log to sentry
          }
          return response.json();
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
          // TODO: Log to sentry
        });

    console.log('Nominatum search results: ', searchResults);

    if (searchTerm.length > 0) {
      // TODO: hide error message
      const [latMin, latMax, longMin, longMax] = searchResults[0].boundingbox;
      goToPlace([[Number(longMin), Number(latMin)], [Number(longMax), Number(latMax)]]);
    } else {
      // TODO: Show error message - no results found based on your query
    }
  };

  return (
    // TODO: Add error message
    <Search
      className={styles.mapSearch}
      placeholder="Enter a city, state or ZIP"
      size="small"
      onSubmit={(e) => onSearchHandler(e)} />
  );
};

export default MapSearch;
