import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'; // Import icons from React Icons

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser } = useRBAC();
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      addUser({ ...newUser, id: Date.now() });
      setNewUser({ name: '', email: '', role: '', status: 'Active' });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col items-center font-[Helvetica,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">User Management</h2>

      {/* Add New User Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10 w-full max-w-xl animate-slideDown">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New User</h3>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-indigo-300"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-indigo-300"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-indigo-300"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <button
            className="bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-6 animate-fadeIn">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="border-b border-gray-300 p-3">Name</th>
              <th className="border-b border-gray-300 p-3">Email</th>
              <th className="border-b border-gray-300 p-3">Role</th>
              <th className="border-b border-gray-300 p-3">Status</th>
              <th className="border-b border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-gray-100' : ''
                }`}
              >
                <td className="border-b border-gray-300 p-3">{user.name}</td>
                <td className="border-b border-gray-300 p-3">{user.email}</td>
                <td className="border-b border-gray-300 p-3">{user.role}</td>
                <td className="border-b border-gray-300 p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border-b border-gray-300 p-3 flex space-x-4">
                  {/* Toggle Status Button */}
                  <button
                    className={`p-2 rounded-full ${
                      user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                    } hover:opacity-80 transform transition-transform hover:scale-110`}
                    onClick={() =>
                      updateUser(user.id, {
                        ...user,
                        status: user.status === 'Active' ? 'Inactive' : 'Active',
                      })
                    }
                    title={`Toggle status to ${
                      user.status === 'Active' ? 'Inactive' : 'Active'
                    }`}
                  >
                    {user.status === 'Active' ? (
                      <AiOutlineClose className="text-white w-5 h-5" />
                    ) : (
                      <AiOutlineCheck className="text-white w-5 h-5" />
                    )}
                  </button>
                  {/* Delete User Button */}
                  <button
                    className="text-red-500 hover:text-red-700 transform transition-transform hover:scale-110"
                    onClick={() => deleteUser(user.id)}
                    title="Delete User"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
