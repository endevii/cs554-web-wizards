import React, { useState } from "react";
import queries from '../queries';
import {useQuery} from '@apollo/client';

function SiteList() {
    const {loading, error, data} = useQuery(queries.GET_SITES, {
        fetchPolicy: 'cache-and-network'
    });
    
    if (data){
        return (
            <div>
                <br/>
                {data.sites.map((site) => {
                    return (
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
                    )
                })}
            </div>
        )
    } else if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>{error.message}</div>
    }
}
export default SiteList;