import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardSummary } from '../../api/adminApi';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard summary:', error);
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Data Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-500 text-white rounded shadow">
          <h3 className="text-lg font-semibold">Total Blogs</h3>
          <p className="text-3xl font-bold">{summary?.blogs || 0}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded shadow">
          <h3 className="text-lg font-semibold">Total Services</h3>
          <p className="text-3xl font-bold">{summary?.services || 0}</p>
        </div>
        <div className="p-4 bg-purple-500 text-white rounded shadow">
          <h3 className="text-lg font-semibold">Total Team Members</h3>
          <p className="text-3xl font-bold">{summary?.teams || 0}</p>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/blogs" className="p-4 bg-blue-500 text-white rounded shadow text-center">
          Manage Blogs
        </Link>
        <Link to="/admin/services" className="p-4 bg-green-500 text-white rounded shadow text-center">
          Manage Services
        </Link>
        <Link to="/admin/team" className="p-4 bg-purple-500 text-white rounded shadow text-center">
          Manage Team
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
