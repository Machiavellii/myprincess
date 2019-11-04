import React from 'react';

const View = ({ profile }) => {
  return (
    <div className="view-holder">
      <p>view</p>

      <div className="form-group">
        <label htmlFor="" style={{ display: 'block' }}>
          Write your review below *
        </label>
        <textarea
          name=""
          id=""
          rows="8"
          className="form-control form-control-lg"
          placeholder="Par respect, seuls les avis positifs et respectueux seront publices"
        ></textarea>
      </div>
      <div className="form-group">
        <input type="checkbox" name="" id="" />{' '}
        <label className="input-label">
          Remember my name, my email and my website in the browser for my next
          comment.
        </label>
      </div>
      <div className="stars-outer">
        <span>Overall rating out of 5 stars *</span>
        <span className="stars-inner"></span>
      </div>

      <form>
        <div className="form-group">
          <span>Review title *</span>
          <input
            type="text"
            name=""
            className="form-control form-control-lg"
            placeholder="Resumez votre avis ou mettez en evidence un detail important"
          />
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            <span>Name *</span>
            <input
              type="text"
              name=""
              className="form-control form-control-lg"
              placeholder="Votre nom"
            />
          </div>
          <div className="form-group col-sm-6">
            <span>Email Address *</span>
            <input
              type="text"
              name=""
              className="form-control form-control-lg"
              placeholder="Addrese e-mail"
            />
          </div>
        </div>
        <input type="submit" value="Send my opiniom" className="btn btn-rose" />
      </form>
    </div>
  );
};

export default View;
