import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerUI from "../components/CustomerUI";
import { ROLE_OPTIONS, type Customer } from "../types/customer";
import { within } from "@testing-library/react";

describe("CustomerUI Component", () => {
  const mockUsers: Customer[] = [
    { id: "1", name: "David Miller", email: "david@gmail.com", role: "admin" },
    { id: "2", name: "Lynn Warr", email: "lynn@gmail.com", role: "manager" },
  ];

  const setup = (props: any) => {
    return render(<CustomerUI {...props} />);
  };

  it("renders user type heading", () => {
    setup({
      role: ROLE_OPTIONS.ADMIN,
      setRole: vi.fn(),
      users: [],
      loading: false,
    });

    expect(screen.getByText("User Types")).toBeInTheDocument();
  });

it("renders radio buttons for Admin and Manager", () => {
  render(
    <CustomerUI
      role="admin"
      setRole={() => {}}
      users={[]}
      loading={false}
    />
  );

  expect(screen.getByLabelText("admin")).toBeInTheDocument();
  expect(screen.getByLabelText("manager")).toBeInTheDocument();

  const radios = screen.getAllByRole("radio");
  expect(radios).toHaveLength(2);
});

  it("calls setRole when radio button is clicked", () => {
    const mockSetRole = vi.fn();

    setup({
      role: ROLE_OPTIONS.ADMIN,
      setRole: mockSetRole,
      users: [],
      loading: false,
    });

    const managerRadio = screen.getByText("manager");
    fireEvent.click(managerRadio);

    expect(mockSetRole).toHaveBeenCalledWith(ROLE_OPTIONS.MANAGER);
  });

  it("shows loading state", () => {
    const { container } = setup({
      role: ROLE_OPTIONS.ADMIN,
      setRole: vi.fn(),
      users: [],
      loading: true,
    });

   
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it("shows 'No users found' when list is empty", () => {
    setup({
      role: ROLE_OPTIONS.ADMIN,
      setRole: vi.fn(),
      users: [],
      loading: false,
    });

    expect(screen.getByText("No admin users found.")).toBeInTheDocument();
  });

 it("renders user list when not loading", () => {
  const mockUsers = [
    { id: "1", name: "David Miller", email: "", role: "admin" },
  ];

  render(
    <CustomerUI
      role="admin"
      setRole={() => {}}
      users={mockUsers}
      loading={false}
    />
  );

  expect(screen.getByText("David Miller")).toBeInTheDocument();

 
  const userCard = screen.getByText("David Miller").closest("div")!;
  expect(within(userCard).getByText("admin")).toBeInTheDocument();
});

  it("renders correct user initials", () => {
    setup({
      role: ROLE_OPTIONS.ADMIN,
      setRole: vi.fn(),
      users: mockUsers,
      loading: false,
    });

    expect(screen.getByText("D")).toBeInTheDocument(); // David initial
  });
});
