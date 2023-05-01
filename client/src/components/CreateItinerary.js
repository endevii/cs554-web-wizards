import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomItineraryMap from './CustomItineraryMap';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function CreateItinerary() {
    const [itinerary, setItinerary] = useState([]);
    const [loadingItinerary, setLoadingItinerary] = useState(true);
    const [manhattan, setManhattan] = useState([]);
    const [staten, setStaten] = useState([]);
    const [queens, setQueens] = useState([]);
    const [bronx, setBronx] = useState([]);
    const [brooklyn, setBrooklyn] = useState([]);
    const [loading, setLoading] = useState(true);
    let checkManhattan = null;
    let checkStaten = null;
    let checkBrooklyn = null;
    let checkQueens = null;
    let checkBronx = null;
    let card = null;
 
    useEffect(() => {
        const getAllSites = async (borough) => {
            const { data } = await axios.get('http://localhost:3001/siteBorough/'+borough);
            let sites = [];
            sites = data.map((site) => {
                let siteInfo = {
                    _id: site._id,
                    name: site.name,
                    description: site.description,
                    location: {
                        address: site.location.address,
                        city: site.location.city,
                        state: site.location.state,
                        zipCode: site.location.zipCode,
                        coordinates: site.location.coordinates
                    },
                    hours: {
                        days: site.hours.days,
                        time: site.hours.time
                    },
                    website: site.website,
                    borough: site.borough,
                    founded: site.founded, 
                    rating: site.rating,
                    reviews: site.reviews,
                    image: site.image
                };
                return siteInfo
            });
            if(borough === 'Manhattan'){
                setManhattan(sites);
            } else if(borough === 'Staten Island'){
                setStaten(sites)
            } else if(borough === 'Brooklyn'){
                setBrooklyn(sites);
            } else if(borough === 'Bronx'){
                setBronx(sites);
            } else if(borough === 'Queens'){
                setQueens(sites);
            }
            setLoading(false)
        };
        getAllSites('Manhattan');
        getAllSites('Staten Island');
        getAllSites('Brooklyn');
        getAllSites('Bronx');
        getAllSites('Queens');
    }, []);

    const buildSiteCheck = (site) => {
        return (
            <div className='form-checks' key={'div'+site._id}>
                    <input type='checkbox'
                    className='form-check-input'
                    key={site._id}
                    onChange={(e) => {
                        if(itinerary.filter(e => e._id === site._id).length > 0){
                            let index;
                            for(let i=0; i < itinerary.length; i++){
                                if(itinerary[i]._id === site._id){
                                    index = i;
                                }
                            }
                            itinerary.splice(index, 1);
                            setItinerary(itinerary);
                        } else {
                            itinerary.push(site)
                            setItinerary(itinerary)
                        }
                        setLoadingItinerary(true)
                    }}/>
                <label className='form-check-label'>
                    {site.name} 
                </label>
            </div>
            
        )
    }

    checkManhattan = manhattan && manhattan.map((site)=>{
        return buildSiteCheck(site)
    })
    checkStaten = staten && staten.map((site)=>{
        return buildSiteCheck(site)
    })
    checkBrooklyn = brooklyn && brooklyn.map((site)=>{
        return buildSiteCheck(site)
    })
    checkBronx = bronx && bronx.map((site)=>{
        return buildSiteCheck(site)
    })
    checkQueens = queens && queens.map((site)=>{
        return buildSiteCheck(site)
    })

    const buildSiteCard = (site) => {
        return (
            <div key={'div'+site._id} className='revolution'>
                <hr/>
                <h1 className='itinerary-stop-title'>{site.name}</h1>
                <div className='itinerary-container'>
                    <div className='customImageItinerary'>
                        <img className='resize-image' src={site.image} alt='federal hall'/>
                    </div>
                    <div className='grid-item step-description'>
                    <ul id='description-list'>
                        {site.description.map((line) => (
                        <li key={line}>{line}</li>
                        ))}
                    </ul> 
                    </div>
                </div>
            </div>
            
        )
    }

    card = itinerary && itinerary.map((site)=>{
        return buildSiteCard(site)
    }) 

    if(loading){
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <h1>Create Your Own Itinerary</h1>
                <div className='create-itinerary-paragraph'>
                    <p>Select the sites which you would like to visit on your trip to NYC! Then click the Load Itinerary button to see your itinerary generated in the ordeer in which you selected your sites.</p>
                </div>
                <form>
                    {manhattan.length !== 0 && <h3>Manhattan:</h3>}
                    {checkManhattan}
                    <br/>
                    {staten.length !== 0 && <h3>Staten Island:</h3>}
                    {checkStaten}
                    <br/>
                    {brooklyn.length !== 0 && <h3>Brooklyn:</h3>}
                    {checkBrooklyn}
                    <br/>
                    {bronx.length !== 0 && <h3>Bronx:</h3>}
                    {checkBronx}
                    <br/>
                    {queens.length !== 0 && <h3>Queens:</h3>}
                    {checkQueens}
                    <br/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setLoadingItinerary(false)
                    }}
                    >Load Itinerary</button>

                    <br/>
                    <br/>
                    {itinerary.length > 1
                        ?<div>
                            {!loadingItinerary && <h2>Your Itinerary Stops</h2>}
                            <br/>
                            {!loadingItinerary && <div>{card}</div>}
                            {!loadingItinerary && <div className='revolution'><hr/></div>} 
                            {!loadingItinerary &&
                                <CustomItineraryMap key="map" data={itinerary} />
                            }
                        </div>
                        :<div>{!loadingItinerary && <p>Add at least two stops to your itinerary!</p>}</div>
                    }
                    <br/> 
                </form>
            </div>
        )
    }     
}

export default CreateItinerary;