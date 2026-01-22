import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
