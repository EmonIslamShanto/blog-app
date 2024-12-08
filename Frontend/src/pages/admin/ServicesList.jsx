import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices, deleteService } from '../../api/serviceApi';
import Loader from '../../components/Loader';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      setServices(services.filter((service) => service._id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>
      <Link to="/admin/services/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block">
        Add New Service
      </Link>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="border px-4 py-2">{service.name}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/admin/services/edit/${service._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesList;
