import { useState, useMemo } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { ROLE_OPTIONS, type CustomerRole, type Customer } from "../types/customer";
import CustomerUI from "../components/CustomerUI";

export default function CustomerContainer() {
  const { customers, loading } = useCustomers();
  const [role, setRole] = useState<CustomerRole>(ROLE_OPTIONS.ADMIN);

  const filtered: Customer[] = useMemo(
    () => customers.filter((c) => c.role === role),
    [customers, role]
  );

  return (
    <CustomerUI
      role={role}
      setRole={setRole}
      users={filtered}
      loading={loading}
    />
  );
}
