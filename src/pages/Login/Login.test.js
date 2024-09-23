// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

const mock = new MockAdapter(axios);

describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <Router>
        <Login onLogin={() => {}} />
      </Router>
    );

    expect(screen.getByRole('button',{ name: /Login/i }));
    expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/By continuing, I agree to the terms of use & privacy policy./i)).toBeInTheDocument();
    expect(screen.getByText(/Dont have an account?/i)).toBeInTheDocument();
  });

  test('submits form and navigates on successful login', async () => {
    // Mocking axios.post response
    mock.onPost('http://localhost:4000/api/user/login').reply(200, {
      success: true,
      token: 'fakeToken',
    });

    // Mocking navigate function
    const navigate = jest.fn();

    render(
      <Router>
        <Login onLogin={() => {}} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button',{ name: /Login/i }));
  });

 
});
