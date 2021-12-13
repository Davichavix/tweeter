/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
    loadTweets(renderTweets);
    $("#tweet-forms").on('submit', function (event) {
      event.preventDefault();
      
      // checks if tweet is empty or only blank characters
      if ($('#tweet-text').val().length === 0 || $('#tweet-text').val().trim().length === 0) {
        $('.error-msg').empty();
        $('.error-msg').text('❌ tweet cannot be empty ❌').slideDown();
      } 
      else if ($('#tweet-text').val().length > 140) {
        $('.error-msg').empty();
        $('.error-msg').text('❌ tweet must be 140 characters or under ❌').slideDown();
      } else {
        const tweetSerial = $(this).serialize();
        $.post('/tweets', tweetSerial)
        .then(() => {
          $('.error-msg').slideUp();
          loadTweets(renderTweets);
          $('.counter').text(140);
          $('#tweet-text').val('');
        });
      }
    })
  })