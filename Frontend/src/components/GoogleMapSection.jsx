const GoogleMapSection = () => {
    return (
        <section className="container mx-auto py-8 px-4">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">Our Location</h3>
            <div className="w-full h-64">
                <iframe
                    title="Google Map"
                    className="w-full h-full border rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509372!2d144.96305791562314!3d-37.81410777975156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775d27e33e6e0b!2sMelbourne%20City%20Center!5e0!3m2!1sen!2sau!4v1633079709221!5m2!1sen!2sau"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    );
};

export default GoogleMapSection;
