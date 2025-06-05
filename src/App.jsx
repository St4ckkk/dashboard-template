import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Card from './components/Card';
import { ProductsTable } from './components/ProductsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFileInvoice,
  faCheckCircle,
  faUser,
  faTableList,
  faGlobe,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-secondary overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-1">Header text</h2>
                <p className="text-gray-500 text-sm">subtext</p>
              </div>
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                <span>Export</span>
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card
                icon={faChartBar}
                title="text"
                subtitle="text"
                subtitleSecondary="text"
                variant="pink"
              />
              <Card
                icon={faFileInvoice}
                title="text"
                subtitle="text"
                subtitleSecondary="text"
                variant="yellow"
              />
              <Card
                icon={faCheckCircle}
                title="text"
                subtitle="text"
                subtitleSecondary="text"
                variant="green"
              />
              <Card
                icon={faUser}
                title="text"
                subtitle="text"
                subtitleSecondary="text"
                variant="purple"
              />
            </div>
          </div>

          {/* Visitor Insights - Chart Card */}
          <Card
            title="Visitor Insights"
            className="mb-6"
            headerAction={
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-gray-600">Loyal Customers</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">New Customers</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">
                    Unique Customers
                  </span>
                </div>
              </div>
            }
          >
            <div className="h-56">
              {/* Chart placeholder - replace with actual chart component */}
              <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                <span className="text-gray-400">Visitor Insights Chart</span>
              </div>
            </div>
          </Card>
          {/* Second row of charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card title="Total Revenue">
              <div className="h-64">
                {/* Chart would go here */}
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      "url('https://via.placeholder.com/400x300?text=Bar+Chart')",
                  }}
                ></div>
              </div>
            </Card>

            <Card title="Customer Satisfaction" className="lg:col-span-2">
              <div className="h-64">
                {/* Chart would go here */}
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      "url('https://via.placeholder.com/800x300?text=Area+Chart')",
                  }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Third row of charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Top Products">
              <ProductsTable />
            </Card>

            <Card title="Sales Mapping by Country" className="lg:col-span-1">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                {/* World map component would go here */}
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="text-4xl text-gray-400 mb-2"
                  />
                  <p className="text-gray-500 text-sm">
                    World Map Visualization
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Volume vs Service Level">
              <div className="h-64">
                <div
                  className="h-48 mb-4 bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      "url('https://via.placeholder.com/400x200?text=Bar+Chart')",
                  }}
                ></div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">Volume</p>
                      <p className="text-sm">1,135</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Services</p>
                      <p className="text-sm">635</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
