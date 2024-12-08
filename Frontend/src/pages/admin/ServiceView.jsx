import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceById } from '../../api/serviceApi';
import Loader from '../../components/Loader';

const ServiceView = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(id);
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <Loader />;

  if (!service) return <p className="text-center text-red-500">Service not found</p>;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
      <p className="text-gray-600 mb-6">{service.description}</p>
    </div>
  );
};

export default ServiceView;
