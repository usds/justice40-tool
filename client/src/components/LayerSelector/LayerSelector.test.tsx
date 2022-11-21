import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import LayerSelector from './LayerSelector';

describe('rendering of the LayerSelector', () => {
  it('checks if component renders census tracts selected', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <LayerSelector censusSelected={true} setCensusSelected={() => {}} setLayerToggled={() =>{}}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if component renders tribal selected', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <LayerSelector censusSelected={false} setCensusSelected={() => {}} setLayerToggled={()=> {}}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
