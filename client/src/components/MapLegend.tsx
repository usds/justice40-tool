import React from 'react';

const MapLegend = () => {
  return (
    <>
      <dl className={'j40-maplegend'}>
        <h4>Color Key</h4>
        <dt className={'mapsquare-a'}>&nbsp;</dt>
        <dd>Prioritized community</dd>
        <dt className={'mapsquare-b'}>&nbsp;</dt>
        <dd>Threshold community</dd>
        <dt className={'mapsquare-c'}>$nbsp;</dt>
        <dd>Non-Prioritized community</dd>
      </dl>
    </>
  );
};

export default MapLegend;
