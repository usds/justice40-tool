import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import SurveyButton from './SurveyButton';

describe('rendering of the SurveyButton', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <SurveyButton />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
