var MongoClient = require('mongodb').MongoClient; //same boiler plate to connect to mongo
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/", function(err, db) {// same boilerplate to set words as myDB
  var myDB = db.db("words");

  myDB.collection("word_stats", function(err, collection){ // access the word_stats collection
    countWordsStartingWithA(collection); // call back function

    setTimeout(function(){myDB.close();}, 3000);
  });
});

function countWordsStartingWithA(collection){
  var query = {first: 'a'}; // defines a query with first letter starting as a
  var aCursor = collection.find(query); // create aCursor object
  aCursor.count(function(err, cnt){ // run count method on aCursor
    console.log("\nTotal words starting with A: " + cnt); // return count
  });
}