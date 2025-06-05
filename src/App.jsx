import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { Outlet, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="dashboard flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
