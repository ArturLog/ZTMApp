// tests/components/Navbar.test.tsx
import { useAuth } from "@/hooks/useAuth";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";


// Mock dependencies
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

describe("Navbar", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the app title", () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: false, user: null, logout: jest.fn() });

    render(<Navbar />);

    expect(screen.getByText("ZTM App")).toBeInTheDocument();
  });

  test("renders links for logged-in users", () => {
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      user: { id: "123" },
      logout: jest.fn(),
    });

    render(<Navbar />);

    expect(screen.getByText("My Stops")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("renders login and register forms when not logged in", () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: false, user: null, logout: jest.fn() });

    render(<Navbar />);

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("navigates to 'My Stops' when the button is clicked", () => {
    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({ push: pushMock });
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      user: { id: "123" },
      logout: jest.fn(),
    });

    render(<Navbar />);
    const myStopsButton = screen.getByText("My Stops");

    fireEvent.click(myStopsButton);

    expect(pushMock).toHaveBeenCalledWith("/123");
  });

  test("calls logout when the logout button is clicked", () => {
    const logoutMock = jest.fn();
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      user: { id: "123" },
      logout: logoutMock,
    });

    render(<Navbar />);
    const logoutButton = screen.getByText("Logout");

    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });
});

