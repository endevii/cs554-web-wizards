import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchSite from "./SearchSite";

function SiteList() {
  const [allSites, setAllSites] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearInput, setClearInput] = useState(false);
  const [manhattanFilter, setManhattanFilter] = useState(false);
  const [brooklynFilter, setBrooklynFilter] = useState(false);
  const [bronxFilter, setBronxFilter] = useState(false);
  const [queensFilter, setQueensFilter] = useState(false);
  const [statenFilter, setStatenFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
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
            zipCode: site.location.zipCode,
          },
          hours: {
            days: site.hours.days,
            time: site.hours.time,
          },
          website: site.website,
          borough: site.borough,
          founded: site.founded,
          rating: site.rating,
          reviews: site.reviews,
          image: site.image,
        };
        sites.push(siteInfo);
      });
      setAllSites(sites);
      setLoading(false);
    };
    getAllSites();
  }, []);

  useEffect(() => {
    const getSortedSites = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/sites/sort/${sortBy}`
      );
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
            zipCode: site.location.zipCode,
          },
          hours: {
            days: site.hours.days,
            time: site.hours.time,
          },
          website: site.website,
          borough: site.borough,
          founded: site.founded,
          rating: site.rating,
          reviews: site.reviews,
          image: site.image,
        };
        sites.push(siteInfo);
      });
      setSortedData(sites);
    };
    setClearInput(true);
    setSearchTerm("");
    setSearchData([]);
    if (sortBy) {
      getSortedSites();
    } else {
      setSortedData([]);
    }
  }, [sortBy]);

  useEffect(() => {
    if (clearInput) {
      document.getElementById("searchForm").reset();
    }
  }, [
    sortBy,
    manhattanFilter,
    brooklynFilter,
    bronxFilter,
    queensFilter,
    statenFilter,
  ]);

  useEffect(() => {
    const getFilteredSites = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/sites/search/${searchTerm}`
      );
      let sites = [];
      if (data && data.length > 0)
        data.map((site) => {
          let siteInfo = {
            _id: site._id,
            name: site.name,
            description: site.description,
            location: {
              address: site.location.address,
              city: site.location.city,
              state: site.location.state,
              zipCode: site.location.zipCode,
            },
            hours: {
              days: site.hours.days,
              time: site.hours.time,
            },
            website: site.website,
            borough: site.borough,
            founded: site.founded,
            rating: site.rating,
            reviews: site.reviews,
            image: site.image,
          };
          sites.push(siteInfo);
        });
      setSearchData(sites);
    };
    if (searchTerm) {
      const el = document.getElementsByClassName("boroughFilter");
      for (let inputHtml of el) {
        inputHtml.checked = false;
      }
      setManhattanFilter(false);
      setBrooklynFilter(false);
      setBronxFilter(false);
      setQueensFilter(false);
      setStatenFilter(false);
      getFilteredSites();
    } else {
      setSearchData([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (clearInput) {
      document.getElementById("searchForm").reset();
    }
  }, [
    sortBy,
    manhattanFilter,
    brooklynFilter,
    bronxFilter,
    queensFilter,
    statenFilter,
  ]);

  useEffect(() => {
    const getFilteredSites = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/sites/search/${searchTerm}`
      );
      let sites = [];
      if (data && data.length > 0)
        data.map((site) => {
          let siteInfo = {
            _id: site._id,
            name: site.name,
            description: site.description,
            location: {
              address: site.location.address,
              city: site.location.city,
              state: site.location.state,
              zipCode: site.location.zipCode,
            },
            hours: {
              days: site.hours.days,
              time: site.hours.time,
            },
            website: site.website,
            borough: site.borough,
            founded: site.founded,
            rating: site.rating,
            reviews: site.reviews,
            image: site.image,
          };
          sites.push(siteInfo);
        });
      setSearchData(sites);
    };
    if (searchTerm) {
      const el = document.getElementsByClassName("boroughFilter");
      for (let inputHtml of el) {
        inputHtml.checked = false;
      }
      setManhattanFilter(false);
      setBrooklynFilter(false);
      setBronxFilter(false);
      setQueensFilter(false);
      setStatenFilter(false);
      getFilteredSites();
    } else {
      setSearchData([]);
    }
  }, [searchTerm]);

  const buildSiteCard = (site) => {
    return (
      <div key={"div" + site._id}>
        <Link to={"/site/" + site._id} style={{ color: "#0072ee" }}>
          <div className="card" key={site._id}>
            {site.image ? (
              <img
                src={`/img/${site.name
                  .replaceAll(" ", "")
                  .replaceAll("/", "")}.jpeg`}
                className="card-img-top"
                alt={site.name}
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                className="card-img-top"
                alt="nothing available"
              />
            )}
            <div className="card-body">
              <h1 className="card-title">{site.name}</h1>
              <p>
                Address: {site.location.address}, {site.location.city},{" "}
                {site.location.state}, {site.location.zipCode}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  if (searchTerm) {
    card =
      searchData.length !== 0 &&
      searchData.map((site) => {
        return buildSiteCard(site);
      });
  } else if (sortBy) {
    card =
      sortedData &&
      sortedData.map((site) => {
        return buildSiteCard(site);
      });
  } else if (filterData.length > 0) {
    card = filterData.map((site) => {
      return buildSiteCard(site);
    });
  } else {
    card =
      allSites &&
      allSites.map((site) => {
        return buildSiteCard(site);
      });
  }

  useEffect(() => {
    const filterHandler = async () => {
      setSearchTerm("");
      setSearchData([]);
      let results = [];
      if (manhattanFilter) {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/siteBorough/Manhattan`
          );
          if (data) results = data;
        } catch (e) {
          console.log(e);
        }
      }
      if (brooklynFilter) {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/siteBorough/Brooklyn`
          );
          if (data) results = [...results, ...data];
        } catch (e) {
          console.log(e);
        }
      }
      if (bronxFilter) {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/siteBorough/Bronx`
          );
          if (data) results = [...results, ...data];
        } catch (e) {
          console.log(e);
        }
      }
      if (queensFilter) {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/siteBorough/Queens`
          );
          if (data) results = [...results, ...data];
        } catch (e) {
          console.log(e);
        }
      }
      if (statenFilter) {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/siteBorough/Staten%20Island`
          );
          if (data) results = [...results, ...data];
        } catch (e) {
          console.log(e);
        }
      }

      setFilterData(results);
    };
    filterHandler();
  }, [
    manhattanFilter,
    brooklynFilter,
    bronxFilter,
    queensFilter,
    statenFilter,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <br />
        <SearchSite searchValue={searchValue} />
        <label>
          Sort By:
          <select
            key="select"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            defaultValue=""
          >
            <option value="">Choose</option>
            <option value="age">Age</option>
            <option value="borough">Borough</option>
            <option value="ratingHighToLow">Rating (high to low)</option>
            <option value="ratingLowToHigh">Rating (low to high)</option>
          </select>
        </label>
        <input
          className="boroughFilter"
          type="checkbox"
          name="Manhattan"
          value="Manhattan"
          id="Manhattan"
          onClick={() => {
            setManhattanFilter(!manhattanFilter);
          }}
        ></input>
        <label htmlFor="Manhattan"> Manhattan</label>
        <input
          className="boroughFilter"
          type="checkbox"
          name="Brooklyn"
          value="Brooklyn"
          id="Brooklyn"
          onClick={() => {
            setBrooklynFilter(!brooklynFilter);
          }}
        ></input>
        <label htmlFor="Brooklyn"> Brooklyn</label>
        <input
          className="boroughFilter"
          type="checkbox"
          name="Bronx"
          value="Bronx"
          id="Bronx"
          onClick={() => {
            setBronxFilter(!bronxFilter);
          }}
        ></input>
        <label htmlFor="Bronx"> Bronx</label>
        <input
          className="boroughFilter"
          type="checkbox"
          name="Queens"
          value="Queens"
          id="Queens"
          onClick={() => {
            setQueensFilter(!queensFilter);
          }}
        ></input>
        <label htmlFor="Queens"> Queens</label>
        <input
          className="boroughFilter"
          type="checkbox"
          name="Staten"
          value="Staten"
          id="Staten"
          onClick={() => {
            setStatenFilter(!statenFilter);
          }}
        ></input>
        <label htmlFor="Staten"> Staten</label>
        {card ? card : <p>404: No Sites Found</p>}
      </div>
    );
  }
}
export default SiteList;
