import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
function CustomItineraryMap(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-74.006);
  const [lat] = useState(40.740121);
  const [zoom] = useState(9);
  const [data, setData] = useState([]);
  const [markerData, setMarkerData] = useState([]);

  useEffect(() => {
    setData(props.data)
    let siteArr = [];
      data.map((site) => { 
        let siteInfo = {};
        siteInfo.coordinates = site.location.coordinates;
        siteInfo.name = site.name;
        siteInfo.address = site.location.address;
        siteArr.push(siteInfo);
        return siteInfo
      });
      setMarkerData(siteArr);
  }, [data, props.data])

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }); 

  if (markerData.length > 1) {
    for (let i = 0; i < markerData.length; i++) {
      console.log(markerData[i]);
      const el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker()
        .setLngLat(markerData[i].coordinates)
        .setPopup(
          new mapboxgl.Popup()
            .addClassName("map-popup")
            .setHTML(
              `<h1>${markerData[i].name}</h1><p>${markerData[i].address}</p>`
            )
        )
        .addTo(map.current);
    }
  }

  return (
    <>
      <h2>Map Of Your Itinerray Stops</h2>
      <div className="map">
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
}
export default CustomItineraryMap;
