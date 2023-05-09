import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomItineraryMap from './CustomItineraryMap';
import ItineraryList from './ItineraryList';
import ReactDOMServer from 'react-dom/server';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
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
    const [pdfReady, setPdfReady] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);
    let checkManhattan = null;
    let checkStaten = null;
    let checkBrooklyn = null;
    let checkQueens = null;
    let checkBronx = null;
    let card = null;

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    //const [mongoUser, setMongoUser] = useState(null);
    const [name, setName] = useState("");
    let auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){  
                setUser(user);
                setName(user.displayName)
                if(name !== ""){
                    setLoadingUser(false);
                }
            } else {
                setLoadingUser(false);
            }
        });
    }, [auth, name])
 
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

    const [saved, setSaved] = useState(false);
    const [itineraries, setItineraries] = useState([]);
    const [mongoUser, setMongoUser] = useState(null);
    const [loadingMongo, setLoadingMongo] = useState(true);
    useEffect(() => {
        const getUser = async (uid) => {
            const { data } = await axios.get("http://localhost:3001/user/"+uid);
            setMongoUser(data);
            setLoadingMongo(false);
            mongoUser && setItineraries(user.itineraries);
        };
        if(!loadingUser){
            user && getUser(user.uid);
        }
    }, [loadingUser, user, mongoUser]);

    useEffect(() => {
        const checkAdded = async(uid, itinerary) => {
            try{
                const { data } = await axios.get("http://localhost:3001/has/"+uid, {
                    params: {
                        itinerary: JSON.stringify(itinerary)
                    }
                })
                setSaved(data);
            }catch(e){
                console.log(e);
            }
        }
        let id_array = [];
        itinerary.forEach(site => {
            id_array.push(site._id);
        })
        let temp = {
            ids: id_array,
            itinerary: itinerary
        }
        if(!loadingMongo){
            checkAdded(user.uid, temp)
        }

    }, [itineraries, itinerary, loading, loadingMongo, user, loadingItinerary]);

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
                        setBtnClicked(false)
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

    const generatePdf = async (component, name) => {
        setBtnClicked(true)
        try{
            let {data} = await axios.post('http://localhost:3001/generatepdf',{input: component, name:name});
            if(data.msg==="success"){
                setPdfReady(true)
            }else{
                setPdfReady(false)
            }
          
        }catch(e){
            console.log(e)
            setPdfReady(false)
        }
    }

    if(loading){
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <h1>Create Your Own Itinerary</h1>
                <div className='create-itinerary-paragraph'>
                    <p>Select the sites which you would like to visit on your trip to NYC! Then click the Load Itinerary button to see your itinerary generated in the order in which you selected your sites.</p>
                </div>
                {user
                ?<div><form>
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
                        setLoadingItinerary(false);
                        setBtnClicked(false)
                    }}
                    >Load Itinerary</button>

                    <br/>
                    <br/>
                    {itinerary.length > 1 && itinerary.length < 13
                        ?<div>
                            {!loadingItinerary && <h2>Your Itinerary Stops</h2>}
                            <br/>
                            {!loadingItinerary && 
                                <button 
                                    onClick={(e)=>{e.preventDefault();generatePdf(ReactDOMServer.renderToString(<ItineraryList itinerary={itinerary} />), "itinerary")}}>
                                    Generate Pdf
                                </button>}
                            {btnClicked && pdfReady && <div><br/><a href='http://localhost:3001/generatepdf/itinerary' target="_blank" rel="noreferrer">Pdf is ready to print/download</a></div>}
                            {btnClicked && !pdfReady && <p>Please try again</p>}
                            {!loadingItinerary && <div>{card}</div>}
                            {!loadingItinerary && <div className='revolution'><hr/></div>} 
                            {!loadingItinerary &&
                                <CustomItineraryMap key="map" data={itinerary} id="Custom"/>
                            }
                            <br/>
                            {!saved
                            ?<div>
                                {!loading && user && !loadingUser && !loadingMongo && !loadingItinerary &&
                                    <button onClick={(async (e) => {
                                        e.preventDefault();
                                        try{
                                            await axios.get("http://localhost:3001/addItinerary/"+user.uid, {
                                                params: {
                                                    itinerary: JSON.stringify(itinerary)
                                                }
                                            })
                                            alert("Itinerary saved");
                                            setSaved(true);
                                        }catch(e){
                                            alert("Error: You already saved this itinerary");
                                        }
                                    })}>Save Itinerary</button>
                                }
                            </div>
                            :<div>
                                {!loading && !loadingUser && !loadingMongo && !loadingItinerary &&
                                    <button onClick={(async (e) => {
                                        e.preventDefault();
                                        let id_array = [];
                                        itinerary.forEach(site => {
                                            id_array.push(site._id)
                                        })
                                        let temp = {
                                            ids: id_array,
                                            itinerary: itinerary
                                        }
                                        try{
                                            await axios.get("http://localhost:3001/deleteItinerary/"+user.uid, {
                                                params: {
                                                    itinerary: JSON.stringify(temp)
                                                }
                                            })
                                            alert("Itinerary unsaved");
                                            setSaved(false);
                                        }catch(e) {
                                            alert("Error: You have not saved this itinerary");
                                        }
                                    })}>Unsave Itinerary</button>
                                }
                            </div>
                            }
                        </div>
                        :<div>{!loadingItinerary  && <p>{itinerary.length<2?"Add at least two stops to your itinerary!":"Only up to 12 stops can be added to your itinerary"}</p>}</div>
                    }
                    <br/> 
                </form>
                </div>
                :<p><Link to="/signin">Login</Link> to create your own itinerary</p>
                }
            </div>
        )
    }     
}

export default CreateItinerary;