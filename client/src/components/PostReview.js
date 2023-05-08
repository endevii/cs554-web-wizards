import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function PostReview(props) {
  const [formData, setFormData] = useState({ id: "" });
  const [uid, setUid] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setName(user.displayName);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [auth]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const newReview = async () => {
    if (!formData.title || formData.title.length === 0) {
        alert("Missing title");
        return;
    }
    if (!formData.review || formData.review.length === 0) {
        alert("Missing review");
        return;
    }
    if (!formData.rating || formData.rating === "0") {
      alert("Missing rating");
      return;
    }
    let body = {
        userName: name,
        title: formData.title,
        review: formData.review,
        rating: parseInt(formData.rating, 10)
    }
    try {
        await axios.post(
            'http://localhost:3001/reviews/' +
            props.site._id +
            '/' +
            uid, body
        );
        alert("Review posted");
    } catch (e) {
        alert(e);
    }
    window.location.reload();
  }

  if (!loading) {
    return (
      <div className="App">
        <form onSubmit={newReview}>
          <label>
            Title:
            <input
              onChange={(e) => handleChange(e)}
              id="title"
              name="title"
              placeholder="Title your review"
            />
          </label>
          <label>
            Review:
            <input
              onChange={(e) => handleChange(e)}
              id="review"
              name="review"
              placeholder="Review body"
            />
          </label>
          <label>Rating:</label>
          <select onChange={(e) => handleChange(e)} id="rating" name="rating">
          <option value="0">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Post review</button>
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default PostReview;
