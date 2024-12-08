import React from 'react'

const Blogs = ({blogs = []}) => {
    return (
        <section className="bg-gray-100 py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome to Our Website</h2>
                <p className="mb-8">Explore our latest blog posts</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white shadow-lg rounded-lg p-4">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-32 object-cover rounded"
                            />
                            <h3 className="text-xl font-semibold">{blog.title}</h3>
                            <p className="text-gray-500 my-2">{blog.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blogs