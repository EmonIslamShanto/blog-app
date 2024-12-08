import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getServiceById, updateService } from '../../api/serviceApi';

const ServiceEdit = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState({ name: '', description: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(id);
        setServiceData(data);
      } catch (err) {
        console.error('Error fetching service:', err);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(id, serviceData);
      navigate('/admin/services');
    } catch (err) {
      setError('Failed to update service');
    }
  };

  return (
    <div className="container mx-auto my-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={serviceData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="6"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Service
        </button>
      </form>
    </div>
  );
};

export default ServiceEdit;
