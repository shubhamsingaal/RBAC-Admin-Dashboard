import React, { useState } from 'react';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionEditor from './components/PermissionEditor';

const App = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-[Helvetica,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto]">
      {/* Navbar */}
      <header className="bg-indigo-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center animate-fadeIn">
          RBAC Admin Dashboard
        </h1>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white shadow-lg flex justify-center space-x-6 py-4 animate-slideDown">
        {[
          { id: 'users', label: 'User Management' },
          { id: 'roles', label: 'Role Management' },
          { id: 'permissions', label: 'Permission Editor' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-8 py-3 rounded-full font-medium transition-transform transform hover:scale-105 shadow-md ${
              activeTab === tab.id
                ? 'bg-indigo-500 text-white'
                : 'text-indigo-500 bg-white border border-indigo-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-8 animate-fadeIn">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'roles' && <RoleManagement />}
        {activeTab === 'permissions' && <PermissionEditor />}
      </main>

      {/* Footer */}
      <footer className="text-center bg-indigo-600 text-white py-4 mt-10 shadow-inner">
        <p className="text-sm">RBAC Admin Dashboard &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
