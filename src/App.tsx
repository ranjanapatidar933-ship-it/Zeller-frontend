import { useState, useMemo } from "react";
import { useCustomers } from "./hooks/useCustomers";
import {  ROLE_OPTIONS, type Customer} from "./types/customer";
import {type CustomerRole } from "./types/customer";
import "./App.css";

function App() {
  const { customers, loading } = useCustomers();
  const [role, setRole] = useState<CustomerRole>(ROLE_OPTIONS.ADMIN);
 

  const filtered: Customer[] = useMemo(
    
    () => customers.filter((c) => c.role === role as string),
    [customers, role]
  );



  return (
    <div className="app-container">
      <h2 className="title">Zeller Customers</h2>

<label>
  <input
    type="radio"
    checked={role === ROLE_OPTIONS.ADMIN}
    onChange={() => setRole(ROLE_OPTIONS.ADMIN)}
  />
  Admin
</label>

<label>
  <input
    type="radio"
    checked={role === ROLE_OPTIONS.MANAGER as string}
    onChange={() => setRole(ROLE_OPTIONS.MANAGER) }  
  />
  Manager
</label>




      <h3 className="section-title">{role} Users</h3>

      {loading && <p>Loading...</p>}

      {!loading && filtered.length === 0 && (
        <p className="no-users">No {role} users found.</p>
      )}

      {!loading &&
        filtered.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.email}</div>
            <div className="user-role">Role: {user.role}</div>
          </div>
        ))}
    </div>
  );
}

export default App;
