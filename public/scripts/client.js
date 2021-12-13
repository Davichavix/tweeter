/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function to prevent cross-site scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creates tweet element which will be prepended to tweets-container
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

  // function loops through all existing tweets and prepends to tweets-container
  const renderTweets = function(tweets) {
    $container = $('#tweets-container');
    $container.empty();
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet)
      $container.prepend($tweet);
    }
  }

// AJAX call to GET tweets as JSON data
// Takes renderTweets as argument
  const loadTweets = function(cb) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        cb(tweets);
      },
      error : (error) => {
        console.log(error);
      }
    })
  }

  $(document).ready(function () {

    // loads existing tweets on page refresh
    loadTweets(renderTweets);

    // event handler for TWEET button
    $("#tweet-forms").on('submit', function (event) {
      event.preventDefault();
      
      // checks if tweet is empty or only blank characters
      if ($('#tweet-text').val().length === 0 || $('#tweet-text').val().trim().length === 0) {
        $('.error-msg').empty();
        $('.error-msg').text('❌ tweet cannot be empty ❌').slideDown();
      } 

      // checks if tweet is over 140 chars
      else if ($('#tweet-text').val().length > 140) {
        $('.error-msg').empty();
        $('.error-msg').text('❌ tweet must be 140 characters or under ❌').slideDown();
      } else {
        const tweetSerial = $(this).serialize();

        // if no error post new tweet to page
        $.post('/tweets', tweetSerial)
        .then(() => {
          $('.error-msg').slideUp();
          loadTweets(renderTweets);
          $('.counter').text(140);

          // resets tweet textarea to empty on successful post
          $('#tweet-text').val('');
        });
      }
    })
  })