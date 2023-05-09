import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.006);
  const [lat, setLat] = useState(40.740121);
  const [zoom, setZoom] = useState(10);
  const [markerData, setMarkerData] = useState([]);

  useEffect(() => {
    const getAllSites = async () => {
      const { data } = await axios.get('http://localhost:3001/map');
      let siteArr = [];
      data.map((site) => {
        let siteInfo = {};
        siteInfo.coordinates = site.location.coordinates;
        siteInfo.name = site.name;
        siteInfo.address = site.location.address;
        siteInfo.id = site._id;
        siteArr.push(siteInfo);
      });
      setMarkerData(siteArr);
    };
    getAllSites();
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  if (markerData.length > 1) {
    for (let i = 0; i < markerData.length; i++) {
      const el = document.createElement('div');
      el.className = 'marker';
      const marker = new mapboxgl.Marker()
        .setLngLat(markerData[i].coordinates)
        .setPopup(
          new mapboxgl.Popup()
            .addClassName('map-popup')
            .setHTML(
              `<a href='${'/site/' + markerData[i].id}'> ${
                markerData[i].name
              }</a><p>${markerData[i].address}</p>`
            )
        )
        .addTo(map.current);
    }
  }

  return (
    <>
      <h1>Map</h1>
      <div className='map'>
        <div ref={mapContainer} className='map-container' />
      </div>
      <Link className='link-itinerary' to='/createItinerary'>
        Create your own itinerary here
      </Link>
    </>
  );
}
export default Map;
