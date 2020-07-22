//Loading Firebase Package
const firebase = require("firebase");
const config = require("./config.js")

/**
* 
* Initialize Firebase App.
*
*/
firebase.initializeApp({
    serviceAccount: "./firebase_credentials.json",
    databaseURL: config.db_url
}); 

/**
 * 
 * Loading Firebase Database
 * Create container class to export db usage to other files,
 * so we don't have to reregister every time we want to run a query.
 *
 */
class db_container {

    constructor() {
        this.db = firebase.database();
    }

}

module.exports.db_container = db_container;