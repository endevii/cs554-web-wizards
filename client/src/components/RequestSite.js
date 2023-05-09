import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const RequestSite = () => {
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteCity, setSiteCity] = useState("");
  const [siteState, setSiteState] = useState("");
  const [siteZip, setSiteZip] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [siteImage, setSiteImage] = useState("");
  const [siteLatitude, setSiteLatitude] = useState("");
  const [siteLongitude, setSiteLongitude] = useState("");
  const [siteBorough, setSiteBorough] = useState("");
  const [siteType, setSiteType] = useState("");
  const [siteFounded, setSiteFounded] = useState("");
  const [siteWebsite, setSiteWebsite] = useState("");
  const [siteDayStart, setSiteDayStart] = useState("");
  const [siteDayEnd, setSiteDayEnd] = useState("");
  const [siteTimeStart, setSiteTimeStart] = useState("");
  const [siteTimeStartAP, setSiteTimeStartAP] = useState("");
  const [siteTimeEnd, setSiteTimeEnd] = useState("");
  const [siteTimeEndAP, setSiteTimeEndAP] = useState("");

  const [siteRequestSuccess, setSiteRequestSuccess] = useState(false);

  const [userName, setUserName] = useState("");
  const [uidLoading, setUidLoading] = useState(true);

  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setUidLoading(false);
      } else {
        setUidLoading(false);
      }
    });
  }, [auth]);

  const ids = [
    "siteName",
    "siteAddress",
    "siteCity",
    "siteState",
    "siteZip",
    "siteDescription",
    "siteImage",
    "siteLatitude",
    "siteLongitude",
    "siteBorough",
    "siteType",
    "siteFounded",
    "siteWebsite",
    "siteDayStart",
    "siteDayEnd",
    "siteTimeStart",
    "siteTimeStartAP",
    "siteTimeEnd",
    "siteTimeEndAP",
  ];

  const handleReset = (e) => {
    e.preventDefault();
    setSiteName("");
    setSiteAddress("");
    setSiteCity("");
    setSiteState("");
    setSiteZip("");
    setSiteDescription("");
    setSiteImage("");
    setSiteLatitude("");
    setSiteLongitude("");
    setSiteBorough("");
    setSiteType("");
    setSiteFounded("");
    setSiteWebsite("");
    setSiteDayStart("");
    setSiteDayEnd("");
    setSiteTimeStart("");
    setSiteTimeStartAP("");
    setSiteTimeEnd("");
    setSiteTimeEndAP("");
    ids.forEach((id) => {
      document.getElementById(id).style.border = "1px solid #ced4da";
    });
    document.getElementById("siteRequestForm").reset();
    setSiteRequestSuccess(false);
  };

  const removeBorders = () => {
    ids.forEach((id) => {
      document.getElementById(id).style.border = "1px solid #ced4da";
    });
  };

  const handleSoftReset = (e) => {
    // e.preventDefault();
    setSiteName("");
    setSiteAddress("");
    setSiteCity("");
    setSiteState("");
    setSiteZip("");
    setSiteDescription("");
    setSiteImage("");
    setSiteLatitude("");
    setSiteLongitude("");
    setSiteBorough("");
    setSiteType("");
    setSiteFounded("");
    setSiteWebsite("");
    setSiteDayStart("");
    setSiteDayEnd("");
    setSiteTimeStart("");
    setSiteTimeStartAP("");
    setSiteTimeEnd("");
    setSiteTimeEndAP("");
    ids.forEach((id) => {
      document.getElementById(id).style.border = "1px solid #ced4da";
    });
    document.getElementById("siteRequestForm").reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    removeBorders();
    let errors = [];
    if (!siteName || siteName.trim().length === 0) {
      errors.push("Please enter a name for the site.");
      document.getElementById("siteName").style.border = "1px solid red";
    }
    if (!siteAddress || siteAddress.trim().length === 0) {
      errors.push("Please enter an address for the site.");
      document.getElementById("siteAddress").style.border = "1px solid red";
    }
    if (!siteCity || siteCity.trim().length === 0) {
      errors.push("Please enter a city for the site.");
      document.getElementById("siteCity").style.border = "1px solid red";
    }
    if (!siteState || siteState.trim().length === 0) {
      errors.push("Please enter a state for the site.");
      document.getElementById("siteState").style.border = "1px solid red";
    }
    if (!siteZip || siteZip.trim().length === 0) {
      errors.push("Please enter a zip code for the site.");
      document.getElementById("siteZip").style.border = "1px solid red";
    }
    if (!siteDescription || siteDescription.trim().length === 0) {
      errors.push("Please enter a description for the site.");
      document.getElementById("siteDescription").style.border = "1px solid red";
    }
    if (!siteImage || siteImage.trim().length === 0) {
      errors.push("Please enter an image for the site.");
      document.getElementById("siteImage").style.border = "1px solid red";
    }
    if (!siteLatitude || siteLatitude.trim().length === 0) {
      errors.push("Please enter a latitude for the site.");
      document.getElementById("siteLatitude").style.border = "1px solid red";
    } else if (isNaN(parseInt(siteLatitude.trim()))) {
      errors.push("Please enter a valid latitude for the site.");
      document.getElementById("siteLatitude").style.border = "1px solid red";
    }
    if (!siteLongitude || siteLongitude.trim().length === 0) {
      errors.push("Please enter a longitude for the site.");
      document.getElementById("siteLongitude").style.border = "1px solid red";
    } else if (isNaN(parseInt(siteLongitude.trim()))) {
      errors.push("Please enter a valid longitude for the site.");
      document.getElementById("siteLongitude").style.border = "1px solid red";
    }
    if (!siteBorough || siteBorough.trim().length === 0) {
      errors.push("Please enter a borough for the site.");
      document.getElementById("siteBorough").style.border = "1px solid red";
    }
    if (!siteType || siteType.trim().length === 0) {
      errors.push("Please enter a type for the site.");
      document.getElementById("siteType").style.border = "1px solid red";
    }
    if (!siteFounded || siteFounded.trim().length === 0) {
      errors.push("Please enter a founded date for the site.");
      document.getElementById("siteFounded").style.border = "1px solid red";
    }
    if (!siteWebsite || siteWebsite.trim().length === 0) {
      errors.push("Please enter a website for the site.");
      document.getElementById("siteWebsite").style.border = "1px solid red";
    }
    if (!siteDayStart || siteDayStart.trim().length === 0) {
      errors.push("Please enter a start day for the site.");
      document.getElementById("siteDayStart").style.border = "1px solid red";
    } else if (siteDayStart.trim() === "...") {
      errors.push("Please enter a valid start day for the site.");
      document.getElementById("siteDayStart").style.border = "1px solid red";
    }
    if (!siteDayEnd || siteDayEnd.trim().length === 0) {
      errors.push("Please enter an end day for the site.");
      document.getElementById("siteDayEnd").style.border = "1px solid red";
    } else if (siteDayEnd.trim() === "...") {
      errors.push("Please enter a valid end day for the site.");
      document.getElementById("siteDayEnd").style.border = "1px solid red";
    }
    if (!siteTimeStart || siteTimeStart.trim().length === 0) {
      errors.push("Please enter a start time for the site.");
      document.getElementById("siteTimeStart").style.border = "1px solid red";
    } else if (siteTimeStart.trim().length > 5) {
      errors.push("Please enter a valid start time for the site.");
      document.getElementById("siteTimeStart").style.border = "1px solid red";
    }
    if (!siteTimeStartAP || siteTimeStartAP.trim().length > 2) {
      errors.push("Please enter a start time AM/PM for the site.");
      document.getElementById("siteTimeStartAP").style.border = "1px solid red";
    }
    if (!siteTimeEnd || siteTimeEnd.trim().length === 0) {
      errors.push("Please enter an end time for the site.");
      document.getElementById("siteTimeEnd").style.border = "1px solid red";
    } else if (siteTimeEnd.trim().length > 5) {
      errors.push("Please enter a valid end time for the site.");
      document.getElementById("siteTimeEnd").style.border = "1px solid red";
    }
    if (!siteTimeEndAP || siteTimeEndAP.trim().length > 2) {
      errors.push("Please enter an end time AM/PM for the site.");
      document.getElementById("siteTimeEndAP").style.border = "1px solid red";
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      let startday = siteDayStart.substring(0, 3);
      let endday = siteDayEnd.substring(0, 3);
      let days = startday + "-" + endday;
      let starttime = siteTimeStart + siteTimeStartAP;
      let endtime = siteTimeEnd + siteTimeEndAP;
      let time = starttime + "-" + endtime;

      let latLong = [parseFloat(siteLatitude), parseFloat(siteLongitude)];

      const locationData = {
        address: siteAddress,
        city: siteCity,
        state: siteState,
        zipCode: siteZip,
        coordinates: latLong,
      };

      const hoursData = {
        days: days,
        time: time,
      };

      let descriptionFinal = siteDescription.split(".");
      descriptionFinal = descriptionFinal.filter((sentence) => {
        return sentence.trim().length > 0;
      });
      descriptionFinal = descriptionFinal.map((sentence) => {
        let temp = sentence.trim();
        temp = temp + ".";
        return temp;
      });

      try {
        const { data } = await axios.post(
          "http://localhost:3001/sites/request/" + userName,
          {
            name: siteName,
            description: descriptionFinal,
            image: siteImage,
            borough: siteBorough,
            category: siteType,
            founded: siteFounded,
            website: siteWebsite,
            location: locationData,
            hours: hoursData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.error) {
          alert(data.error.join("\n"));
        } else {
          alert("Site request submitted successfully!");
          handleSoftReset();
          setSiteRequestSuccess(true);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.error.join("\n"));
      }
    }
  };
  if (uidLoading) return <div>Loading...</div>;

  if (!uidLoading && !userName) return <Navigate to="/signin" replace />;
  return (
    <div className="request-site">
      <h1>Request Site</h1>
      <div>
        <p>
          If you would like to request a site to be added to the database,
          please fill in the form below.
        </p>
        <br />
        <p>
          Please note that all fields are required. If you do not know the
          answer to a field, please enter "N/A".
        </p>
        <p style={{ color: "#ee0000" }}>
          Important: Time must be either 00:00 or 00. If the site is open 24 hrs
          a day, please enter 12 AM for both start and end times.
        </p>
        {siteRequestSuccess && (
          <p style={{ color: "green" }}>Site request submitted successfully!</p>
        )}
      </div>
      <div>
        <form className="form-rp" name="siteRequestForm" id="siteRequestForm">
          <div className="form-group">
            <div className="form-item">
              <label htmlFor="siteName">Name</label>
              <input
                type="text"
                className="form-control"
                id="siteName"
                placeholder="Enter site name"
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="siteAddress"
                placeholder="Enter site address"
                onChange={(e) => setSiteAddress(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteCity">City</label>
              <input
                type="text"
                className="form-control"
                id="siteCity"
                placeholder="Enter site city"
                onChange={(e) => setSiteCity(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteState">State</label>
              <input
                type="text"
                className="form-control"
                id="siteState"
                placeholder="Enter site state"
                onChange={(e) => setSiteState(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteZip">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="siteZip"
                placeholder="Enter site zip code"
                onChange={(e) => setSiteZip(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="siteDescription"
                placeholder="Enter site description"
                onChange={(e) => setSiteDescription(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteImage">Image</label>
              <input
                type="text"
                className="form-control"
                id="siteImage"
                placeholder="Enter site image"
                onChange={(e) => setSiteImage(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteBorough">Borough</label>
              <input
                type="text"
                className="form-control"
                id="siteBorough"
                placeholder="Enter site borough"
                onChange={(e) => setSiteBorough(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteType">Category</label>
              <input
                type="text"
                className="form-control"
                id="siteType"
                placeholder="Enter site type"
                onChange={(e) => setSiteType(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteFounded">Year Founded</label>
              <input
                type="text"
                className="form-control"
                id="siteFounded"
                placeholder="Enter year founded"
                onChange={(e) => setSiteFounded(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="siteWebsite">Website</label>
              <input
                type="text"
                className="form-control"
                id="siteWebsite"
                placeholder="Enter site website"
                onChange={(e) => setSiteWebsite(e.target.value)}
              />
            </div>
            <div className="form-item-group">
              <div className="form-item">
                <label htmlFor="siteTimeStart">Time Start</label>
                <input
                  type="text"
                  className="form-control"
                  id="siteTimeStart"
                  placeholder="Enter site time start"
                  onChange={(e) => setSiteTimeStart(e.target.value)}
                />
                <select
                  className="form-control"
                  id="siteTimeStartAP"
                  onChange={(e) => setSiteTimeStartAP(e.target.value)}
                  defaultValue={"..."}
                >
                  <option>...</option>
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="siteTimeEnd">Time End</label>
                <input
                  type="text"
                  className="form-control"
                  id="siteTimeEnd"
                  placeholder="Enter site time end"
                  onChange={(e) => setSiteTimeEnd(e.target.value)}
                />
                <select
                  className="form-control"
                  id="siteTimeEndAP"
                  onChange={(e) => setSiteTimeEndAP(e.target.value)}
                  defaultValue={"..."}
                >
                  <option>...</option>
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <div className="form-item-group">
              <div className="form-item">
                <label htmlFor="siteLatitude">Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="siteLatitude"
                  placeholder="Enter site latitude"
                  onChange={(e) => setSiteLatitude(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="siteLongitude">Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="siteLongitude"
                  placeholder="Enter site longitude"
                  onChange={(e) => setSiteLongitude(e.target.value)}
                />
              </div>
            </div>
            <div className="form-item-group">
              <div className="form-item">
                <label htmlFor="siteDayStart">Day Start</label>
                <select
                  className="form-control"
                  id="siteDayStart"
                  defaultValue={"..."}
                  onChange={(e) => setSiteDayStart(e.target.value)}
                >
                  <option>...</option>
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
              </div>
              <div className="form-item-group">
                <div className="form-item">
                  <label htmlFor="siteDayEnd">Day End</label>
                  <select
                    className="form-control"
                    id="siteDayEnd"
                    defaultValue={"..."}
                    onChange={(e) => setSiteDayEnd(e.target.value)}
                  >
                    <option>...</option>
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>

              <button
                type="reset"
                className="btn btn-primary"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestSite;
