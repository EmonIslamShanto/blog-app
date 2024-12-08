import React from 'react'

const ServiceSection = ({services = []}) => {
  return (
    <section className="py-10 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description.slice(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default ServiceSection