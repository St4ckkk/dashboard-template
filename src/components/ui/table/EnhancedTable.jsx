import React, { useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSort,
  faSortUp,
  faSortDown,
  faEdit,
  faTrash,
  faEye,
  faPlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const EnhancedTable = ({
  columns = [],
  data = [],
  title = 'Table',
  showActions = true,
  enableSelection = true,
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
  onAdd = () => {},
}) => {
  const toast = useToast();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle row selection
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      if (selectAll) setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === data.length) setSelectAll(true);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning('No rows selected');
      return;
    }

    // In a real app, this would call an API
    toast.success(`${selectedRows.length} rows deleted successfully`);
    setSelectedRows([]);
    setSelectAll(false);
  };

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSortedData().slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete with confirmation
  const handleDelete = (id) => {
    // In a real app, you might show a confirmation dialog
    toast.info('Deleting record...');

    // Simulate API call
    setTimeout(() => {
      toast.success('Record deleted successfully');
      // In a real app, you would update the data here
    }, 1000);
  };

  // Handle edit
  const handleEdit = (id) => {
    toast.info(`Editing record ${id}`);
    onEdit(id);
  };

  // Handle view
  const handleView = (id) => {
    toast.info(`Viewing record ${id}`);
    onView(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faTrash} className="text-xs" />
              <span>Delete Selected</span>
            </button>
          )}
          <button
            onClick={() => {
              onAdd();
              toast.info('Adding new record');
            }}
            className="px-3 py-1.5 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand/90 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {enableSelection && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {sortConfig.key === column.key ? (
                      <FontAwesomeIcon
                        icon={
                          sortConfig.direction === 'ascending'
                            ? faSortUp
                            : faSortDown
                        }
                        className="text-gray-400"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSort}
                        className="text-gray-300"
                      />
                    )}
                  </div>
                </th>
              ))}
              {showActions && (
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {enableSelection && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleView(row.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="text-brand hover:text-brand/70"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, data.length)}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <span>&laquo;</span>
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'z-10 bg-brand border-brand text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <span>&raquo;</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTable;
