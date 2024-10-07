import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders TodosList component', () => {
    render(<App />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();

  });
});