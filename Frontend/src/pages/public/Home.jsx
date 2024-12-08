import { useEffect, useState } from 'react';
import { getBlogs } from '../../api/blogApi';
import Loader from '../../components/Loader';
import Blogs from '../../components/Blogs';
import Hero from '../../components/Hero';
import CustomSection from '../../components/CustomSection';
import Slider from '../../components/Slider';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleImages = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
    'https://via.placeholder.com/800x400?text=Slide+4',
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Hero />
      <Blogs blogs={blogs} />
      <CustomSection />
      <Slider images={sampleImages} />
    </>
  );

};

export default Home;
