import { ROLE_OPTIONS, type Customer, type CustomerRole } from "../types/customer";

function Loader() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

type Props = {
  role: CustomerRole;
  setRole: (r: CustomerRole) => void;
  users: Customer[];
  loading: boolean;
};

export default function CustomerUI({ role, setRole, users, loading }: Props) {
  return (
    <div className="max-w-xl mx-auto p-6">

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Types</h2>

        <div className="flex flex-col gap-3">
          {Object.values(ROLE_OPTIONS).map((r) => (
            <label
              key={r}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer
              ${role === r ? "bg-blue-50 border-blue-500" : "border-gray-300"}`}
            >
              <input
                type="radio"
                checked={role === r}
                onChange={() => setRole(r)}
              />
              <span className="text-gray-700 capitalize">{r}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-4 capitalize">{role}</h3>

      {loading && <Loader />}

      {!loading && users.length === 0 && (
        <p className="text-gray-500">No {role} users found.</p>
      )}

      {!loading &&
        users.map((user) => (
          <div key={user.id} className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-200 text-blue-600 font-semibold">
              {user.name[0]}
            </div>

            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
