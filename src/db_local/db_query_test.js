const dbc = require("./db_registration.js")

//const prompt = require('prompt-sync')();

//var item_choice = prompt("Enter an item: ");
//var static = prompt("Enter a quantity #: ");
console.log('\n');

/**
* Loading Firebase Database and refering 
* to user_data Object from the Database
*/
var db_init = new dbc.db_container();
var items_ref = db_init.db.ref("/rs_items/");  //Set the current directory you are working in

/*
// Will print all the id numbers of every item in store.
items_ref.orderByValue().on("child_added", function(snapshot) {
    console.log(snapshot.key + " was ID no. " + snapshot.val().id);
});
console.log('\n');
//var item_choice = window.prompt("Enter an item: ");
*/

// Creates a new reference to item specified's row.
// var input_ref = db_init.db.ref("/rs_items/"+item_choice);

/*
// Print the price of user specified item.
input_ref.once("value", function(snapshot) {
    var data = snapshot.val().price;
    console.log(item_choice+" price is: "+data);
});
console.log('\n');
*/

/*
// Returns the Item for the given quantity number.
items_ref.orderByValue().on("child_added", function(snapshot) {
    if (snapshot.val().quantity == parseInt(static)) {
        console.log(snapshot.key+" returned for quantity "+static);
    }
});
console.log('\n');
*/

// Returns a list of the names of items.
//items_ref.orderByKey().on("child_added", function(snapshot) {

//});
var i = 0;
items_ref.orderByValue().on("child_added", function(snapshot) {
    if (i < 20) {
        console.log(snapshot.key + " was ID no. " + snapshot.val().id);
        i++;
    }
});
console.log('\n');