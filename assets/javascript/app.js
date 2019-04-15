
// Create an array of items to act as the original GIF buttons group.
var topics = [
    "Apex Legends",
    "BioShock",
    "Borderlands",
    "Call of Duty 4",
    "Crash Bandicoot",
    "Destiny",
    "Diablo II",
    "Donkey Kong Country",
    "Fallout",
    "Forza Motorsports",
    "Gears of War",
    "Guitar Hero III",
    "Halo 2",
    "Mortal Kombat",
    "Overwatch",
    "Pokemon: Yellow",
    "Portal 2",
    "Super Mario 64",
    "The Elder Scrolls V: Skyrim",
    "World of Warcraft",
]

// Function to create buttons in HTML for each game in the "topics" array
var renderButtons = () => {
    // Iterate through array. 
    for (var i = 0; i < topics.length; i++) {
        // Dynamically generate buttons for each game in the "topics" array.
        var topicsBtn = $("<button>");
        // Add class & data attribute
        topicsBtn.addClass("gameBtn");
        topicsBtn.attr("data-title", topics[i]);
        // Diplay the button text with the value of topics[i]
        topicsBtn.html(topics[i]);
        // Render buttons to html by appending to #gamesBtn.
        $("#gamesBtns").append(topicsBtn);
    }
}
// Funtion to add game button by taking the value of users input when submit is clicked
var addGame = () => {
    $("#addGameBtn").on("click", function(event) {
        event.preventDefault();
        var isDuplicate = false;
        if(topics.indexOf($("#addGameInput").val()) !== -1) {
            isDuplicate = true;
        }
        if($("#addGameInput").val() !== "" && isDuplicate === false) {
            var addedGame = $("#addGameInput").val().toLowerCase();
            topics.push(addedGame);
            var addedBtn = $("<button>").html(addedGame);
            addedBtn.attr("data-title", addedGame);
            addedBtn.addClass("addedBtn");
            addedBtn.addClass("gameBtn");
            $("#gamesBtns").append(addedBtn);
        }
        $("#addGameInput").val("");
    })
}

// Calls
// ========================
renderButtons();
addGame();

// Click function to grab 10 static gif images from the API and display them to HTML.
$(document).on("click", ".gameBtn", function () {
    // Construct our GIPHY API URL to access content on click
    var game = $(this).attr("data-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=rw5VaICnljTZaQmlb6CMFV92y1NfxWB1&limit=10";

    // Create a call to ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Create a variable to hold the ajax response data contents
        var results = response.data;
        // Test
        // console.log(results);
        
        // Create a div to diplay contents to HTML
        var resultsWrap = $("<div>");
        // Add class
        resultsWrap.addClass("resultsWrap");

        // Iterate through the results
        for (var i = 0; i < results.length; i++) {
            var selectedWrap = $("<div>");
            selectedWrap.addClass("selectedWrap");

            // Create variable to hold results rating and results HTML reference
            var rating = results[i].rating;
            var ratingTag = $("<div class = 'ratingDiv'>").html("Rating: " + rating);
            
            // Create an img tag to display the results
            var gameGif = $("<img>");
            // Add class
            gameGif.addClass("result")
            // Add src to diplay still GIF when first loaded
            gameGif.attr("src", results[i].images.fixed_height_still.url);
            // Add data attributes to later use to make GIF animate
            gameGif.attr("data-state", "still");
            gameGif.attr("data-still", results[i].images.fixed_height_still.url);
            gameGif.attr("data-animate", results[i].images.fixed_height.url);
            
            // Prepend gif and rating to "selectedWrap"
            selectedWrap.prepend(gameGif);
            selectedWrap.prepend(ratingTag);
            // Prepend "selectedWrap" to "resultsWrap"
            resultsWrap.prepend(selectedWrap);
        }
        // Send "resultsWrap" containing entire gif to HTML
        $("#gameGif").prepend(resultsWrap);
    });
});

// Click function to play / pause the GIF
$(document).on("click", ".result", function() {
    // Create var to hold the data state of this "clicked" GIF
    var state = $(this).attr("data-state");

    // If current state is "still" when clicked then set to "animate"
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        // If surrent state is "animate" when clicked then set to "still"
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
