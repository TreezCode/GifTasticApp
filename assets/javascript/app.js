// Create an array of items to act as the original GIF buttons group.
var topics = [
    "Apex Legends",
    "BioShock",
    "Borderlands",
    "Call of Duty 4",
    "Crash Bandicoot",
    "Destiny",
    "Diablo II",
    "Division",
    "Doom",
    "Fallout",
    "Farcry",
    "Gear of War",
    "Guitar Hero",
    "Halo 2",
    "Overwatch",
    "Pokemon: Yellow",
    "Portal 2",
    "Starcraft",
    "The Elder Scrolls V: Skyrim",
    "World of Warcraft",
]

// Function to create buttons in HTML for each game in the "topics" array
var renderButtons = () => {
    // Iterate through array. 
    for (var i = 0; i < topics.length; i++) {
        // Dynamically generate buttons for each game in the "topics" array.
        var topicsBtn = $("<button>");
        // Add class.
        topicsBtn.addClass("gameBtn");
        // Add attribute.
        topicsBtn.attr("data-title", topics[i]);
        // Diplay the button text with the value of topics[i]
        topicsBtn.html(topics[i]);
        // Render buttons to html by appending to #gamesBtn.
        $("#gamesBtns").append(topicsBtn);
    }
}
renderButtons();

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
        // Create a variable to hold the ajax response contents
        var results = response.data;
        // Test
        console.log(results);

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
            gameGif.addClass("result")
            gameGif.attr("src", results[i].images.fixed_height_still.url);
            gameGif.attr("data-state", "still");
            gameGif.attr("data-still", results[i].images.fixed_height_still.url);
            gameGif.attr("data-animate", results[i].images.fixed_height.url);
            
            selectedWrap.prepend(gameGif);
            selectedWrap.prepend(ratingTag);

            resultsWrap.prepend(selectedWrap);
        }
        $("#gameGif").prepend(resultsWrap);
    })
})