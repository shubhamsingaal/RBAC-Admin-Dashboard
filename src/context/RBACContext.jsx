import React, { createContext, useContext, useState } from 'react';

const RBACContext = createContext();

export const useRBAC = () => useContext(RBACContext);

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  ]);
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] },
  ]);

  const addUser = (user) => setUsers((prev) => [...prev, user]);
  const updateUser = (id, updatedUser) => setUsers((prev) =>
    prev.map((user) => (user.id === id ? updatedUser : user))
  );
  const deleteUser = (id) => setUsers((prev) => prev.filter((user) => user.id !== id));

  const addRole = (role) => setRoles((prev) => [...prev, role]);
  const updateRole = (id, updatedRole) => setRoles((prev) =>
    prev.map((role) => (role.id === id ? updatedRole : role))
  );
  const deleteRole = (id) => setRoles((prev) => prev.filter((role) => role.id !== id));

  return (
    <RBACContext.Provider value={{ users, roles, addUser, updateUser, deleteUser, addRole, updateRole, deleteRole }}>
      {children}
    </RBACContext.Provider>
  );
};
