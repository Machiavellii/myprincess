import React from 'react';
import '../../styles/contact.css';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact</h1>
          <p className="lead text-center sub-title">
            Our customer service is available Monday to Friday from 09h to 18h
          </p>
        </div>
      </div>
      <div className="container my-5">
        <p className="mb-4">
          MyPrincess.ch is a directory site for escort and erotic massage parlor
          in Switzerland.
        </p>
        <p className="mb-4">
          For us, quality, professionalism and user-friendliness are our highest
          priorities.
        </p>
        <p className="mb-4">
          Do you have <strong>a question, comment or suggestion </strong>?
        </p>
        <p className="mb-4">
          Drop us a message and we will reply within 24 hours.
        </p>

        <h5 className="contact-form-heading mt-5">Contact Form</h5>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
