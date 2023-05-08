import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchSite from "./SearchSite";

function SiteList() {
    const [allSites, setAllSites] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [sortedData, setSortedData] = useState([])
    const [loading, setLoading] = useState(true)
    const [clearInput, setClearInput] = useState(false)
    let card = null;
    const searchValue = async (value) => {
        setSearchTerm(value);
      };
    
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
            setAllSites(sites);
            setLoading(false)
        };
        getAllSites();
    }, []);

    useEffect(()=>{
        const getSortedSites = async() => {
            const { data } = await axios.get(`http://localhost:3001/sites/sort/${sortBy}`);
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
            setSortedData(sites);
        };
        setClearInput(true);
        setSearchTerm("")
        setSearchData([])
        if(sortBy){
            getSortedSites();
        }else{
            setSortedData([])
        }
    }, [sortBy])

    useEffect(()=>{
        if(clearInput){
            document.getElementById('searchForm').reset();
        }
    }, [sortBy])

    useEffect(()=>{
        const getFilteredSites = async() =>{
            const { data } = await axios.get(`http://localhost:3001/sites/search/${searchTerm}`);
            let sites = [];
            if(data && data.length>0)
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
            setSearchData(sites)
        }
        if(searchTerm){
            getFilteredSites();
        }else{
            setSearchData([])
        }
    }, [searchTerm])

    const buildSiteCard = (site) => {
        return (
            <div key={"div"+site._id}>
            <Link to={'/site/' + site._id} >
                        <div className="card" key={site._id}>
                            {site.image
                                ?<img src={site.image} className='card-img-top' alt={site.name} />
                                :<img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" className='card-img-top' alt='nothing available' />
                            }
                            <div className="card-body">
                                <h5 className="card-title">{site.name}</h5>
                                <p>Address: {site.location.address}, {site.location.city}, {site.location.state}, {site.location.zipCode}</p>
                            </div>
                        </div>
            </Link>
            </div>
            
        )
    }
    
    if(searchTerm){
        card = searchData.length!==0 && searchData.map((site) => {
        return buildSiteCard(site);
      });
    } else if(sortBy){
        card = sortedData && sortedData.map((site)=> {
            return buildSiteCard(site)
        });
    }else{
        card = allSites && allSites.map((site)=>{
            return buildSiteCard(site)
        })
    }

    if(loading){
        return <div>Loading...</div>
    }else{
        return (
            <div>
                <br/>
                <SearchSite searchValue={searchValue}/>
                <label>
                    Sort By: 
                    <select
                        key="select"
                        onChange={(e) => {
                         setSortBy(e.target.value);
                        }}
                        defaultValue=""
                    >
                        <option  value="">Choose</option>
                        <option  value="age">Age</option>
                        <option  value="borough">Borough</option>
                        <option  value="ratingHighToLow">Rating (high to low)</option>
                        <option value="ratingLowToHigh">Rating (low to high)</option>
                    </select>
                 </label>
                {card ? card: <p>404: No Sites Found</p>}
            </div>
        )
    } 
}
export default SiteList;
