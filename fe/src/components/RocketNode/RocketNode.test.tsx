// import React from 'react';
import { render, screen } from '@testing-library/react';
import RocketNode from './RocketNode';

test('renders learn react link', () => {
  render(<RocketNode name="test" children={7} />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
