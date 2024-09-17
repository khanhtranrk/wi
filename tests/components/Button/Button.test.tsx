import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from '@/components';

describe('Button component', () => {
  test('renders the Button component', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toHaveClass('custom-class');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('passes additional props to the button element', () => {
    render(<Button data-testid="custom-button">Click me</Button>);
    const buttonElement = screen.getByTestId('custom-button');
    expect(buttonElement).toBeInTheDocument();
  });
});
