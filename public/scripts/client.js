/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweet) {
  const $tweet = $(
    `<div class="tweet">
    <header>
    <div class="name-profile">
    <img src=${escape(tweet.user.avatars)}>
    <p>${tweet.user.name}</p>
    </div>
    <p class="name-handle">${escape(tweet.user.handle)}</p>
    </header>
    <label>${escape(tweet.content.text)}</label>
    <footer>
    <div class="tweet-footer">
    <p>${escape(timeago.format(tweet.created_at))}</p>
    </div>
    <div class="footer-logo">
    <i class="fas fa-flag fa-xs"></i>
    <i class="fas fa-retweet fa-xs"></i>
    <i class="fas fa-heart fa-xs"></i>
    </div>
    </footer>
    </div>`)
    
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet)
      $('#tweets-container').append($tweet);
    }
  }

  const loadTweets = function(cb) {
    $.get("/tweets", function(data) {
      cb(data);
    })
  }

  $(document).ready(function () {
    $("#tweet-forms").submit(function (event) {
      event.preventDefault();
      if ($('#tweet-text').val().length === 0 || $('#tweet-text').val().length > 140) {
        $('.error-msg').slideDown();
      } else {
      let tweetSerial = $(this).serialize();
      $.post("/tweets", tweetSerial); // Cant see request body in devtools?
      $('.error-msg').slideUp();
      loadTweets(renderTweets);
    }
    })
  })