import React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractPrioritization from './TractPrioritization';

describe('rendering of TractPrioritization Component', () => {
  const testCases = [
    {totalCategories: 3, isDonut: true, percentTribal: null, prio: 'YES'},
    {totalCategories: 2, isDonut: true, percentTribal: 0, prio: 'YES'},
    {totalCategories: 1, isDonut: true, percentTribal: .34, prio: 'YES'},

    {totalCategories: 4, isDonut: false, percentTribal: null, prio: 'YES'},
    {totalCategories: 5, isDonut: false, percentTribal: 0, prio: 'YES'},
    {totalCategories: 7, isDonut: false, percentTribal: .82, prio: 'YES'},

    {totalCategories: 0, isDonut: true, percentTribal: null, prio: 'YES'},
    {totalCategories: 0, isDonut: true, percentTribal: 0, prio: 'YES'},
    {totalCategories: 0, isDonut: true, percentTribal: .12, prio: 'YES'},

    {totalCategories: 0, isDonut: false, percentTribal: .12, prio: 'Partially'},
    {totalCategories: 0, isDonut: false, percentTribal: 0, prio: 'Partially'},

    {totalCategories: 0, isDonut: false, percentTribal: null, prio: 'No'},
  ];

  testCases.forEach((testCase) => {
  // eslint-disable-next-line max-len
    it(`checks if component renders ${testCase.prio} when category count = ${testCase.totalCategories}, isDonut = ${testCase.isDonut}, tribal % = ${testCase.percentTribal}`, () => {
      const {asFragment} = render(
          <LocalizedComponent>
            <TractPrioritization
              totalCategoriesPrioritized={testCase.totalCategories}
              isDonut={testCase.isDonut}
              percentTractTribal={testCase.percentTribal}
            />
          </LocalizedComponent>,
      );
      expect(asFragment()).toMatchSnapshot();
      screen.getByText(testCase.prio);
    });
  });
  // it('checks if component renders YES when category count >= 1, isDonut = true, tribal % = null', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={3}
  //           isDonut={true}
  //           percentTractTribal={null}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count >= 1, isDonut = true, tribal % = 0', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={3}
  //           isDonut={true}
  //           percentTractTribal={0}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count >= 1, isDonut = true, tribal % = .47', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={3}
  //           isDonut={true}
  //           percentTractTribal={.47}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count >= 1, isDonut = false, tribal % = null', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={3}
  //           isDonut={false}
  //           percentTractTribal={null}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count >= 1, isDonut = false, tribal % = 0', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={3}
  //           isDonut={false}
  //           percentTractTribal={0}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count >= 1, isDonut = false, tribal % = .87', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={3}
  //           isDonut={false}
  //           percentTractTribal={.87}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it('checks if component renders YES when category count == 0, isDonut = true, tribal % = null', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={0}
  //           isDonut={true}
  //           percentTractTribal={null}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count == 0, isDonut = true, tribal % = 0', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={0}
  //           isDonut={true}
  //           percentTractTribal={0}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders YES when category count == 0, isDonut = true, tribal % = .67', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={0}
  //           isDonut={true}
  //           percentTractTribal={.67}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it('checks if component renders PARTIALLY when category count == 0, isDonut = false, tribal % = .33', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={0}
  //           isDonut={false}
  //           percentTractTribal={.33}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders PARTIALLY when category count == 0, isDonut = false, tribal % = 0', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={0}
  //           isDonut={false}
  //           percentTractTribal={0}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
  // it('checks if component renders NO when category count == 0, isDonut = false, tribal % = null', () => {
  //   const {asFragment} = render(
  //       <LocalizedComponent>
  //         <TractPrioritization
  //           totalCategoriesPrioritized={0}
  //           isDonut={false}
  //           percentTractTribal={null}
  //         />
  //       </LocalizedComponent>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
