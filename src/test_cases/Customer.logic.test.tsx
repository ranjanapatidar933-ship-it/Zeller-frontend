import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";;
import { useCustomers } from "../hooks/useCustomers";
import CustomerContainer from "../components/CustomerContainer";




vi.mock("../hooks/useCustomers");

describe("CustomerContainer Component", () => {
  const mockUseCustomers = useCustomers as vi.MockedFunction<typeof useCustomers>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders CustomerUI with loading state", () => {
    mockUseCustomers.mockReturnValue({
      customers: [],
      loading: true,
    });

    render(<CustomerContainer />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders filtered admin users", () => {
    mockUseCustomers.mockReturnValue({
      customers: [
        { id: "1", name: "John", email: "john@test.com", role: "admin" },
        { id: "2", name: "Sam", email: "sam@test.com", role: "manager" },
      ],
      loading: false,
    });

    render(<CustomerContainer />);

   
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.queryByText("Sam")).not.toBeInTheDocument();
  });

  it("changes role and filters users when Manager radio is selected", () => {
    mockUseCustomers.mockReturnValue({
      customers: [
        { id: "1", name: "John", email: "john@test.com", role: "admin" },
        { id: "2", name: "Sam", email: "sam@test.com", role: "manager" },
      ],
      loading: false,
    });

    render(<CustomerContainer />);

 
    expect(screen.getByText("John")).toBeInTheDocument();

 
    fireEvent.click(screen.getByLabelText(/manager/i));
 
    expect(screen.getByText("Sam")).toBeInTheDocument();
    expect(screen.queryByText("John")).not.toBeInTheDocument();
  });

  it("passes correct props to CustomerUI", () => {
    mockUseCustomers.mockReturnValue({
      customers: [
        { id: "1", name: "John", email: "john@test.com", role: "admin" },
      ],
      loading: false,
    });

    render(<CustomerContainer />);

    
    expect(screen.getAllByText(/admin/i).length).toBeGreaterThan(0);

  
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
