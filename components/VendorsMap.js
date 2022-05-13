import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useState, useEffect } from "react";

function VendorsMap({ locations, google, setHighLight }) {

// Note @locations variable is different from location which is passed in from nav search bar

  const [center, setCenter] = useState(); // delete if you dont need a center

  useEffect(() => {
    var arr = Object.keys(locations);
    var getLat = (key) => locations[key]["lat"]; // These are the latitudes from the results
    var avgLat = arr.reduce((a, c) => a + Number(getLat(c)), 0) / arr.length;

    var getLng = (key) => locations[key]["lng"]; // These are the longitudes from the results
    var avgLng = arr.reduce((a, c) => a + Number(getLng(c)), 0) / arr.length;

    setCenter({ lat: avgLat, lng: avgLng }); // Here you can set the long and lat to users current location
  }, [locations]);

  return (
    <>
    {center && (
        <Map
          google={google}
          
          containerStyle={{
            width: "50vw",
            height: "70vh",
          }}
          center={center}
          initialCenter={locations[0]}
          zoom={13}
          disableDefaultUI={true}
        >

          {/* This is where we can represent each location on the map with their cordinates */}
          {/* {locations.map((coords, i) => (
            <Marker position={coords} onClick={() => setHighLight(i)} />
          ))} */}

          
        </Map>
      )}
      {/* <div>Map</div> */}

    </>
  );
}
export default GoogleApiWrapper({
  apiKey: "",
})(VendorsMap);
