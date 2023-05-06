const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const helpers = require("../validation");

const createUser = async (
  uid
) => {
    uid = helpers.validString(uid);

    const userCollection = await users();

    let newUser = {
        uid: uid,
        itineraries: []
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "ERROR: COULD NOT ADD USER";
    return newUser;
};

const addItinerary = async (
    uid, 
    itinerary
) => {
    uid = helpers.validString(uid);

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";

    let index = -1;

    let itineraries = user.itineraries;

    let id_array = [];
    itinerary.forEach(stop => {
        id_array.push(stop._id);
    })
    
    let equal = false;

    for(let i = 0; i < itineraries.length; i++){
        id_array.forEach(id => {
            if(itineraries[i].ids.length === id_array.length && itineraries[i].ids.includes(id)){
                equal = true;
            } else {
                equal = false;
            }
        })
        if(equal === true){
            console.log(i);
            index = i;
        }
    }

    if(index !== -1){
        throw "ERROR: USER HAS SAVED ITINERARY";
    }

    const updateInfo = await userCollection.updateOne(
        { uid: uid },
        { $push: { itineraries: {ids: id_array, itinerary: itinerary }} }
    );
    if (updateInfo.modifiedCount === 0) {
        throw "ERROR: COULD NOT ADD ITINERARY";
    };

    return user;
}

const deleteItinerary = async (
    uid, 
    itinerary
) => {
    let index = -1;
    uid = helpers.validString(uid);

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";

    let itineraries = user.itineraries;
    
    let equal = false;

    for(let i = 0; i < itineraries.length; i++){
        itinerary.ids.forEach(id => {
            if(itineraries[i].ids.length === itinerary.ids.length && itineraries[i].ids.includes(id)){
                equal = true;
            } else {
                equal = false;
            }
        })
        if(equal === true){
            index = i;
        }
    }
    if(index === -1){
        throw "ERROR: USER HAS NOT SAVED ITINERARY";
    }
    let temp = itineraries.splice(index, 1);
    console.log(itineraries);
    console.log(temp);
    const updateInfo = await userCollection.updateOne(
        { uid: uid },
        { $set: { itineraries: itineraries } }
    );
    if (updateInfo.modifiedCount === 0) {
        throw "ERROR: COULD NOT DELETE ITINERARY";
    };

    return updateInfo;
}

const getUserById = async (
    uid
) => {
    uid = helpers.validString(uid);

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";

    return user;
}

const userHasItinerary = async (
    uid,
    itinerary
) => {
    let index = -1;
    uid = helpers.validString(uid);

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";

    let itineraries = user.itineraries;
    
    let equal = false;

    for(let i = 0; i < itineraries.length; i++){
        itinerary.ids.forEach(id => {
            if(itineraries[i].ids.includes(id)){
                equal = true;
            } else {
                equal = false;
            }
        })
        if(equal === true){
            index = i;
        }
    }
    if(index === -1){
        return false;
    } else {
        return true;
    }
}

module.exports = {
    createUser,
    addItinerary,
    getUserById,
    deleteItinerary,
    userHasItinerary
};
