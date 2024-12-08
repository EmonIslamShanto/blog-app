import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../api/blogApi';

const BlogCreate = () => {
  const [blogData, setBlogData] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(blogData);
      navigate('/admin/blogs');
    } catch (err) {
      setError('Failed to create blog');
    }
  };

  return (
    <div className="container mx-auto my-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
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
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogCreate;
