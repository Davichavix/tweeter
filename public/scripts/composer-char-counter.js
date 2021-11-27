$(document).ready(function() {
  $('textarea#tweet-text').keyup(function() {
    let tweetLen = $(this).val().length;
    let tweetLenRemain = 140 - tweetLen;
    const parentTag = $(this).parent()
    const counterTag = parentTag.find('.counter');
    counterTag.text(tweetLenRemain);
  })
  console.log("This")
});
