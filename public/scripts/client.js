/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

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
    $container = $('#tweets-container');
    $container.empty();
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet)
      $container.prepend($tweet);
    }
  }

  const loadTweets = function(cb) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log(tweets)
        cb(tweets);
      },
      error : (error) => {
        console.log(error);
      }
    })
  }

  $(document).ready(function () {
    $("#tweet-forms").on('submit', function (event) {
      event.preventDefault();
      if ($('#tweet-text').val().length === 0) {
        $('.error-msg').empty();
        $('.error-msg').append('❌ tweet cannot be empty ❌').slideDown();
      } 
      if ($('#tweet-text').val().length > 140) {
        $('.error-msg').empty();
        $('.error-msg').append('❌ tweet must be 140 characters or under ❌').slideDown();
      } else {
      const tweetSerial = $(this).serialize();
      $.post('/tweets', tweetSerial)
        .then(() => {
          $('.error-msg').slideUp();
          loadTweets(renderTweets);
          $('#tweet-text').val('');
        });
      }
    })
  })