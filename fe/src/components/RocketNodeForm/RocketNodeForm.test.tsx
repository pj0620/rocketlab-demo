// import React from 'react';
import { render, screen } from '@testing-library/react';
import RocketNodeForm from './RocketNodeForm';

test('renders learn react link', () => {
  render(<RocketNodeForm newNodeHandler={(x:any)=>{}}/>);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
