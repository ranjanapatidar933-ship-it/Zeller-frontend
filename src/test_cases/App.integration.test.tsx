import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import App from "../App";
import { useCustomers } from "../hooks/useCustomers";
import CustomerUI from "../components/CustomerUI";
import { ROLE_OPTIONS } from "../types/customer";


vi.mock("../hooks/useCustomers");

vi.mock("../components/CustomerUI", () => {
  return {
    default: vi.fn(() => <div data-testid="customer-ui-mock" />),
  };
});

describe("App Component Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render CustomerUI component", () => {
    (useCustomers as any).mockReturnValue({
      customers: [],
      loading: false,
    });

    render(<App />);

    expect(screen.getByTestId("customer-ui-mock")).toBeInTheDocument();
  });

  it("should pass filtered users to CustomerUI", () => {
    const mockCustomers = [
      { id: "1", name: "Admin User", email: "a@test.com", role: "admin" },
      { id: "2", name: "Manager User", email: "m@test.com", role: "manager" },
    ];

    (useCustomers as any).mockReturnValue({
      customers: mockCustomers,
      loading: false,
    });

    render(<App />);


    const mockComponent = CustomerUI as unknown as ReturnType<typeof vi.fn>;

   
    const props = mockComponent.mock.calls[0][0];

    expect(props.users).toEqual([
      { id: "1", name: "Admin User", email: "a@test.com", role: "admin" },
    ]);
    expect(props.role).toBe(ROLE_OPTIONS.ADMIN);
  });

  it("should update role when setRole is triggered", () => {
    (useCustomers as any).mockReturnValue({
      customers: [
        { id: "1", name: "Admin User", email: "a@test.com", role: "admin" },
        { id: "2", name: "Manager User", email: "m@test.com", role: "manager" },
      ],
      loading: false,
    });

    render(<App />);

    const mockComponent = CustomerUI as unknown as ReturnType<typeof vi.fn>;

  
    const initialProps = mockComponent.mock.calls[0][0];
    expect(initialProps.role).toBe(ROLE_OPTIONS.ADMIN);

   
    act(() => {
      initialProps.setRole(ROLE_OPTIONS.MANAGER);
    });

 
    const latestCallIndex = mockComponent.mock.calls.length - 1;
    const updatedProps = mockComponent.mock.calls[latestCallIndex][0];
    
    expect(updatedProps.role).toBe(ROLE_OPTIONS.MANAGER);
    expect(updatedProps.users).toEqual([
      { id: "2", name: "Manager User", email: "m@test.com", role: "manager" },
    ]);
  });

  it("should pass loading state correctly", () => {
    (useCustomers as any).mockReturnValue({
      customers: [],
      loading: true,
    });

    render(<App />);

    const mockComponent = CustomerUI as unknown as ReturnType<typeof vi.fn>;
    const props = mockComponent.mock.calls[0][0];

    expect(props.loading).toBe(true);
  });
});
