import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';

const products = [
  { id: '01', name: 'Home Decor Range', percentage: 45, color: 'blue' },
  {
    id: '02',
    name: 'Disney Princess Pink Bag 18"',
    percentage: 29,
    color: 'green',
  },
  { id: '03', name: 'Bathroom Essentials', percentage: 18, color: 'purple' },
  { id: '04', name: 'Apple Smartwatches', percentage: 25, color: 'amber' },
];

export const ProductsTable = () => {
  return (
    <div className="h-64 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="text-gray-500 text-sm font-medium w-12 pb-2 pt-0">
              #
            </TableHead>
            <TableHead className="text-gray-500 text-sm font-medium pb-2 pt-0">
              Name
            </TableHead>
            <TableHead className="text-gray-500 text-sm font-medium pb-2 pt-0">
              Popularity
            </TableHead>
            <TableHead className="text-gray-500 text-sm font-medium pb-2 pt-0 text-right">
              Sales
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="border-t border-gray-100 hover:bg-transparent"
            >
              <TableCell className="py-3 font-normal text-sm">
                {product.id}
              </TableCell>
              <TableCell className="py-3 font-medium text-sm">
                {product.name}
              </TableCell>
              <TableCell className="py-3">
                <div className="w-full max-w-[180px] h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 bg-${product.color}-500 rounded-full`}
                    style={{ width: `${product.percentage}%` }}
                  />
                </div>
              </TableCell>
              <TableCell className="py-3 text-right">
                <span
                  className={`bg-${product.color}-100 text-${product.color}-800 text-xs px-2 py-1 rounded-full`}
                >
                  {product.percentage}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
