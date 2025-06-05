import React, { useState, useContext } from 'react';
import Card from '../components/Card';
import TestTable from '../components/ui/table/TestTable';
import EnhancedTable from '../components/ui/table/EnhancedTable';
import { useToast } from '../context/ToastContext';
import Modal from '../components/ui/Modal';

const TestPage = () => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Sample data for the enhanced table
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-06-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-05-28',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: '2023-04-15',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'User',
      status: 'Pending',
      lastLogin: '2023-06-02',
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-05-30',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-05-25',
    },
    {
      id: 7,
      name: 'Michael Wilson',
      email: 'michael@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: '2023-04-10',
    },
  ];

  // Table columns configuration
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : row.status === 'Inactive'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: 'lastLogin', label: 'Last Login' },
  ];

  // Handle edit action
  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setCurrentUser(user);
    setShowModal(true);
  };

  // Handle view action
  const handleView = (id) => {
    const user = users.find((user) => user.id === id);
    toast.info(`Viewing ${user.name}'s profile`);
  };

  // Handle add action
  const handleAdd = () => {
    setCurrentUser(null); // Reset current user for new entry
    setShowModal(true);
  };

  return (
    <main className="flex-1 p-6 bg-secondary overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Data Tables</h1>
        <p className="text-sm text-gray-500 mt-1">
          Modern table implementations with sorting, filtering, and actions
        </p>
      </div>

      <div className="space-y-6">
        {/* Original Table */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Basic Table
          </h2>
          <Card>
            <TestTable />
          </Card>
        </div>

        {/* Enhanced Table */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Enhanced Table with Toast Notifications
          </h2>
          <EnhancedTable
            title="Users"
            columns={columns}
            data={users}
            onEdit={handleEdit}
            onView={handleView}
            onAdd={handleAdd}
          />
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        title={currentUser ? `Edit User: ${currentUser.name}` : 'Add New User'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              defaultValue={currentUser?.name || ''}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue={currentUser?.email || ''}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              defaultValue={currentUser?.role || 'User'}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
            >
              <option>User</option>
              <option>Admin</option>
              <option>Editor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              defaultValue={currentUser?.status || 'Active'}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                toast.success(
                  currentUser
                    ? 'User updated successfully!'
                    : 'New user added successfully!'
                );
              }}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              {currentUser ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default TestPage;
