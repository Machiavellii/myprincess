import React from "react";
import "../../styles/escortsgirls.css";
import { connect } from "react-redux";
import LandingCanton from "../landing/landingpages/LandingCanton";
import { getProfiles } from "../../actions/profile";
import { Link } from "react-router-dom";

class EscortsGirls extends React.Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  renderGirlsFromCanton() {
    const canton = this.props.match.params.canton;
    return this.props.profiles
      .filter(profile => {
        if (typeof profile.location.canton === "string") {
          return profile.location.canton.toLowerCase() === canton;
        }
      })
      .map(girl => {
        return (
          <div className="col-sm-6 col-md-4 col-lg-3 mt-5" key={girl._id}>
            <article className="content">
              <div className="contentHolder">
                <div className="top-holder">
                  <Link to="/" className="links">
                    {girl.canton}
                  </Link>
                </div>
                <Link to={`/profile/user/${girl.user._id}`}>
                  <img
                    src={`${window.location.origin}/${girl.cover_photo}`}
                    alt=""
                    className="img-fluid"
                  />
                  {!girl.is_active ? (
                    <div className="inactive">
                      <h6>This announcement is currently inactive</h6>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Link>
                <div className="bottom-holder">
                  <h5>
                    <Link to="/" className="links link-name">
                      {" "}
                      {girl.user.nickname}
                    </Link>
                  </h5>
                </div>
              </div>
            </article>
          </div>
        );
      });
  }

  render() {
    let message;

    if (this.renderGirlsFromCanton().length < 1) {
      message = (
        <h4 className="text-center no-annoucments-heading">
          For now, no announcements available.
        </h4>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <h4
            className="text-center contact-form-heading mt-5"
            style={{ textTransform: "uppercase" }}
          >
            escorts girls of the canton of {this.props.match.params.canton}
          </h4>
          {this.renderGirlsFromCanton()}
          {message}
          <LandingCanton />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles
});

export default connect(mapStateToProps, { getProfiles })(EscortsGirls);
