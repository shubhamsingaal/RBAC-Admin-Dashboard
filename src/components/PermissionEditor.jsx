import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';

const PermissionEditor = () => {
  const { roles, updateRole } = useRBAC();
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Dynamically derive selectedRole
  const selectedRole = roles.find((role) => role.id === selectedRoleId);

  // Handle role selection
  const handleRoleChange = (roleId) => {
    setSelectedRoleId(Number(roleId));
    const role = roles.find((r) => r.id === Number(roleId));
    setPermissions(role ? [...role.permissions] : []);
    setSuccessMessage(''); // Clear success message when changing role
  };

  // Toggle permissions
  const togglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  // Save permissions to context
  const savePermissions = () => {
    if (selectedRole) {
      updateRole(selectedRole.id, { ...selectedRole, permissions });
      setSuccessMessage('Permissions saved successfully!'); // Show success message
      setTimeout(() => setSuccessMessage(''), 3000); // Clear after 3 seconds
    }
  };

  const allPermissions = ['Read', 'Write', 'Delete', 'Execute'];

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col items-center font-[Helvetica,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">Permission Editor</h2>

      {/* Role Selector */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10 w-full max-w-xl animate-slideDown">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Select Role</h3>
        <select
          className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring focus:ring-indigo-300"
          value={selectedRoleId || ''}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="">Select a Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg shadow-md w-full max-w-xl animate-fadeIn">
          {successMessage}
        </div>
      )}

      {/* Permissions Section */}
      {selectedRole && (
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 animate-slideDown">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Permissions for {selectedRole.name}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {allPermissions.map((permission) => (
              <label key={permission} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="form-checkbox h-5 w-5 rounded focus:ring focus:ring-indigo-300"
                />
                <span className="text-gray-700">{permission}</span>
              </label>
            ))}
          </div>
          <button
            className="mt-6 bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            onClick={savePermissions}
          >
            Save Permissions
          </button>
        </div>
      )}
    </div>
  );
};

export default PermissionEditor;
