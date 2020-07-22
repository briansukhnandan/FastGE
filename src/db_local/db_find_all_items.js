const dbc = require("./db_registration.js")

/*
 *
 * Queries the db and finds all items that current query
 * is a substring of. It returns a list of all items/attributes
 * if item's name is a substr of query in a Linked List.
 * 
 */

var db_init = new dbc.db_container();
var items_ref = db_init.db.ref("/rs_items/");  //Set the current directory you are working in

// Linked List that will store all queries.
// Because of our db call, nodes will be stored in ABC order.

// Each query_Object will contain a name, ID, quantity,
// and price.
class query_Object {

    constructor(objectName, id, description, price, image) {
        this.objectName = objectName;

        this.id = id;
        this.description = description;
        this.price = price;
        this.image = image;
    }

}

// Returns an array of all query items matching our search pattern.
export function find_all_items (query) {

    let query_list = [];

    // Index through all keys.
    items_ref.orderByKey().startAt(String(Date.now())).on("child_added", function(snapshot) {

        // If query is a substr of current key (conv to String):
        if (snapshot.key.toLowerCase().includes(String(query).toLowerCase())) {

            // console.log(snapshot.key);

            // Push a new query object into the query list.
            query_list.push(new query_Object(
                snapshot.key, 
                snapshot.val().id,
                snapshot.val().description,
                snapshot.val().price,
                snapshot.val().image
            ));

        }

    });

    // Finally return the query list when we are done with it.
    return query_list;

}