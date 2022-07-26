import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Demographics from './Demographics';

describe('rendering of Demographics Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Demographics />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
