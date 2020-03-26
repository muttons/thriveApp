const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const APP_ID = functions.config().algolia.app; //keys passed in with command line to keep them safe, fireship.io has a good guide on this
const ADMIN_KEY = functions.config().algolia.key; //keys passed in with command line to keep them safe, fireship.io has a good guide on this
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('employees'); //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH
const locationIndex = client.initIndex('locations'); //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH
admin.initializeApp();


//add admin role
exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made by an admin
    if (context.auth.token.admin !== true) {
        return { error: 'only admins can add other admins, weeb'}
    }
    // get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
            train: true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin and all lower roles`
            
        }
    }).catch(err => {
        return err;
    });
});

//add train role
exports.addTrainRole = functions.https.onCall((data, context) => {
    //check request is made by an train
    if (context.auth.token.admin !== true) {
        return { error: 'only admins can add other roles, weeb'}
    }
    // get user and add custom claim (train)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            train: true
        });
    }).then(() => {
          return {
            message: `Success! ${data.email} has been made an train and all lower roles`
        }
    }).catch(err => {
        return err;
    });
});

//add basic role
exports.addBasicRole = functions.https.onCall((data, context) => {
    //check request is made by an train
    if (context.auth.token.admin !== true) {
        return { error: 'only admins can add other roles, weeb'}
    }
    // get user and add custom claim (train)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            basic: true
        });
    }).then(() => {
          return {
            message: `Success! ${data.email} has been made a Basic user`
        }
    }).catch(err => {
        console.log('failure');
        return err;
    });
});

//http callable 
exports.getTestOne = functions.https.onCall((data, context) => {
    return ['A', 'B', 'A'];
});




/// Cloud Functions

exports.addToIndex = functions.firestore.document('employees/{employeeId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase

    .onCreate(snapshot => {

        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.saveObject({ ...data, objectID });

    });



    exports.updateIndex = functions.firestore.document('employees/{employeeId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase


        .onUpdate((change) => {
            const newData = change.after.data();
            const objectID = change.after.id;
            return index.saveObject({ ...newData, objectID });
        });



exports.deleteFromIndex = functions.firestore.document('employees/{employeeId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase


  .onDelete(snapshot =>
    index.deleteObject(snapshot.id)
  );






// locationIndex Functions

exports.addToLocationIndex = functions.firestore.document('locations/{locationId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase

.onCreate(snapshot => {

    const data = snapshot.data();
    const objectID = snapshot.id;
    return locationIndex.saveObject({ ...data, objectID });

});



exports.updateLocationIndex = functions.firestore.document('locations/{locationId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase


    .onUpdate((change) => {
        const newData = change.after.data();
        const objectID = change.after.id;
        return locationIndex.saveObject({ ...newData, objectID });
    });



exports.deleteFromLocationIndex = functions.firestore.document('locations/{locationId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase


.onDelete(snapshot =>
locationIndex.deleteObject(snapshot.id)
);