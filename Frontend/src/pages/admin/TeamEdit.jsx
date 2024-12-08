import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeamMemberById, updateTeamMember } from '../../api/teamApi';

const TeamEdit = () => {
  const { id } = useParams(); // Get team member ID from URL
  const [teamMemberData, setTeamMemberData] = useState({ name: '', role: '', description: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const data = await getTeamMemberById(id);
        setTeamMemberData(data);
      } catch (err) {
        setError('Failed to load team member data');
      }
    };

    fetchTeamMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamMemberData({ ...teamMemberData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTeamMember(id, teamMemberData);
      navigate('/admin/team');
    } catch (err) {
      setError('Failed to update team member');
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto my-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Team Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={teamMemberData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={teamMemberData.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={teamMemberData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="6"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Team Member
        </button>
      </form>
    </div>
  );
};

export default TeamEdit;
