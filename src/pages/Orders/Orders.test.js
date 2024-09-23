// Order.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Order from './Orders';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

describe('Order Component', () => {
  const url = 'http://localhost:4000';

  beforeEach(() => {
    // Mock API response for fetching orders
    mock.onGet(`${url}/api/order/list`).reply(200, {
      success: true,
      data: [
        {
          _id: '1',
          items: [{ name: 'Burger', quantity: 2 }],
          address: {
            firstName: 'John',
            lastName: 'Doe',
            street: '123 Elm St',
            city: 'Metropolis',
            state: 'NY',
            country: 'USA',
            zipcode: '12345',
            phone: '555-1234',
          },
          amount: 20.5,
          status: 'Food Processing'
        }
      ]
    });

    // Mock API response for updating order status
    mock.onPost(`${url}/api/order/status`).reply(200, {
      success: true
    });
  });

  test('renders orders correctly', async () => {
    render(<Order url={url} />);

    // Wait for orders to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(/Order Page/i)).toBeInTheDocument();
      expect(screen.getByText(/Burger x 2/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/123 Elm St,/i)).toBeInTheDocument();
      expect(screen.getByText(/555-1234/i)).toBeInTheDocument();
      expect(screen.getByText(/\$20.5/i)).toBeInTheDocument();
    });
  });

  test('updates order status', async () => {
    render(<Order url={url} />);

    // Wait for orders to be fetched and rendered
    await waitFor(async () => {
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'Delivered' } });
      
      // Check if status update was called
      await waitFor(() => {
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].data).toContain('Delivered');
      });
    });
  });
});
