import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className="bg-gray-100 text-center py-16 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to My Blog</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Explore a wide variety of articles and updates.
            </p>
            <Link
                to="/blog"
                className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
            >
                Browse Blogs
            </Link>
        </section>
    )
}

export default Hero