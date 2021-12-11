$(document).ready(function() {
  $('textarea#tweet-text').on('input', function() {
    let tweetLen = $(this).val().length;
    let tweetLenRemain = 140 - tweetLen;
    const parentTag = $(this).parent();
    const counterTag = parentTag.find('.counter');
    if (tweetLenRemain < 0) {
      counterTag.css('color', 'red');
      counterTag.text(tweetLenRemain);
    } else if (tweetLenRemain >= 0) {
      counterTag.text(tweetLenRemain);
      counterTag.css('color', '');
    }
  });
  console.log("This");
});
