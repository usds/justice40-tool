import React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractPrioritization from './TractPrioritization';

describe('rendering of TractPrioritization Component', () => {
  const testCases = [
    // total categories >= 1 all other are don't care
    {totCats: 1, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: null, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: null, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: null, percentTribal: .45, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: 1, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: 2, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: 3, percentTribal: .45, isDAC: 'YES'},

    {totCats: 1, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: null, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: null, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: null, percentTribal: .45, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: 1, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: 2, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: 3, percentTribal: .45, isDAC: 'YES'},

    {totCats: 1, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: null, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: null, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: null, percentTribal: .45, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: 1, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: 2, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: 3, percentTribal: .45, isDAC: 'YES'},

    {totCats: 1, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: null, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: null, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: null, percentTribal: .45, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: 1, percentTribal: null, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: 2, percentTribal: 0, isDAC: 'YES'},
    {totCats: 1, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: 3, percentTribal: .45, isDAC: 'YES'},

    // Total categories == 0, while Adjacency index = True and Adjacency low income = True
    {totCats: 0, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: null, percentTribal: null, isDAC: 'YES'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: null, percentTribal: 0, isDAC: 'YES'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: null, percentTribal: .13, isDAC: 'YES'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: 1, percentTribal: null, isDAC: 'YES'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: 2, percentTribal: 0, isDAC: 'YES'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: true, tribalCountAK: 3, percentTribal: .13, isDAC: 'YES'},

    // Total categories == 0, while Adjacency index = True and Adjacency low income = False
    {totCats: 0, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: null, percentTribal: null, isDAC: 'No'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: null, percentTribal: 0, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: null, percentTribal: .13, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: 1, percentTribal: null, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: 2, percentTribal: 0, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: true, AJDLI_ET: false, tribalCountAK: 3, percentTribal: .13, isDAC: 'Partially'},

    // Total categories == 0, while Adjacency index = False and Adjacency low income = True
    {totCats: 0, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: null, percentTribal: null, isDAC: 'No'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: null, percentTribal: 0, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: null, percentTribal: .13, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: 1, percentTribal: null, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: 2, percentTribal: 0, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: true, tribalCountAK: 3, percentTribal: .13, isDAC: 'Partially'},

    // Total categories == 0, while Adjacency index = False
    {totCats: 0, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: null, percentTribal: null, isDAC: 'No'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: null, percentTribal: 0, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: null, percentTribal: .13, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: 1, percentTribal: null, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: 2, percentTribal: 0, isDAC: 'Partially'},
    {totCats: 0, ADJ_ET: false, AJDLI_ET: false, tribalCountAK: 3, percentTribal: .13, isDAC: 'Partially'},


  ];

  testCases.forEach((testCase) => {
    // eslint-disable-next-line max-len
    it(`checks if component renders ${testCase.isDAC} when category count = ${testCase.totCats}, isAdjacency = ${testCase.ADJ_ET}, isAdjLowInc = ${testCase.AJDLI_ET}, tribal points in AK = ${testCase.tribalCountAK} tribal % = ${testCase.percentTribal}`, () => {
      const {asFragment} = render(
          <LocalizedComponent>
            <TractPrioritization
              totalCategoriesPrioritized={testCase.totCats}
              isAdjacencyThreshMet={testCase.ADJ_ET}
              isAdjacencyLowIncome={testCase.AJDLI_ET}
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
