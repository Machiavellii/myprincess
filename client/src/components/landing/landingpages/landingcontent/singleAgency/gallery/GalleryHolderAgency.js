import React, { useState, Fragment } from "react";
import DescribeAgency from "./galleryComponent/DescribeAgency";
import ReactMapGl, { Marker } from "react-map-gl";
// import Gallery from './galleryComponent/Gallery';

const GalleryHolder = ({ agency }) => {
  const { cover_photo, is_active, location } = agency;
  const [viewPort, setViewPort] = useState({
    latitude: agency.location ? agency.location.coordinates[1] : latitude,
    longitude: agency.location ? agency.location.coordinates[0] : longitude,
    width: "100%",
    height: "100%",
    zoom: 15,
  });

  const { latitude, longitude } = viewPort;

  return (
    <div className="gallery-holder">
      <div className="img-holder mb-4">
        <img src={cover_photo} alt="" className="img-fluid" />
      </div>
      <div className="location mb-5">
        <h6 className="mb-1">Job Activity</h6>
        <span
          className={` mb-3 ${
            is_active ? "badge badge-success" : "badge badge-danger"
          }`}
        >
          {is_active ? "Active" : "Inactive"}
        </span>

        <div className="map mb-4">
          <ReactMapGl
            {...viewPort}
            mapboxApiAccessToken={
              "pk.eyJ1IjoibWF0ZWpnZWxqaSIsImEiOiJjazU4MjFubTEwNnB1M2xwZnBmb3F3aDI2In0.Q3ao_KXEg2Hr6ziv1Ddo3g"
            }
            onViewportChange={(viewPort) => {
              setViewPort(viewPort);
            }}
          >
            {!agency ? (
              <Fragment>Loading...</Fragment>
            ) : (
              <Marker
                latitude={
                  agency.location ? agency.location.coordinates[1] : latitude
                }
                longitude={
                  agency.location ? agency.location.coordinates[0] : longitude
                }
              >
                <button className="girl-button-marker">
                  <i className="fas fa-map-marker-alt girl-button-marker-icon"></i>
                </button>
              </Marker>
            )}
          </ReactMapGl>
        </div>
        <p>{agency.location ? location.formattedAddress : ""}</p>
        <a href="!#">Get directions</a>
      </div>
      <DescribeAgency agency={agency} />
      {/* <Gallery profile={profile} /> */}
    </div>
  );
};

export default GalleryHolder;
