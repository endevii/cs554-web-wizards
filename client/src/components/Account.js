import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOutButton from "./SignOut";
import axios from "axios";
import { Link } from "react-router-dom";

function Account() {
  //const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [mongoUser, setMongoUser] = useState(null);
  const [name, setName] = useState("");
  let card = null;
  //const [file, setFile] = useState(null);
  //const [upload, setUpload] = useState("https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.1.55329923.1683053289&semt=robertav1_2_sidr");
  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        //le.log(user);
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

  const buildSiteCard = (site) => {
    return (
      <div key={"div" + site._id} className="revolution">
        <hr />
        <h1 className="itinerary-stop-title">{site.name}</h1>
        <div className="itinerary-container">
          <div className="customImageItinerary">
            <img className="resize-image" src={site.image} alt="federal hall" />
          </div>
          <div className="grid-item step-description">
            <ul id="description-list">
              {site.description.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  card =
    mongoUser &&
    mongoUser.itineraries &&
    mongoUser.itineraries.map((itinerary) => {
      return (
        <div key={itinerary.ids}>
          <h2>Itinerary</h2>
          {itinerary.itinerary.map((site) => {
            return <div key={site._id}>{buildSiteCard(site)}</div>;
          })}
          {!loading && !loadingUser && (
            <button
              onClick={async (e) => {
                //console.log(sites)
                try {
                  const { data } = await axios.get(
                    "http://localhost:3001/deleteItinerary/" + user.uid,
                    {
                      params: {
                        itinerary: JSON.stringify(itinerary),
                      },
                    }
                  );
                  //console.log(data);
                  setMongoUser(data);
                  alert("Itinerary unsaved");
                  window.location.reload();
                } catch (e) {
                  alert("Error: You have not saved this itinerary");
                }
              }}
            >
              Unsave Itinerary
            </button>
          )}
          <hr className="hr-custom" />
          <hr className="hr-custom" />
          <br />
        </div>
      );
    });

  if (!loading && user.displayName && !loadingUser) {
    return (
      <div className="account-wrapper">
        <div className="account-header">
          <h1 className="grid-item account-title">
            {user.displayName}'s Account
          </h1>
          {mongoUser &&
            mongoUser.permissions &&
            mongoUser.permissions.includes("admin") === true && (
              <Link className="btn btn-link" to="/admin">
                Admin Page
              </Link>
            )}
        </div>
        <div className="account-signout">
          <SignOutButton />
        </div>
        <br />
        <hr className="hr-custom" />
        <div>
          {mongoUser &&
          mongoUser.itineraries &&
          mongoUser.itineraries.length !== 0 ? (
            <div>
              <h2>Your saved itineraries:</h2>
              <div>{card}</div>
            </div>
          ) : (
            <h2>You don't have any itineraries saved</h2>
          )}
        </div>
        <br />
        <hr className="hr-custom" />
        <hr className="hr-custom" />
        <div>
          {mongoUser && mongoUser.reviews && mongoUser.reviews.length !== 0 ? (
            <div>
              <h2 className="title-account">Your Reviews</h2>
              <ul>
                {mongoUser.reviews.map((review) => {
                  return (
                    <div key={review._id} className="div-class">
                      <p>Site: {review.siteName}</p>
                      <p>Title: {review.title}</p>
                      <p>Review: {review.review}</p>
                      <p>Rating: {review.rating}</p>
                      <p>Date: {review.date}</p>
                      <button
                        onClick={async (e) => {
                          try {
                            await axios.delete(
                              "http://localhost:3001/reviews/" +
                                review.siteid +
                                "/" +
                                mongoUser.uid +
                                "/" +
                                review._id
                            );
                          } catch (e) {
                            alert("Error: Unable to delete review");
                          }
                          window.location.reload();
                        }}
                      >
                        Delete Review
                      </button>
                    </div>
                  );
                })}
              </ul>
            </div>
          ) : (
            <h2 className="title-account">You do not have any reviews</h2>
          )}
        </div>
        <br />
        <hr className="hr-custom" />
        <hr className="hr-custom" />
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }
}

export default Account;
