import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import "../App.css";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function CustomItineraryMap(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(props.data[0].location.coordinates[0]);
  const [lat] = useState(props.data[0].location.coordinates[1]);
  const [zoom] = useState(11);
  const [siteData, setSiteData] = useState([]);
  const [markerData, setMarkerData] = useState([]);
  const [geojson, setGeojson] = useState(null);
  const [routeAvailable, setRouteAvailable] = useState(true);
  const [showDirections, setShowDirections] = useState(false);
  const [transportMode, setTransportMode] = useState("walking")
  useEffect(() => {
    setSiteData(props.data);
    let siteArr = [];
    siteData.map((site) => {
      let siteInfo = {};
      siteInfo.coordinates = site.location.coordinates;
      siteInfo.name = site.name;
      siteInfo.address = site.location.address;
      siteArr.push(siteInfo);
      return siteInfo;
    });
    setMarkerData(siteArr);
  }, [siteData, props.data]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (geojson) {
      if (map.current.getSource("route")) {
        map.current.getSource("route").setData(geojson);
      } else {
        map.current.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    }
  }, [geojson]);

  const getRoute = async (coordinates) => {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/${transportMode}/${coordinates}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      if (data.trips) {
        const instructions = document.getElementById(`instructions${props.id}`);
        let steps = [];
        data.trips[0].legs.map((leg) => {
          steps = [...steps, ...leg.steps];
        });
        let tripInstructions = "";
        for (const step of steps) {
          tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        }
        let transportEmoji;
        if(transportMode==="walking"){
            transportEmoji = "🚶"
        }else if(transportMode==="cycling"){
          transportEmoji = "🚴"
        } else {
          transportEmoji = "🚗"
        }
        instructions.innerHTML = `<h4>Round Trip Duration: ${Math.floor(
          data.trips[0].duration / 60
        )} min ${transportEmoji} </h4><ol>${tripInstructions}</ol>`;
        return data.trips[0].geometry.coordinates;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const addMarkers = async () => {
      if (markerData.length > 1) {
        for (let i = 0; i < markerData.length; i++) {
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
        let allCoordinates = "";
        markerData.map((site) => {
          allCoordinates =
            allCoordinates +
            `${site.coordinates[0]},` +
            `${site.coordinates[1]};`;
        });
        allCoordinates = allCoordinates.substring(0, allCoordinates.length - 1);

        let route = await getRoute(allCoordinates);
        if (route) {
          setGeojson({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          });
        } else {
          setRouteAvailable(false);
        }
      }
    };
    if (markerData.length > 0) addMarkers();
  }, [markerData, transportMode]);

  useEffect(() => {
    const instructionsDivv = document.getElementById(`instructions${props.id}`);
    if (showDirections) {
      instructionsDivv.classList.remove("hidden");
    } else {
      instructionsDivv.classList.add("hidden");
    }
  }, [showDirections]);

  const changeHandler = (e) => {
    setTransportMode(e)
  }
  return (
    <>
      <h2>Map Of Your Itinerray Stops</h2>
      <div className="map">
        <div ref={mapContainer} className="map-container" />
        <button
          className="dir-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowDirections(!showDirections);
          }}
        >
          {!showDirections ? "Show directions" : "Hide directions"}
        </button>
       <div>
       <form>
          <label htmlFor="transportMode">Transportation Mode:</label>
          <select name="transportMode" onChange={(e)=>changeHandler(e.target.value)}>
            <option value="walking">Walking</option>
            <option value="cycling">Cycling</option>
            <option value="driving">Driving</option>
          </select>
        </form>
       </div>
        <div id={`instructions${props.id}`} className="hidden">
        
          {!routeAvailable && <p>No route available</p>}
        </div>
      </div>
    </>
  );
}
export default CustomItineraryMap;
