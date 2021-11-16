import React from 'react';
import {Search} from '@trussworks/react-uswds';

const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('you searched!');
};

const MapSearch = () => {
  return (
    <Search onSubmit={(e) => onSearch(e)} />
  );
};

export default MapSearch;
