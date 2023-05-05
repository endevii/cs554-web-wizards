import axios from "axios";
import { useState, useEffect } from "react";
import CustomItineraryMap from './CustomItineraryMap';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function BrooklynBattles() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [mongoUser, setMongoUser] = useState(null);
    const [name, setName] = useState("");
    let auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){  
                setUser(user);
                //le.log(user);
                setName(user.displayName)
                if(name !== ""){
                    console.log(name); 
                    setLoadingUser(false);
                }
            } else {
                setLoadingUser(false);
            }
        });
    }, [auth, name])

    useEffect(() => {
        const getSite = async (name) => {
            const getSite = async () => {
                const { data } = await axios.get(
                  `http://localhost:3001/sites/name/${name}`
                );
                if(sites.filter(e => e.name === data[0].name).length === 0){
                    sites.push(data[0]);
                    setSites(sites);
                }
                setLoading(false);
              };
              getSite();
        };
        getSite("Fort Greene Park");
        getSite("The Old Stone House");
        getSite("Green-Wood Cemetery");
        getSite("John Paul Jones Park");
    }, [sites]);

    return (
        <div className='revolution'>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 1: Fort Greene Park</h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://www.nycgovparks.org/photo_gallery/full_size/10265.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://untappedcities.com/wp-content/uploads/2018/07/Fort-Greene-Untapped-Cities-Fort-Greene-Park-Prison-Ship-Martyrs-Monument.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                The first stop on this tour will be Fort Greene Park. Forte Green Park marks 
                the land where Fort Putnam, a military fort used during the American 
                Revolution, was built in 1776. The continental army had to retreat from this 
                fort during the battle of Long Island. Later, the fort had to be rebuilt for 
                the War of 1812 and it was then renamed for General Greene, hence the name 
                Fort Greene Park. It was designated a public park in 1845 and has been ever 
                since. Here, you can also see the Prison Ship Martyrs Monument, a monument 
                which honors 11,000 soldiers that were held as prisoners  and died on British 
                prison ships.
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 2: The Old Stone House</h1>
            <div className='itinerary-container'>
                <div className='stepImageThree'>
                    <img className='resize-image' src='https://brooklyneagle.com/wp-content/uploads/2018/06/old-stone-house_1.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageFour'>
                    <img className='resize-image' src='https://historichousetrust.org/wp-content/uploads/2021/01/OSH-inline-2-1024x671.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description-two'>
                Our second stop will be The Old Stone House which is a reconstruction of a 
                house that was actually built in 1699. It was originally from the times of 
                Dutch colonizers and the house was built on land that once belonged to the 
                Lenape. It stands on the land where the Battle of Brooklyn took place and was 
                actually a large part of the battle. Today, there are a number of exhibits 
                which you can visit, including some focusing on the American Revolutionary War, 
                life in Brooklyn during the mid to late 1700s, works by emerging artists, and 
                more. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 3: Green Wood Cemetery</h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Green-Wood_Cemetery_gate_%2853784p%29_cropped.jpg/1200px-Green-Wood_Cemetery_gate_%2853784p%29_cropped.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://www.brownstoner.com/wp-content/uploads/2020/07/greenwood-cemetery-brooklyn-architecture-arts-2019-2.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                Green Wood Cemetery will be our third stop and it is packed with American 
                battle history. Here, you can see Battle Hill, the highest point in Brooklyn 
                and also the site of the Battle of Long Island where the British captured 1,000 
                Continental Army soldiers. Established in 1838, the cemetery is still active, 
                and it also holds a number of people from throughout history. The cemetery also 
                has a project called the Green-Wood World War II Project, which is honoring the 
                individuals who served in the military during World War II. They also have a 
                number of archives which you are able to look through. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 4: John Paul Jones Park</h1>
            <div className='itinerary-container'>
                <div className='stepImageThree'>
                    <img className='resize-image' src='https://www.nycgovparks.org/photo_gallery/full_size/19050.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageFour'>
                    <img className='resize-image' src='https://www.nycgovparks.org/photo_gallery/full_size/19048.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description-two'>
                The fourth and final stop will be in John Paul Jones Park. This park was named 
                after John Paul Jones, a soldier who served in the Continental Army during the 
                Revolutionary War and later became known as “the Father of the Navy.” This park 
                was a launching point for the British during the American Revolutionary War. During 
                one battle, 200 American soldiers fired cannons towards the incoming 15,000 British 
                soldiers, although they were ultimately forced to retreat due to how outnumbered 
                they were. 
                </div>
            </div>
            <hr/>
            {!loading &&
                <CustomItineraryMap key="map" data={sites} />
            }
            <br/>
            {!loading && !loadingUser &&
                <button onClick={(async (e) => {
                    //console.log(sites)
                try{
                    const { data } = await axios.get("http://localhost:3001/addItinerary/"+user.uid, {
                        params: {
                            itinerary: JSON.stringify(sites)
                        }
                    })
                    console.log(data)
                    setMongoUser(data);
                    alert("Itinerary saved");
                }catch(e){
                    alert("Error: You already saved this itinerary");
                }
                })}>Save Itinerary</button>
            }
            <br/>
            <br/>
            {!loading && !loadingUser &&
                <button onClick={(async (e) => {
                    //console.log(sites)
                    let itineraryId = "";
                    sites.forEach(site => {
                        itineraryId = itineraryId + site._id;
                    })
                    let temp = {
                        id: itineraryId,
                        itinerary: sites
                    }
                    try{
                        const { data } = await axios.get("http://localhost:3001/deleteItinerary/"+user.uid, {
                            params: {
                                itinerary: JSON.stringify(temp)
                            }
                        })
                        console.log(data);
                        setMongoUser(data);
                        alert("Itinerary unsaved");
                    }catch(e){
                        alert("Error: you have not saved this itinerary");
                    }
                })}>Unsave Itinerary</button>
            }
        </div>
    )
}

export default BrooklynBattles;