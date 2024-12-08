import React from 'react'
import { Link } from 'react-router-dom'

const CustomSection = () => {
    return (
        <section className="bg-blue-50 text-center py-16 px-4">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Custom Section</h3>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
                This is a custom section where you can add additional content or features.
            </p>
            <Link
                to="/contact"
                className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
            >
                Contact Us
            </Link>
        </section>
    )
}

export default CustomSection