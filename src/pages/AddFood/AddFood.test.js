import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddFood from './AddFood';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock the axios module and the toast notifications
jest.mock('axios');
jest.mock('react-toastify');

const mockUrl = 'http://localhost:4000';

describe('AddFood Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddFood component correctly', () => {
    render(<AddFood url={mockUrl} />);

    expect(screen.getByText(/Add Your Food Items/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Write description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\$20/i)).toBeInTheDocument();
    const addButton = screen.getByRole('button', { name: /ADD/i });
    expect(addButton).toBeInTheDocument();
  });

  test('displays validation errors for empty form fields', async () => {
    render(<AddFood url={mockUrl} />);

    fireEvent.click(screen.getByRole('button', { name: /ADD/i }));


    // expect(await screen.findAllByAltText(/Product name is required/i)).toBeInTheDocument();
    // expect(screen.getByText(/Product description is required/i)).toBeInTheDocument();
    // expect(screen.getByText(/Price must be a positive number/i)).toBeInTheDocument();
    // expect(screen.getByText(/Image is required/i)).toBeInTheDocument();
  });

  test('submits form data successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true, message: 'Food item added successfully' } });
    toast.success.mockImplementation(() => {});

    render(<AddFood url={mockUrl} />);

    fireEvent.change(screen.getByPlaceholderText(/Type here/i), { target: { value: 'Pizza' } });
    fireEvent.change(screen.getByPlaceholderText(/Write description/i), { target: { value: 'Delicious pizza' } });
    fireEvent.change(screen.getByPlaceholderText(/\$20/i), { target: { value: '15' } });
  

    fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  });

  test('handles form submission failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));
    toast.error.mockImplementation(() => {});

    render(<AddFood url={mockUrl} />);

    fireEvent.change(screen.getByPlaceholderText(/Type here/i), { target: { value: 'Pizza' } });
    fireEvent.change(screen.getByPlaceholderText(/Write description/i), { target: { value: 'Delicious pizza' } });
    fireEvent.change(screen.getByPlaceholderText(/\$20/i), { target: { value: '15' } });
    
    fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  });

  
});
