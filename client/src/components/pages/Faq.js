import React from 'react';
import '../../styles/faq.css';

const Faq = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center jumbotron-heading">FAQ</h1>
          <p className="lead text-center sub-title">Frequently Asked Questions</p>
        </div>
      </div>
      <div className="container my-5">
        <h6 className="mt-5">HOW TO MODIFY OR REMOVE AN ADVERT?</h6>
        <p>
          - Sign into your account. <br />
          - Click on MY ADS. <br />
          - You can either EDIT / DELETE your ad. <br />
        </p>
        <h6>HOW TO CHANGE MY PASSWORD?</h6>
        <p>
          - Sign into your account. <br />
          - Click on MY ACCOUNT. <br />
          - The field to change the password is in ACCOUNT DETAILS. <br />
        </p>
        <h6>HOW HAVE CHECKED THE LABEL ON MY AD?</h6>
        <p>
          - Send us a photo selfie mentioning MYPRINCESS.CH (paper or otherwise)
          by mail to
          <span>
            <a href={`mailto:contact@myprincess.ch.`} className="email-link">
              {' '}
              contact@myprincess.ch.
            </a>
          </span>
        </p>
        <h6>HOW TO DELETE ACCOUNT?</h6>
        <p>
          - To delete your account, send us a request by mail to
          <span>
            <a href={`mailto:contact@myprincess.ch.`} className="email-link">
              {' '}
              contact@myprincess.ch.
            </a>
          </span>
        </p>
        <h6>I HAVE A QUESTION, WHO TALK TO?</h6>
        <p>
          - Our customer service is available Monday to Friday from 09h to 18h
          by mail to
          <span>
            <a href={`mailto:contact@myprincess.ch.`} className="email-link">
              {' '}
              contact@myprincess.ch.
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Faq;
