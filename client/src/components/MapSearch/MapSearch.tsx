import React from 'react';
import {Search} from '@trussworks/react-uswds';

interface IMapSearch {
  onSearch(e:React.FormEvent<HTMLFormElement>): void & React.FormEventHandler<HTMLFormElement>;
  // onSearch(e:React.FormEvent<HTMLFormElement>): void
}

const onClickHandler = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
  console.log('search on click:', e);
  // Some how stop the map from doing
  e.stopPropagation();
};

const MapSearch = ({onSearch}:IMapSearch) => {
  return (
    <Search
      onClick={(e) => onClickHandler(e)}
      placeholder="Enter in something (TBD)"
      size="small"
      onSubmit={(e) => onSearch(e)} />
  );
};

export default MapSearch;
