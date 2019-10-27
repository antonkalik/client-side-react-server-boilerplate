import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';

describe('<Home /> test', () => {
  test('should render correctly', () => {
    const component = shallow(<Home />);
    expect(component.find('Header')).toHaveLength(1);
    expect(component.find('Content')).toHaveLength(1);
    expect(component.hasClass('home')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
