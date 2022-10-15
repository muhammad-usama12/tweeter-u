// Character Counter function
$(document).ready(function () {
  $(".tweet-text").on("input", function () {
    let charCount = $(this).val().length;
    let newCount = 140 - charCount;
    const counter = $(this).parent().find(".counter");
    counter.text(newCount);

    // Character Counter color interpreter
    if (newCount <= 0) {
      counter.addClass("counter-color");
    } else {
      counter.removeClass("counter-color");
    }
  });
});
