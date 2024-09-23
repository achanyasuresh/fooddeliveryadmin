import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { toast } from 'react-toastify';
import ListFood from './ListFood';  

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockUrl = 'http://localhost:4000'; 

describe('ListFood Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list of foods', async () => {
    const mockData = {
      success: true,
      data: [
        { _id: '1', name: 'Pizza', category: 'Italian', price: 15, image: 'pizza.jpg' },
        { _id: '2', name: 'Burger', category: 'American', price: 10, image: 'burger.jpg' }
      ]
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<ListFood url={mockUrl} />);

    // Verify the title
    expect(screen.getByText(/List All Foods/i)).toBeInTheDocument();

    // Verify food items are displayed
    await waitFor(() => {
      expect(screen.getByText(/Pizza/i)).toBeInTheDocument();
      expect(screen.getByText(/Burger/i)).toBeInTheDocument();
      expect(screen.getByText(/\$15/i)).toBeInTheDocument();
      expect(screen.getByText(/\$10/i)).toBeInTheDocument();
    });
  });



 
  
});
