var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/", function(err, db) {
  var myDB = db.db("words");

  myDB.collection("word_stats", function(err, collection){
    sortWordsAscending(collection);
    sortWordsDescending(collection);
    sortWordsAscBySize(collection);

    setTimeout(function(){myDB.close();}, 3000);
  });
});

function displayCursor(cursor, msg){
  cursor.toArray(function(err, itemArr){
    var wordStr = "";
    for(var i in itemArr){
      wordStr += itemArr[i].word + ",";
    }
    console.log("\n" + msg + "\n" + wordStr);
  });
}

function sortWordsAscending(collection){
  var query = {'first': 'w'};
  var sorter = [['word', 1]]; // create an array object then within that array create a subarray to define the fields you want to sort on
  var cursor = collection.find(query, {limit: 10}); // 10 objects back at a time
  cursor = cursor.sort(sorter); // actually sorts the words
  displayCursor(cursor, "W words ordered ascending:");
}

function sortWordsDescending(collection){
  var query = {'first': 'w'};
  var sorter = [['word', -1]];
  var cursor = collection.find(query, {limit: 10});
  cursor = cursor.sort(sorter);
  displayCursor(cursor, "W words ordered descending:");
}

function sortWordsAscBySize(collection){
  var query = {'first': 'q'};
  var sorter = [['last', 1], ['size', -1]]; // sorts on last letter ascending and size descending
  var cursor = collection.find(query, {limit: 10});
  cursor = cursor.sort(sorter);
  displayCursor(cursor, "Q words ordered first by last "+
                        "letter and then by size:");
}