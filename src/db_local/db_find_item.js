const dbc = require("./db_registration.js")

/*
 *
 * Queries the db and finds attributes for a singular item 
 * in the table with name = to the query (Case-sensitive as of now).
 * 
 */

var db_init = new dbc.db_container();
var items_ref = db_init.db.ref("/rs_items/");  //Set the current directory you are working in

export function return_attributes (query) {

    let temp = [];

    // Think of this as a for loop indexing through Keys of the db.
    items_ref.orderByKey().on("child_added", function(snapshot) {

        // Use == operator since we are going to look for
        // queries of different datatypes instead of strictly working
        // with one.
        // If our query has a match with something in the db
        if (query === snapshot.key) {
            // console.log(snapshot.val().price);
            temp.push(snapshot.val().id)
            temp.push(snapshot.val().description)
            temp.push(snapshot.val().price)
            temp.push(snapshot.val().image)
        }

    });

    return temp;

}