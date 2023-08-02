/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Check the HTML document is ready before executing code.
$(document).ready(function() {

  // Log a message to the console once the web page has been loaded.
  // console.log("The document is ready!");


  // Tweet data hardcoded here for temporary use. It will be replaced with
  // an AJAX call later.
  const tempTweets = [
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];



  // This function will take in a tweet object and generate and HTML template
  // for it.
  const createTweetElement = function(tweet) {

    // Use jQuery's `$` symbol to create new a HTML element. In this case,
    // because you want to return an article element, declare it as shown.
    // Note that that you need `<` and `>` included.
    const $tweet = $("<article class='tweet'>");


    // Append the full body of the HTML template to `$tweet`.
    $tweet.append(
      `
        <!-- TWEET HEADER -->
        <header>

          <div>

            <!-- USER'S PHOTO -->
            <img src="${tweet.user.avatars}" alt="User's Photo">

            <!-- USER'S REAL NAME -->
            <p>${tweet.user.name}</p>

          </div>

          <!-- USER HANDLE -->
          <a href="#">${tweet.user.handle}</a>

        </header>


        <!-- TWEET BODY -->
        <output>${tweet.content.text}</output>


        <!-- TWEET FOOTER -->
        <footer>

          <!-- TIME THAT THE TWEET WAS POSTED -->
          <p>${tweet.created_at}</p>


          <!-- SOCIAL MEDIA OPTIONS -->
          <div>
            <a href="#" alt="Flag Button"><i class="fa-solid fa-flag"></i></a>
            <a href="#" alt="Retweet Button"><i class="fa-solid fa-retweet"></i></a>
            <a href="#" alt="Heart Button"><i class="fa-solid fa-heart"></i></a>
          </div>

        </footer>
      `

    );


    return $tweet;
  };


  // This function takes in an array of tweets and appends them to Tweets
  // Container.
  const renderTweets = function(tweets) {

    // Iterate over the `tweets` array...
    for (const tweet of tweets) {

      // Call `createTweetElement()` and pass in each tweet. This should return
      // an HTML template body for every tweet. Append each tweet's template
      // to the Tweets Container.
      $("#Tweets-Container").append(createTweetElement(tweet));
      console.log("Tweets Container Loop!");
    }

  };



  // DRIVER CODE
  renderTweets(tempTweets);

});