$(document).ready(function () {
  // Cross-Site Scripting Prevention
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
            <h2><img src="${tweetObj.user.avatars}"></i>${
      tweetObj.user.name
    }</h2>
            <h3 class="user">${tweetObj.user.handle}</h3>
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

  // $("timeago").timeago();

  $("#new-tweet").on("submit", function (event) {
    event.preventDefault();
    const seralizedData = $(this).serialize();
    const charCount = Number($(this).parent().find(".counter").val());
    if (charCount < 0) {
      return alert("This tweet has reached max characters allowed per tweet");
    }
    if (charCount === 140) {
      return alert("Tweet form is empty, cannot submit");
    }
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
