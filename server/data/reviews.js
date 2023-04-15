const mongoCollections = require("../config/mongoCollections");
const sites = mongoCollections.sites;
const { ObjectId } = require("mongodb");
const helpers = require("../validation");

const createReview = async (userId, userName, siteId, rating, review) => {
  siteId = helpers.validObjectID(siteId);
  rating = helpers.validRating(rating);
  review = helpers.validString(review);

  userId = helpers.validObjectID(userId);
  userName = helpers.validString(userName);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: ObjectId(siteId) });
  if (!site) throw "ERROR: SITE NOT FOUND";

  rating = parseInt(rating);

  let newReview = {
    _id: ObjectId(),
    userId: userId,
    userName: userName,
    rating: rating,
    review: review,
  };

  const updateInfo = await siteCollection.updateOne(
    { _id: ObjectId(siteId) },
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
    { _id: ObjectId(siteId) },
    { $set: { rating: newRating } }
  );
  if (updateRating.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE RATING";
  }

  let updatedSite = await siteCollection.findOne({ _id: ObjectId(siteId) });
  if (!updatedSite) throw "ERROR: SITE NOT FOUND";

  // convert each review id to a string
  for (let i = 0; i < updatedSite.reviews.length; i++) {
    updatedSite.reviews[i]._id = updatedSite.reviews[i]._id.toString();
  }

  updatedSite._id = updatedSite._id.toString();

  return updatedSite;
};

const deleteReview = async (userId, siteId, reviewId) => {
  siteId = helpers.validObjectID(siteId);
  reviewId = helpers.validObjectID(reviewId);
  userId = helpers.validObjectID(userId);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: ObjectId(siteId) });
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
    { _id: ObjectId(siteId) },
    { $pull: { reviews: { _id: ObjectId(reviewId) } } }
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
    { _id: ObjectId(siteId) },
    { $set: { rating: newRating } }
  );

  if (updateRating.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE RATING";
  }

  let updatedSite = await siteCollection.findOne({ _id: ObjectId(siteId) });
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
  deleteReview,
};
