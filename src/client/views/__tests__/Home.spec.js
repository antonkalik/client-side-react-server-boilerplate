import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../';

describe('<Home /> test', () => {
  test('should render correctly', () => {
    const component = shallow(<Home />);
    expect(component).toMatchSnapshot();
  });
});
