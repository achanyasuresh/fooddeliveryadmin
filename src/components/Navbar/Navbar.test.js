import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Navbar"
import '@testing-library/jest-dom/extend-expect';

describe('Navbar Component', () => {
  const onLogoutMock = jest.fn(); // Mock the onLogout function

  test('renders all links and icons', () => {
    // Render the component inside Router to handle NavLink
    render(
      <Router>
        <Navbar onLogout={onLogoutMock} />
      </Router>
    );

    // Check if all the links and icons are rendered
    expect(screen.getByText('Add Items')).toBeInTheDocument();
    expect(screen.getByText('List Items')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument(); // Check if the logo is present
  });

});
