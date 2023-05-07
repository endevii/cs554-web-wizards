import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOutButton from "./SignOut";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [mongoUser, setMongoUser] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [review_text, setReview] = useState('');
  let card = null;
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

  const buildSiteCard = (site) => {
    return (
      <div key={"div" + site._id} className="revolution">
        <hr />
        <h1 className="itinerary-stop-title">{site.name}</h1>
        <div className="itinerary-container">
          <div className="customImageItinerary">
            <img className="resize-image" src={site.image} alt={site.name} />
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
          <h2 className="itinerary-title">Itinerary</h2>
          {itinerary.itinerary.map((site) => {
            return <div key={site._id}>{buildSiteCard(site)}</div>;
          })}
          {!loading && !loadingUser && (
            <button
              onClick={async (e) => {
                try {
                  const { data } = await axios.get(
                    "http://localhost:3001/deleteItinerary/" + user.uid,
                    {
                      params: {
                        itinerary: JSON.stringify(itinerary),
                      },
                    }
                  );
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
        <h1 className="grid-item account-title">
          {user.displayName}'s Account
        </h1>
        <div className="account-signout">
          <SignOutButton />
          <form action="/changepassword">
            <button type="submit">Change Password</button>
          </form>
        </div>
        <br />
        <div>
          {mongoUser &&
          mongoUser.itineraries &&
          mongoUser.itineraries.length !== 0 ? (
            <div className="itineraries">
              <h2>Your saved itineraries</h2>
              <div>{card}</div>
            </div>
          ) : (
            <h2>You don't have any itineraries saved</h2>
          )}
        </div>
        <br />
        <div>
          {mongoUser && mongoUser.reviews && mongoUser.reviews.length !== 0 ? (
            <div>
              <h2 className="title-account">Your Reviews</h2>
              <Grid
                container
                spacing={2}
                sx={{ flexGrow: 1, flexDirection: "row", justifyContent: "center" }}
              >
                {mongoUser.reviews.map((review) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={7}
                      md={5}
                      lg={4}
                      xl={3}
                      key={review._id}
                    >
                      <Card>
                        <CardActionArea>
                          <Link to={`/site/${review.siteid}`}>
                            <CardContent>
                              <Typography className="review-txt">
                                {" "}
                                Site: {review.siteName} <br/>
                                Title: {review.title} <br/>
                                Review: {review.review} <br/>
                                Rating: {review.rating} <br/>
                                Date: {review.date}
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActionArea>
                        <CardContent>
                      <br/>
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
                      <br/>
                      <br/>
                      <br/>
                      <p>Update this review</p>
                      <br/>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        let temp_title, temp_review, temp_rating = "";
                        if(title === "" && review_text === "" && rating === ""){
                            alert("Error: Nothing to update");
                        } else if (title == review.title && rating == review.rating && review_text == review.review){
                            alert("Error: Nothing to update")
                        } else if (title == review.title && rating == "" && review_text == ""){
                            alert("Error: Nothing to update")
                        } else if (title == "" && rating == review.rating && review_text == ""){
                            alert("Error: Nothing to update")
                        } else if (title == "" && rating == "" && review_text == review.review){
                            alert("Error: Nothing to update")
                        } else if (review_text !== "" && review_text.trim().length === 0) {
                            alert("Error: Review cannot be just spaces")
                        } else if (title !== "" && title.trim().length === 0) {
                            alert("Error: Title cannot be just spaces")
                        } else if (rating !== "" && rating.trim().length === 0) {
                            alert("Error: Rating cannot be just spaces")
                        } else if (rating !== "" && isNaN(parseInt(rating))) {
                            alert("Error: Rating must be a number")
                        } else if(parseInt(rating) < 0 || parseInt(rating) > 5){
                            alert("Error: Rating must be a number 0 to 5")
                        } else {
                        if(title !== ""){
                            temp_title = title;
                        } else {
                            temp_title = review.title;
                        }
                        if(review_text !== ""){
                            temp_review = review_text;
                        } else {
                            temp_review = review.review;
                        }
                        if(rating !== ""){
                            temp_rating = rating;
                        } else {
                            temp_rating = review.rating;
                        }

                        let temp = {
                            title: temp_title, 
                            review: temp_review, 
                            rating: temp_rating
                        }

                        try {
                            await axios.patch(
                              'http://localhost:3001/reviews/' +
                                review.siteid +
                                '/' +
                                mongoUser.uid +
                                '/' +
                                review._id, temp);
                            alert("Review updated");
                          } catch (e) {
                            alert(e);
                          }
                        window.location.reload();
                        }
                      }}>
                        <label>
                            Update Title: 
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <label>
                            Update Review: 
                        </label>
                        <input
                            type="text"
                            placeholder="Review"
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <label>
                            Update Rating: 
                        </label>
                        <input
                            type="text"
                            placeholder="Rating"
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <button type='submit'>Update Review</button>
                      </form>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          ) : (
            <h2 className="title-account">You do not have any reviews</h2>
          )}
        </div>
        <br />
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }
}

export default Account;
