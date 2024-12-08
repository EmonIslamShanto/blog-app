import { useEffect, useState } from 'react';
import { getBlogs } from '../../api/blogApi';
import Loader from '../../components/Loader';
import Blogs from '../../components/Blogs';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <Blogs blogs={blogs} />
    </> 
  );
};

export default Blog;
