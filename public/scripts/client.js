$(document).ready(function () {
  // Scroll Button Function
  const toTop = document.querySelector(".toTop");
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  });
  toTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  // Prevent Default
  $("#new-tweet-sub").on("submit", function (event) {
    event.preventDefault();
    const seralizedData = $(this).serialize();

    const form = $(this).parent();
    const textarea = form.find("textarea");
    const counter = form.find(".counter");
    const charCount = textarea.val().length;

    // Validation Error Check
    $(".error").remove();

    if (charCount > 140) {
      const message =
        "<p class='error'><i class='fas fa-exclamation-triangle'></i>This tweet has reached max characters allowed per tweet!<i class='fas fa-exclamation-triangle'></i></p>";
      return $("#error").append(message).hide().slideDown();
    }

    if (!charCount) {
      const message =
        "<p class='error'><i class='fas fa-exclamation-triangle'></i>Cannot Submit empty Tweet!<i class='fas fa-exclamation-triangle'></i></p>";
      return $("#error").append(message).hide().slideDown();
    }

    // AJAX POST Request
    $.ajax({
      url: `/tweets`,
      method: "POST",
      data: seralizedData,
    })
      .then(function () {
        $("form")[0].reset();
        counter.text(140);
        loadTweets();
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  loadTweets();
});

// Cross-Site Scripting Prevention
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create's tweet objects that matches key.value pairs for user data
createTweetElement = function (tweetObj) {
  const $tweet = $(`
<article class="tweet">
          <header>
            <div>
              <img src="${tweetObj.user.avatars}">
              <h4> ${tweetObj.user.name}</h4>
            </div>
            <h5 class="user">${tweetObj.user.handle}</h5>
          </header>
          <p>${escape(tweetObj.content.text)}</p>
          <footer>
            <div> ${timeago.format(tweetObj.created_at)} </div>
            <div>
              <i class="fas fa-flag"></i> <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
        `);
  return $tweet;
};

// Renders Tweet entered by user
renderTweets = function (tweets) {
  $("#tweets-container").html("");
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

// AJAX GET, loads users tweet without reloading the page
const loadTweets = function () {
  $.ajax({
    url: `/tweets`,
    method: "GET",
  })
    .then(function (result) {
      console.log(result);
      renderTweets(result);
    })
    .catch(function (err) {
      console.log(err);
    });
};
