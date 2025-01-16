import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';

describe('Navbar', () => {
  it('should display login buttons when user is not logged in', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('should display user options when user is logged in', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    // Simulate login state
    fireEvent.click(screen.getByText('Login')); // Assuming it triggers login state for test purposes

    expect(screen.getByText('My Stops')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
