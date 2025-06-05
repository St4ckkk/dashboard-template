import React from 'react';
import Card from '../components/Card';
import TestTable from '../components/ui/table/TestTable';

const TestPage = () => {
  return (
    <main className="flex-1 p-6 bg-secondary overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Test Page</h1>
        <p className="text-sm text-gray-500 mt-1">
          Modern table implementation example
        </p>
      </div>

      <Card>
        <TestTable />
      </Card>
    </main>
  );
};

export default TestPage;
