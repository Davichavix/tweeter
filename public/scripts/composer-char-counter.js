$(document).ready(function() {
  $('textarea#tweet-text').on('input', function() {

    // gets tweet length from textarea form and checks if over 140 chars
    let tweetLen = $(this).val().length;
    let tweetLenRemain = 140 - tweetLen;
    const parentTag = $(this).parent();
    const counterTag = parentTag.find('.counter');
    if (tweetLenRemain < 0) {

      // turns counter text red if tweet over 140 chars
      counterTag.css('color', 'red');
      counterTag.text(tweetLenRemain);
    } else if (tweetLenRemain >= 0) {
      counterTag.text(tweetLenRemain);

      // if tweet valid length revert counter text to default color
      counterTag.css('color', '');
    }
  });
});
