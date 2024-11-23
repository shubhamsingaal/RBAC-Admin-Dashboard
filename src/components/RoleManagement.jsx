import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';

const RoleManagement = () => {
  const { roles, addRole, updateRole, deleteRole } = useRBAC();
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const allPermissions = ['Read', 'Write', 'Delete', 'Execute'];

  const handleAddRole = async () => {
    if (!newRole.name.trim()) {
      setSuccessMessage('Role name cannot be empty');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    try {
      setIsLoading(true);
      const newRoleData = { ...newRole, id: Date.now() };
      await addRole(newRoleData);
      setNewRole({ name: '', permissions: [] });
      setSuccessMessage('Role added successfully!');
    } catch (error) {
      console.error('Error adding role:', error);
      setSuccessMessage('Failed to add role');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleEditPermissions = (role) => {
    setEditingRole(role);
  };

  const togglePermission = (permission) => {
    if (editingRole) {
      setEditingRole((prev) => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter((p) => p !== permission)
          : [...prev.permissions, permission],
      }));
    }
  };

  const savePermissions = async () => {
    if (editingRole) {
      try {
        await updateRole(editingRole.id, editingRole);
        setSuccessMessage('Permissions updated successfully!');
        setEditingRole(null);
      } catch (error) {
        console.error('Error updating permissions:', error);
        setSuccessMessage('Failed to update permissions');
      } finally {
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col items-center font-[Helvetica,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">Role Management</h2>

      {/* Add Role Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10 w-full max-w-xl animate-slideDown">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Role</h3>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Role Name"
            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-indigo-300"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <button
            className="bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            onClick={handleAddRole}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Role'}
          </button>
          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg shadow-md animate-fadeIn">
              {successMessage}
            </div>
          )}
        </div>
      </div>

      {/* Roles Table */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-6 animate-fadeIn">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="border-b border-gray-300 p-3">Role Name</th>
              <th className="border-b border-gray-300 p-3">Permissions</th>
              <th className="border-b border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr
                key={role.id}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-gray-100' : ''
                }`}
              >
                <td className="border-b border-gray-300 p-3">{role.name}</td>
                <td className="border-b border-gray-300 p-3">{role.permissions.join(', ')}</td>
                <td className="border-b border-gray-300 p-3 flex space-x-4">
                  <button
                    className="text-indigo-500 hover:text-indigo-700 transition-transform transform hover:scale-110"
                    onClick={() => handleEditPermissions(role)}
                    title="Edit Permissions"
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                    onClick={() => deleteRole(role.id)}
                    title="Delete Role"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Permissions Modal */}
      {editingRole && (
        <div className="mt-6 bg-gray-100 rounded-lg shadow-lg p-6 animate-slideDown">
          <h3 className="text-xl font-semibold text-gray-800">
            Edit Permissions for {editingRole.name}
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {allPermissions.map((permission) => (
              <label key={permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingRole.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="form-checkbox rounded focus:ring focus:ring-indigo-300"
                />
                <span className="text-gray-700">{permission}</span>
              </label>
            ))}
          </div>
          <button
            className="mt-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            onClick={savePermissions}
          >
            Save Permissions
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
