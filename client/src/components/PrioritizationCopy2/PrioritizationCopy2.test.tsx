import React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PrioritizationCopy2 from './PrioritizationCopy2';

describe('rendering of PrioritizationCopy2 Component', () => {
  const testCases = [
    {
      totalCategoriesPrioritized: 0,
      totalBurdensPrioritized: 0,
      isAdjacencyThreshMet: true,
      isAdjacencyLowIncome: true,
      tribalCountAK: null,
      tribalCountUS: null,
      percentTractTribal: 2,
      // eslint-disable-next-line max-len
      para1: `The lands of Federally Recognized Tribes that cover 2% of this tract are also considered disadvantaged.`,
    },
    {
      totalCategoriesPrioritized: 0,
      totalBurdensPrioritized: 1,
      isAdjacencyThreshMet: true,
      isAdjacencyLowIncome: true,
      tribalCountAK: null,
      tribalCountUS: 3,
      percentTractTribal: 4,
      // eslint-disable-next-line max-len
      para1: `The lands of Federally Recognized Tribes that cover 4% of this tract are also considered disadvantaged.`,
    },
  ];

  testCases.forEach((testCase) => {
    // eslint-disable-next-line max-len
    it(`checks if component renders ${testCase.para1} when totCats = ${testCase.totalCategoriesPrioritized}, totBurds = ${testCase.totalBurdensPrioritized}, isAdj = ${testCase.isAdjacencyThreshMet}, isAdjLI = ${testCase.isAdjacencyLowIncome}, tribal % = ${testCase.percentTractTribal},`, () => {
      const {asFragment} = render(
          <LocalizedComponent>
            <PrioritizationCopy2
              totalCategoriesPrioritized={testCase.totalCategoriesPrioritized}
              totalBurdensPrioritized={testCase.totalBurdensPrioritized}
              isAdjacencyThreshMet={testCase.isAdjacencyThreshMet}
              isAdjacencyLowIncome={testCase.isAdjacencyLowIncome}
              tribalCountAK={testCase.tribalCountAK}
              tribalCountUS={null}
              percentTractTribal={testCase.percentTractTribal}

            />
          </LocalizedComponent>,
      );
      expect(asFragment()).toMatchSnapshot();

      screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && content.startsWith(testCase.para1);
      });
    });
  });
});
