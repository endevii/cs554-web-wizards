import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import EditSiteForm from "./EditSiteForm";

const Admin = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [mongoUser, setMongoUser] = useState(null);
  const [name, setName] = useState("");
  const [waitingSites, setWaitingSites] = useState(null);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [changeSite, setChangeSite] = useState(null);

  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [auth, name]);

  useEffect(() => {
    const getUser = async (uid) => {
      const { data } = await axios.get("http://localhost:3001/user/" + uid);
      setMongoUser(data);
      setLoadingUser(false);
    };
    if (!loading) {
      getUser(user.uid);
    }
  }, [loading, user]);

  useEffect(() => {
    const getWaitingSites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/admin/" + mongoUser.uid.toString() + "/"
        );
        setWaitingSites(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!loadingUser) {
      getWaitingSites();
    }
  }, [loadingUser, mongoUser]);

  const closeForm = () => {
    setDisplayEdit(false);
  };

  const approveSite = async (siteId) => {
    try {
      const res = await axios.get(
        "http://localhost:3001/admin/" + mongoUser.uid + "/approve/" + siteId
      );
      window.location.reload();
    } catch (err) {
      alert(err.response.error.join("\n"));
    }
  };

  const rejectSite = async (siteId) => {
    try {
      const res = await axios.delete(
        "http://localhost:3001/admin/" + mongoUser.uid + "/reject/" + siteId
      );
      window.location.reload();
    } catch (err) {
      alert(err.response.error.join("\n"));
    }
  };

  const editSite = async (site) => {
    // popup EditSiteForm
    setChangeSite(site);
    setDisplayEdit(true);
  };

  const displaySite = (site) => {
    return (
      <div key={"div" + site._id} className="revolution">
        <hr />
        <div className="site-header">
          <h1 className="itinerary-stop-title">
            {site.name}: Requested by {site.user}
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              approveSite(site._id);
            }}
          >
            Approve
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              rejectSite(site._id);
            }}
          >
            Reject
          </button>
          <button className="btn btn-primary" onClick={() => editSite(site)}>
            Edit
          </button>
        </div>
        <div className="admin-container">
          <div className="customImageItinerary">
            <img
              className="resize-image img"
              src={site.image}
              alt="federal hall"
            />
          </div>
          <div>
            <ul id="description-list">
              {site.description.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul id="description-list">
              <li>Address: {site.location.address}</li>
              <li>City: {site.location.city}</li>
              <li>State: {site.location.state}</li>
              <li>Zip: {site.location.zipCode}</li>
              <li>
                Coordinates: {site.location.coordinates[0]},{" "}
                {site.location.coordinates[1]}
              </li>
            </ul>
          </div>
          <div>
            <ul id="description-list">
              <li>Hours: {site.hours.time}</li>
              <li>Days: {site.hours.days}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const makeAdmin = async () => {
    const userId = document.getElementById("makeadmin").value;
    try {
      const res = await axios.post(
        "http://localhost:3001/admin/" +
          mongoUser.uid +
          "/addpermission/" +
          userId +
          "/admin"
      );
      alert("Made admin");
    } catch (err) {
      let error = err.response.data.error;
      if (error === "ERROR: USER ALREADY HAS PERMISSION") {
        alert("User is already an admin.");
        return;
      }
      alert(err.response.data.error);
    }
  };

  const removeAdmin = async () => {
    let userId = document.getElementById("makeadmin").value;
    userId = userId.trim();
    if (userId === mongoUser.uid) {
      alert("Cannot remove yourself as admin.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/admin/" +
          mongoUser.uid +
          "/removepermission/" +
          userId +
          "/admin"
      );
      alert("Removed admin");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!waitingSites) {
    if (mongoUser && !mongoUser.permissions.includes("admin")) {
      return <Navigate to="/" />;
    }
    return <div>Loading...</div>;
  }

  if (mongoUser && waitingSites) {
    if (
      mongoUser.permissions &&
      mongoUser.permissions.includes("admin") === true
    ) {
      return (
        <div className="admin-page">
          <h1>Admin Page</h1>

          <div className="add-admin">
            <label htmlFor="makeadmin">
              Add or remove an admin
              <input
                name="makeadmin"
                type="text"
                placeholder="User ID"
                id="makeadmin"
              />
            </label>
            <button className="btn btn-close" onClick={() => makeAdmin()}>
              Add
            </button>
            <button className="btn btn-close" onClick={() => removeAdmin()}>
              Remove
            </button>
          </div>
          <h2>Sites Waiting for Approval</h2>
          {waitingSites && waitingSites.length !== 0 ? (
            <div>{waitingSites.map((site) => displaySite(site))}</div>
          ) : (
            <div>No waiting sites</div>
          )}
          {displayEdit && (
            <div className="popup-edit">
              <button className="btn btn-close" onClick={() => closeForm()}>
                Close
              </button>
              <EditSiteForm site={changeSite} user={mongoUser} />
            </div>
          )}
        </div>
      );
    } else {
      return <Navigate to="/" />;
    }
  }
};

export default Admin;
