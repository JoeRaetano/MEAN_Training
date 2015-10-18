var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/", function(err, db) {
  var myDB = db.db("words");

  myDB.collection("word_stats", function(err, collection){
    over13(collection); // call method
    startWithXYZ(collection); // call method
    startWithREndVowels(collection); // call method

    setTimeout( function(){ myDB.close(); }, 3000); //close database after 3 seconds
  });
});

function displayCursor(cursor, msg){ // this function accepts a cursor from any of the find methods then iterates through each of the documents presetnted
  cursor.toArray(function(err, itemArr){
    var wordStr = "";
    for(var i in itemArr){
      wordStr += itemArr[i].word + ",";
    }
    console.log("\n" + msg + "\n" + wordStr);
  });
}

function over13(collection){
  var query = {'size': {'$gt': 13}}; //create a query and return a word that size is greater than 13 characters
  var cursor = collection.find(query); // pass the query object to the collection.find method and place into a cursor object
  displayCursor(cursor, "Words with more than 13 characters:"); // we then display the words that have more than 13 chars
}

function startWithXYZ(collection){
  var query =  {'first': {'$in': ["x","y","z"]}};//create a query and return a word that ends in either x, y, or z
  var cursor = collection.find(query); // pass the query object into cursor
  displayCursor(cursor, "Words starting with X, Y, Z:"); // then display the words starting with x, y, or z
}

function startWithREndVowels(collection){
  var query = {'$and': [// we use the and operator
                {'first': 'r'}, // on a word that starts with r
                {'last': {'$in': ["a","e","i","o","u"]}}]}; // and ends with a, e, i, o, u
  var cursor = collection.find(query); // pass the query object into the cursor method
  displayCursor(cursor, "Words starting with R and ending with a vowel:");
}