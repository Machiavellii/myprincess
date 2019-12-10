import React, { useState } from "react";
import { connect } from "react-redux";
import { addOpinion } from "../../../../../../../actions/opinions";

const View = ({ profile, addOpinion }) => {
  const { _id } = profile;
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    review: ""
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClick = (e, value) => {
    setFormData({ ...formData, review: value });

    // console.log(value);
    // console.log(e.target.id);

    const fillStar = value === e.target.id ? "#ce0f69" : "#6b5d5d";
  };

  const onSubmit = e => {
    e.preventDefault();

    addOpinion(formData, _id);

    // console.log(formData);
  };

  return (
    <div className="view-holder" id="viewHolder">
      <p>view</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <span>Review title *</span>
          <input
            type="text"
            name="title"
            className="form-control form-control-lg"
            placeholder="Resumez votre avis ou mettez en evidence un detail important"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" style={{ display: "block" }}>
            Write your review below *
          </label>
          <textarea
            name="text"
            id=""
            rows="8"
            className="form-control form-control-lg"
            placeholder="Par respect, seuls les avis positifs et respectueux seront publices"
            onChange={onChange}
          ></textarea>
        </div>
        {/* <div className="form-group">
          <input type="checkbox" name="" id="" />{" "}
          <label className="input-label">
            Remember my name, my email and my website in the browser for my next
            comment.
          </label>
        </div> */}

        <div className="form-group">
          {/* <input
            type="number"
            id="rating-control"
            className="form-control"
            step="0.1"
            max="5"
            placeholder="Rate 1 - 5"
            disabled
          /> */}

          <div className="stars-holder">
            <span onClick={e => onClick(e, "1")}>
              <i className="fas fa-star stars" id="1"></i>
            </span>
            <span onClick={e => onClick(e, "2")}>
              <i className="fas fa-star stars" id="2"></i>
            </span>
            <span onClick={e => onClick(e, "3")}>
              <i className="fas fa-star stars" id="3"></i>
            </span>
            <span onClick={e => onClick(e, "4")}>
              <i className="fas fa-star stars" id="4"></i>
            </span>
            <span onClick={e => onClick(e, "5")}>
              <i className="fas fa-star stars" id="5"></i>
            </span>
            <span style={{ display: "block" }}>
              Overall rating out of 5 stars *
            </span>
          </div>

          {/* <div className="stars-outer">
            <span>Overall rating out of 5 stars *</span>
            <span className="stars-inner"></span>
          </div> */}
        </div>

        <input type="submit" value="Send my opinion" className="btn btn-rose" />
      </form>
    </div>
  );
};

export default connect(null, { addOpinion })(View);
