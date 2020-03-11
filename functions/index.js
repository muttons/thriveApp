const functions = require('firebase-functions');
const admin = require('firebase-admin');
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
        return err;
    });
});

//http callable 
exports.getTestOne = functions.https.onCall((data, context) => {
    return ['A', 'B', 'A'];
});
