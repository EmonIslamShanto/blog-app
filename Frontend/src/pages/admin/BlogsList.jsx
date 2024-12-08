import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../api/blogApi';
import Loader from '../../components/Loader';

const BlogsList = () => {
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Update the list after delete
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
      <Link to="/admin/blogs/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block">
        Add New Blog
      </Link>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="border px-4 py-2">{blog.title}</td>
              <td className="border px-4 py-2">
                <Link to={`/admin/blogs/edit/${blog._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
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

export default BlogsList;
