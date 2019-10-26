var friendsData = require("../data/friends");
var match = {
    name:"",
    photo:""
}

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        matchFinder(friendsData,req.body);
        friendsData.push(req.body);
        res.json(match);
    });
};

function matchFinder(completeData, entryData) {
    var compare = 0;
    var difference;
    var totalDifference = 100;
    for(i = 0; i < completeData.length; i++) {
        for(j = 0; j < 10; j++) {
            difference = Math.abs(completeData[i].scores[j] - entryData.scores[j]);
            compare = compare + difference;
        }
        if ( compare < totalDifference) {
            totalDifference = compare;
            match.name = completeData[i].name;
            match.photo = completeData[i].photo;
        }
    }
}