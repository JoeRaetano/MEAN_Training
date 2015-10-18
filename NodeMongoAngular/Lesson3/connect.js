var MongoClient = require('mongodb').MongoClient; // create a MongoClient object

var mongo = new MongoClient();// create an instance of the MongoClient object
// Connection String Format:
//   mongodb://username:password@host/database
mongo.connect("mongodb://localhost/test", function(err, db) { // connect to db, with function to describe any errors
  var myDB = db.db("words"); // we create myDB and specify db.db("words") to access the words database we already created

  myDB.collection("word_stats", function(err, collection){ // here we run collection command on the word_stats collection the call function will give us any errors and the collection back

    countItems(collection); // we call countItems that we have written in lines 17-19 to count the items in the collection
    
    setTimeout( function(){ myDB.close(); }, 3000); // we give the database 3 seconds to complete then close the database
  });
});

function countItems(collection){
  collection.count(function(err, count){ // in this call back function we receive the count back
    console.log("Number of Items: " + count); // display to console
  });
} // now run "node connect.js" command in terminal
