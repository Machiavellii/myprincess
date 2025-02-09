import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import { connect } from "react-redux";
import { getProfiles } from "../../../actions/profile";

const Map = ({ profile: { profiles }, getProfiles }) => {
  const [viewPort, setViewPort] = useState({
    latitude: 46.20433,
    longitude: 6.15367,
    width: "40vw",
    height: "75vh",
    zoom: 12,
  });

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  // const [selectedGirl, setSelectedGirl] = useState(true);

  const { latitude, longitude } = viewPort;

  return (
    <div>
      <ReactMapGl
        {...viewPort}
        mapboxApiAccessToken={
          "pk.eyJ1IjoibWF0ZWpnZWxqaSIsImEiOiJjazU4MjFubTEwNnB1M2xwZnBmb3F3aDI2In0.Q3ao_KXEg2Hr6ziv1Ddo3g"
        }
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
      >
        {profiles.map((girl) => (
          <Marker
            key={girl._id}
            latitude={girl.location ? girl.location.coordinates[1] : latitude}
            longitude={girl.location ? girl.location.coordinates[0] : longitude}
          >
            <button
              className="girl-button-marker"
              // onClick={e => {
              //   setSelectedGirl(girl);
              // }}
            >
              <i className="fas fa-map-marker-alt girl-button-marker-icon"></i>
            </button>
          </Marker>
        ))}
        {/* {selectedGirl ? (
          <Popup
            latitude={selectedGirl.location.coordinates[1]}
            longitude={selectedGirl.location.coordinates[0]}
            onClose={() => {
              setSelectedGirl(null);
            }}
          >
            <div>
              <h6>
                {selectedGirl.user.nickname}
                <span className="girl-popup-age">, {selectedGirl.age}</span>
              </h6>
              <p>{selectedGirl.location.formattedAddress}</p>
            </div>
          </Popup>
        ) : null} */}
      </ReactMapGl>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Map);
