import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  it('renders a button element by default', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toBeTruthy();
    expect(btn.tagName).toBe('BUTTON');
  });

  it('renders with the correct variant class', () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole('button', { name: 'Primary' });
    expect(btn.classList.contains('btn--primary')).toBe(true);
  });

  it('renders as <a> when href is provided', () => {
    render(<Button href="#about">Link</Button>);
    const link = screen.getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#about');
  });

  it('applies additional className prop', () => {
    render(<Button className="custom-class">Styled</Button>);
    const btn = screen.getByRole('button', { name: 'Styled' });
    expect(btn.classList.contains('custom-class')).toBe(true);
  });

  it('passes disabled attribute', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect(btn.hasAttribute('disabled')).toBe(true);
  });
});
