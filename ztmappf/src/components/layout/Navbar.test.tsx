// tests/components/Navbar.test.tsx
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";

jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "@/hooks/useAuth"; // Ensure this is imported after the mock

test("renders links for logged-in users", () => {
  // Use the correct type or cast to `jest.Mock`
  (useAuth as jest.Mock).mockReturnValue({ isLoggedIn: true, user: { id: "1" } });

  render(<Navbar />);

  expect(screen.getByText("My Stops")).toBeInTheDocument();
  expect(screen.getByText("Profile")).toBeInTheDocument();
});

