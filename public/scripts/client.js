/*
 * This file the corresponding JavaScript file for `index.html`.
 *
 * Client-side JS logic goes here.
 * jQuery is already loaded.
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function.
 */


// Check the HTML document is ready before executing code.
$(document).ready(function() {

  // Log a message to the console once the web page has been loaded.
  // console.log("The document is ready!");


  // HANDLING NEW TWEETS

  // Event Handler: If a `Submit` event is triggered on the `#New-Tweet-Form`
  // element (which is NOT a form, but the parent of one), it will trigger
  // this function. It is an event handler listening for the `submit` action
  // on the form in `#New-Tweet-Form`.
  $("#New-Tweet-Form").on("submit", function(event) {

    // The default behaviour when a form is submitted is to send the data to
    // the backend and load the response page. This is not what we want here,
    // so we will prevent the default response.
    event.preventDefault();

    // console.log("New Tweet Submitted!");


    /* SERIALIZING FORM DATA (INTO A QUERY STRING OR JSON STRING)
     *
     * When the form was submitted, it should have sent all the data entered
     * into it to the backend via a POST request. Specifically, this event
     * handler should have gotten it.
     *
     * This form data is in raw form [Question: What format is it in?].
     * Servers are usually configured to accept data either as JSON strings
     * or Query Strings. This project's backend is configured to accept data
     * in query string format. So before we can pass form data to the server's
     * endpoints, we will have to convert it to a Query String.
     *
     * The exact structure of Query Strings is NOT standardized, but a common
     * format is a set of field-value pairs, where the field is separated from
     * the value by `=` and each pair is separated from the next pair by `&`.
     * Example: `field1=value1&field2=value2&field3=value3...`. This is very
     * similar to the way data is passed to the backend via the URL .
     *
     * You have to use jQuery's `.serialize()` function to turn a set of form
     * data into a query string. This serialized data should be sent to the
     * server in the `data` field of the AJAX POST request.
     */

    // console.log("Your Raw Tweet: ", $("#New-Tweet-Form form"));

    const newTweet = $("#New-Tweet-Form form").serialize();
    // console.log("Your Serialized Tweet: ", newTweet);


    // AJAX Call: Make an AJAX call to return data from the form to the server
    // without refreshing the web page. Note that the AJAX call takes an object
    // (??) which contains several keys like `url`, `type`, `data`, `success`
    // and `error`. Pass the newly created tweet to the `/tweets` on the
    // backend.
    $.ajax({

      url: "/tweets",
      type: "POST",
      data: newTweet,

      success: function(result) {
        console.log("Your Tweet was Successfully Submitted!");
      },

      error: function(error) {
        console.log("Tweet Submission Failed! Error Message: ", error);
      }

    });

  });



  // LOADING EXISTING TWEETS

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
    }

  };



  // DRIVER CODE
  renderTweets(tempTweets);

});