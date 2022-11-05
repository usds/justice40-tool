import React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PrioritizationCopy from './PrioritizationCopy';

describe('rendering of PrioritizationCopy Component -', () => {
  const testCases = [
    {
      totalCategoriesPrioritized: 0,
      totalBurdensPrioritized: 0,
      isAdjacencyThreshMet: false,
      isAdjacencyLowIncome: false,
      tribalCountAK: null,
      tribalCountUS: null,
      percentTractTribal: null,
      // eslint-disable-next-line max-len
      para1: `This tract is not considered disadvantaged. It does not meet any burden thresholds `,
    },
    {
      totalCategoriesPrioritized: 0,
      totalBurdensPrioritized: 1,
      isAdjacencyThreshMet: false,
      isAdjacencyLowIncome: false,
      tribalCountAK: null,
      tribalCountUS: null,
      percentTractTribal: null,
      // eslint-disable-next-line max-len
      para1: `This tract is not considered disadvantaged. It meets 1 burden threshold`,
    },
    {
      totalCategoriesPrioritized: 0,
      totalBurdensPrioritized: 5,
      isAdjacencyThreshMet: false,
      isAdjacencyLowIncome: false,
      tribalCountAK: null,
      tribalCountUS: null,
      percentTractTribal: null,
      // eslint-disable-next-line max-len
      para1: `This tract is not considered disadvantaged. It meets more than 1 burden threshold `,
    },
    {
      totalCategoriesPrioritized: 2,
      totalBurdensPrioritized: 1,
      isAdjacencyThreshMet: false,
      isAdjacencyLowIncome: false,
      tribalCountAK: null,
      tribalCountUS: null,
      percentTractTribal: null,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it meets 1 burden threshold `,
    },
    {
      totalCategoriesPrioritized: 2,
      totalBurdensPrioritized: 5,
      isAdjacencyThreshMet: false,
      isAdjacencyLowIncome: false,
      tribalCountAK: null,
      tribalCountUS: null,
      percentTractTribal: null,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it meets more than 1 burden threshold `,
    },

    // {
    //   isDonut: false, percentTribal: 0,
    //   totalCategories: 0, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: 0,
    //   totalCategories: 0, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: 0,
    //   totalCategories: 1, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: 0,
    //   totalCategories: 1, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: 0,
    //   totalCategories: 1, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },

    // {
    //   isDonut: false, percentTribal: .31,
    //   totalCategories: 0, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: .31,
    //   totalCategories: 0, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: .31,
    //   totalCategories: 0, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: .31,
    //   totalCategories: 1, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: .31,
    //   totalCategories: 1, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },
    // {
    //   isDonut: false, percentTribal: .31,
    //   totalCategories: 1, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    // },

    // {
    //   isDonut: true, percentTribal: null,
    //   totalCategories: 0, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // },
    // {
    //   isDonut: true, percentTribal: null,
    //   totalCategories: 0, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // },
    // {
    //   isDonut: true, percentTribal: null,
    //   totalCategories: 0, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // },
    // {
    //   isDonut: true, percentTribal: null,
    //   totalCategories: 1, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // },
    // {
    //   isDonut: true, percentTribal: null,
    //   totalCategories: 1, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // },
    // {
    //   isDonut: true, percentTribal: null,
    //   totalCategories: 1, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // },

    // {
    //   isDonut: true, percentTribal: 0,
    //   totalCategories: 0, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: 0,
    //   totalCategories: 0, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: 0,
    //   totalCategories: 0, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: 0,
    //   totalCategories: 1, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: 0,
    //   totalCategories: 1, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: 0,
    //   totalCategories: 1, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },

    // {
    //   isDonut: true, percentTribal: .29,
    //   totalCategories: 0, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: .29,
    //   totalCategories: 0, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: .29,
    //   totalCategories: 0, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: .29,
    //   totalCategories: 1, totalIndicators: 0,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: .29,
    //   totalCategories: 1, totalIndicators: 1,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
    // {
    //   isDonut: true, percentTribal: .29,
    //   totalCategories: 2, totalIndicators: 2,
    // eslint-disable-next-line max-len
    //   para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    // eslint-disable-next-line max-len
    //   para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    // },
  ];

  testCases.forEach((testCase) => {
    // eslint-disable-next-line max-len
    it(`checks if component renders ${testCase.para1} when totCats = ${testCase.totalCategoriesPrioritized}, totBurds = ${testCase.totalBurdensPrioritized}, isAdj = ${testCase.isAdjacencyThreshMet}, isAdjLI = ${testCase.isAdjacencyLowIncome}, tribal % = ${testCase.percentTractTribal},`, () => {
      const {asFragment} = render(
          <LocalizedComponent>
            <PrioritizationCopy
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
