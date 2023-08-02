/*
 * This file the corresponding JavaScript file for `index.html`.
 *
 * Client-side JS logic goes here.
 * jQuery is already loaded.
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function.
 */


// IMPORTS

// Calculates the time passed since a tweet was posted. Also added to
// `index.html`.
// const timeago = require("timeago.js");

// PROBLEM: Having trouble importing `timeago`. I run into errors like "require
// is not defined". I just blocked out the import statement and called it in
// full `timeago.format()...` below.




// Check the HTML document is ready before executing code.
$(document).ready(function() {

  // Log a message to the console once the web page has been loaded.
  // console.log("The document is ready!");


  // HANDLING NEW TWEET SUBMISSIONS

  /* Event Listener for the `#New-Tweet-Section form`: If a user decides to
   * submit their own tweet, when they press submit, there needs to be an event
   * handler to respond to it. This jQuery function is an event handler that
   * listens for this event.
   *
   * There is an event listener on the `#New-Tweet-Section` element (which is
   * NOT a form, but the parent of one). When the user hits `Submit`, the event
   * will propagate up the DOM tree until it encounters the event listener.
   *
   * That will trigger this event handling function, which will respond to this
   * event.
   */
  $("#New-Tweet-Section").on("submit", function(event) {

    // The default behaviour when a form is submitted is to send the data to
    // the backend and load the response page. This is not what we want here,
    // so we will prevent the default response.
    event.preventDefault();

    // console.log("New Tweet Submitted!");


    /* FORM DATA VALIDATION
     *
     * Before passing the form data to the server, validate it to exclude any
     * invalid data, such as empty tweets or tweets that are too long.
     *
     * Future Ideas: You could trying using `trim()` to remove whitespace before
     * and after the tweet. But in this case, tweets whose counter shows red
     * still get accepted after the whitespace is trimmed, which might lead to
     * confusion. Due to this, I've removed it.
     */

    // Capture the raw tweet so that you can validate it.
    const rawTweet = $("#tweet-text").val();

    // Find the length of the tweet so that you can check if its too long.
    const tweetLength = rawTweet.length;


    // Check if the tweet is empty.
    if ((rawTweet === "") || (rawTweet === null)) {
      alert("The tweet cannot be empty!");
      console.log("The tweet cannot be empty!");
      return;

      // Check if the tweet is longer than 140 characters.
    } else if (tweetLength > 140) {

      alert("The tweet cannot be longer than 140 characters!");
      console.log("The tweet cannot be longer than 140 characters!");
      return;

    };


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
     *
     * PROBLEM: For some reason, passing in `rawTweet` produces the error that
     * "rawTweet.serialize is not a function". I think this is because I'm
     * trying to call a jQuery function on a JavaScript variable, so I've passed
     * in the HTML form element instead. This works.
     */

    // console.log("Your Raw Tweet: ", $("#New-Tweet-Section form"));

    const newTweet = $("#New-Tweet-Section form").serialize();
    // console.log("Your Serialized Tweet: ", newTweet);


    /* SUBMITTING FORM DATA TO THE SERVER VIA AJAX
     *
     * AJAX Call: Make an AJAX call to return data from the form to the server
     * without refreshing the web page. Note that the AJAX function call takes
     * only one required parameter, `url`. For some unknown reason, the
     * teachers are passing in an object which contains several keys like
     * `url`, `type`, `data`, `success` and `error`. I guess this is an
     * alternate way of passing arguments to AJAX.
     *
     * This method call passes the newly created tweet to the `/tweets` on the
     * backend.
     */
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



  // LOAD EXISTING TWEETS

  // This function calls the `/tweets` endpoint to retrieve a list of submitted
  // tweets from the "database". The response should be a JSON string; The AJAX
  // function in jQuery will convert all JSON into JavaScript objects.
  const loadTweets = function() {

    // Make an AJAX call to the backend to retrieve submitted tweets. The
    // response should be a JSON object...
    $.ajax({
      url: "/tweets",
      type: "GET",

      // Be aware that if you fetch JSON through jQuery, the `$.ajax()` method
      // will automatically parse the JSON and turn it into a JavaScript object
      // for you. In this case, we're working with an array of objects, and it
      // seems like `$.ajax()` method has parsed that too! Apparently, it
      // returns an array of JS objects.
      success: function(tweetsArray) {
        console.log("You successfully received Tweets from the Backend in JSON Format!");
      },

      error: function(error) {
        console.log("You failed to get Tweets from the Backend!", error);
      }

    })
      /* RETURNING VALUES FROM AN AJAX FUNCTION
       *
       * WARNING: Because AJAX is asynchronous, you cannot extract data as you
       * would from a regular function. If you tried something like this,
       *
       *     const tweets = $.ajax({...});).
       *
       * it would not work. The return is no longer an array of JS objects, but
       * somehow reverts back to raw HTTP objects. I've had no luck extracting
       * tweets from that monstrosity.
       *
       * Remember that AJAX means Asynchronous JavaScript & XML. Once the AJAX
       * function completes its asynchronous operation, it will return its
       * payload. Use promises to call `renderTweets()` and pass in the array
       * of tweets.
       */
      .then((tweetsArray) => {
        renderTweets(tweetsArray);
      })

      // HANDLING ERRORS WITH PROMISES
      //
      // If the AJAX call fails, the `error` function inside it will display a
      // message in the console and bubble up the error. We can catch the error
      // here in this `catch` block and append it to the Tweets Container, so
      // that the user can see it.
      .catch((error) => {
        $("#Tweets-Container").append("The load tweets operation failed! Error: ",
          error.statusText + ".");
      });

  };


  // This function takes in an array of tweets and appends them to Tweets
  // Container. It gets called by `loadTweets()`.
  const renderTweets = function(tweets) {

    // Iterate over the `tweets` array...
    for (let tweet of tweets) {

      // Call `createTweetElement()` and pass in each tweet. This should return
      // an HTML template body for every tweet. Append each tweet's template
      // to the Tweets Container.
      $("#Tweets-Container").append(createTweetElement(tweet));
    }

  };


  // This function will take in a tweet object and generate an HTML template
  // for it. It gets called by `renderTweets()`.
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
          <p>${timeago.format(tweet.created_at)}</p>


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



  // DRIVER CODE
  loadTweets();

});