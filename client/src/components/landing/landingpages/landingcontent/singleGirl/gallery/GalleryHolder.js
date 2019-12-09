import React from "react";
import Describe from "./galleryComponent/Describe";
// import Gallery from './galleryComponent/Gallery';

const GalleryHolder = ({ profile }) => {
  const { cover_photo, is_active, city } = profile;

  return (
    <div className="gallery-holder">
      <div className="img-holder mb-4">
        <img
          src={`${window.location.origin}/${cover_photo}`}
          alt=""
          className="img-fluid"
        />
      </div>
      <div className="location mb-5">
        <h6>Job Activity</h6>
        <p>{is_active ? "Active" : "Inactive"}</p>
        <p>{city}</p>
        <div className="map mb-4">Google Maps</div>
        <p>Rue Uttins 20VD CH</p>
        <a href="!#">Get directions</a>
      </div>
      <Describe profile={profile} />
      {/* <Gallery profile={profile} /> */}
    </div>
  );
};

export default GalleryHolder;
