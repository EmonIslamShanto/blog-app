import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeamMembers, deleteTeamMember } from '../../api/teamApi';
import Loader from '../../components/Loader';

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamMembers();
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      await deleteTeamMember(id);
      setTeam(team.filter((member) => member._id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Manage Team</h2>
      <Link to="/admin/team/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block">
        Add New Team Member
      </Link>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => (
            <tr key={member._id}>
              <td className="border px-4 py-2">{member.name}</td>
              <td className="border px-4 py-2">{member.role}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/admin/team/edit/${member._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(member._id)}
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

export default TeamList;
