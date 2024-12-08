import { useEffect, useState } from 'react';
import { getServices } from '../../api/serviceApi';
import Loader from '../../components/Loader';
import ServiceSection from '../../components/ServiceSection';

const Service = () => {
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

  if (loading) return <Loader />;

  return (
    <>
      <ServiceSection services={services} />
    </>
  );
};

export default Service;
