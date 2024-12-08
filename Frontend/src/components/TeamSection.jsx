import React from 'react';

const TeamSection = ({ team = [] }) => {
  return (
    <section className="container mx-auto py-8 px-4">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6">Our Team</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="border rounded-lg overflow-hidden shadow-md text-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-bold mb-2">{member.name}</h4>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <p className="text-gray-500">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
