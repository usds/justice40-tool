import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DownloadButton from './DownloadButton';

describe('rendering of DownloadButton Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DownloadButton
          downloadLink='https://google.com'
          buttonText='Hello'
          imageAltTagText='download button'
        />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
