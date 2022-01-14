# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

- HTML, CSS, JS, jQuery and AJAX front-end
- Node, Express back-end

Tweeter frontend uses responsive design 
- screen widths below 1024px will be single column with nav bar removed
- screen widths above 1024px (Desktops) will show a 2 column page

Tweet limitations
- Tweets are limited to 140 characters or below
- Blank tweets are not permitted and will not post

Tweeter Functionality
- Tweets are updated using AJAX allowing tweets to post without reloading whole web page
- Random avatar images and name data are used for posted tweets

## Final Product

Tweeter Desktop Version
!["screenshot of Tweeter front page Desktop"](https://github.com/Davichavix/tweeter/blob/main/docs/Tweeter-front-page-desktop-version.png?raw=true)

Tweeter Tablet Version
!["screenshot of Tweeter front page Tablet"](https://github.com/Davichavix/tweeter/blob/main/docs/Tweeter-front-page-tablet-version.png?raw=true)

## Getting Started

1. Clone your repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Nodemon
- body-parser
- chance
- md5