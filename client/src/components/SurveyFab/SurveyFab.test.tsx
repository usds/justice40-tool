import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import SurveyFab from './SurveyFab';
import {onClickHandler} from './SurveyFab';

describe('rendering of the SurveyFab', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <SurveyFab />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('test clickHandler', () => {
  it('clickHandler should fire successfully', () => {
    onClickHandler();
  });
});
