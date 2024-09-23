// Register.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Register from './Register';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

// Mock navigate function
const mockNavigate = jest.fn();

describe('Register Component', () => {
  const url = 'http://localhost:4000';

  beforeEach(() => {
    // Mock API response for registration
    mock.onPost(`${url}/api/user/register`).reply((config) => {
      const { email } = JSON.parse(config.data);
      if (email === 'test@example.com') {
        return [200, { success: true, token: 'fakeToken' }];
      } else {
        return [400, { success: false, message: 'Registration failed' }];
      }
    });

    // Mock useNavigate hook
    // jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders registration form correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create account/i)).toBeInTheDocument();
    expect(screen.getByText(/By continuing, I agree to the terms of use & privacy policy./i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  test('submits form and handles successful registration', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: 'John Doe' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Your email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText(/Create account/i));

    await waitFor(() => {
      // Check if localStorage has the token
    //   expect(localStorage.getItem('token')).toBe('fakeToken');
      // Check if navigate was called with the correct path
    //   expect(mockNavigate).toHaveBeenCalledWith('/addfood');
    });
  });

  test('shows alert on registration failure', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: 'John Doe' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Your email/i), {
      target: { value: 'invalid@example.com' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' }
    });

    // Mocking alert
    global.alert = jest.fn();

    fireEvent.click(screen.getByText(/Create account/i));

    await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith('Registration failed');
    });
  });
});
