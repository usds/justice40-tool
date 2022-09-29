import React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PrioritizationCopy from './PrioritizationCopy';

describe('rendering of PrioritizationCopy Component -', () => {
  const testCases = [
    {
      isDonut: false, percentTribal: null,
      totalCategories: 0, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is not considered disadvantaged. It does not meet any burden thresholds OR at least one associated socioeconomic threshold.`,
    },
    {
      isDonut: false, percentTribal: null,
      totalCategories: 0, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is not considered disadvantaged. It meets one burden threshold BUT no associated socioeconomic thresholds.`,
    },
    {
      isDonut: false, percentTribal: null,
      totalCategories: 0, totalIndicators: 5,
      // eslint-disable-next-line max-len
      para1: `This tract is not considered disadvantaged. It meets 5 burden thresholds BUT no associated socioeconomic thresholds.`,
    },
    {
      isDonut: false, percentTribal: null,
      totalCategories: 1, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: '',
    },
    {
      isDonut: false, percentTribal: null,
      totalCategories: 1, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it meets one burden threshold AND the associated socio-economic threshold.`,
    },
    {
      isDonut: false, percentTribal: null,
      totalCategories: 2, totalIndicators: 4,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it meets 4 burden thresholds AND the associated socio-economic threshold.`,
    },

    {
      isDonut: false, percentTribal: 0,
      totalCategories: 0, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: 0,
      totalCategories: 0, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: 0,
      totalCategories: 0, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: 0,
      totalCategories: 1, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: 0,
      totalCategories: 1, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: 0,
      totalCategories: 1, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `The less than 1% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },

    {
      isDonut: false, percentTribal: .31,
      totalCategories: 0, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: .31,
      totalCategories: 0, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: .31,
      totalCategories: 0, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: .31,
      totalCategories: 1, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: .31,
      totalCategories: 1, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },
    {
      isDonut: false, percentTribal: .31,
      totalCategories: 1, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `The 31% of this tract that are Federally-Recognized Tribal lands are considered disadvantaged.`,
    },

    {
      isDonut: true, percentTribal: null,
      totalCategories: 0, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    },
    {
      isDonut: true, percentTribal: null,
      totalCategories: 0, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    },
    {
      isDonut: true, percentTribal: null,
      totalCategories: 0, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    },
    {
      isDonut: true, percentTribal: null,
      totalCategories: 1, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    },
    {
      isDonut: true, percentTribal: null,
      totalCategories: 1, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    },
    {
      isDonut: true, percentTribal: null,
      totalCategories: 1, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
    },

    {
      isDonut: true, percentTribal: 0,
      totalCategories: 0, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: 0,
      totalCategories: 0, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: 0,
      totalCategories: 0, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: 0,
      totalCategories: 1, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: 0,
      totalCategories: 1, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: 0,
      totalCategories: 1, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The less than 1% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },

    {
      isDonut: true, percentTribal: .29,
      totalCategories: 0, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: .29,
      totalCategories: 0, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: .29,
      totalCategories: 0, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: .29,
      totalCategories: 1, totalIndicators: 0,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: .29,
      totalCategories: 1, totalIndicators: 1,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
    {
      isDonut: true, percentTribal: .29,
      totalCategories: 2, totalIndicators: 2,
      // eslint-disable-next-line max-len
      para1: `This tract is considered disadvantaged because it is surrounded by tracts that are disadvantaged AND meets an adjusted low income threshold.`,
      // eslint-disable-next-line max-len
      para2: `The 29% of this tract that are Federally-Recognized Tribal lands are also considered disadvantaged.`,
    },
  ];

  testCases.forEach((testCase) => {
    // eslint-disable-next-line max-len
    it(`checks if component renders ${testCase.para1} when isDonut = ${testCase.isDonut}, tribal % = ${testCase.percentTribal}, category count = ${testCase.totalCategories} and indicator count = ${testCase.totalIndicators}`, () => {
      const {asFragment} = render(
          <LocalizedComponent>
            <PrioritizationCopy
              isDonut={testCase.isDonut}
              percentTractTribal={testCase.percentTribal}
              totalCategoriesPrioritized={testCase.totalCategories}
              totalIndicatorsPrioritized={testCase.totalIndicators}
            />
          </LocalizedComponent>,
      );
      expect(asFragment()).toMatchSnapshot();

      screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && content.startsWith(testCase.para1);
      });
      testCase.para2 ?? screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && content.startsWith(testCase.para1);
      });
    });
  });
});
