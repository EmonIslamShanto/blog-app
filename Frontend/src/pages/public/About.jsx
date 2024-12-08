import { useEffect, useState } from "react";
import { getTeamMembers } from "../../api/teamApi";
import AboutSection from "../../components/AboutSection";
import TeamSection from "../../components/TeamSection";


const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const team = await getTeamMembers();
        setTeamMembers(team);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);
  return (
    <>
      <AboutSection />
      <TeamSection team={teamMembers} />
    </>
  );
};

export default About;
