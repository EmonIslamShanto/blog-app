import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogById, updateBlog } from '../../api/blogApi';

const BlogEdit = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlogData(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, blogData);
      navigate('/admin/blogs');
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  return (
    <div className="container mx-auto my-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="6"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default BlogEdit;
