import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faEllipsisVertical,
  faEye,
  faPencil,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../../../context/ToastContext';

// Sample data
const generateData = () => {
  const statuses = ['Active', 'Pending', 'Completed', 'Cancelled'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  return Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Task ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    progress: Math.floor(Math.random() * 100),
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    )
      .toISOString()
      .split('T')[0],
    assignee: `User ${Math.floor(Math.random() * 10) + 1}`,
  }));
};

const data = generateData();

const TestTable = () => {
  const toast = useToast();
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handle row selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  // Handle delete action
  const handleDelete = (id, name) => {
    // Here you would typically call an API to delete the item

    // For demonstration, let's use different toast types based on the task ID
    if (id % 4 === 0) {
      toast.error(`Failed to delete task "${name}". Please try again.`);
    } else if (id % 4 === 1) {
      toast.success(`Task "${name}" deleted successfully!`);
    } else if (id % 4 === 2) {
      toast.info(`Task "${name}" moved to archive.`);
    } else {
      toast.warning(`Task "${name}" will be permanently deleted.`);
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field)
      return (
        <FontAwesomeIcon icon={faSort} className="ml-2 text-gray-400 text-xs" />
      );
    return sortDirection === 'asc' ? (
      <FontAwesomeIcon icon={faSortUp} className="ml-2 text-gray-700 text-xs" />
    ) : (
      <FontAwesomeIcon
        icon={faSortDown}
        className="ml-2 text-gray-700 text-xs"
      />
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusClass = () => {
      switch (status) {
        case 'Active':
          return 'status-badge status-badge-green';
        case 'Pending':
          return 'status-badge status-badge-yellow';
        case 'Completed':
          return 'status-badge status-badge-blue';
        case 'Cancelled':
          return 'status-badge status-badge-red';
        default:
          return 'status-badge status-badge-gray';
      }
    };

    return <span className={getStatusClass()}>{status}</span>;
  };

  // Progress bar component
  const ProgressBar = ({ value }) => {
    const getProgressColor = () => {
      if (value < 25) return 'bg-red-500';
      if (value < 50) return 'bg-yellow-500';
      if (value < 75) return 'bg-blue-500';
      return 'bg-green-500';
    };

    return (
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div
          className={`${getProgressColor()} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 mt-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">Tasks</span>
          {selectedRows.length > 0 && (
            <span className="bg-brand/10 text-brand px-2 py-1 rounded-md text-xs font-medium">
              {selectedRows.length} selected
            </span>
          )}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="px-4 py-2.5 bg-brand text-white rounded-lg text-sm hover:bg-brand/90 transition-colors duration-200 flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-brand focus:ring-brand"
                      onChange={handleSelectAll}
                      checked={
                        paginatedData.length > 0 &&
                        selectedRows.length === paginatedData.length
                      }
                    />
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID {getSortIcon('id')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Task {getSortIcon('name')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center">
                    Priority {getSortIcon('priority')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('progress')}
                >
                  <div className="flex items-center">
                    Progress {getSortIcon('progress')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date {getSortIcon('date')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleSort('assignee')}
                >
                  <div className="flex items-center">
                    Assignee {getSortIcon('assignee')}
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded text-brand focus:ring-brand"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{row.id}
                  </td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
                        row.priority === 'Critical'
                          ? 'bg-red-50 text-red-700'
                          : row.priority === 'High'
                          ? 'bg-yellow-50 text-yellow-700'
                          : row.priority === 'Medium'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <ProgressBar value={row.progress} />
                      <span className="text-xs text-gray-500 font-medium">
                        {row.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {row.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                        {row.assignee.charAt(0)}
                      </div>
                      <span>{row.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-brand transition-colors">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="text-gray-400 hover:text-brand transition-colors">
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => handleDelete(row.id, row.name)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="table-pagination">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, sortedData.length)}
              </span>{' '}
              of <span className="font-medium">{sortedData.length}</span>{' '}
              results
            </p>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`table-page-btn ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'table-page-btn-inactive'
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`table-page-btn ${
                    currentPage === pageNumber
                      ? 'table-page-btn-active'
                      : 'table-page-btn-inactive'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`table-page-btn ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'table-page-btn-inactive'
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTable;
