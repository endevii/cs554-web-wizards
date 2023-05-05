import axios from "axios";
import { useState, useEffect } from "react";
import CustomItineraryMap from './CustomItineraryMap';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Staten() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
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
        getSite("Staten Island Museum");
        getSite("Staten Island Borough Hall");
        getSite("Historic Richmond Town");
    }, [sites]);

    return (
        <div className='revolution'>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 1: Staten Island Museum</h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://gluckman-tang.s3.amazonaws.com/media/CACHE/images/StatenIslandMuseum_PhotoBruceDamonte_02/a4a74cc5c9a8bf00ec3827fb7b7b1fbe.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/d0/82/e6/opening-the-treasure.jpg?w=1200&h=-1&s=1' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                Our first stop will be at the Staten Island Museum, which contains specimens, 
                photos, field notes, and  records of changing biology in the region, all 
                spanning more than 150 years. They have a number of exhibitions which explore 
                art, natural science, history, and the connections among them. Please note the 
                exhibitions do change and a list of current and past exhibitions can be found 
                on their website. There is also an entrance fee ($8 for adults, $5 for students 
                and seniors, $2 for children 2-12, and free for museum members), and tickets 
                can also be bought on their website, which can be found here. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 2: Staten Island Borough Hall</h1>
            <div className='itinerary-container'>
                <div className='stepImageThree'>
                    <img className='resize-image' src='https://statenislandfyi.files.wordpress.com/2015/02/f0eceed1-3048-64e8-40aaaacd79bb7c62.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageFour'>
                    <img className='resize-image' src='https://www.nycgo.com/images/venues/6043/newborohall__large.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description-two'>
                Next up we have Staten Island Borough Hall, a designated New York City landmark. 
                This building was completed in 1906 after Staten Island became one of the five 
                boroughs of New York City and its government buildings moved to be closed to the 
                rest of the city. The building, which is in the style of the French Renaissance, 
                has three stories and plenty for the public to explore. Here, you can see a total 
                of 13 murals, each 6 ½ feet by 13 feet, that walk you through the history of Staten 
                Island. Each mural features a specific moment in the history of Staten Island. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 3: Historic Richmond Town </h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://www.nyc-arts.org/wp-content/uploads/2011/01/IMG_2112.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://www.silive.com/resizer/tFOs3qp2OZLTO5tKJAGR7S7cqaI=/arc-anglerfish-arc2-prod-advancelocal/public/S56Z43PJMJDBRH5WLNMCEDNGPM.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                The final stop for this tour will be Historic Richmond Town. Historic Richmond Town 
                is Staten Island’s largest and oldest historic institution. For almost two centuries, 
                prior to Staten Island becoming one of the five boroughs of New York City, the 
                government of Staten Island was found on the ground where Historic Richmond now stands. 
                The oldest building here was built in the 1600s, although one can explore almost any 
                period of time throughout the entire town. You can see a courthouse, a church, a 
                schoolhouse, and various different types of shops, including those of tinsmiths, carpenters, 
                and printers. You can explore the park on your own or take part in one of the guided tours 
                that take place once a day during the week and twice a day on the weekends. Please note that 
                historic Richmond town does require an entrance fee ($10 for adults, $ for youths, free for 
                kids 5 and under. Tickets can be bought online on their website, which can be found here. 
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
                        await axios.get("http://localhost:3001/deleteItinerary/"+user.uid, {
                            params: {
                                itinerary: JSON.stringify(temp)
                            }
                        })
                        alert("Itinerary unsaved");
                    }catch(e) {
                        alert("Error: You have not saved this itinerary");
                    }
                })}>Unsave Itinerary</button>
            }
        </div>
    )
}

export default Staten;