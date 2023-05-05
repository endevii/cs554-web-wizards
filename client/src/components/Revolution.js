import axios from "axios";
import { useState, useEffect } from "react";
import CustomItineraryMap from './CustomItineraryMap';

function Revolution() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

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
        getSite("Castle Clinton");
        getSite("Bowling Green Park");
        getSite("Fraunces Tavern");
        getSite("Trinity Church");
        getSite("St. Paul's Chapel");
        getSite("Federal Hall");
    }, [sites]);

    return (
        <div className='revolution'>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 1: Castle Clinton</h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://hipcamp-res.cloudinary.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,h_480,q_60,w_720/v1541858037/park_images/poi/wyjpxrvewypjactillwt.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://upload.wikimedia.org/wikipedia/commons/b/b7/Habs_castle_clinton.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                One of more than twelve forts built to defend the New York Harbor during the 
                War of 1812, Castle Clinton National Monument has been on the southern tip of 
                Manhattan for more than 200 years. It was originally called Southwest Battery 
                but was later renamed to honor DeWitt Clinton, a late Governor of New York. 
                While here, you can also see the Battery Wall, a piece of Fort George from the 
                Revolutionary War and also one of the oldest remaining structural elements in 
                all of Manhattan. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 2: Bowling Green Park</h1>
            <div className='itinerary-container'>
                <div className='stepImageThree'>
                    <img className='resize-image' src='https://www.nycgovparks.org/photo_gallery/full_size/18836.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageFour'>
                    <img className='resize-image' src='https://media.timeout.com/images/103574051/image.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description-two'>
                Next, take a stroll through Bowling Green park, New York City’s oldest public 
                park. Right here is where the edge of the Hudson would have been during colonial 
                times. You can also see the fountain where, close by, a statue of King George 
                Once Stood, prior to the signing of the Declaration of Independence.  This statue 
                was later torn down and melted in order to be used as bullets for George Washington’s 
                Continental Army. The original iron fence is still standing today, enclosing the 
                park. From here, you can also see the location where George Washington set up his 
                first headquarters for the revolution in June of 1776. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 3: Fraunces Tavern</h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://www.boweryboyshistory.com/wp-content/uploads/2011/03/Fraunces-Tavern-Top-Image.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://images.squarespace-cdn.com/content/v1/5fb7f0e362de545f21c96c33/1624892848547-PLOIS7WQ7QCE3KGCP6JO/Photo+May+21%2C+6+45+08+PM.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                Our next stop will be Fraunces Tavern, the very tavern many founding fathers visited 
                in the time of the revolution. Established by Sameul Fraunces, this tavern became a 
                popular spot for rebels to meet and plan for what ended up becoming the American 
                Revolution. George Washington later gave a farewell speech here after they had won 
                the war. It also remained a popular spot for import members of the early US Government 
                to work after the revolution was over. Today, Fraunces Tavern is a museum and remains 
                a popular bar. It has also been restored in order to accurately show off the architecture
                of the time it was built.
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 4: Federal Hall</h1>
            <div className='itinerary-container'>
                <div className='stepImageThree'>
                    <img className='resize-image' src='https://npplan.com/wp-content/uploads/2017/09/Federal-Hall-001.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageFour'>
                    <img className='resize-image' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Federal_Hall_%2848126566178%29.jpg/300px-Federal_Hall_%2848126566178%29.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description-two'>
                Federal Hall was the location of the inauguration of George Washington as the very 
                first president of the United States on April 30th 1789, and there is a statue on display 
                commemorating this very moment. At the start of the nation, New York City served as the 
                capital, and much of the new government was run out of this very building. It is the 
                location where Congress met for the first time and where they adopted the bill of rights. 
                It is also where the Department of the State, the Department of the Treasury, and the 
                Supreme Court were created. Today, there is a museum which you can explore. 
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 5: Trinity Church</h1>
            <div className='itinerary-container'>
                <div className='stepImageOne'>
                    <img className='resize-image' src='https://www.goodyclancy.com/wp-content/uploads/2014/05/Trinity-Church-1A_Aerial_Goody-Clancy-900x615.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageTwo'>
                    <img className='resize-image' src='https://www.mbbarch.com/wp-content/uploads/2022/11/2022CP05-0162-1920x1714.gif' alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                With the original structure having been destroyed in The Great Fire of New York, a fire 
                which occurred in 1776 and destroyed 10 to 25% of the buildings in the city at the time, Trinity 
                Church was rebuilt in 1846. This fire occurred at the start of British occupation of the 
                city during the Revolutionary War and the population of the city at the time fell to only 
                12,000 people. Many historical figures are buried in the cemetery of Trinity Church, including 
                Alexander Hamilton, George Washington’s close aide and the first Treasury of the Secretary for 
                the United States. Eliza Hamilton and her sister Angelica Schuyler Church were also buried here. 
                This cemetery also has the oldest carved gravestone in all of New York City where a child named 
                Richard Churcher was laid to rest in 1681.
                </div>
            </div>
            <hr/>
            <h1 className='itinerary-stop-title'>Stop 6: Saint Paul’s Chapel</h1>
            <div className='itinerary-container'>
                <div className='stepImageThree'>
                    <img className='resize-image' src='https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/81/29.jpg' alt='federal hall'/>
                </div>
                <div className='stepImageFour'>
                    <img className='resize-image' src='https://www.nycgo.com/images/venues/1833/st-pauls-church-yard-15__large.jpg' alt='federal hall'/>
                </div>
                <div className='grid-item step-description-two'>
                Next up is Saint Paul’s Chapel. Saint Paul’s Chapel, which was able to survive The Great Fire of 
                New York, was the location where George Washington worshiped until British occupation of the city 
                in 1776. He returned to Saint Paul’s on the day of his inauguration as the first president of the 
                United States and it remained his place of worship throughout the time he was president while in New 
                York. A pew which Washington and his wife, Martha, worshiped at is on view inside. Saint Paulw as 
                also used as a place for firefighters, police officers, and construction workers to rest during the 
                recovery operations after 9/11, which lasted for 9 months.  
                </div>
            </div>
            <hr/>
            {!loading &&
                <CustomItineraryMap key="map" data={sites} id="Revolution"/>
            }
        </div>
    )
}

export default Revolution;