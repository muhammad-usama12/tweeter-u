$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let charCount = $(this).val().length;
    let newCount = 140 - charCount;
    const counter = $(this).parent().find(".counter");
    counter.text(newCount);

    //use jquery to access sibling and children node to get to the output tag (line 70)

    // for counter color change use if/else statement (limit === 140 char)
    if (newCount <= 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "gray");
    }
  });
});
