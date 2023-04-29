const mongoCollections = require("../config/mongoCollections");
const sites = mongoCollections.sites;
const { ObjectId } = require("mongodb");
const helpers = require("../validation");

const createReview = async (
  siteId,
  userId,
  userName,
  title,
  review,
  rating
) => {
  siteId = helpers.validObjectID(siteId);
  rating = helpers.validRating(rating.toString());
  review = helpers.validString(review);
  title = helpers.validTitle(title);

  userId = helpers.validString(userId);
  userName = helpers.validString(userName);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!site) throw "ERROR: SITE NOT FOUND";

  rating = parseInt(rating);

  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dateString = month + "/" + day + "/" + year;

  let newReview = {
    _id: new ObjectId(),
    userId: userId,
    userName: userName,
    title: title,
    review: review,
    rating: rating,
    date: dateString,
    edited: false,
  };

  const updateInfo = await siteCollection.updateOne(
    { _id: new ObjectId(siteId) },
    { $push: { reviews: newReview } }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "ERROR: COULD NOT ADD REVIEW";
  }

  // get all of the reviews for the site
  const reviews = site.reviews;

  // add the new review to the array
  reviews.push(newReview);

  // calculate the new average rating
  let totalRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating += reviews[i].rating;
  }

  const newRating = totalRating / reviews.length;

  // update the site's rating
  const updateRating = await siteCollection.updateOne(
    { _id: new ObjectId(siteId) },
    { $set: { rating: newRating } }
  );
  if (updateRating.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE RATING";
  }

  let updatedSite = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!updatedSite) throw "ERROR: SITE NOT FOUND";

  // convert each review id to a string
  for (let i = 0; i < updatedSite.reviews.length; i++) {
    updatedSite.reviews[i]._id = updatedSite.reviews[i]._id.toString();
  }

  updatedSite._id = updatedSite._id.toString();

  return updatedSite;
};

const getReviewById = async (siteId, reviewId) => {
  siteId = helpers.validObjectID(siteId);
  reviewId = helpers.validObjectID(reviewId);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!site) throw "ERROR: SITE NOT FOUND";

  const reviews = site.reviews;

  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i]._id.toString() === reviewId) {
      reviews[i]._id = reviews[i]._id.toString();
      return reviews[i];
    }
  }

  throw "ERROR: REVIEW NOT FOUND";
};

const getAllReviews = async (siteId) => {
  siteId = helpers.validObjectID(siteId);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!site) throw "ERROR: SITE NOT FOUND";

  let reviews = site.reviews;

  for (let i = 0; i < reviews.length; i++) {
    reviews[i]._id = reviews[i]._id.toString();
  }

  return reviews;
};

const updateReview = async (
  userId,
  siteId,
  reviewId,
  title,
  review,
  rating
) => {
  siteId = helpers.validObjectID(siteId);
  reviewId = helpers.validObjectID(reviewId);
  userId = helpers.validString(userId);
  if (rating != null) {
    rating = helpers.validRating(rating.toString());
  }
  if (review != null) {
    review = helpers.validString(review);
  }
  if (title != null) {
    title = helpers.validTitle(title);
  }

  rating = parseInt(rating);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!site) throw "ERROR: SITE NOT FOUND";

  const reviews = site.reviews;
  let reviewToUpdate = null;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i]._id.toString() === reviewId) {
      reviewToUpdate = reviews[i];
      break;
    }
  }
  if (!reviewToUpdate) throw "ERROR: REVIEW NOT FOUND";

  if (reviewToUpdate.userId.toString() !== userId)
    throw "ERROR: NOT AUTHORIZED";

  let updatedReview = {
    _id: new ObjectId(reviewId),
    userId: userId,
    userName: reviewToUpdate.userName,
    title: title,
    review: review,
    rating: rating,
    date: reviewToUpdate.date,
    edited: true,
  };

  let updatedCount = 0;
  if (title) {
    if (reviewToUpdate.title != updatedReview.title) {
      updatedCount++;
    } else {
      updatedReview.title = reviewToUpdate.title;
    }
  }

  if (review) {
    if (reviewToUpdate.review != updatedReview.review) {
      updatedCount++;
    } else {
      updatedReview.review = reviewToUpdate.review;
    }
  }

  if (rating) {
    if (reviewToUpdate.rating != updatedReview.rating) {
      updatedCount++;
    } else {
      updatedReview.rating = reviewToUpdate.rating;
    }
  }

  if (updatedCount === 0) {
    throw "ERROR: NO CHANGES MADE";
  }

  const updateInfo = await siteCollection.updateOne(
    { _id: new ObjectId(siteId), "reviews._id": new ObjectId(reviewId) },
    { $set: { "reviews.$": updatedReview } }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE REVIEW";
  }

  // get all of the reviews for the site
  const allReviews = site.reviews;

  // update the review in the array
  for (let i = 0; i < allReviews.length; i++) {
    if (allReviews[i]._id.toString() === reviewId) {
      allReviews[i] = updatedReview;
      break;
    }
  }

  // calculate the new average rating
  let totalRating = 0;
  for (let i = 0; i < allReviews.length; i++) {
    totalRating += allReviews[i].rating;
  }

  const newRating = totalRating / allReviews.length;

  // update the site's rating
  const updateRating = await siteCollection.updateOne(
    { _id: new ObjectId(siteId) },
    { $set: { rating: newRating } }
  );
  if (updateRating.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE RATING";
  }

  let updatedSite = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!updatedSite) throw "ERROR: SITE NOT FOUND";

  // convert each review id to a string
  for (let i = 0; i < updatedSite.reviews.length; i++) {
    updatedSite.reviews[i]._id = updatedSite.reviews[i]._id.toString();
  }

  updatedSite._id = updatedSite._id.toString();

  return updatedSite;
};

const deleteReview = async (userId, siteId, reviewId) => {
  // console.log(userId, siteId, reviewId);
  siteId = helpers.validObjectID(siteId);
  reviewId = helpers.validObjectID(reviewId);
  userId = helpers.validObjectID(userId);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!site) throw "ERROR: SITE NOT FOUND";

  const reviews = site.reviews;
  let review = null;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i]._id.toString() === reviewId) {
      review = reviews[i];
      break;
    }
  }
  if (!review) throw "ERROR: REVIEW NOT FOUND";

  if (review.userId.toString() !== userId) throw "ERROR: NOT AUTHORIZED";

  const updateInfo = await siteCollection.updateOne(
    { _id: new ObjectId(siteId) },
    { $pull: { reviews: { _id: new ObjectId(reviewId) } } }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "ERROR: COULD NOT DELETE REVIEW";
  }

  // get all of the reviews for the site
  const updatedReviews = site.reviews;
  updatedReviews.splice(updatedReviews.indexOf(review), 1);

  // calculate the new average rating
  let totalRating = 0;

  for (let i = 0; i < updatedReviews.length; i++) {
    totalRating += updatedReviews[i].rating;
  }

  let newRating = totalRating / updatedReviews.length;

  // update the site's rating

  const updateRating = await siteCollection.updateOne(
    { _id: new ObjectId(siteId) },
    { $set: { rating: newRating } }
  );

  if (updateRating.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE RATING";
  }

  let updatedSite = await siteCollection.findOne({ _id: new ObjectId(siteId) });
  if (!updatedSite) throw "ERROR: SITE NOT FOUND";

  // convert each review id to a string
  for (let i = 0; i < updatedSite.reviews.length; i++) {
    updatedSite.reviews[i]._id = updatedSite.reviews[i]._id.toString();
  }

  updatedSite._id = updatedSite._id.toString();

  return updatedSite;
};

module.exports = {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
};
