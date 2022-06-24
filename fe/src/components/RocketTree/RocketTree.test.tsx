// import React from 'react';
import { render, screen } from '@testing-library/react';
import RocketTree from './RocketTree';

test('renders learn react link', () => {
  render(<RocketTree rocket={{'Rocket': 7}}/>);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
