import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/AxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/Auth/useAuth";

const AdminManageUser = () => {
  const axiosSecure = useAxiosPublic();
  const {user} = useAuth()

  const {
    isLoading,
    error,
    refetch,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const { mutate: roleChanged } = useMutation({
    mutationFn: async ({ id, role }) => {
      const { data } = await axiosSecure.patch(`/users/${id}`, { role });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Role changed successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to change role");
    },
  });

  const roleHandle = (id, event) => {
    const role = event.target.value;
    roleChanged({ id, role });
  };

  const { mutate: blocked } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/users/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Action successful");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Try again");
    },
  });

  const blockHandler = (id, status) => {
    blocked({ id, status });
  };

  if (error) return <h2>Error</h2>;
  if (isLoading) return <h2>Loading.....</h2>;
  if (!users || users.length === 0) return <h2>No users found</h2>;

  const disabledHandler = users.find(current => current?.email === user?.email)
  console.log(disabledHandler)

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Role Change
              </th>
              <th scope="col" className="px-6 py-3">
                User Block
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((usered) => (
              <tr key={usered?._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={usered.img}
                    className="w-8 h-8"
                    alt={user?.username}
                  />
                </th>
                <td className="px-6 py-4">{usered?.username}</td>
                <td className="px-6 py-4">{usered?.email}</td>
                <td className="px-6 py-4">{usered?.userRole}</td>
                <td className="px-6 py-4">
                  <select
                    onChange={(event) => roleHandle(usered._id, event)}
                    value={usered.userRole}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option disabled={user?.email === usered?.email } value="user">
                      User
                    </option>
                    <option
                      disabled={user?.email === usered?.email }
                      value="seller"
                    >
                      Seller
                    </option>
                    <option disabled={user?.email === usered?.email } value="admin">
                      Admin
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {!user?.status ? (
                    <button
                    disabled={user?.email === usered?.email }
                      onClick={() => blockHandler(usered._id, true)}
                      className={`${user?.email === usered?.email ? 'text-gray-400 font-bold' : 'text-red-600 font-bold'}`}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                    disabled={user?.email === usered?.email }
                      onClick={() => blockHandler(usered._id, false)}
                      className={`${user?.email === usered?.email ? '' : 'text-red-600 font-bold'}`}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUser;
