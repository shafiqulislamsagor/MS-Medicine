import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/AxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";

const AdminManageUser = () => {
  const axiosSecure = useAxiosPublic();

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
    onSuccess: async () => {
      refetch();
      toast.success(`Role changed successfully`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Failed to change role`);
    },
  });

  const roleHandle = (id, event) => {
    const role = event.target.value;
    // console.log(setRole, id);
    roleChanged({ id, role });
  };

  const { mutate: blocked } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/user/${id}`, { status });
      return data;
    },
    onSuccess: async () => {
      refetch();
      toast.success(`Your action successfully`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(`try again`);
    },
  });

  const blockHandler = (id, status) => {
    blocked({ id, status });
  };

  const unblockHandler = (id, status) => {
    blocked({ id, status });
  };

  if (error) return <h2>Error</h2>;

  if (isLoading) return <h2>Loading.....</h2>;

  if (users.length === 0) return <h2>No users found</h2>;

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
            {users.map((user) => (
              <tr key={user._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <img src={user.img} className="w-8 h-8" alt={user.username} />
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.userRole}</td>
                <td className="px-6 py-4">
                  <select
                    onChange={(event) => roleHandle(user._id, event)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {!user.status ? (
                    <button
                      onClick={() => blockHandler(user._id, true)}
                      className="text-red-600 font-bold"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => unblockHandler(user._id, false)}
                      className="text-red-600 font-bold"
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
