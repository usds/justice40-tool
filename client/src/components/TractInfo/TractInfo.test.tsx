import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractInfo from './TractInfo';

describe('rendering of TractInfo Component', () => {
  it('checks if tract info renders correctly for national tracts', () => {
    const blockGroup = '21183920100';
    const countyName = 'Ohio County';
    const stateName = 'Kentucky';
    const population = 3103;
    const sidePanelState = 'Nation';
    const {asFragment} = render(
        <LocalizedComponent>
          <TractInfo
            blockGroup={blockGroup}
            countyName ={countyName}
            stateName ={stateName}
            population ={population}
            sidePanelState ={sidePanelState}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('checks if tract info renders correctly for non-national tracts', () => {
    const blockGroup = '72107954901';
    const countyName = 'Orocovis Municipio';
    const stateName = 'Puerto Rico';
    const population = 3103;
    const sidePanelState = 'Puerto Rico';
    const {asFragment} = render(
        <LocalizedComponent>
          <TractInfo
            blockGroup={blockGroup}
            countyName ={countyName}
            stateName ={stateName}
            population ={population}
            sidePanelState ={sidePanelState}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
