import React from 'react';
import '../../styles/ContactForm.css';

class ContactForm extends React.Component {
  render() {
    return (
      <div className="mb-5">
        <form className="mt-5">
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="Name">Your Name *</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Name"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="Email">Your Email *</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="Phone">Your Phone *</label>
              <input
                type="text"
                className="form-control"
                id="Phone"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Message">Your Message *</label>
            <textarea className="form-control" id="Message" rows="3"></textarea>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary btn-lg main-color mt-3"
        >
          Send my Message
        </button>
      </div>
    );
  }
}

export default ContactForm;
