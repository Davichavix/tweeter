/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = $(`<article class="tweets">${tweetData.content.text}</article>`);
console.log($tweet);


$(document).ready(function () {
  $('#tweets-container').append($tweet);
})

const createTweetElement = function(tweet) {
  let $tweet = $(`<article class="tweets">${tweet.content.text}</article>`);

  return $tweet;
};