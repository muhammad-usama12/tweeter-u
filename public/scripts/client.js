/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  renderTweets = function (tweets) {
    $("#tweets-container").html("");
    for (let tweet of tweets) {
      // calls createtweet elemnt for each tweet
      const $tweet = createTweetElement(tweet);

      $("#tweets-container").prepend($tweet);
      // takes return value and appends it to the tweets container
    }
  };

  createTweetElement = function (tweetObj) {
    const $tweet = $(`
<article class="tweet">
          <header>
            <h2><img src="${tweetObj.user.avatars}"></i>${tweetObj.user.name}</h2>
            <h3 class="user">${tweetObj.user.handle}</h3>
          </header>
          <p>${tweetObj.content.text}</p>
          <footer>
            <div>${tweetObj.created_at}</div>
            <div>
              <i class="fas fa-flag"></i> <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
        `);
    return $tweet;
  };

  renderTweets(data);

  // add an event listener that listens for the submit event

  // prevent the default behaviour of submit event

  $("#new-tweet").on("submit", function (event) {
    event.preventDefault();
    const seralizedData = $(this).serialize();
    $.ajax({
      url: `/tweets`,
      method: "POST",
      data: seralizedData,
    })
      .then(function () {
        $.ajax({
          url: `/tweets`,
          method: "GET",
        }).then(function (result) {
          console.log(result);
          renderTweets(result);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  const loadTweet = function () {
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
  loadTweet();
});

// $("button").click(function () {
//   $("data").text($("form").serializae());
// });

// create an AJAX POST request in client.js that sends the form data to the server

// const $button = $("tweet-submission");
// $button.on(click, function () {
//   console.log("Performing ajax call");
//   $.ajax("index.html", { method: "GET" }).then(function (newTweetPosts) {
//     console.log("Success: ", newTweetPosts);
//     $button.replaceWith(newTweetPosts);
//   });
// });
