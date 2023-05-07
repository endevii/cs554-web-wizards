const mongoCollections = require("../config/mongoCollections");
const sites = mongoCollections.sites;
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
const helpers = require("../validation");

const createReview = async (
  siteId,
  userId,
  userName,
  title,
  review,
  rating,
) => {
  siteId = helpers.validObjectID(siteId);
  rating = helpers.validRating(rating.toString());
  review = helpers.validString(review, "REVIEW");
  title = helpers.validTitle(title);

  userId = helpers.validString(userId, "USER ID");
  userName = helpers.validString(userName, "USER NAME");

  const userCollection = await users();
  const user = await userCollection.findOne({uid: userId});
  if(!user) throw "ERROR: USER NOT FOUND";

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: siteId });
  if (!site) throw "ERROR: SITE NOT FOUND";

  for (let i = 0; i < site.reviews.length; i++) {
    if (site.reviews[i].userId === userId) {
      throw "ERROR: USER HAS ALREADY REVIEWED THIS SITE";
    }
  }

  rating = parseInt(rating);

  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dateString = month + "/" + day + "/" + year;

  let newReview = {
    _id: new ObjectId().toString(),
    userId: userId,
    userName: userName,
    title: title,
    review: review,
    rating: rating,
    date: dateString,
    edited: false,
    siteid: siteId
  };

  const updateInfo = await siteCollection.updateOne(
    { _id: siteId },
    { $push: { reviews: newReview } }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "ERROR: COULD NOT ADD REVIEW";
  }

  const updateUser = await userCollection.updateOne(
    { uid: userId },
    { $push: { reviews: newReview } }
  );
  if (updateUser.modifiedCount === 0) {
    throw "ERROR: COULD NOT ADD REVIEW TO USER";
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
  if (isNaN(newRating)) {
    newRating = 0;
  }

  if (newRating == null) {
    newRating = 0;
  }

  if (newRating !== site.rating) {
    // update the site's rating
    const updateRating = await siteCollection.updateOne(
      { _id: siteId },
      { $set: { rating: newRating } }
    );
    if (updateRating.modifiedCount === 0) {
      throw "ERROR: COULD NOT UPDATE RATING";
    }
  }
  let updatedSite = await siteCollection.findOne({ _id: siteId });
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
  const site = await siteCollection.findOne({ _id: siteId });
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
  const site = await siteCollection.findOne({ _id: siteId });
  if (!site) throw "ERROR: SITE NOT FOUND";

  let reviews = site.reviews;

  if (reviews.length === 0) throw "ERROR: NO REVIEWS FOUND";

  for (let i = 0; i < reviews.length; i++) {
    reviews[i]._id = reviews[i]._id.toString();
  }

  return reviews;
};

const updateReview = async (userId, siteId, reviewId, reviewObj) => {
  let { rating, review, title } = reviewObj;
  siteId = helpers.validObjectID(siteId);
  reviewId = helpers.validObjectID(reviewId);
  userId = helpers.validString(userId, "USER ID");
  if (rating != null) {
    rating = helpers.validRating(rating.toString());
  }
  if (review) {
    review = helpers.validString(review, "REVIEW");
  }
  if (title) {
    title = helpers.validTitle(title);
  }

  rating = parseInt(rating);

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: siteId });
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

  reviewToUpdate.rating = parseInt(reviewToUpdate.rating);

  let updatedReview = {
    _id: reviewId,
    userId: userId,
    userName: reviewToUpdate.userName,
    date: reviewToUpdate.date,
    edited: true,
  };

  let updatedCount = 0;
  let updatedRating = false;

  if (title) {
    if (reviewToUpdate.title != title) {
      updatedReview.title = title;
      updatedCount++;
    } else {
      updatedReview.title = reviewToUpdate.title;
    }
  } else {
    updatedReview.title = reviewToUpdate.title;
  }

  if (review) {
    if (reviewToUpdate.review != review) {
      updatedReview.review = review;
      updatedCount++;
    } else {
      updatedReview.review = reviewToUpdate.review;
    }
  } else {
    updatedReview.review = reviewToUpdate.review;
  }

  if (rating) {
    if (reviewToUpdate.rating != rating) {
      updatedRating = true;
      updatedReview.rating = rating;
      updatedCount++;
    } else {
      updatedReview.rating = reviewToUpdate.rating;
    }
  } else {
    updatedReview.rating = reviewToUpdate.rating;
  }

  if (updatedCount === 0) {
    throw "ERROR: NO CHANGES MADE";
  }

  const updateInfo = await siteCollection.updateOne(
    { _id: siteId, "reviews._id": reviewId },
    { $set: { "reviews.$": updatedReview } }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "ERROR: COULD NOT UPDATE REVIEW";
  }

  if (updatedRating) {
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
      { _id: siteId },
      { $set: { rating: newRating } }
    );
    if (updateRating.modifiedCount === 0) {
      throw "ERROR: COULD NOT UPDATE RATING";
    }
  }
  // get the updated site
  let updatedSite = await siteCollection.findOne({ _id: siteId });
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
  userId = helpers.validString(userId, "USER ID");

  const siteCollection = await sites();
  const site = await siteCollection.findOne({ _id: siteId });
  if (!site) throw "ERROR: SITE NOT FOUND";

  const userCollection = await users();
  const user = await userCollection.findOne({uid: userId});
  if(!user) throw "ERROR: USER NOT FOUND";

  let user_reviews = user.reviews;
  let index = -1;

  for(let i = 0; i < user_reviews.length; i++){
    if(user_reviews[i]._id === reviewId){
      index = i;
    }
  }
  
  if(index === -1){
    throw "ERROR: USER HAS NOT SAVED REVIEW";
  }

  user_reviews.splice(index, 1);

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
    { _id: siteId },
    { $pull: { reviews: { _id: reviewId } } }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "ERROR: COULD NOT DELETE REVIEW";
  }

  const updateUser = await userCollection.updateOne(
    { uid: userId },
    { $set: { reviews: user_reviews } }
  );
  if (updateUser.modifiedCount === 0) {
    throw "ERROR: COULD NOT DELETE REVIEW USER";
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

  if (isNaN(newRating)) {
    newRating = 0;
  }

  if (newRating === null) {
    newRating = 0;
  }

  // update the site's rating
  if (newRating !== site.rating) {
    const updateRating = await siteCollection.updateOne(
      { _id: siteId },
      { $set: { rating: newRating } }
    );

    if (updateRating.modifiedCount === 0) {
      throw "ERROR: COULD NOT UPDATE RATING";
    }
  }
  let updatedSite = await siteCollection.findOne({ _id: siteId });
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
