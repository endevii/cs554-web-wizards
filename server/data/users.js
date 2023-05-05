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

    /*if(!itinerary){
        throw "ERROR: ITINERARY MUST BE PROVIDED";
    }

    if(typeof itinerary !== Object){
        throw "ERROR: ITINERARY MUST BE OBJECT"
    }*/

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";

    let index = -1;
    
    //let itinerary_list = itineraries.splice(index, 1);

    let itineraryid = "";
    itinerary.forEach(stop => {
        itineraryid = itineraryid + stop._id;
    })

    let itineraries = user.itineraries;
    for(let i = 0; i < itineraries.length; i++){
        if(itineraries[i].id === itineraryid){
            index = i;
        }
    }

    if(index !== -1){
        throw "ERROR: USER HAS ALREADY SAVED ITINERARY";
    }

    const updateInfo = await userCollection.updateOne(
        { uid: uid },
        { $push: { itineraries: {id: itineraryid, itinerary: itinerary }} }
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

    /*if(!itinerary){
        throw "ERROR: ITINERARY MUST BE PROVIDED";
    }

    if(typeof itinerary !== Object){
        throw "ERROR: ITINERARY MUST BE OBJECT"
    }*/

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";
    
    let itineraries = user.itineraries;
    for(let i = 0; i < itineraries.length; i++){
        if(itineraries[i].id === itinerary.id){
            index = i;
        }
    }
    
    //let itinerary_list = itineraries.splice(index, 1);
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
    uid = helpers.validString(uid);

    /*if(!itinerary){
        throw "ERROR: ITINERARY MUST BE PROVIDED";
    }

    if(typeof itinerary !== Object){
        throw "ERROR: ITINERARY MUST BE OBJECT"
    }*/
    console.log(itinerary)

    const userCollection = await users();

    const user = await userCollection.findOne({ uid: uid });
    if (!user) throw "ERROR: USER NOT FOUND";

    let itineraries = user.itineraries;
    for(let i = 0; i < itineraries.length; i++){
        if(itineraries[i].id === itinerary.id){
            return true;
        }
    }
    return false;
}

module.exports = {
    createUser,
    addItinerary,
    getUserById,
    deleteItinerary,
    userHasItinerary
};
