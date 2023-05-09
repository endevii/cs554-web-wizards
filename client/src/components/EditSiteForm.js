import React, { useEffect, useState } from "react";
import "../App.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import axios from "axios";

const EditSiteForm = (props) => {
  let site = props.site;
  let user = props.user;
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
  const [noUpdatesMade, setNoUpdatesMade] = useState(false);
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

  const handleSoftReset = () => {
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

  const fillInData = (e) => {
    e.preventDefault();
    setSiteName(site.name);
    setSiteAddress(site.location.address);
    setSiteCity(site.location.city);
    setSiteState(site.location.state);
    setSiteZip(site.location.zipCode);
    let desc = site.description.join(" ");
    setSiteDescription(desc);
    setSiteImage(site.image);
    setSiteLatitude(site.location.coordinates[0].toString());
    setSiteLongitude(site.location.coordinates[1].toString());
    setSiteBorough(site.borough);
    setSiteType(site.category);
    setSiteFounded(site.founded.toString());
    setSiteWebsite(site.website);
    let time = site.hours.time.split("-");
    let days = site.hours.days.split("-");
    let week = {
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
      Sun: "Sunday",
    };
    setSiteDayStart(week[days[0]]);
    setSiteDayEnd(week[days[1]]);
    setSiteTimeStart(time[0].substring(0, time[0].length - 2));
    setSiteTimeStartAP(time[0].substring(time[0].length - 2));
    setSiteTimeEnd(time[1].substring(0, time[1].length - 2));
    setSiteTimeEndAP(time[1].substring(time[1].length - 2));

    document.getElementById("siteName").value = site.name;
    document.getElementById("siteAddress").value = site.location.address;
    document.getElementById("siteCity").value = site.location.city;
    document.getElementById("siteState").value = site.location.state;
    document.getElementById("siteZip").value = site.location.zipCode;
    document.getElementById("siteDescription").value = desc;
    document.getElementById("siteImage").value = site.image;
    document.getElementById("siteLatitude").value =
      site.location.coordinates[0];
    document.getElementById("siteLongitude").value =
      site.location.coordinates[1];
    document.getElementById("siteBorough").value = site.borough;
    document.getElementById("siteType").value = site.category;
    document.getElementById("siteFounded").value = site.founded;
    document.getElementById("siteWebsite").value = site.website;
    document.getElementById("siteDayStart").value = week[days[0]];
    document.getElementById("siteDayEnd").value = week[days[1]];
    document.getElementById("siteTimeStart").value = time[0].substring(
      0,
      time[0].length - 2
    );
    document.getElementById("siteTimeStartAP").value = time[0].substring(
      time[0].length - 2
    );
    document.getElementById("siteTimeEnd").value = time[1].substring(
      0,
      time[1].length - 2
    );
    document.getElementById("siteTimeEndAP").value = time[1].substring(
      time[1].length - 2
    );
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
    if (errors.length === 19) {
      errors.push("Must change atleast 1 field to update site.");
      alert(errors.join("\n"));
    } else {
      let startday = siteDayStart ? siteDayStart.substring(0, 3) : null;
      let endday = siteDayEnd ? siteDayEnd.substring(0, 3) : null;
      let days = startday && endday ? startday + "-" + endday : null;
      let starttime =
        siteTimeStart && siteTimeStartAP
          ? siteTimeStart + siteTimeStartAP
          : null;
      let endtime =
        siteTimeEnd && siteTimeEndAP ? siteTimeEnd + siteTimeEndAP : null;
      let time = starttime && endtime ? starttime + "-" + endtime : null;

      let latLong =
        siteLatitude && siteLongitude
          ? [parseFloat(siteLatitude), parseFloat(siteLongitude)]
          : null;

      const locationData = {
        address: siteAddress || null,
        city: siteCity || null,
        state: siteState || null,
        zipCode: siteZip || null,
        coordinates: latLong || null,
      };

      const hoursData = {
        days: days || null,
        time: time || null,
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
      if (descriptionFinal.length === 0) {
        descriptionFinal = null;
      }
      // console.log({
      //   name: siteName ? siteName : null,
      //   description: descriptionFinal ? descriptionFinal : null,
      //   image: siteImage ? siteImage : null,
      //   borough: siteBorough ? siteBorough : null,
      //   category: siteType ? siteType : null,
      //   founded: siteFounded ? siteFounded : null,
      //   website: siteWebsite ? siteWebsite : null,
      //   location: locationData ? locationData : null,
      //   hours: hoursData ? hoursData : null,
      // });
      try {
        const { data } = await axios.patch(
          "http://localhost:3001/admin/" + user.uid + "/update/" + site._id,
          {
            name: siteName ? siteName : null,
            description: descriptionFinal ? descriptionFinal : null,
            image: siteImage ? siteImage : null,
            borough: siteBorough ? siteBorough : null,
            category: siteType ? siteType : null,
            founded: siteFounded ? siteFounded : null,
            website: siteWebsite ? siteWebsite : null,
            location: locationData ? locationData : null,
            hours: hoursData ? hoursData : null,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.error) {
          alert(data.error);
        } else {
          alert("Update request submitted successfully!");
          handleSoftReset();
          window.location.reload();
          setSiteRequestSuccess(true);
        }
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.error === "ERROR: NO UPDATES WERE MADE"
        ) {
          setNoUpdatesMade(true);
          alert("No updates were made.");
        } else {
          // console.log(err);
          alert(err.response.data.error);
        }
      }
    }
  };
  if (uidLoading) return <div>Loading...</div>;

  return (
    <div>
      <form
        className="form-rp"
        name="siteRequestForm"
        id="siteRequestForm"
        autoComplete="off"
      >
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

            <button className="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
            <button className="btn btn-primary" onClick={fillInData}>
              Fill
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSiteForm;
