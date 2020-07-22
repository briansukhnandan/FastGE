const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { ge } = require('osrs-json-api');
const dbc = require("../db_registration.js")


var db_init = new dbc.db_container();
var rs_items_ref = db_init.db.ref("/rs_items/");

/*
 *
 * Reads a list of RSID numbers from item_db/item_ids.txt and performs
 * a search with ge.getItem(), which returns a JSON object which is then parsed
 * to get the item info.
 * 
 */

// Create a path object pointing to item_db/item_ids.txt.
const itemIDPath = path.join(__dirname, 'item_db/item_ids.txt');

// Read Interface for parsing the .txt file.
const readInterface = readline.createInterface({
  input: fs.createReadStream(itemIDPath),
  output: process.stdout,
  console: false
});

// OSRS_Item class to make querying a litle more readable.
class OSRS_Item {

  constructor(objectName, id, description, price, image) {
    this.objectName = objectName;

    this.id = id;
    this.description = description;
    this.price = price;
    this.image = image;
  }

}

// Updates the firebase db with the current Grand Exchange item prices.
function fetch_from_ge(x) {

  // Async function which takes an int x and gets the query of that
  // OSRS item by id.
  ge.getItem(x).then (

    response => {

      // Represents a parsed JSON object.
      let json_object = JSON.parse(JSON.stringify(response));

      let tmp_obj = new OSRS_Item (
        json_object["item"]["name"],
        json_object["item"]["id"],
        json_object["item"]["description"],
        json_object["item"]["current"]["price"],
        json_object["item"]["icon_large"]
      )
      
      // Perform a .update() to not generate hashed snapshot keys.
      rs_items_ref.update({

        [tmp_obj.objectName.replace(new RegExp(" ", "g"), '_')] : {
          id : tmp_obj.id,
          description : tmp_obj.description,
          price : tmp_obj.price,
          image : tmp_obj.image
        }

      });

    }
  )
  // Catch any problematic item ids.
  .catch(console.log("Error occured at item ID: "+x));

}

// Read each line and parse each as int datatype.
readInterface.on('line', function(id_number) {
  fetch_from_ge(parseInt(id_number));
});
