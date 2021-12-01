import React, {useState} from 'react';
import {LngLatBoundsLike} from 'mapbox-gl';
import {useIntl} from 'gatsby-plugin-intl';
import {Search} from '@trussworks/react-uswds';

// import MapSearchMessage from '../MapSearchMessage';

import * as styles from './MapSearch.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IMapSearch {
  goToPlace(bounds: LngLatBoundsLike):void;
}

const MapSearch = ({goToPlace}:IMapSearch) => {
  // State to hold if the search results are empty or not:
  const [isSearchResultsNull, setIsSearchResultsNull] = useState(false);
  const intl = useIntl();

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

  console.log(isSearchResultsNull);

  /* TODO: Investigate why this component can only return the Search component.
     It seems that returning any DOM element wrapped around this Search component causes the map's
     vertical position to become skewed during a production build ONLY. As seen here:

     http://usds-geoplatform-justice40-website.s3-website-us-east-1.amazonaws.com/justice40-tool/935-242a6ec/en/cejst/?flags=sr#3/32.47/-86.5

     None of these issues are present, during development builds. Something in the production
     build is breaking the ability to wrap this Search component.

     All the following failed:
      1. Add just Fragment tags only around Search <> </>
      2. Add just a div with no class
      3. div with mapSearchContainer class
      4. remove MapSearchMessage component
      5. Moving MapSearch to J40Map component
      6. Moving this Search component outside the map is also limiting as the goToPlace()
       is a method in the J40Map and is not easily extractable

      For some reason, this component can only return a single component, namely Search
      (which is a Form element) to not break the production build.
    */
  return (

  // Returning this fails on a production build however during development passes. See video in PR

  // <div className={styles.mapSearchContainer}>
  //   <MapSearchMessage isSearchResultsNull={isSearchResultsNull} />
  //   <Search
  //     placeholder={intl.formatMessage(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER)}
  //     size="small"
  //     onSubmit={(e) => onSearchHandler(e)}
  //   />
  // </div>


    <Search
      className={styles.mapSearchContainer}
      placeholder={intl.formatMessage(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER)}
      size="small"
      onSubmit={(e) => onSearchHandler(e)}
    />

  );
};

export default MapSearch;
