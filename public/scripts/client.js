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


const createTweetElement = function(tweet) {
  const $tweet = $(
    `<div class="tweet">
    <header>
    <div class="name-profile">
    <img src=${tweet.user.avatars}>
    <p>${tweet.user.name}</p>
    </div>
    <p class="name-handle">${tweet.user.handle}</p>
    </header>
    <label>${tweet.content.text}</label>
    <footer>
    <div class="tweet-footer">
    <p>${tweet.created_at}</p>
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

  $(document).ready(function () {
    renderTweets(data);
  })