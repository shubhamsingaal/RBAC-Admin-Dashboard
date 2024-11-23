export const mockApi = {
    getUsers: () =>
      Promise.resolve([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      ]),
    getRoles: () =>
      Promise.resolve([
        { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
        { id: 2, name: 'User', permissions: ['Read'] },
      ]),
    addUser: (user) => Promise.resolve(user),
    updateUser: (id, user) => Promise.resolve(user),
    deleteUser: (id) => Promise.resolve(id),
    addRole: (role) => Promise.resolve(role),
    updateRole: (id, role) => Promise.resolve(role),
    deleteRole: (id) => Promise.resolve(id),
  };
  