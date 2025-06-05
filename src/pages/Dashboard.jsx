import React from 'react';
import Card from '../components/Card';
import { ProductsTable } from '../components/ui/table/ProductsTable';
import { VisitorInsightsChart } from '../components/ui/charts/VisitorInsightCharts';
import { RevenueChart } from '../components/ui/charts/RevenueCharts';
import { SatisfactionChart } from '../components/ui/charts/SatisfactionCharts';
import { VolumeServiceChart } from '../components/ui/charts/VolumeServiceCharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFileInvoice,
  faCheckCircle,
  faUser,
  faTableList,
  faGlobe,
  faLayerGroup,
  faCreditCard,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 bg-secondary overflow-y-auto">
      {/* Top row with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card
          title="Total Sales"
          subtitle="$48,574"
          subtitleSecondary="+8% from last month"
          icon={faCreditCard}
          variant="purple"
        />
        <Card
          title="Active Users"
          subtitle="3,249"
          subtitleSecondary="+12% from last week"
          icon={faUser}
          variant="pink"
        />
        <Card
          title="Conversion Rate"
          subtitle="5.24%"
          subtitleSecondary="+2.1% from last week"
          icon={faArrowTrendUp}
          variant="green"
        />
        <Card
          title="Avg. Order Value"
          subtitle="$89.54"
          subtitleSecondary="+$4.32 from last month"
          icon={faChartBar}
          variant="yellow"
        />
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
              <span className="text-xs text-gray-600">Unique Customers</span>
            </div>
          </div>
        }
      >
        <div className="h-56">
          <VisitorInsightsChart />
        </div>
      </Card>

      {/* Second row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Total Revenue">
          <div className="h-64">
            <RevenueChart />
          </div>
        </Card>

        <Card title="Customer Satisfaction" className="lg:col-span-2">
          <div className="h-64">
            <SatisfactionChart />
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
              <p className="text-gray-500 text-sm">World Map Visualization</p>
            </div>
          </div>
        </Card>

        <Card title="Volume vs Service Level">
          <div className="h-64">
            <div className="h-48 mb-4">
              <VolumeServiceChart />
            </div>

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
  );
};

export default Dashboard;