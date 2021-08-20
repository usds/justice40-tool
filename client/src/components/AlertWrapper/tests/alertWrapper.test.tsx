import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import AlertWrapper from '../../AlertWrapper';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const PUBLIC_BETA_REGEX = /Public beta/;
const LIMITED_DATA_REGEX = /Limited data sources/;

describe('rendering full the AlertWrapper', () => {
  it('checks if component renders both alerts', () => {
    const component = render(
        <LocalizedComponent>
          <AlertWrapper showBetaAlert={true} showLimitedDataAlert={true}/>
        </LocalizedComponent>,
    );

    expect(component.container).toHaveTextContent(PUBLIC_BETA_REGEX);
    expect(component.container).toHaveTextContent(LIMITED_DATA_REGEX);
  });
});

describe('rendering showBetaAlert the AlertWrapper', () => {
  it('checks if component renders only beta alert', () => {
    const component = render(
        <LocalizedComponent>
          <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
        </LocalizedComponent>,
    );

    expect(component.container).toHaveTextContent(PUBLIC_BETA_REGEX);
    expect(component.container).not.toHaveTextContent(LIMITED_DATA_REGEX);
  });
});

describe('rendering showLimitedDataAlert the AlertWrapper', () => {
  it('checks if component renders only limited data alert', () => {
    const component = render(
        <LocalizedComponent>
          <AlertWrapper showBetaAlert={false} showLimitedDataAlert={true}/>
        </LocalizedComponent>,
    );

    expect(component.container).not.toHaveTextContent(PUBLIC_BETA_REGEX);
    expect(component.container).toHaveTextContent(LIMITED_DATA_REGEX);
  });
});
