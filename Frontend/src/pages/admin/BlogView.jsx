import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../api/blogApi';
import Loader from '../../components/Loader';

const BlogView = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Loader />;

  if (!blog) return <p className="text-center text-red-500">Blog not found</p>;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      <p className="text-gray-600 mb-6">{blog.createdAt}</p>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogView;
