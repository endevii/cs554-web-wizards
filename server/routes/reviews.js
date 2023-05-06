const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewData = data.reviews;
const siteData = data.sites;
const validation = require("../validation");

router.get("/:siteId", async (req, res) => {
  let { siteId } = req.params;
  let reviews;
  try {
    siteId = validation.validObjectID(siteId);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    reviews = await reviewData.getAllReviews(siteId);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  return res.status(200).send(reviews);
});

router.post("/:siteId/:userId", async (req, res) => {
  let { siteId, userId } = req.params;
  let { userName, title, review, rating } = req.body;
  let newReview;

  let errors = [];
  // validate inputs
  try {
    siteId = validation.validObjectID(siteId);
  } catch (e) {
    errors.push(e);
  }
  try {
    userId = validation.validString(userId, "USER ID");
  } catch (e) {
    errors.push(e);
  }

  try {
    userName = validation.validString(userName, "USER NAME");
  } catch (e) {
    errors.push(e);
  }
  try {
    title = validation.validTitle(title);
  } catch (e) {
    errors.push(e);
  }
  try {
    review = validation.validString(review, "REVIEW");
  } catch (e) {
    errors.push(e);
  }
  try {
    rating = validation.validRating(rating.toString());
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }

  rating = parseInt(rating);

  // check if site exists
  let site;
  try {
    site = await siteData.getSiteById(siteId);
  } catch (e) {
    return res.status(404).json({ error: e });
  }

  // check if user already reviewed site
  for (let i = 0; i < site.reviews.length; i++) {
    if (site.reviews[i].userId === userId) {
      return res.status(400).json({ error: "User already reviewed site" });
    }
  }

  // now create review
  try {
    newReview = await reviewData.createReview(
      siteId,
      userId,
      userName,
      title,
      review,
      rating
    );
  } catch (e) {
    return res.status(500).json({ error: e });
  }

  return res.status(200).send(newReview);
});

router.delete("/:siteId/:userId/:reviewId", async (req, res) => {
  let { siteId, userId, reviewId } = req.params;
  let review;
  let errors = [];
  // validate inputs
  try {
    siteId = validation.validObjectID(siteId);
  } catch (e) {
    errors.push(e);
  }

  try {
    userId = validation.validString(userId, "USER ID");
  } catch (e) {
    errors.push(e);
  }

  try {
    reviewId = validation.validObjectID(reviewId);
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }

  // check if site exists
  try {
    await siteData.getSiteById(siteId);
  } catch (e) {
    return res.status(404).json({ error: e });
  }

  // check if review exists
  try {
    await reviewData.getReviewById(siteId, reviewId);
  } catch (e) {
    return res.status(404).json({ error: e });
  }

  // now delete review
  try {
    review = await reviewData.deleteReview(userId, siteId, reviewId);
  } catch (e) {
    return res.status(500).json({ error: e });
  }

  return res.status(200).send(review);
});

router.patch("/:siteId/:userId/:reviewId", async (req, res) => {
  let { siteId, userId, reviewId } = req.params;
  let { title, review, rating } = req.body;
  let updatedReview;

  let errors = [];
  let updateObj = {};
  let updates = 0;

  // validate inputs
  try {
    siteId = validation.validObjectID(siteId);
  } catch (e) {
    errors.push(e);
  }

  try {
    userId = validation.validString(userId, "USER ID");
  } catch (e) {
    errors.push(e);
  }

  try {
    reviewId = validation.validObjectID(reviewId);
  } catch (e) {
    errors.push(e);
  }

  // check if site exists
  try {
    await siteData.getSiteById(siteId);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  let oldReview;
  // check if review exists
  try {
    oldReview = await reviewData.getReviewById(siteId, reviewId);
  } catch (e) {
    return res.status(404).json({ error: e });
  }

  if (title) {
    try {
      title = validation.validTitle(title);
      if (title !== oldReview.title) {
        updateObj.title = title;
        updates += 1;
      }
    } catch (e) {
      errors.push(e);
    }
  }

  if (review) {
    try {
      review = validation.validString(review, "REVIEW");
      if (review !== oldReview.review) {
        updateObj.review = review;
        updates += 1;
      }
    } catch (e) {
      errors.push(e);
    }
  }

  if (rating) {
    try {
      rating = validation.validRating(rating.toString());
      rating = parseInt(rating);
      if (rating !== oldReview.rating) {
        updateObj.rating = rating;
        updates += 1;
      }
    } catch (e) {
      errors.push(e);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }

  if (updates === 0) {
    return res.status(400).json({ error: "No updates provided" });
  }

  // now update review
  try {
    updatedReview = await reviewData.updateReview(
      userId,
      siteId,
      reviewId,
      updateObj
    );
  } catch (e) {
    return res.status(500).json({ error: e });
  }

  return res.status(200).send(updatedReview);
});

module.exports = router;
