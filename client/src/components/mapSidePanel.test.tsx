import * as React from 'react';
import {render, screen} from '@testing-library/react';
import MapSidePanel from './mapSidePanel';

describe('simulate app starting up, no click on map', () => {
  render(<MapSidePanel
    className={'someClassName'}
    detailViewData={undefined}
    selectedFeatureId={undefined}
  />);

  it('renders the MapIntroduction', () => {
    expect(screen.getByText(/Zoom/)).toHaveTextContent('Zoom and select a census block group to view data');
  });
});

describe('simulate a click on map', () => {
  const detailViewData = {
    'longitude': -108.36390495300135,
    'latitude': 36.6539600651316,
    'zoom': 11.416221327323697,
    'properties': {
      'GEOID10': '350459430003',
      'Total population': 960,
      'GEOID10 (percentile)': 0.5784380914343289,
      'Housing burden (percent) (percentile)': 0.10073235017829946,
      'Total population (percentile)': 0.2985685303608629,
      'Linguistic isolation (percent) (percentile)': 0.9623469180109516,
      'Percent of households in linguistic isolation (percentile)': 0.9230800651740774,
      'Poverty (Less than 200% of federal poverty line) (percentile)': 0.947202643271775,
      'Percent individuals age 25 or over with less than high school degree (percentile)': 0.7804232684164424,
      'Unemployed civilians (percent) (percentile)': 0.9873599918675144,
      'Score D (percentile)': 0.9321799276549586,
    },
  };
  const selectedFeatureId = 345;

  render(<MapSidePanel
    className={'J40Map-module--mapSidePanel--8Ap7p'}
    detailViewData={detailViewData}
    selectedFeatureId={selectedFeatureId}
  />);

  // Todo VS: figure out why this component doesn't render?
  // it('renders the AreaDetail', () => {
  //   screen.getByRole('aside');
  // });
});
