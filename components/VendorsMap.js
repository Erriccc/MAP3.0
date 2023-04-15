import { useState, useMemo, useEffect } from "react";
import Map, { Marker, Popup, GeolocateControl } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import Utils from '/Utilities/utils'


// import 'mapbox-gl/dist/mapbox-gl.css';

const VendorsMap = ({ searchResults, setDisplayData,center }) => {
  
  // // const [showPopup, setShowPopup] = useState(false);
  // //   Transform coordinates into required array of objects in the correct shape
  // const coordinates = searchResults.map((result) => ({
  //   latitude: parseFloat(result.vendorsLat),
  //   longitude: parseFloat(result.vendorsLong),
  // }));
  // console.log(coordinates,'coordinatescoordinatescoordinatescoordinates')

  // // The latitude and longitude of the center of locations coordinates
  // const center =  (async function () {
  //   // body of the function
  //  console.log(getCenter(coordinates),'getCenter(coordinates)getCenter(coordinates)')
  //  getCenter(coordinates);
  // //  return getCenter(coordinates);

  // }());

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(null)

  // const [viewport, setViewport] = useState({
  //   width: "100vw",
  //   height: "100vh",
  //   latitude: searchResults.length > 0 ? mapCenter ? mapCenter.latitude             : center.latitude  : 41.881832,
  //   longitude: searchResults.length > 0 ? mapCenter ? mapCenter.longitude           : center.longitude : -87.623177,
  //   zoom: 14,
  // });

  useEffect(() => {
   if(mapCenter){
    console.log(mapCenter,"....  mapCenter")

    console.log("Utils.MAPBOXACCESSTOKEN.. ", Utils.MAPBOXACCESSTOKEN)
    console.log("type of Utils.MAPBOXACCESSTOKEN.. ", typeof Utils.MAPBOXACCESSTOKEN)
    console.log("Utils.MAPSTYLE.. ", Utils.MAPSTYLE)
    console.log("type of Utils.MAPSTYLE.. ", typeof Utils.MAPSTYLE)
   }
   else{
    console.log(" mapCenter is null!")

    console.log("Utils.MAPBOXACCESSTOKEN.. ", Utils.MAPBOXACCESSTOKEN)
    console.log("type of Utils.MAPBOXACCESSTOKEN.. ", typeof Utils.MAPBOXACCESSTOKEN)
    console.log("Utils.MAPSTYLE.. ", Utils.MAPSTYLE)
    console.log("type of Utils.MAPSTYLE.. ", typeof Utils.MAPSTYLE)

   }
   return
  }, [])
  
  
  return (
    <Map
      mapStyle= {Utils.MAPSTYLE}
      mapboxAccessToken={Utils.MAPBOXACCESSTOKEN}
      // {...viewport}
      // onViewportChange={(nextViewport) => setViewport(nextViewport)}

      // initialViewState={(async function () {
      //   // body of the function
      //  console.log(getCenter(coordinates),'getCenter(coordinates)getCenter(coordinates)')
      //  let testCenter = getCenter(coordinates);
      //  return {
      //   latitude:testCenter.latitude,
      //   longitude:testCenter.longitude,
      //   zoom: 9
      //  }
      // //  return getCenter(coordinates);
    
      // }())}
      initialViewState={{
        latitude: searchResults.length > 0 ?center.latitude : 41.881832,
        longitude: searchResults.length > 0 ? center.longitude : -87.623177,
      // latitude: searchResults.length > 0 ? mapCenter ? mapCenter.latitude             : center.latitude  : 41.881832,
      // longitude: searchResults.length > 0 ? mapCenter ? mapCenter.longitude           : center.longitude : -87.623177,
        zoom: 6
      }}




      
      style={{width: "100vw", height: "100vh"}}

    >
      {/* <GeolocateControl position="top-right" showAccuracyCircle={false}
      onGeolocate={(e)=>{
        setMapCenter({latitude:e.coords.latitude , longitude:e.coords.longitude })
      }}
      /> */}
      {searchResults.length > 0 &&  searchResults.map((result,index) => (
          <Marker
            key={index}
            // key={result.long}
            latitude={result.vendorsLat}
            longitude={result.vendorsLong}
            // offsetLeft={-20}
            // offsetTop={-10}
            color="gray"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setDisplayData([result])
              setSelectedLocation(result);
              console.log(result)
            }}
            // className='animate-bounce'
          >
                {/* 📌 */}
                <p
                role="img"
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                📌
              </p>
          </Marker>
          ))}


                  
        {/* {selectedLocation && (
          <Popup longitude={selectedLocation.long} latitude={selectedLocation.lat}
            anchor="top"
            onClose={() => 
              {
              console.log("popUp Was Closed")
              console.log(selectedLocation)
              setSelectedLocation(null)
              }
            }
            closeOnClick={true}
            
            >
            {selectedLocation.name}
          </Popup>)} */}




        
    </Map>
  );
};

export default VendorsMap;
