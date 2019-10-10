$(document).ready(function() {
  function createBtn(name) {
    var btn = $("<button>");

    btn.text(name);
    btn.attr("data-type", name);
    btn.attr("type", "submit");
    btn.addClass("btn btn-primary search-btn");

    $(".button-container").append(btn);
  }

  $("#create-btn").on("click", function() {
    event.preventDefault();

    var btnName = $("#form-input").val();
    createBtn(btnName);

    $("#form-input").val("");
  });

  $(document).on("click", ".search-btn", function() {
    event.preventDefault();

    $(".gif-container").empty();

    var search = $(this).attr("data-type");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      search +
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gif'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var gifImage = $("<img>");

        gifImage.attr("src", still);
        gifImage.attr("data-still", still);
        gifImage.attr("data-animate", animated);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif-image");

        gifDiv.append(p);
        gifDiv.append(gifImage);

        $(".gif-container").append(gifDiv);
      }
    });
  });

  $(document).on("click", ".gif-image", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
