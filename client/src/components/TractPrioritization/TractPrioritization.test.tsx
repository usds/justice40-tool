import React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractPrioritization from './TractPrioritization';

describe('rendering of TractPrioritization Component', () => {
  const testCases = [
    {scoreNComm: true, tribalCountAK: null, percentTribal: null, isDAC: 'YES'},
    {scoreNComm: true, tribalCountAK: null, percentTribal: 0, isDAC: 'YES'},
    {scoreNComm: true, tribalCountAK: null, percentTribal: .45, isDAC: 'YES'},
    {scoreNComm: true, tribalCountAK: 1, percentTribal: null, isDAC: 'YES'},
    {scoreNComm: true, tribalCountAK: 2, percentTribal: 0, isDAC: 'YES'},
    {scoreNComm: true, tribalCountAK: 3, percentTribal: .45, isDAC: 'YES'},

    {scoreNComm: false, tribalCountAK: null, percentTribal: null, isDAC: 'NO'},
    {scoreNComm: false, tribalCountAK: null, percentTribal: 0, isDAC: 'PARTIALLY'},
    {scoreNComm: false, tribalCountAK: null, percentTribal: .13, isDAC: 'PARTIALLY'},
    {scoreNComm: false, tribalCountAK: 1, percentTribal: null, isDAC: 'PARTIALLY'},
    {scoreNComm: false, tribalCountAK: 2, percentTribal: 0, isDAC: 'PARTIALLY'},
    {scoreNComm: false, tribalCountAK: 3, percentTribal: .13, isDAC: 'PARTIALLY'},

  ];

  testCases.forEach((testCase) => {
    // eslint-disable-next-line max-len
    it(`checks if component renders ${testCase.isDAC} when score N communities = ${testCase.scoreNComm}, tribal points in AK = ${testCase.tribalCountAK} tribal % = ${testCase.percentTribal}`, () => {
      const {asFragment} = render(
          <LocalizedComponent>
            <TractPrioritization
              scoreNCommunities={testCase.scoreNComm}
              tribalCountAK={testCase.tribalCountAK}
              tribalCountUS={null}
              percentTractTribal={testCase.percentTribal}
            />
          </LocalizedComponent>,
      );
      expect(asFragment()).toMatchSnapshot();
      screen.getByText(testCase.isDAC);
    });
  });
});
