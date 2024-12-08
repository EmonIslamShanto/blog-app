import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamMemberById } from '../../api/teamApi';
import Loader from '../../components/Loader';

const TeamView = () => {
  const { id } = useParams(); // Get the team member ID from the URL
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const data = await getTeamMemberById(id);
        setTeamMember(data);
      } catch (error) {
        console.error('Error fetching team member:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [id]);

  if (loading) return <Loader />;

  if (!teamMember) return <p className="text-center text-red-500">Team member not found</p>;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">{teamMember.name}</h2>
      <p className="text-gray-600 mb-6">{teamMember.role}</p>
      <p>{teamMember.description}</p>
    </div>
  );
};

export default TeamView;
