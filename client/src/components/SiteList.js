import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SiteList() {
    const [allSites, setAllSites] = useState([]);

    useEffect(() => {
        const getAllSites = async () => {
            const { data } = await axios.get("http://localhost:3001/sites");
            let sites = [];
            data.map((site) => {
                let siteInfo = {
                    _id: site._id,
                    name: site.name,
                    description: site.description,
                    location: {
                        address: site.location.address,
                        city: site.location.city,
                        state: site.location.state,
                        zipCode: site.location.zipCode
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
                sites.push(siteInfo);
            });
            setAllSites((sites));
        };
        getAllSites();
    }, [])

    if(allSites.length > 1){
        return (
            <div>
                <br/>
                {allSites.map((site) => {
                    return (
                        <Link to={'/site/' + site._id}>
                        <div className="card" key={site._id}>
                            {site.image
                                ?<img src={site.image} className='card-img-top' alt='location' />
                                :<img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" className='card-img-top' alt='nothing available' />
                            }
                            <div className="card-body">
                                <h5 className="card-title">{site.name}</h5>
                                <p>Address: {site.location.address}, {site.location.city}, {site.location.state}, {site.location.zipCode}</p>
                            </div>
                        </div>
                        </Link>
                    )
                })}
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
export default SiteList;
