import React from 'react';
import renderer from 'react-test-renderer';
import J40Footer from './J40Footer';
import {LocalizedComponent} from '../test/testHelpers';

describe('J40Footer', () => {
  it('renders correctly', () => {
    const tree = renderer
        .create(<LocalizedComponent><J40Footer /></LocalizedComponent>)
        .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
