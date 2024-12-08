import { useState } from 'react';
import ContactForm from '../../components/ContactForm.jsx';
import GoogleMapSection from '../../components/GoogleMapSection.jsx';

const Contact = () => {
  return (
    <>
      <ContactForm />
      <GoogleMapSection />
    </>
  );
};

export default Contact;
